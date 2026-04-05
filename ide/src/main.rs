use axum::{
    Router,
    extract::{Multipart, Path, State},
    http::StatusCode,
    response::{Html, IntoResponse, Response},
    routing::{get, post},
};
use clap::Parser;
use serde::{Deserialize, Serialize};
use std::{
    fs,
    path::PathBuf,
    sync::Arc,
    time::SystemTime,
};

#[derive(Parser)]
#[command(name = "blog-editor")]
struct Args {
    #[arg(short, long, default_value_t = 4000)]
    port: u16,

    #[arg(long)]
    dark: bool,
}

#[derive(Clone)]
struct AppState {
    root: PathBuf,
    content_dir: PathBuf,    // content/posts
    content_root: PathBuf,   // content/
    images_dir: PathBuf,
    static_dir: PathBuf,
    dark: bool,
}

#[derive(Serialize)]
struct PostEntry {
    filename: String,
    title: String,
    draft: bool,
    modified: u64,
}

#[derive(Deserialize)]
struct PostBody {
    content: String,
}

#[derive(Serialize)]
struct UploadResult {
    ok: bool,
    path: String,
    filename: String,
}

#[derive(Deserialize)]
struct PublishBody {
    message: String,
}

// Resolve a filename to an actual path, safely.
// Rejects anything with path separators or `..`.
// Checks content/posts/ first, then content/ (for about.md).
fn resolve_file(state: &AppState, filename: &str) -> Option<PathBuf> {
    if filename.contains('/') || filename.contains('\\') || filename.contains("..") {
        return None;
    }
    if !filename.ends_with(".md") {
        return None;
    }
    let path = state.content_dir.join(filename);
    if path.is_file() {
        return Some(path);
    }
    // Allow about.md from content/ root
    if filename == "about.md" {
        let alt = state.content_root.join(filename);
        if alt.is_file() {
            return Some(alt);
        }
    }
    None
}

fn extract_front_matter(content: &str) -> (Option<&str>, &str) {
    if content.starts_with("---") {
        if let Some(end) = content[3..].find("\n---") {
            let fm = &content[3..3 + end];
            let body_start = 3 + end + 4;
            let body = if body_start < content.len() {
                &content[body_start..]
            } else {
                ""
            };
            return (Some(fm.trim()), body);
        }
    }
    (None, content)
}

fn extract_yaml_field<'a>(fm: &'a str, field: &str) -> Option<&'a str> {
    for line in fm.lines() {
        let trimmed = line.trim();
        if let Some(rest) = trimmed.strip_prefix(field) {
            if let Some(rest) = rest.strip_prefix(':') {
                let val = rest.trim();
                return Some(val.trim_matches('"').trim_matches('\''));
            }
        }
    }
    None
}

fn sanitize_filename(name: &str) -> String {
    name.chars()
        .map(|c| {
            if c.is_alphanumeric() || c == '-' || c == '_' || c == '.' {
                c
            } else {
                '_'
            }
        })
        .collect()
}

fn read_post_entry(path: &std::path::Path) -> Option<PostEntry> {
    let filename = path.file_name()?.to_string_lossy().to_string();
    let content = fs::read_to_string(path).ok()?;
    let mut title = path.file_stem()?.to_string_lossy().to_string();
    let mut draft = false;

    if let (Some(fm), _) = extract_front_matter(&content) {
        if let Some(t) = extract_yaml_field(fm, "title") {
            title = t.to_string();
        }
        if let Some(d) = extract_yaml_field(fm, "draft") {
            draft = d == "true";
        }
    }

    let modified = path
        .metadata()
        .ok()
        .and_then(|m| m.modified().ok())
        .and_then(|t| t.duration_since(SystemTime::UNIX_EPOCH).ok())
        .map(|d| d.as_secs())
        .unwrap_or(0);

    Some(PostEntry { filename, title, draft, modified })
}

async fn index_page(State(state): State<Arc<AppState>>) -> Html<String> {
    let html = include_str!("../index.html");
    let html = html.replace(
        "/*DARK_MODE_INJECT*/",
        if state.dark {
            "document.documentElement.classList.add('dark-mode');"
        } else {
            ""
        },
    );
    Html(html)
}

async fn list_posts(State(state): State<Arc<AppState>>) -> impl IntoResponse {
    let mut posts = Vec::new();

    // Posts from content/posts/
    if let Ok(entries) = fs::read_dir(&state.content_dir) {
        for entry in entries.flatten() {
            let path = entry.path();
            if path.extension().and_then(|e| e.to_str()) != Some("md") {
                continue;
            }
            if let Some(entry) = read_post_entry(&path) {
                posts.push(entry);
            }
        }
    }

    // about.md from content/
    let about_path = state.content_root.join("about.md");
    if let Some(entry) = read_post_entry(&about_path) {
        posts.push(entry);
    }

    posts.sort_by(|a, b| b.modified.cmp(&a.modified));
    axum::Json(posts)
}

async fn read_post(
    State(state): State<Arc<AppState>>,
    Path(filename): Path<String>,
) -> Response {
    match resolve_file(&state, &filename) {
        Some(path) => match fs::read_to_string(&path) {
            Ok(content) => axum::Json(serde_json::json!({
                "filename": filename,
                "content": content
            }))
            .into_response(),
            Err(_) => StatusCode::INTERNAL_SERVER_ERROR.into_response(),
        },
        None => StatusCode::NOT_FOUND.into_response(),
    }
}

async fn write_post(
    State(state): State<Arc<AppState>>,
    Path(filename): Path<String>,
    axum::Json(body): axum::Json<PostBody>,
) -> Response {
    match resolve_file(&state, &filename) {
        Some(path) => match fs::write(&path, &body.content) {
            Ok(_) => axum::Json(serde_json::json!({"ok": true})).into_response(),
            Err(_) => StatusCode::INTERNAL_SERVER_ERROR.into_response(),
        },
        None => StatusCode::BAD_REQUEST.into_response(),
    }
}

async fn upload_image(
    State(state): State<Arc<AppState>>,
    Path(slug): Path<String>,
    mut multipart: Multipart,
) -> Response {
    while let Ok(Some(field)) = multipart.next_field().await {
        let original_name = match field.file_name() {
            Some(n) => n.to_string(),
            None => continue,
        };
        let safe_name = sanitize_filename(&original_name);
        let data = match field.bytes().await {
            Ok(d) => d,
            Err(_) => continue,
        };

        let img_dir = state.images_dir.join(&slug);
        if fs::create_dir_all(&img_dir).is_err() {
            return StatusCode::INTERNAL_SERVER_ERROR.into_response();
        }
        if fs::write(img_dir.join(&safe_name), &data).is_err() {
            return StatusCode::INTERNAL_SERVER_ERROR.into_response();
        }

        let path = format!("/post-images/{}/{}", slug, safe_name);
        return axum::Json(UploadResult {
            ok: true,
            path,
            filename: safe_name,
        })
        .into_response();
    }

    StatusCode::BAD_REQUEST.into_response()
}

async fn publish(
    State(state): State<Arc<AppState>>,
    axum::Json(body): axum::Json<PublishBody>,
) -> Response {
    let message = if body.message.trim().is_empty() {
        "update blog".to_string()
    } else {
        body.message
    };

    let output = match tokio::process::Command::new("bash")
        .arg("./publish.sh")
        .arg(&message)
        .current_dir(&state.root)
        .output()
        .await
    {
        Ok(o) => o,
        Err(e) => {
            return axum::Json(serde_json::json!({
                "ok": false,
                "error": format!("Failed to run publish.sh: {}", e)
            }))
            .into_response();
        }
    };

    let stdout = String::from_utf8_lossy(&output.stdout).to_string();
    let stderr = String::from_utf8_lossy(&output.stderr).to_string();

    if output.status.success() {
        axum::Json(serde_json::json!({
            "ok": true,
            "stdout": stdout,
            "stderr": stderr,
        }))
        .into_response()
    } else {
        axum::Json(serde_json::json!({
            "ok": false,
            "error": format!("publish.sh failed (exit {})", output.status),
            "stdout": stdout,
            "stderr": stderr,
        }))
        .into_response()
    }
}

async fn serve_image(
    State(state): State<Arc<AppState>>,
    Path(rest): Path<String>,
) -> Response {
    let path = state.static_dir.join("post-images").join(&rest);
    if !path.is_file() {
        return StatusCode::NOT_FOUND.into_response();
    }
    let ct = match path.extension().and_then(|e| e.to_str()) {
        Some("png") => "image/png",
        Some("jpg" | "jpeg") => "image/jpeg",
        Some("gif") => "image/gif",
        Some("svg") => "image/svg+xml",
        Some("webp") => "image/webp",
        _ => "application/octet-stream",
    };
    match fs::read(&path) {
        Ok(data) => (
            StatusCode::OK,
            [(axum::http::header::CONTENT_TYPE, ct)],
            data,
        )
            .into_response(),
        Err(_) => StatusCode::INTERNAL_SERVER_ERROR.into_response(),
    }
}

#[tokio::main]
async fn main() {
    let args = Args::parse();

    let root = PathBuf::from(env!("CARGO_MANIFEST_DIR"))
        .parent()
        .unwrap()
        .to_path_buf();

    let state = Arc::new(AppState {
        content_dir: root.join("content/posts"),
        content_root: root.join("content"),
        images_dir: root.join("static/post-images"),
        static_dir: root.join("static"),
        dark: args.dark,
        root: root.clone(),
    });

    let app = Router::new()
        .route("/", get(index_page))
        .route("/api/posts", get(list_posts))
        .route("/api/posts/{filename}", get(read_post).put(write_post))
        .route("/api/upload/{slug}", post(upload_image))
        .route("/api/publish", post(publish))
        .route("/post-images/{*rest}", get(serve_image))
        .with_state(state);

    let addr = format!("127.0.0.1:{}", args.port);
    println!("\n  Blog Editor → http://localhost:{}", args.port);
    if args.dark {
        println!("  Mode: dark");
    }
    println!();

    let listener = match tokio::net::TcpListener::bind(&addr).await {
        Ok(l) => l,
        Err(_) => {
            eprintln!("  Error: port {} is already in use.", args.port);
            eprintln!("  Hint: lsof -ti:{} | xargs kill", args.port);
            std::process::exit(1);
        }
    };
    axum::serve(listener, app).await.unwrap();
}

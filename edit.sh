#!/usr/bin/env bash
set -e

DIR="$(cd "$(dirname "$0")" && pwd)"
BINARY="$DIR/ide/target/debug/blog-editor"

# Build if needed
if [ ! -f "$BINARY" ] || [ "$DIR/ide/src/main.rs" -nt "$BINARY" ] || [ "$DIR/ide/Cargo.toml" -nt "$BINARY" ] || [ "$DIR/ide/index.html" -nt "$BINARY" ]; then
  echo "  Building editor..."
  (cd "$DIR/ide" && cargo build 2>&1)
  echo ""
fi

exec "$BINARY" "$@"

var currentEvent, posX, posY, velX, velY;
var keyframeX, keyframeY, centreX, centreY;

const dt=25;

const CLIP_DISTANCE = 5*dt;
const K_OVER_M = 0.0005;
const C_OVER_M = 0.05;
const MAX_SPEED = 4.0;

const DEBUG_MODE = true;


// -------- FUNCTIONS -------- //
function set_visual_centre() {
  // Use this to get centre of logo instead
  // var bounding_box=document.getElementById("logo-s").getBoundingClientRect();
  // return [0.5*(bounding_box["bottom"]+bounding_box["top"]), 0.5*(bounding_box["right"]+bounding_box["left"])]
  centreX = window.innerWidth / 2;
  centreY = window.innerHeight / 2;
}

function saturated(val, max_val) {
  return Math.min(Math.abs(val), max_val)*Math.sign(val);
}

function clipper(val, min_val, max_val) {
  // Might be unused...
  return Math.max(Math.min(val, max_val), min_val);
}

function accelerate_towards(X, Y) {
  // Damped harmonic oscillator in 2D (with the velocity saturated for good measure!)
  if ((X-posX)**2 + (Y-posY)**2 < CLIP_DISTANCE) {
    posX = X;
    posY = Y;
    velX = 0.0;
    velY = 0.0;
  } else {
    velX = saturated(velX + (-C_OVER_M*velX-K_OVER_M*(posX-X))*dt, MAX_SPEED);
    posX = posX + velX*dt;
    velY = saturated(velY + (-C_OVER_M*velY-K_OVER_M*(posY-Y))*dt, MAX_SPEED);
    posY = posY + velY*dt;
  }
}

function set_keyframes() {
  // Keyframes of (1, 1) corresponds to (centreX, centreY), ranges from 0 to 2
  keyframeX = posX/(centreX);
  keyframeY = posY/(centreY);
}

function get_keyframed_value(mean, variation, keyframe) {
  return mean + (keyframe - 1)*variation;
}

// -------- EVENT STUFF -------- //
window.onload = function(){
  set_visual_centre();
  [posX, posY] = [centreX, centreY];
  var touchOffsetX = 0.0;
  var touchOffsetY = 0.0;
  velX = 0.0;
  velY = 0.0;
}
window.onresize = function() {
  set_visual_centre();
}
document.documentElement.onmousemove=function(event){
  currentEvent=event;
}

document.documentElement.ontouchmove=function(event){
  // IMPLEMENT touchOffset
  currentEvent=event;
}


// -------- MAIN LOOP -------- //
// var circle;
setInterval(function(){
  if(currentEvent){
    var mouseX=(currentEvent.clientX);
    var mouseY=(currentEvent.clientY);
    accelerate_towards(mouseX, mouseY);
    set_keyframes();

    if (DEBUG_MODE) {
      // if (!(circle)) {
      //   circle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
      //   circle.setAttributeNS(null, 'r', 50);
      //   circle.setAttributeNS(null, 'style', 'fill: none; stroke: blue; stroke-width: 1px; position: absolute;' );
      //   document.getElementById('cont').appendChild(circle);
      // }
      // container = document.getElementById('cont')
      // container.style.position = 'absolute';
      // container.style.left = posX +'px'; 
      // container.style.top = posY +'px';
      var debug_logger = document.getElementById('debug');
      debug_logger.innerText = `Visual Centre: ${centreX}, ${centreY}`;
      debug_logger.innerText += `\n MouseXY: ${mouseX}, ${mouseY}`;
      debug_logger.innerText += `\n Visual Offset: ${mouseX - posX}, ${mouseY - posY}`;
      debug_logger.innerText += `\n KeyframeXY: ${keyframeX}, ${keyframeY}`;
      // debug_logger.innerText += `\n Vel: ${velX}, ${velY}`;
    }

    var black_gradient = document.getElementById('black-gradient');
    black_gradient.setAttribute("cx", get_keyframed_value(0.6, -0.1, keyframeX));
    black_gradient.setAttribute("cy", get_keyframed_value(0.6, -0.2, keyframeY));

    var darkpink_gradient = document.getElementById('darkpink-gradient');
    darkpink_gradient.setAttribute("cx", get_keyframed_value(0.6, -0.1, keyframeX));
    darkpink_gradient.setAttribute("cy", get_keyframed_value(0.4, -0.2, keyframeY));

    var pink_gradient = document.getElementById('pink-gradient');
    pink_gradient.setAttribute("x1", get_keyframed_value(10, 10, keyframeX) + "%");
    pink_gradient.setAttribute("y1", get_keyframed_value(100, -5, keyframeX) + "%");
    pink_gradient.setAttribute("x2", get_keyframed_value(100, 5, keyframeX) + "%");
    pink_gradient.setAttribute("y2", get_keyframed_value(0, -5, keyframeX) + "%");

    let rotationX = get_keyframed_value(0, -7, keyframeX) + "deg";
    let rotationY = get_keyframed_value(0, 5, keyframeY) + "deg";
    var svg_rotator = document.getElementById('svg-rotator');
    svg_rotator.style.transform = `rotateX(${rotationY}) rotateY(${rotationX})`;
  }
}, dt);
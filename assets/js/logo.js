var currentEvent, scrollSpeed, posX, posY, velX, velY;
var keyframeX, keyframeY, centreX, centreY;
var black_gradient, darkpink_gradient, pink_gradient;
var black_path, darkpink_path, pink_path;

const dt=25; // 25 is stable

const CLIP_DISTANCE = 1*dt**2;
const K_OVER_M = 0.00025;
const C_OVER_M = 0.05;
const MAX_SPEED = 10.0;
var scrollEnded = true;


// -------- FUNCTIONS -------- //
function set_visual_centre() {
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
  // keyframeX = (keyframeX - 1)*1.2 + 1;
  // keyframeY = (keyframeY - 1)*1.2 + 1;
}

function get_keyframed_value(mean, variation, keyframe, symmetric=false) {
  if (symmetric) {
    return mean + variation*(keyframe - 1)**2;
  }
  return mean + (keyframe - 1)*variation;
}

// -------- EVENT STUFF -------- //
window.onload = function(){
  set_visual_centre();
  [posX, posY] = [centreX, centreY];
  // Fade the logo into view
  var logo_elem = document.getElementById('logo-s');
  if (logo_elem) {
    logo_elem.style.opacity = 0;
    logo_elem.style.transition = 'opacity 0.7s ease';
    setTimeout(function() {
      logo_elem.style.opacity = 1;
    }, 10);
  }
  set_keyframes();
  velX = 0.0;
  velY = 0.0;

  black_gradient = document.getElementById('black-gradient');
  darkpink_gradient = document.getElementById('darkpink-gradient');
  pink_gradient = document.getElementById('pink-gradient');

  black_path = document.getElementById('black-path');
  darkpink_path = document.getElementById('darkpink-path');
  pink_path = document.getElementById('pink-path');
}
window.onresize = function() {
  set_visual_centre();
}
document.documentElement.onmousemove=function(event){
  if (!isTouchEvent(event)) {
    currentEvent = event;
}
}

function isTouchEvent(event) {
  return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0) ||
      ('touches' in event);
}

function isMobileDevice() {
  return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);
}

function getScrollSpeed(callback) {
  if (isMobileDevice()) {
      let lastScrollTop = 0;
      let lastTimestamp = 0;
      const maxScrollSpeed = 10000;
      const scrollEndTimeout = 10;


      function handleScroll() {
          const scrollTop = window.scrollY || document.documentElement.scrollTop;
          const timestamp = performance.now();

          if (lastTimestamp === 0) {
              lastTimestamp = timestamp;
              lastScrollTop = scrollTop;
              return;
          }

          const timeDiff = timestamp - lastTimestamp;
          var distance = scrollTop - lastScrollTop;
          distance = distance*distance*Math.sign(distance);

          const speed = (distance / timeDiff) * 2000; // pixels per second
          scrollSpeed = 1.4*Math.max(Math.min(speed / maxScrollSpeed, 1), -1);

          // Reset values for the next iteration
          lastTimestamp = timestamp;
          lastScrollTop = scrollTop;
          
          scrollEnded = false;
          callback(scrollSpeed);
          clearTimeout(handleScroll.scrollEndTimeoutId);
            handleScroll.scrollEndTimeoutId = setTimeout(function() {
                console.log('Scroll Ended');
                scrollEnded = true;
            }, scrollEndTimeout);
      }

      window.addEventListener('scroll', handleScroll, { passive: true });
  } else {
      // Do nothing on non-mobile devices
  }
}

getScrollSpeed(function(scrollSpeed) {
  console.log('Normalized Scroll Speed:', scrollSpeed);
});

// -------- MAIN LOOP -------- //
// var circle;
setInterval(function(){
  if(currentEvent){
    var mouseX=(currentEvent.clientX);
    var mouseY=(currentEvent.clientY);
    accelerate_towards(mouseX, mouseY);
    set_keyframes();
    keyframeX = (keyframeX - 1)*1.2 + 1;
    keyframeY = (keyframeY - 1)*1.2 + 1;
  }
  else if(scrollSpeed){
    accelerate_towards(centreX - scrollSpeed*(centreX*0.3), centreY + scrollSpeed*(centreY))
    set_keyframes();
    if (scrollEnded){
      scrollSpeed = scrollSpeed*0.01;
    }
    keyframeX = (keyframeX - 1)*1.75 + 1;
    keyframeY = (keyframeY - 1)*1.75 + 1;
  }

  black_gradient.setAttribute("cx", get_keyframed_value(0.6, -0.1, keyframeX));
  black_gradient.setAttribute("cy", get_keyframed_value(0.6, -0.2, keyframeY));

  darkpink_gradient.setAttribute("cx", get_keyframed_value(0.6, -0.1, keyframeX));
  darkpink_gradient.setAttribute("cy", get_keyframed_value(0.4, -0.2, keyframeY));

  pink_gradient.setAttribute("x1", get_keyframed_value(10, 10, keyframeX) + "%");
  pink_gradient.setAttribute("y1", get_keyframed_value(100, -5, keyframeX) + "%");
  pink_gradient.setAttribute("x2", get_keyframed_value(100, 5, keyframeX) + "%");
  pink_gradient.setAttribute("y2", get_keyframed_value(0, -5, keyframeX) + "%");

  let rotationX = get_keyframed_value(0, -8, keyframeX) + "deg";
  let rotationY = get_keyframed_value(-0, 7.5, keyframeY) + "deg";
  // document.title = `KeyframeX: ${keyframeX.toFixed(2)}, KeyframeY: ${keyframeY.toFixed(2)}`;
  let translationX = get_keyframed_value(0., 0.5, keyframeX) + "%";
  let translationY = get_keyframed_value(0., 0.5, keyframeY) + "%";
  var svg_rotator = document.getElementById('svg-rotator');
  svg_rotator.style.transform = `rotateX(${rotationY}) rotateY(${rotationX}) translateX(${translationX}) translateY(${translationY})`;
  black_path.setAttribute('d', `M1034,366c35.5-54.894,62.83-131.321,34-185-42.55-79.227-252.733-142.207-517.087-23C269,285.116,${get_keyframed_value(206, -20, keyframeX)},${get_keyframed_value(475, -0, keyframeY)},${get_keyframed_value(299, -15, keyframeX)},${get_keyframed_value(544, -5, keyframeY)}c82.946,66.043,364.329,145.659,${get_keyframed_value(663, -7, keyframeX)},${get_keyframed_value(283, -15, keyframeY)},291.081,131.651,351.751,263.87,377.721,323.73,25.19,58.08,15.73,210.66${get_keyframed_value(-251, 15, keyframeX)},${get_keyframed_value(244, +10, keyframeY)}-281.67,35.34-428.145-31.29-568.769-91.36C380.3,1242.5,135.822,1068.23,200.539,937.684c22.031-44.44,162.2-78.073,162.2-78.073S-6.819,747.32,22.271,597.628C-8.014,706.162-5.483,791,${get_keyframed_value(46, 0, keyframeX)},${get_keyframed_value(917, -10, keyframeY)}c107.977,261.668,401.817,401.038,539.353,452.9,144.976,54.68,363.9,72.5,${get_keyframed_value(566, -15, keyframeX)},${get_keyframed_value(52, -10, keyframeY)},181.07-17.84,280.68-156.89,${get_keyframed_value(265, -5, keyframeX)},${get_keyframed_value(-246, -10, keyframeY)}-14.67-86.23-155.94-285.966${get_keyframed_value(-482, -5, keyframeX)}${get_keyframed_value(-417, 10, keyframeY)}-338.391-137.644-513.57${get_keyframed_value(-240, 10, keyframeY)}${get_keyframed_value(-552, 10, keyframeX)},${get_keyframed_value(-285, 20, keyframeY)}-37-43.08-85.188-130.385,159.836-262.9C773.258,87.064,902.781,136.941,968.4,177.612c74.975,46.471,36.675,132.184-14.524,184.764C951.191,361.005,1007.52,406.869,1034,366ZM856.987,381.907`)
  pink_path.setAttribute('d', `M920.588,705.98A54.237,54.237,0,0,1,914,712c-68.941,54-99.809,76.651-132.779,99.385C634.878,915.185,499.363,994.707,476,1030c-28.209,42.61-106.167,144.21,129.6,261.4C263.32,1128.82,369.312,985.81,457.289,928.863c95-61.489,116.511-42.622,375.256-232.986,278.105-204.6,395.345-396.479,375.6-492.215-13.26-64.248-26.78-166.524-214.247-193.184C1111.79,26.143,1208.58,58.147,1242.6,154,1286.54,277.791,1215.4,465.893,920.588,705.98Zm73.305-695.5Q984.039,9.168,974,8,984.268,9.1,993.893,10.478Zm49.277,343.71C1000.81,422.852,929.154,494.2,851.246,558.347a1242.69,1242.69,0,0,1-136.46,101.785C678.145,684.989,643.068,706.965,612,725q-10.55,6.124-20.336,11.327C367.933,870.63,190.273,946.409,60,837,10.866,791.141-9.5,730.015,16.832,617.288,10.135,808.95,317.468,785.519,463,719q29.888-13.66,58.881-28.2C623.955,637.205,753,552.521,854.058,463.538,860.041,458.1,866.022,452.605,872,447c36.433-34.16,67.221-66.947,91.847-97.613C1000.33,301.726,1021.65,256.166,1019,217,1008.54,62.388,731,102,731,102s96.054-19,183-4C1079.18,126.489,1123.42,205.462,1043.17,354.188ZM1591,603m77,385`)
}, dt);
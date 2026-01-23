// Physics constants
const DT = 25;
const CLIP_DISTANCE = DT * DT;
const K_OVER_M = 0.00012;
const C_OVER_M = 0.04;
const MAX_SPEED = 8.0;

// State
let targetX, targetY;
let posX, posY, velX, velY;
let keyframeX = 1, keyframeY = 1;
let centreX, centreY;

// Input state
let hasPointerInput = false;
let useGyroscope = false;
let isSecureContext = window.isSecureContext;

// Cached DOM elements
let blackGradient, darkpinkGradient, pinkGradient;
let blackPath, pinkPath;
let svgRotator;

function setVisualCentre() {
  centreX = window.innerWidth / 2;
  centreY = window.innerHeight / 2;
}

function saturate(val, maxVal) {
  return Math.min(Math.abs(val), maxVal) * Math.sign(val);
}

function accelerateTowards(tX, tY) {
  const dx = tX - posX;
  const dy = tY - posY;

  if (dx * dx + dy * dy < CLIP_DISTANCE) {
    posX = tX;
    posY = tY;
    velX = 0;
    velY = 0;
  } else {
    velX = saturate(velX + (-C_OVER_M * velX + K_OVER_M * dx) * DT, MAX_SPEED);
    velY = saturate(velY + (-C_OVER_M * velY + K_OVER_M * dy) * DT, MAX_SPEED);
    posX += velX * DT;
    posY += velY * DT;
  }
}

function getKeyframedValue(mean, variation, keyframe) {
  return mean + (keyframe - 1) * variation;
}

// Detect if this is a touch-primary device
function isTouchPrimary() {
  return window.matchMedia('(pointer: coarse)').matches;
}

// Gyroscope handling for mobile (only works on HTTPS)
let gyroPermissionRequested = false;

function initGyroscope() {
  if (!isTouchPrimary()) return;
  if (!isSecureContext) return; // Gyroscope requires HTTPS
  if (!('DeviceOrientationEvent' in window)) return;

  // iOS 13+ requires permission - must be triggered by user gesture
  if (typeof DeviceOrientationEvent.requestPermission === 'function') {
    // Try enabling immediately - works if permission was already granted
    enableGyroscope();

    // Also set up gesture-based permission request as fallback for first-time visitors
    const requestPermission = () => {
      if (gyroPermissionRequested) return;
      gyroPermissionRequested = true;

      DeviceOrientationEvent.requestPermission()
        .then(state => {
          if (state === 'granted') {
            enableGyroscope();
          }
        })
        .catch(() => {
          gyroPermissionRequested = false; // Allow retry on error
        });
    };

    // Listen on multiple events to catch user interaction
    document.addEventListener('touchstart', requestPermission, { once: true, passive: true });
    document.addEventListener('touchend', requestPermission, { once: true, passive: true });
    document.addEventListener('click', requestPermission, { once: true, passive: true });
  } else {
    // Android and other devices - just enable directly
    enableGyroscope();
  }
}

// Gyroscope calibration
let gyroBaselineBeta = null;
let gyroBaselineGamma = null;
const GYRO_DRIFT_RATE_MIN = 0.0008;  // Slower recentering at low tilt
const GYRO_DRIFT_RATE_MAX = 0.25;   // Faster recentering at high tilt
let gyroRafId = null;
let latestBeta = null, latestGamma = null;

function enableGyroscope() {
  window.addEventListener('deviceorientation', handleOrientation, { passive: true });
}

function handleOrientation(event) {
  if (event.beta === null || event.gamma === null) return;

  // Adjust axes based on screen orientation
  const orientation = screen.orientation?.angle ?? window.orientation ?? 0;
  let beta, gamma;

  if (orientation === 90) {
    beta = event.gamma;
    gamma = -event.beta;
  } else if (orientation === -90 || orientation === 270) {
    beta = -event.gamma;
    gamma = event.beta;
  } else if (orientation === 180) {
    beta = -event.beta;
    gamma = -event.gamma;
  } else {
    beta = event.beta;
    gamma = event.gamma;
  }

  latestBeta = beta;
  latestGamma = gamma;

  // Throttle with RAF for smoother rendering
  if (!gyroRafId) {
    gyroRafId = requestAnimationFrame(() => {
      // Calibrate on first reading
      if (gyroBaselineBeta === null) {
        gyroBaselineBeta = latestBeta;
        gyroBaselineGamma = latestGamma;
      }

      useGyroscope = true;

      // Calculate relative tilt from baseline
      const relativeBeta = latestBeta - gyroBaselineBeta;
      const relativeGamma = latestGamma - gyroBaselineGamma;

      // Adaptive drift rate: very slow at low tilt, fast at high tilt
      const maxTilt = Math.max(Math.abs(relativeBeta), Math.abs(relativeGamma));
      const tiltFactor = Math.min(1, maxTilt / 30);  // Threshold lowered to 30 degrees
      // Cubic curve for steeper transition - stays slow longer, then ramps up fast
      const driftRate = GYRO_DRIFT_RATE_MIN + tiltFactor * tiltFactor * tiltFactor * (GYRO_DRIFT_RATE_MAX - GYRO_DRIFT_RATE_MIN);

      // Drift baseline toward current orientation
      gyroBaselineBeta += (latestBeta - gyroBaselineBeta) * driftRate;
      gyroBaselineGamma += (latestGamma - gyroBaselineGamma) * driftRate;

      const tiltX = Math.max(-30, Math.min(30, relativeGamma));
      const tiltY = Math.max(-30, Math.min(30, relativeBeta));

      targetX = centreX + (tiltX / 30) * centreX * 1.5;
      targetY = centreY + (tiltY / 30) * centreY * 1.25;

      gyroRafId = null;
    });
  }
}

// Scroll handling - works on all devices
function initScrollTracking() {
  let lastScrollTop = window.scrollY || 0;
  let scrollVelocity = 0;
  let scrollEndTimeoutId;
  let isScrolling = false;

  function handleScroll() {
    // Don't use scroll if gyroscope is active
    if (useGyroscope) return;
    isScrolling = true;

    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const distance = scrollTop - lastScrollTop;

    // Accumulate velocity with momentum
    scrollVelocity = scrollVelocity * 0.6 + distance * 0.4;

    // Clamp and normalize - mobile gets bigger effect
    const maxVel = isTouchPrimary() ? 80 : 50;
    const clampedVel = Math.max(-maxVel, Math.min(maxVel, scrollVelocity));
    const normalizedSpeed = clampedVel / maxVel;

    // Much more pronounced movement on mobile
    const multiplier = isTouchPrimary() ? 2.5 : 1.0;

    targetX = centreX - normalizedSpeed * centreX * 0.5 * multiplier;
    targetY = centreY + normalizedSpeed * centreY * multiplier;

    lastScrollTop = scrollTop;

    clearTimeout(scrollEndTimeoutId);
    scrollEndTimeoutId = setTimeout(() => {
      isScrolling = false;
      scrollVelocity = 0;
      if (!hasPointerInput && !useGyroscope) {
        targetX = centreX;
        targetY = centreY;
      }
    }, 200);
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
}

// Touch/mouse handling
function initPointerTracking() {
  const logoElem = document.getElementById('logo-s');

  // For touch devices, track touch anywhere on the page
  if (isTouchPrimary()) {
    let touchStartX, touchStartY;
    let logoStartX, logoStartY;

    document.addEventListener('touchstart', (e) => {
      // Don't track touch if gyroscope is active
      if (useGyroscope) return;
      const touch = e.touches[0];
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
      logoStartX = posX;
      logoStartY = posY;
      hasPointerInput = true;
    }, { passive: true });

    document.addEventListener('touchmove', (e) => {
      if (!hasPointerInput || useGyroscope) return;
      const touch = e.touches[0];
      const deltaX = touch.clientX - touchStartX;
      const deltaY = touch.clientY - touchStartY;

      // Scale the movement for more pronounced effect
      targetX = logoStartX + deltaX * 3;
      targetY = logoStartY + deltaY * 3;
    }, { passive: true });

    document.addEventListener('touchend', () => {
      hasPointerInput = false;
      // Only reset to center if gyroscope isn't controlling
      if (!useGyroscope) {
        targetX = centreX;
        targetY = centreY;
      }
    }, { passive: true });
  }

  // Mouse tracking (desktop)
  if (!isTouchPrimary()) {
    document.documentElement.addEventListener('mousemove', (event) => {
      hasPointerInput = true;
      targetX = event.clientX;
      targetY = event.clientY;
    }, { passive: true });
  }
}

function init() {
  setVisualCentre();
  posX = centreX;
  posY = centreY;
  targetX = centreX;
  targetY = centreY;
  velX = 0;
  velY = 0;

  // Cache DOM elements
  blackGradient = document.getElementById('black-gradient');
  darkpinkGradient = document.getElementById('darkpink-gradient');
  pinkGradient = document.getElementById('pink-gradient');
  blackPath = document.getElementById('black-path');
  pinkPath = document.getElementById('pink-path');
  svgRotator = document.getElementById('svg-rotator');

  // Fade logo in
  const logoElem = document.getElementById('logo-s');
  if (logoElem) {
    logoElem.style.opacity = 0;
    logoElem.style.transition = 'opacity 0.7s ease';
    requestAnimationFrame(() => {
      logoElem.style.opacity = 1;
    });
  }

  // Initialize input handlers
  initPointerTracking();
  initScrollTracking();
  initGyroscope();

  // Start animation loop
  if (blackGradient && svgRotator) {
    requestAnimationFrame(animate);
  }
}

let lastTime = 0;

function animate(timestamp) {
  if (timestamp - lastTime < DT) {
    requestAnimationFrame(animate);
    return;
  }
  lastTime = timestamp;

  // Physics update
  accelerateTowards(targetX, targetY);

  // Calculate keyframes
  keyframeX = posX / centreX;
  keyframeY = posY / centreY;

  // Amplify effect - stronger on mobile
  const amplify = isTouchPrimary() ? 2.5 : 1.2;
  const kfX = (keyframeX - 1) * amplify + 1;
  const kfY = (keyframeY - 1) * amplify + 1;

  // Update gradients
  blackGradient.setAttribute('cx', getKeyframedValue(0.6, -0.08, kfX));
  blackGradient.setAttribute('cy', getKeyframedValue(0.6, -0.16, kfY));

  darkpinkGradient.setAttribute('cx', getKeyframedValue(0.6, -0.12, kfX));
  darkpinkGradient.setAttribute('cy', getKeyframedValue(0.4, -0.24, kfY));

  pinkGradient.setAttribute('x1', getKeyframedValue(10, 14, kfX) + '%');
  pinkGradient.setAttribute('y1', getKeyframedValue(100, -7, kfX) + '%');
  pinkGradient.setAttribute('x2', getKeyframedValue(100, 7, kfX) + '%');
  pinkGradient.setAttribute('y2', getKeyframedValue(0, -7, kfX) + '%');

  // Update transform - rotation is more pronounced on desktop
  const rotationAmount = isTouchPrimary() ? 3 : 5;
  const rotationX = getKeyframedValue(0, -rotationAmount, kfX) + 'deg';
  const rotationY = getKeyframedValue(0, rotationAmount, kfY) + 'deg';
  const translationX = getKeyframedValue(0, 0.2, kfX) + '%';
  const translationY = getKeyframedValue(0, 0.2, kfY) + '%';
  svgRotator.style.transform = `rotateX(${rotationY}) rotateY(${rotationX}) translateX(${translationX}) translateY(${translationY})`;

  // Update SVG paths
  blackPath.setAttribute('d', `M1034,366c35.5-54.894,62.83-131.321,34-185-42.55-79.227-252.733-142.207-517.087-23C269,285.116,${getKeyframedValue(206, -16, kfX)},${getKeyframedValue(475, 0, kfY)},${getKeyframedValue(299, -12, kfX)},${getKeyframedValue(544, -4, kfY)}c82.946,66.043,364.329,145.659,${getKeyframedValue(663, -5, kfX)},${getKeyframedValue(283, -12, kfY)},291.081,131.651,351.751,263.87,377.721,323.73,25.19,58.08,15.73,210.66${getKeyframedValue(-251, 12, kfX)},${getKeyframedValue(244, 8, kfY)}-281.67,35.34-428.145-31.29-568.769-91.36C380.3,1242.5,135.822,1068.23,200.539,937.684c22.031-44.44,162.2-78.073,162.2-78.073S-6.819,747.32,22.271,597.628C-8.014,706.162-5.483,791,${getKeyframedValue(46, 0, kfX)},${getKeyframedValue(917, -8, kfY)}c107.977,261.668,401.817,401.038,539.353,452.9,144.976,54.68,363.9,72.5,${getKeyframedValue(566, -12, kfX)},${getKeyframedValue(52, -8, kfY)},181.07-17.84,280.68-156.89,${getKeyframedValue(265, -4, kfX)},${getKeyframedValue(-246, -8, kfY)}-14.67-86.23-155.94-285.966${getKeyframedValue(-482, -4, kfX)}${getKeyframedValue(-417, 8, kfY)}-338.391-137.644-513.57${getKeyframedValue(-240, 8, kfY)}${getKeyframedValue(-552, 8, kfX)},${getKeyframedValue(-285, 16, kfY)}-37-43.08-85.188-130.385,159.836-262.9C773.258,87.064,902.781,136.941,968.4,177.612c74.975,46.471,36.675,132.184-14.524,184.764C951.191,361.005,1007.52,406.869,1034,366ZM856.987,381.907`);

  pinkPath.setAttribute('d', `M920.588,705.98A54.237,54.237,0,0,1,914,712c-68.941,54-99.809,76.651-132.779,99.385C634.878,915.185,499.363,994.707,476,1030c-28.209,42.61-106.167,144.21,129.6,261.4C263.32,1128.82,369.312,985.81,457.289,928.863c95-61.489,116.511-42.622,375.256-232.986,278.105-204.6,395.345-396.479,375.6-492.215-13.26-64.248-26.78-166.524-214.247-193.184C1111.79,26.143,1208.58,58.147,1242.6,154,1286.54,277.791,1215.4,465.893,920.588,705.98Zm73.305-695.5Q984.039,9.168,974,8,984.268,9.1,993.893,10.478Zm49.277,343.71C1000.81,422.852,929.154,494.2,851.246,558.347a1242.69,1242.69,0,0,1-136.46,101.785C678.145,684.989,643.068,706.965,612,725q-10.55,6.124-20.336,11.327C367.933,870.63,190.273,946.409,60,837,10.866,791.141-9.5,730.015,16.832,617.288,10.135,808.95,317.468,785.519,463,719q29.888-13.66,58.881-28.2C623.955,637.205,753,552.521,854.058,463.538,860.041,458.1,866.022,452.605,872,447c36.433-34.16,67.221-66.947,91.847-97.613C1000.33,301.726,1021.65,256.166,1019,217,1008.54,62.388,731,102,731,102s96.054-19,183-4C1079.18,126.489,1123.42,205.462,1043.17,354.188ZM1591,603m77,385`);

  requestAnimationFrame(animate);
}

// Initialize
window.addEventListener('load', init);
window.addEventListener('resize', setVisualCentre);

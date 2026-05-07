// =====================================================
// UNIFICTIONAL · main.js
// Hero/BG: scroll-driven morphing particle system
//   sphere → torus → 3 spheres → cube grid → galaxy
// Tier I:  floating website panes
// Tier II: lead funnel (most prominent)
// Tier III: orbital growth system
// =====================================================
import * as THREE from 'three';

// Device detection — mobile/touch gets a lighter scene + skips cursor & tilt
const IS_TOUCH = window.matchMedia('(hover: none)').matches ||
                 window.matchMedia('(pointer: coarse)').matches;
const IS_SMALL = window.matchMedia('(max-width: 900px)').matches;
const MOBILE_LIKE = IS_TOUCH || IS_SMALL;

// =========================================
// LOADER
// =========================================
const loaderEl = document.getElementById('loader');
const loaderFill = document.getElementById('loader-fill');
const loaderPct = document.getElementById('loader-pct');
let loaderProgress = 0;

function tickLoader() {
  loaderProgress = Math.min(100, loaderProgress + (100 - loaderProgress) * 0.04 + 0.4);
  loaderFill.style.transform = `scaleX(${loaderProgress / 100})`;
  loaderPct.textContent = String(Math.floor(loaderProgress)).padStart(3, '0');
  if (loaderProgress < 99.5) {
    requestAnimationFrame(tickLoader);
  } else {
    setTimeout(() => loaderEl.classList.add('is-done'), 500);
  }
}
requestAnimationFrame(tickLoader);

// =========================================
// CURSOR
// =========================================
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursor-dot');
let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
let cursorPos = { x: mouse.x, y: mouse.y };
let dotPos = { x: mouse.x, y: mouse.y };
let mouseN = { x: 0, y: 0 };

window.addEventListener('mousemove', e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  mouseN.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouseN.y = -((e.clientY / window.innerHeight) * 2 - 1);
});
function tickCursor() {
  cursorPos.x += (mouse.x - cursorPos.x) * 0.16;
  cursorPos.y += (mouse.y - cursorPos.y) * 0.16;
  dotPos.x += (mouse.x - dotPos.x) * 0.4;
  dotPos.y += (mouse.y - dotPos.y) * 0.4;
  cursor.style.transform = `translate(${cursorPos.x}px, ${cursorPos.y}px) translate(-50%, -50%)`;
  cursorDot.style.transform = `translate(${dotPos.x}px, ${dotPos.y}px) translate(-50%, -50%)`;
  requestAnimationFrame(tickCursor);
}
requestAnimationFrame(tickCursor);

if (!MOBILE_LIKE) {
  document.querySelectorAll('a, button, [data-link]').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('is-link'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('is-link'));
  });
  document.querySelectorAll('input, textarea, select').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('is-text'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('is-text'));
  });
}

document.querySelectorAll('.platform-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
    card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
  });
});

// Showcase grid tilt — lerps toward mouse position for a 3D-tunnel feel.
// Skipped on mobile (no mouse + the CSS already disables the perspective).
const showcaseGrid = document.querySelector('.showcase-grid');
const showcaseTilt = { x: 0, y: 0 };
function tickShowcase() {
  if (showcaseGrid && !MOBILE_LIKE) {
    showcaseTilt.x += (mouseN.x * 7 - showcaseTilt.x) * 0.05;
    showcaseTilt.y += (-mouseN.y * 5 - showcaseTilt.y) * 0.05;
    showcaseGrid.style.transform =
      `rotateY(${showcaseTilt.x.toFixed(2)}deg) rotateX(${showcaseTilt.y.toFixed(2)}deg)`;
  }
  requestAnimationFrame(tickShowcase);
}
if (!MOBILE_LIKE) requestAnimationFrame(tickShowcase);

// =========================================
// MAIN BG SCENE — MORPHING PARTICLE SYSTEM
// =========================================
const canvas = document.getElementById('bg-canvas');
const renderer = new THREE.WebGLRenderer({
  canvas, antialias: true, alpha: true, powerPreference: 'high-performance',
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, MOBILE_LIKE ? 1.5 : 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 200);
camera.position.set(0, 0, 7.5);

// ---------- PARTICLE SHAPE GENERATORS ----------
// Phones get a much lighter system — 200k grains tank battery and frame rate.
const N = MOBILE_LIKE ? 28000 : 200000;

const shape0 = new Float32Array(N * 3);  // SPHERE      (hero)
const shape1 = new Float32Array(N * 3);  // TORUS       (platform)
const shape2 = new Float32Array(N * 3);  // 3 SPHERES   (pricing)
const shape3 = new Float32Array(N * 3);  // CUBE GRID   (trust)
const shape4 = new Float32Array(N * 3);  // GALAXY      (testimonial / contact)
const aRand = new Float32Array(N);
const aSize = new Float32Array(N);
const aTone = new Float32Array(N);

function rand() { return Math.random(); }
function randn() { return (Math.random() + Math.random() + Math.random() + Math.random()) / 4 - 0.5; }

// Scene geometry — a small property: house + porch + yard + trees + fence
const SCENE = (() => {
  const hW = 2.4, hD = 1.6, hH = 1.3, hRH = 0.85;
  const Y_GROUND = -0.7;
  const Y_BASE   = Y_GROUND + 0.05;        // foundation top
  const Y_TOP    = Y_BASE + hH;             // eave height
  const Y_PEAK   = Y_TOP + hRH;             // roof peak
  // Surface areas — used to weight wall sampling
  const aFront = hW * hH;
  const aSide  = hD * hH;
  const wallTotal = 2 * aFront + 2 * aSide;
  // Trees scattered around the yard
  const trees = [
    { x: -2.05, z:  1.20, th: 0.95, fr: 0.55 },  // front-left
    { x:  2.00, z:  1.40, th: 1.05, fr: 0.60 },  // front-right
    { x: -2.30, z: -1.50, th: 1.30, fr: 0.72 },  // back-left (taller)
    { x:  2.30, z: -1.70, th: 1.45, fr: 0.65 },  // back-right (tallest)
  ];
  // Bushes flanking the house
  const bushes = [
    { x: -1.55, z: 1.00, r: 0.22 },
    { x: -1.80, z: 1.30, r: 0.18 },
    { x:  1.55, z: 1.00, r: 0.22 },
    { x:  1.80, z: 1.30, r: 0.18 },
  ];
  return {
    hW, hD, hH, hRH,
    Y_GROUND, Y_BASE, Y_TOP, Y_PEAK,
    aFront, aSide, wallTotal,
    trees, bushes,
  };
})();

// 12 cube edges for shape3
const cubeEdges = (() => {
  const s = 1.6;
  const v = [
    [-s, -s, -s], [ s, -s, -s], [ s,  s, -s], [-s,  s, -s],
    [-s, -s,  s], [ s, -s,  s], [ s,  s,  s], [-s,  s,  s],
  ];
  const E = [];
  // bottom
  E.push([v[0], v[1]]); E.push([v[1], v[2]]); E.push([v[2], v[3]]); E.push([v[3], v[0]]);
  // top
  E.push([v[4], v[5]]); E.push([v[5], v[6]]); E.push([v[6], v[7]]); E.push([v[7], v[4]]);
  // verticals
  E.push([v[0], v[4]]); E.push([v[1], v[5]]); E.push([v[2], v[6]]); E.push([v[3], v[7]]);
  // diagonals on faces (gives more texture than just edges)
  E.push([v[0], v[6]]); E.push([v[3], v[5]]); E.push([v[1], v[7]]); E.push([v[2], v[4]]);
  return E;
})();

const TIER_CENTERS = [
  [-2.6, 0, 0],
  [ 0.0, 0, 0.3],   // featured tier slightly forward + bigger
  [ 2.6, 0, 0],
];
const TIER_RADII = [0.7, 0.95, 0.7];

for (let i = 0; i < N; i++) {
  // ---- shape0: FULL SCENE (house + porch + yard + trees + fence) ----
  {
    const S = SCENE;
    const { hW, hD, hH, hRH, Y_GROUND, Y_BASE, Y_TOP, Y_PEAK } = S;
    const r = rand();
    let hx, hy, hz;

    if (r < 0.15) {
      // ── House walls (4 walls weighted by area) ──
      const wr = rand() * S.wallTotal;
      if (wr < S.aFront) {
        hx = (rand() - 0.5) * hW; hy = Y_BASE + rand() * hH; hz = hD / 2;
      } else if (wr < 2 * S.aFront) {
        hx = (rand() - 0.5) * hW; hy = Y_BASE + rand() * hH; hz = -hD / 2;
      } else if (wr < 2 * S.aFront + S.aSide) {
        hx = -hW / 2; hy = Y_BASE + rand() * hH; hz = (rand() - 0.5) * hD;
      } else {
        hx =  hW / 2; hy = Y_BASE + rand() * hH; hz = (rand() - 0.5) * hD;
      }
    } else if (r < 0.22) {
      // ── Pitched roof slopes (front + back) ──
      const u = (rand() - 0.5) * hW;
      const v = rand();
      const sign = rand() < 0.5 ? 1 : -1;
      hx = u; hy = Y_TOP + v * hRH; hz = sign * (hD / 2) * (1 - v);
    } else if (r < 0.24) {
      // ── Gable triangles (left + right) ──
      let a = rand(), b = rand();
      if (a + b > 1) { a = 1 - a; b = 1 - b; }
      const c = 1 - a - b;
      hx = (rand() < 0.5 ? -1 : 1) * hW / 2;
      hy = a * Y_TOP + b * Y_TOP + c * Y_PEAK;
      hz = a * (-hD / 2) + b * (hD / 2);
    } else if (r < 0.275) {
      // ── Door + windows on front wall ──
      const sub = rand();
      if (sub < 0.42) {
        // Door (rectangle just outside front wall)
        hx = (rand() - 0.5) * 0.45;
        hy = Y_BASE + rand() * 0.85;
      } else if (sub < 0.71) {
        // Left window
        hx = -0.7 + (rand() - 0.5) * 0.32;
        hy = 0.05 + (rand() - 0.5) * 0.32;
      } else {
        // Right window
        hx =  0.7 + (rand() - 0.5) * 0.32;
        hy = 0.05 + (rand() - 0.5) * 0.32;
      }
      hz = hD / 2 + 0.008;
    } else if (r < 0.29) {
      // ── Chimney (small box on roof) ──
      const cX = 0.65, cZ = 0.18, cBaseY = Y_PEAK - 0.15, cH = 0.55, cW = 0.16;
      const f = rand();
      if (f < 0.25) {
        hx = cX + (rand() - 0.5) * cW; hy = cBaseY + rand() * cH; hz = cZ + cW / 2;
      } else if (f < 0.5) {
        hx = cX + (rand() - 0.5) * cW; hy = cBaseY + rand() * cH; hz = cZ - cW / 2;
      } else if (f < 0.75) {
        hx = cX - cW / 2; hy = cBaseY + rand() * cH; hz = cZ + (rand() - 0.5) * cW;
      } else {
        hx = cX + cW / 2; hy = cBaseY + rand() * cH; hz = cZ + (rand() - 0.5) * cW;
      }
    } else if (r < 0.33) {
      // ── Porch deck (flat plane in front of house) ──
      hx = (rand() - 0.5) * 2.0;
      hy = Y_GROUND + 0.08;
      hz = hD / 2 + rand() * 0.7;
    } else if (r < 0.345) {
      // ── 4 porch posts (vertical lines) ──
      const w = Math.floor(rand() * 4);
      const px = w < 2 ? -0.95 : 0.95;
      const pz = (w % 2 === 0) ? hD / 2 + 0.05 : hD / 2 + 0.65;
      hx = px + (rand() - 0.5) * 0.04;
      hy = Y_GROUND + 0.08 + rand() * 0.95;
      hz = pz + (rand() - 0.5) * 0.04;
    } else if (r < 0.36) {
      // ── 3 stair steps ──
      const step = Math.floor(rand() * 3);
      hx = (rand() - 0.5) * 0.7;
      hy = Y_GROUND + 0.08 - step * 0.025;
      hz = hD / 2 + 0.7 + step * 0.06;
    } else if (r < 0.385) {
      // ── Front path (extends from steps outward) ──
      hx = (rand() - 0.5) * 0.55;
      hy = Y_GROUND + 0.005;
      hz = hD / 2 + 0.9 + rand() * 0.8;
    } else if (r < 0.685) {
      // ── Ground plane (skips house footprint) ──
      let gx, gz;
      do {
        gx = (rand() - 0.5) * 5.4;
        gz = -2.3 + rand() * 4.0;
      } while (Math.abs(gx) < hW / 2 - 0.05 && Math.abs(gz) < hD / 2 - 0.05);
      hx = gx;
      hy = Y_GROUND + (rand() - 0.5) * 0.012;
      hz = gz;
    } else if (r < 0.885) {
      // ── Trees (4, weighted equally) ──
      const T = S.trees[(rand() * 4) | 0];
      if (rand() < 0.72) {
        // Foliage sphere
        const phi   = Math.acos(1 - 2 * rand());
        const theta = rand() * Math.PI * 2;
        const fr    = T.fr * (0.85 + rand() * 0.18);
        hx = T.x + fr * Math.sin(phi) * Math.cos(theta);
        hy = Y_GROUND + T.th + fr * Math.cos(phi);
        hz = T.z + fr * Math.sin(phi) * Math.sin(theta);
      } else {
        // Trunk cylinder
        const ang = rand() * Math.PI * 2;
        const tr  = 0.07 + rand() * 0.03;
        hx = T.x + Math.cos(ang) * tr;
        hy = Y_GROUND + rand() * T.th;
        hz = T.z + Math.sin(ang) * tr;
      }
    } else if (r < 0.955) {
      // ── Back fence (posts + rails) ──
      const f = rand();
      if (f < 0.30) {
        // Vertical posts every 0.5 units
        const idx = Math.floor(rand() * 11);
        hx = -2.5 + idx * 0.5 + (rand() - 0.5) * 0.04;
        hy = Y_GROUND + rand() * 0.55;
        hz = -2.25 + (rand() - 0.5) * 0.04;
      } else if (f < 0.65) {
        hx = -2.5 + rand() * 5.0;
        hy = Y_GROUND + 0.5 + (rand() - 0.5) * 0.03;
        hz = -2.25 + (rand() - 0.5) * 0.04;
      } else {
        hx = -2.5 + rand() * 5.0;
        hy = Y_GROUND + 0.27 + (rand() - 0.5) * 0.03;
        hz = -2.25 + (rand() - 0.5) * 0.04;
      }
    } else if (r < 0.99) {
      // ── Bushes flanking the house ──
      const B = S.bushes[(rand() * S.bushes.length) | 0];
      const phi   = Math.acos(1 - 2 * rand());
      const theta = rand() * Math.PI * 2;
      const br    = B.r * (0.85 + rand() * 0.18);
      hx = B.x + br * Math.sin(phi) * Math.cos(theta);
      hy = Y_GROUND + B.r * 0.6 + br * Math.cos(phi) * 0.7;
      hz = B.z + br * Math.sin(phi) * Math.sin(theta);
    } else {
      // ── Garden border (line in front of bushes) ──
      hx = -1.0 + rand() * 2.0;
      hy = Y_GROUND + 0.05;
      hz = hD / 2 + 0.78 + (rand() - 0.5) * 0.04;
    }

    shape0[i * 3]     = hx + randn() * 0.008;
    shape0[i * 3 + 1] = hy + randn() * 0.008;
    shape0[i * 3 + 2] = hz + randn() * 0.008;
  }
  // ---- shape1: torus ----
  {
    const u = rand() * Math.PI * 2;
    const v = rand() * Math.PI * 2;
    const R = 1.95, tube = 0.55;
    const cx = (R + tube * Math.cos(v)) * Math.cos(u);
    const cy = tube * Math.sin(v);
    const cz = (R + tube * Math.cos(v)) * Math.sin(u);
    shape1[i * 3] = cx + randn() * 0.05;
    shape1[i * 3 + 1] = cy + randn() * 0.05;
    shape1[i * 3 + 2] = cz + randn() * 0.05;
  }
  // ---- shape2: three spheres (lined up like the pricing tiers) ----
  {
    const which = i % 3;
    const c = TIER_CENTERS[which];
    const rad = TIER_RADII[which];
    const phi = Math.acos(1 - 2 * rand());
    const theta = rand() * Math.PI * 2;
    const r = rad * (0.85 + randn() * 0.2);
    shape2[i * 3] = c[0] + r * Math.sin(phi) * Math.cos(theta);
    shape2[i * 3 + 1] = c[1] + r * Math.sin(phi) * Math.sin(theta);
    shape2[i * 3 + 2] = c[2] + r * Math.cos(phi);
  }
  // ---- shape3: cube wireframe + diagonals ----
  {
    const e = cubeEdges[i % cubeEdges.length];
    const t = rand();
    const j = randn() * 0.06;
    shape3[i * 3]     = e[0][0] * (1 - t) + e[1][0] * t + j;
    shape3[i * 3 + 1] = e[0][1] * (1 - t) + e[1][1] * t + randn() * 0.06;
    shape3[i * 3 + 2] = e[0][2] * (1 - t) + e[1][2] * t + randn() * 0.06;
  }
  // ---- shape4: spiral galaxy with 3 arms ----
  {
    const arm = i % 3;
    const t = Math.pow(rand(), 0.55);          // density toward center
    const radius = 0.25 + t * 2.6;
    const armOffset = arm * (Math.PI * 2 / 3);
    const angle = armOffset + t * Math.PI * 5.5 + randn() * 0.4;
    shape4[i * 3]     = Math.cos(angle) * radius + randn() * 0.05;
    shape4[i * 3 + 1] = randn() * 0.18 * (1 - t * 0.6);
    shape4[i * 3 + 2] = Math.sin(angle) * radius + randn() * 0.05;
  }

  aRand[i] = rand();
  aSize[i] = 0.4 + Math.pow(rand(), 3) * 0.5;       // tiny grains, very narrow range
  aTone[i] = rand();                                 // for color variation
}

const morphGeo = new THREE.BufferGeometry();
morphGeo.setAttribute('position', new THREE.BufferAttribute(shape0.slice(), 3)); // dummy
morphGeo.setAttribute('aShape0', new THREE.BufferAttribute(shape0, 3));
morphGeo.setAttribute('aShape1', new THREE.BufferAttribute(shape1, 3));
morphGeo.setAttribute('aShape2', new THREE.BufferAttribute(shape2, 3));
morphGeo.setAttribute('aShape3', new THREE.BufferAttribute(shape3, 3));
morphGeo.setAttribute('aShape4', new THREE.BufferAttribute(shape4, 3));
morphGeo.setAttribute('aRand',   new THREE.BufferAttribute(aRand, 1));
morphGeo.setAttribute('aSize',   new THREE.BufferAttribute(aSize, 1));
morphGeo.setAttribute('aTone',   new THREE.BufferAttribute(aTone, 1));

// ---------- SHADERS ----------
const morphVert = /* glsl */`
  attribute vec3 aShape0;
  attribute vec3 aShape1;
  attribute vec3 aShape2;
  attribute vec3 aShape3;
  attribute vec3 aShape4;
  attribute float aRand;
  attribute float aSize;
  attribute float aTone;

  uniform float uTime;
  uniform float uScrollT;     // 0..4 (4 transitions across 5 shapes)
  uniform float uPixelRatio;
  uniform vec2  uMouse;       // -1..1

  varying float vAlpha;
  varying float vTone;
  varying float vTransition; // 0..1 peak during a morph

  // smoothstep alias (already exists in glsl but cleaner names)
  float ease(float x) { return x * x * (3.0 - 2.0 * x); }

  void main() {
    float st = clamp(uScrollT, 0.0, 3.9999);
    float idx = floor(st);
    float k = clamp(st - idx, 0.0, 1.0);
    float ek = ease(k);

    vec3 a, b;
    if (idx < 0.5) { a = aShape0; b = aShape1; }
    else if (idx < 1.5) { a = aShape1; b = aShape2; }
    else if (idx < 2.5) { a = aShape2; b = aShape3; }
    else { a = aShape3; b = aShape4; }

    vec3 base = mix(a, b, ek);

    // Curl turbulence — peaks at the middle of a transition (k = 0.5)
    float bump = sin(k * 3.14159);
    vTransition = bump;
    vec3 swirl = vec3(
      sin(aRand * 12.9898 + uTime * 0.55),
      cos(aRand * 78.233  + uTime * 0.78),
      sin(aRand * 37.719  + uTime * 1.02)
    ) * bump * 0.55;

    // Always-on subtle breathing
    vec3 breath = vec3(
      sin(uTime * 0.4 + aRand * 6.283),
      cos(uTime * 0.35 + aRand * 4.5),
      sin(uTime * 0.5 + aRand * 3.14)
    ) * 0.025;

    vec3 pos = base + swirl + breath;

    // Mouse parallax — shift particles slightly opposite mouse
    pos.x += uMouse.x * 0.18 * (0.5 + aRand);
    pos.y += uMouse.y * 0.15 * (0.5 + aRand);

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;

    // Uniform 3-pixel dots regardless of depth.
    gl_PointSize = 3.0 * uPixelRatio;

    // Alpha falloff for distance from origin
    float dist = length(pos);
    vAlpha = smoothstep(5.0, 0.0, dist - 1.5) * 0.95;
    vTone = aTone;
  }
`;

const morphFrag = /* glsl */`
  varying float vAlpha;
  varying float vTone;
  varying float vTransition;

  uniform vec3 uColorDeep;
  uniform vec3 uColorGold;
  uniform vec3 uColorBright;
  uniform vec3 uColorCream;

  void main() {
    // Flat dot. No halo, no glow.
    vec2 uv = gl_PointCoord - 0.5;
    if (length(uv) > 0.5) discard;

    vec3 base = mix(uColorDeep, uColorGold, vTone);
    base = mix(base, uColorBright, smoothstep(0.7, 1.0, vTone));

    gl_FragColor = vec4(base, vAlpha);
  }
`;

const morphMat = new THREE.ShaderMaterial({
  uniforms: {
    uTime: { value: 0 },
    uScrollT: { value: 0 },
    uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
    uMouse: { value: new THREE.Vector2() },
    uColorDeep:   { value: new THREE.Color('#4a3c20') },
    uColorGold:   { value: new THREE.Color('#7a6535') },
    uColorBright: { value: new THREE.Color('#998055') },
    uColorCream:  { value: new THREE.Color('#7a6535') },
  },
  vertexShader: morphVert,
  fragmentShader: morphFrag,
  transparent: true,
  depthWrite: false,
  blending: THREE.NormalBlending,
});

const morphPoints = new THREE.Points(morphGeo, morphMat);
scene.add(morphPoints);

// =========================================
// TIER MINI-SCENES (unchanged from prior)
// =========================================
const tierCanvases = document.querySelectorAll('[data-tier-canvas]');
const tierScenes = [];

function buildTierWebsite() {
  const group = new THREE.Group();

  const frame = new THREE.Mesh(
    new THREE.PlaneGeometry(2.4, 1.6),
    new THREE.MeshBasicMaterial({
      color: 0xede5d0, transparent: true, opacity: 0.04, side: THREE.DoubleSide,
    })
  );
  group.add(frame);

  for (let i = 0; i < 3; i++) {
    const dot = new THREE.Mesh(
      new THREE.SphereGeometry(0.04, 8, 8),
      new THREE.MeshBasicMaterial({ color: 0xc9a961, transparent: true, opacity: 0.7 })
    );
    dot.position.set(-1.05 + i * 0.14, 0.65, 0.01);
    group.add(dot);
  }

  const header = new THREE.Mesh(
    new THREE.PlaneGeometry(2.4, 0.04),
    new THREE.MeshBasicMaterial({ color: 0xc9a961, transparent: true, opacity: 0.4 })
  );
  header.position.set(0, 0.5, 0.005);
  group.add(header);

  const blocks = [];
  const blockData = [
    { y: 0.32, w: 1.6, opacity: 0.6 },
    { y: 0.16, w: 2.0, opacity: 0.3 },
    { y: 0.02, w: 1.8, opacity: 0.3 },
    { y: -0.12, w: 1.2, opacity: 0.3 },
    { y: -0.34, w: 1.0, opacity: 0.7 },
  ];
  blockData.forEach((b, i) => {
    const m = new THREE.Mesh(
      new THREE.PlaneGeometry(b.w, 0.06),
      new THREE.MeshBasicMaterial({
        color: i === blockData.length - 1 ? 0xc9a961 : 0xede5d0,
        transparent: true,
        opacity: b.opacity,
      })
    );
    m.position.set(-1.2 + b.w / 2, b.y, 0.01 + i * 0.005);
    group.add(m);
    blocks.push(m);
  });

  const bubble = new THREE.Mesh(
    new THREE.CircleGeometry(0.18, 32),
    new THREE.MeshBasicMaterial({ color: 0xc9a961, transparent: true, opacity: 0.85 })
  );
  bubble.position.set(0.95, -0.55, 0.04);
  group.add(bubble);

  const borderGeo = new THREE.EdgesGeometry(new THREE.PlaneGeometry(2.45, 1.65));
  const border = new THREE.LineSegments(borderGeo, new THREE.LineBasicMaterial({
    color: 0xc9a961, transparent: true, opacity: 0.5,
  }));
  group.add(border);

  group.userData.bubble = bubble;
  group.userData.blocks = blocks;
  return group;
}

function buildTierFunnel() {
  const group = new THREE.Group();
  const ringCount = 14;
  const topR = 1.4, bottomR = 0.18, height = 2.2;
  const ringGroup = new THREE.Group();
  for (let i = 0; i < ringCount; i++) {
    const t = i / (ringCount - 1);
    const r = topR * (1 - t) + bottomR * t;
    const y = height / 2 - t * height;
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(r, 0.008, 12, 96),
      new THREE.MeshBasicMaterial({
        color: 0xc9a961, transparent: true, opacity: 0.5 - t * 0.2,
      })
    );
    ring.rotation.x = Math.PI / 2;
    ring.position.y = y;
    ringGroup.add(ring);
  }
  group.add(ringGroup);

  const spineGeo = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, height / 2, 0),
    new THREE.Vector3(0, -height / 2 - 0.4, 0),
  ]);
  const spine = new THREE.Line(spineGeo, new THREE.LineBasicMaterial({
    color: 0xc9a961, transparent: true, opacity: 0.18,
  }));
  group.add(spine);

  const fpCount = 90;
  const fpGeo = new THREE.BufferGeometry();
  const fpPos = new Float32Array(fpCount * 3);
  const fpProgress = new Float32Array(fpCount);
  const fpAngle = new Float32Array(fpCount);
  const fpRadius = new Float32Array(fpCount);
  for (let i = 0; i < fpCount; i++) {
    fpProgress[i] = Math.random();
    fpAngle[i] = Math.random() * Math.PI * 2;
    fpRadius[i] = Math.random();
  }
  fpGeo.setAttribute('position', new THREE.BufferAttribute(fpPos, 3));
  const fpMat = new THREE.PointsMaterial({
    color: 0xf0d294, size: 0.04, transparent: true, opacity: 0.95,
    blending: THREE.AdditiveBlending, depthWrite: false,
  });
  const fpPoints = new THREE.Points(fpGeo, fpMat);
  group.add(fpPoints);

  const collected = new THREE.Group();
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.06, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xe6c688, transparent: true, opacity: 0.9 })
    );
    sphere.position.set(Math.cos(angle) * 0.32, -height / 2 - 0.5, Math.sin(angle) * 0.32);
    collected.add(sphere);
  }
  group.add(collected);

  const collectorRing = new THREE.Mesh(
    new THREE.TorusGeometry(0.42, 0.005, 8, 64),
    new THREE.MeshBasicMaterial({ color: 0xe6c688, transparent: true, opacity: 0.6 })
  );
  collectorRing.rotation.x = Math.PI / 2;
  collectorRing.position.y = -height / 2 - 0.48;
  group.add(collectorRing);

  group.userData = { fpGeo, fpProgress, fpAngle, fpRadius, fpCount,
                     topR, bottomR, height, collected, ringGroup };
  return group;
}

function buildTierOrbital() {
  const group = new THREE.Group();
  const core = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.32, 1),
    new THREE.MeshBasicMaterial({ color: 0xf0d294 })
  );
  group.add(core);
  const wire = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.5, 1),
    new THREE.MeshBasicMaterial({ color: 0xc9a961, wireframe: true, transparent: true, opacity: 0.5 })
  );
  group.add(wire);

  const orbits = [];
  const orbitConfigs = [
    { r: 0.85, tilt: [0, 0, 0],                    satColor: 0xede5d0, satSize: 0.06 },
    { r: 1.15, tilt: [Math.PI / 2.5, 0, 0.4],      satColor: 0xc9a961, satSize: 0.07 },
    { r: 1.45, tilt: [Math.PI / 1.6, 0.3, 0],      satColor: 0xe6c688, satSize: 0.05 },
  ];
  orbitConfigs.forEach(cfg => {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(cfg.r, 0.004, 8, 96),
      new THREE.MeshBasicMaterial({ color: 0xc9a961, transparent: true, opacity: 0.35 })
    );
    ring.rotation.set(...cfg.tilt);
    group.add(ring);
    const sat = new THREE.Mesh(
      new THREE.SphereGeometry(cfg.satSize, 16, 16),
      new THREE.MeshBasicMaterial({ color: cfg.satColor })
    );
    group.add(sat);
    orbits.push({ ring, sat, ...cfg, phase: Math.random() * Math.PI * 2 });
  });

  const dustCount = 40;
  const dustGeo = new THREE.BufferGeometry();
  const dustPos = new Float32Array(dustCount * 3);
  for (let i = 0; i < dustCount; i++) {
    const r = 1.6 + Math.random() * 0.6;
    const phi = Math.random() * Math.PI * 2;
    const theta = (Math.random() - 0.5) * 0.8;
    dustPos[i * 3] = Math.cos(phi) * r * Math.cos(theta);
    dustPos[i * 3 + 1] = Math.sin(theta) * r;
    dustPos[i * 3 + 2] = Math.sin(phi) * r * Math.cos(theta);
  }
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
  const dust = new THREE.Points(dustGeo, new THREE.PointsMaterial({
    color: 0xc9a961, size: 0.025, transparent: true, opacity: 0.6,
    blending: THREE.AdditiveBlending, depthWrite: false,
  }));
  group.add(dust);

  group.userData = { core, wire, orbits, dust };
  return group;
}

const tierBuilders = [
  { build: buildTierWebsite, cameraZ: 3.6, name: 'website' },
  { build: buildTierFunnel,  cameraZ: 4.2, name: 'funnel' },
  { build: buildTierOrbital, cameraZ: 3.8, name: 'orbital' },
];

tierCanvases.forEach((cv, i) => {
  const r = new THREE.WebGLRenderer({ canvas: cv, antialias: true, alpha: true });
  r.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  const w = cv.parentElement.clientWidth;
  const h = cv.parentElement.clientHeight;
  r.setSize(w, h, false);
  const sc = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(38, w / h, 0.1, 50);
  const builder = tierBuilders[i];
  cam.position.set(0, 0, builder.cameraZ);
  const obj = builder.build();
  sc.add(obj);
  sc.add(new THREE.AmbientLight(0xffffff, 0.6));
  tierScenes.push({ r, sc, cam, obj, cv, kind: builder.name });
});

function resizeTierScenes() {
  tierScenes.forEach(({ r, cam, cv }) => {
    const w = cv.parentElement.clientWidth;
    const h = cv.parentElement.clientHeight;
    r.setSize(w, h, false);
    cam.aspect = w / h;
    cam.updateProjectionMatrix();
  });
}

// =========================================
// HERO WORD SPLIT + REVEAL
// =========================================
document.querySelectorAll('[data-split]').forEach(el => {
  const text = el.textContent;
  el.innerHTML = `<span class="word-inner" style="display:inline-block;transform:translateY(110%);transition:transform 1.6s var(--ease-luxe);">${text}</span>`;
});

const revealEls = document.querySelectorAll(
  '.section-head, .platform-card, .tier, .trust-item, .testimonial blockquote, .contact-inner, .hero-trust, .showcase-center'
);
revealEls.forEach(el => el.setAttribute('data-reveal', ''));

const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-revealed');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
revealEls.forEach(el => io.observe(el));

window.addEventListener('load', () => {
  setTimeout(() => {
    document.querySelectorAll('.word-inner').forEach((w, i) => {
      w.style.transitionDelay = (i * 80) + 'ms';
      w.style.transform = 'translateY(0)';
    });
    loaderProgress = 100;
  }, 600);
});

// =========================================
// FORM + LINKS
// =========================================
const form = document.getElementById('contact-form');
form.addEventListener('submit', e => {
  e.preventDefault();
  document.getElementById('form-success').classList.add('is-shown');
  form.reset();
});

document.querySelectorAll('[data-link]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    e.preventDefault();
    const tgt = document.querySelector(href);
    if (tgt) tgt.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// =========================================
// RESIZE
// =========================================
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  resizeTierScenes();
});

// =========================================
// SCROLL — section-anchored shape transitions
// =========================================
let scrollY = 0;

// Define the scroll anchors for each shape (top of each "phase").
// We compute these on load + on resize.
const phaseSections = ['#hero', '#platform', '#pricing', '#trust', '#contact'];
let phaseAnchors = []; // array of pixel-y values

function recomputeAnchors() {
  phaseAnchors = phaseSections.map(sel => {
    const el = document.querySelector(sel);
    if (!el) return 0;
    return el.offsetTop;
  });
}
window.addEventListener('load', recomputeAnchors);
window.addEventListener('resize', recomputeAnchors);
window.addEventListener('scroll', () => { scrollY = window.scrollY; });

// Map current scrollY to a continuous 0..4 value across the phaseAnchors.
// Each shape sits stable during its section; the morph only fires in the
// last `transitionWidth` pixels before the next section's anchor — so at
// scrollY=0 we get exactly 0.0 (pure house) and the user sees a clean shape.
function computeScrollT(y) {
  if (phaseAnchors.length < 2) return 0;
  const transitionWidth = window.innerHeight * 0.75;
  for (let i = 0; i < phaseAnchors.length - 1; i++) {
    const transitionEnd = phaseAnchors[i + 1];
    const transitionStart = transitionEnd - transitionWidth;
    if (y < transitionStart) return i;
    if (y < transitionEnd) {
      return i + (y - transitionStart) / transitionWidth;
    }
  }
  return phaseAnchors.length - 1;
}

// =========================================
// MAIN LOOP
// =========================================
const clock = new THREE.Clock();
let smoothedScrollT = 0;

function animate() {
  const t = clock.getElapsedTime();

  // ---- SCROLL → MORPH ----
  const targetT = computeScrollT(scrollY);
  smoothedScrollT += (targetT - smoothedScrollT) * 0.07;
  morphMat.uniforms.uScrollT.value = smoothedScrollT;
  morphMat.uniforms.uTime.value = t;
  morphMat.uniforms.uMouse.value.set(mouseN.x, mouseN.y);

  // Whole-system slow rotation, plus mouse parallax
  morphPoints.rotation.y = t * 0.04 + mouseN.x * 0.18;
  morphPoints.rotation.x = mouseN.y * 0.12;

  // Camera parallax
  camera.position.x += (mouseN.x * 0.2 - camera.position.x) * 0.03;
  camera.position.y += (mouseN.y * 0.15 - camera.position.y) * 0.03;
  camera.lookAt(0, 0, 0);

  // Centered for the whole page — house scene sits in the middle for the hero,
  // and the later shapes (torus, 3 spheres, cube, galaxy) stay centered too.
  const targetY = -0.3;  // slight downshift so the house+trees feel anchored, not floating
  // Centred horizontally on every device — the headline sits on top of
  // the scene rather than off to one side of it.
  morphPoints.position.x += (0 - morphPoints.position.x) * 0.06;
  morphPoints.position.y += (targetY - morphPoints.position.y) * 0.06;

  renderer.render(scene, camera);

  // ---- TIER SCENES ----
  tierScenes.forEach(({ r, sc, cam, obj, cv, kind }) => {
    const rect = cv.getBoundingClientRect();
    const visible = rect.bottom > -100 && rect.top < window.innerHeight + 100;
    if (!visible) return;

    if (kind === 'website') {
      obj.rotation.y = Math.sin(t * 0.4) * 0.18;
      obj.rotation.x = Math.cos(t * 0.3) * 0.08;
      const bubble = obj.userData.bubble;
      if (bubble) bubble.scale.setScalar(1 + Math.sin(t * 2.4) * 0.08);
      obj.userData.blocks.forEach((b, i) => {
        b.position.x = (-1.2 + b.geometry.parameters.width / 2) + Math.sin(t * 0.6 + i) * 0.02;
      });
    } else if (kind === 'funnel') {
      obj.rotation.y = t * 0.18;
      const ud = obj.userData;
      const positions = ud.fpGeo.attributes.position;
      for (let i = 0; i < ud.fpCount; i++) {
        ud.fpProgress[i] += 0.006 + ud.fpRadius[i] * 0.004;
        if (ud.fpProgress[i] > 1) ud.fpProgress[i] -= 1;
        const p = ud.fpProgress[i];
        const r = ud.topR * (1 - p) + ud.bottomR * p;
        const y = ud.height / 2 - p * ud.height;
        const angle = ud.fpAngle[i] + p * 4 + t * 0.4;
        const rad = r * (0.3 + ud.fpRadius[i] * 0.7);
        positions.setXYZ(i, Math.cos(angle) * rad, y, Math.sin(angle) * rad);
      }
      positions.needsUpdate = true;
      ud.collected.children.forEach((s, i) => {
        s.scale.setScalar(1 + Math.sin(t * 2.2 + i * 0.6) * 0.12);
      });
    } else if (kind === 'orbital') {
      const ud = obj.userData;
      ud.core.rotation.x = t * 0.4;
      ud.core.rotation.y = t * 0.55;
      ud.wire.rotation.x = -t * 0.3;
      ud.wire.rotation.y = -t * 0.2;
      ud.orbits.forEach((o, i) => {
        const speed = 0.6 - i * 0.15;
        const angle = o.phase + t * speed;
        const v = new THREE.Vector3(Math.cos(angle) * o.r, 0, Math.sin(angle) * o.r);
        v.applyEuler(new THREE.Euler(o.tilt[0], o.tilt[1], o.tilt[2]));
        o.sat.position.copy(v);
      });
      obj.rotation.y = t * 0.05;
      ud.dust.rotation.y = -t * 0.08;
    }
    r.render(sc, cam);
  });

  requestAnimationFrame(animate);
}
animate();

window.addEventListener('load', () => { resizeTierScenes(); recomputeAnchors(); });

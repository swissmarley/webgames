import * as THREE from "three";
import { extraTracks, addStageScenery } from "./stages.js";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
export const tracks = [
  {
    name: "Buccaneer Bay",
    cup: "THE PIRATE CUP",
    desc: "Salt in the air. Rivals in your rearview.",
    difficulty: "● ● ○  INTERMEDIATE",
    weather: "☀  CLEAR SKIES",
    sky: 0xa9dce6,
    fog: 0xb7dfe1,
    water: 0x249da4,
    ground: 0xe5cb87,
    road: 0x62777b,
    accent: 0xf3614c,
    theme: "pirate",
  },
  {
    name: "Sunstone Speedway",
    cup: "THE DESERT CUP",
    desc: "Golden dunes. Blistering competition.",
    difficulty: "● ○ ○  ROOKIE FRIENDLY",
    weather: "☀  GOLDEN HOUR",
    sky: 0xf0c8a0,
    fog: 0xe9c4a3,
    water: 0xc69164,
    ground: 0xdca96e,
    road: 0x9d7860,
    accent: 0x26a8a1,
    theme: "desert",
  },
  {
    name: "Lunar Launchpad",
    cup: "THE GALACTIC CUP",
    desc: "Low gravity. Sky-high ambitions.",
    difficulty: "● ● ●  EXPERT",
    weather: "✧  STARRY NIGHT",
    sky: 0x141f40,
    fog: 0x1e3256,
    water: 0x193252,
    ground: 0x53617a,
    road: 0x3d4c67,
    accent: 0x9d83ff,
    theme: "space",
  },
  ...extraTracks,
];
export const mat = (color, roughness = 0.54, metalness = 0) =>
  new THREE.MeshStandardMaterial({ color, roughness, metalness });
const sharedBox = new THREE.BoxGeometry(1, 1, 1),
  studGeo = new THREE.CylinderGeometry(0.2, 0.22, 0.13, 12),
  palette = new Map();
const M = (c) => {
  if (!palette.has(c)) palette.set(c, mat(c));
  return palette.get(c);
};
export function releaseModel(root) {
  const sharedMaterials = new Set(palette.values());
  const geometries = new Set(),
    materials = new Set(),
    textures = new Set();
  root.traverse((object) => {
    if (
      object.geometry &&
      object.geometry !== sharedBox &&
      object.geometry !== studGeo
    )
      geometries.add(object.geometry);
    const list = Array.isArray(object.material)
      ? object.material
      : [object.material];
    for (const material of list) {
      if (!material || sharedMaterials.has(material)) continue;
      materials.add(material);
      for (const value of Object.values(material))
        if (value?.isTexture) textures.add(value);
    }
  });
  geometries.forEach((geometry) => geometry.dispose());
  textures.forEach((texture) => texture.dispose());
  materials.forEach((material) => material.dispose());
}
export function box(parent, x, y, z, w, h, d, color, shadow = true) {
  const m = new THREE.Mesh(
    sharedBox,
    typeof color === "number" ? M(color) : color,
  );
  m.position.set(x, y, z);
  m.scale.set(w, h, d);
  m.castShadow = shadow;
  m.receiveShadow = true;
  parent.add(m);
  return m;
}
export function brick(parent, x, y, z, w, h, d, color, studs = true) {
  const m = box(parent, x, y, z, w, h, d, color);
  if (studs) {
    let nx = Math.max(1, Math.floor(w / 0.55)),
      nz = Math.max(1, Math.floor(d / 0.55));
    for (let a = 0; a < nx; a++)
      for (let b = 0; b < nz; b++) {
        let s = new THREE.Mesh(studGeo, M(color));
        s.position.set(
          x + (a - (nx - 1) / 2) * 0.55,
          y + h / 2 + 0.05,
          z + (b - (nz - 1) / 2) * 0.55,
        );
        s.castShadow = true;
        parent.add(s);
      }
  }
  return m;
}
function batchBricks(root, excluded = new Set()) {
  root.updateMatrixWorld(true);
  const batches = new Map();
  const items = [];
  root.traverse((o) => {
    if (!o.isMesh || (o.geometry !== sharedBox && o.geometry !== studGeo))
      return;
    let p = o;
    while (p) {
      if (excluded.has(p)) return;
      p = p.parent;
    }
    let key = o.material.uuid + ":" + o.castShadow;
    if (!batches.has(key))
      batches.set(key, {
        material: o.material,
        shadow: o.castShadow,
        geometries: [],
      });
    batches
      .get(key)
      .geometries.push(o.geometry.clone().applyMatrix4(o.matrixWorld));
    items.push(o);
  });
  items.forEach((o) => o.removeFromParent());
  for (const b of batches.values()) {
    let g = mergeGeometries(b.geometries),
      m = new THREE.Mesh(g, b.material);
    m.castShadow = b.shadow;
    m.receiveShadow = true;
    root.add(m);
    b.geometries.forEach((g) => g.dispose());
  }
}
export function makeCar(color = 0xf04d43) {
  const car = new THREE.Group(),
    body = new THREE.Group();
  car.add(body);
  car.userData.body = body;
  car.userData.wheels = [];
  car.userData.paint = [];
  const paint = (x, y, z, w, h, d) => {
    const b = brick(body, x, y, z, w, h, d, color);
    car.userData.paint.push(b);
    return b;
  };
  box(body, 0, 0.62, 0, 2.12, 0.35, 3.75, 0x202e38);
  paint(0, 0.94, 0.15, 1.86, 0.52, 3.65);
  paint(0, 1.3, -1.2, 1.95, 0.3, 1.1);
  paint(0, 1.22, 1.58, 1.9, 0.35, 0.55);
  box(body, 0, 1.47, -1.15, 0.34, 0.05, 1.24, 0xffe8c1);
  box(body, 0, 1.15, -1.96, 1.8, 0.19, 0.12, 0xe8e7d8);
  box(body, 0, 0.82, -2.03, 2.25, 0.22, 0.3, 0x253c46);
  box(body, 0, 0.82, 2.03, 2.25, 0.2, 0.24, 0x253c46);
  for (let side of [-1, 1]) {
    paint(side * 1.03, 1.1, -1.17, 0.42, 0.38, 1.5);
    paint(side * 1.03, 1.1, 1.22, 0.42, 0.38, 1.4);
    box(body, side * 0.7, 1.32, -1.98, 0.42, 0.23, 0.13, 0xfff5b0);
    box(body, side * 0.7, 1.2, 1.94, 0.34, 0.2, 0.1, 0xf06a39);
    box(body, side * 0.85, 1.8, 1.6, 0.12, 0.75, 0.12, 0x303e47);
    box(body, side * 1.04, 1.35, 0.2, 0.16, 0.12, 0.4, 0x21333b);
  }
  paint(0, 2.13, 1.58, 2.65, 0.19, 0.65);
  box(body, 0, 1.33, 0.35, 1.12, 0.3, 1.25, 0x273b43);
  box(body, 0, 1.74, 0.83, 1.1, 0.7, 0.2, 0x26313b);
  // Little driver: molded torso, round yellow head and helmet.
  brick(body, 0, 1.73, 0.25, 0.69, 0.68, 0.48, 0xecead7, false);
  box(body, 0, 1.78, -0.05, 0.31, 0.34, 0.08, 0xef4e43);
  const head = new THREE.Mesh(
    new THREE.CylinderGeometry(0.29, 0.29, 0.48, 18),
    M(0xffce43),
  );
  head.position.set(0, 2.25, 0.17);
  body.add(head);
  const helmet = new THREE.Mesh(
    new THREE.SphereGeometry(0.38, 20, 12, 0, Math.PI * 2, 0, Math.PI * 0.64),
    M(0xfff3dc),
  );
  helmet.position.set(0, 2.38, 0.17);
  helmet.castShadow = true;
  body.add(helmet);
  box(body, 0, 2.35, -0.116, 0.52, 0.16, 0.12, 0x25343b);
  for (let side of [-1, 1]) {
    let arm = box(body, side * 0.43, 1.77, -0.02, 0.23, 0.55, 0.25, 0xecead7);
    arm.rotation.x = -0.5;
    let hand = new THREE.Mesh(
      new THREE.SphereGeometry(0.15, 8, 8),
      M(0xffce43),
    );
    hand.position.set(side * 0.43, 1.53, -0.2);
    body.add(hand);
  }
  const wheel = new THREE.Mesh(
    new THREE.TorusGeometry(0.28, 0.045, 6, 16),
    M(0x15212a),
  );
  wheel.rotation.x = 1.1;
  wheel.position.set(0, 1.51, -0.42);
  body.add(wheel);
  for (let side of [-1, 1])
    for (let z of [-1.22, 1.25]) {
      const w = new THREE.Group();
      const tire = new THREE.Mesh(
        new THREE.CylinderGeometry(0.56, 0.56, 0.43, 18),
        M(0x1e2930),
      );
      tire.rotation.z = Math.PI / 2;
      tire.castShadow = true;
      w.add(tire);
      const rim = new THREE.Mesh(
        new THREE.CylinderGeometry(0.31, 0.31, 0.45, 12),
        M(0xd9dfd9),
      );
      rim.rotation.z = Math.PI / 2;
      w.add(rim);
      const hub = new THREE.Mesh(
        new THREE.CylinderGeometry(0.15, 0.15, 0.47, 10),
        M(0x35454c),
      );
      hub.rotation.z = Math.PI / 2;
      w.add(hub);
      w.position.set(side * 1.2, 0.57, z);
      body.add(w);
      car.userData.wheels.push(w);
    }
  const aura = new THREE.Mesh(
    new THREE.SphereGeometry(2.25, 24, 16),
    new THREE.MeshBasicMaterial({
      color: 0x77daff,
      transparent: true,
      opacity: 0.16,
      depthWrite: false,
    }),
  );
  aura.position.y = 1.1;
  aura.scale.set(1, 0.8, 1.18);
  aura.visible = false;
  car.add(aura);
  car.userData.aura = aura;
  batchBricks(body);
  return car;
}
function ribbon(curve, width, y, color, offset = 0) {
  let p = [],
    n = [],
    uv = [],
    idx = [];
  const N = 620;
  for (let i = 0; i <= N; i++) {
    let t = i / N,
      c = curve.getPointAt(t),
      tan = curve.getTangentAt(t),
      right = new THREE.Vector3(-tan.z, 0, tan.x);
    for (let side of [-1, 1]) {
      let q = c.clone().addScaledVector(right, (side * width) / 2 + offset);
      p.push(q.x, y, q.z);
      n.push(0, 1, 0);
      uv.push(side === -1 ? 0 : 1, i / 10);
    }
    if (i < N) {
      let k = i * 2;
      idx.push(k, k + 1, k + 2, k + 1, k + 3, k + 2);
    }
  }
  let g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(p, 3));
  g.setAttribute("normal", new THREE.Float32BufferAttribute(n, 3));
  g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  let mesh = new THREE.Mesh(g, M(color));
  mesh.receiveShadow = true;
  return mesh;
}
function textTexture(
  text,
  bg = "#152e3a",
  fg = "#f7f5e9",
  width = 1024,
  height = 256,
) {
  const c = document.createElement("canvas");
  c.width = width;
  c.height = height;
  const ctx = c.getContext("2d");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = fg;
  ctx.font = `900 italic ${height * 0.56}px Arial`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, width / 2, height * 0.52, width * 0.91);
  return new THREE.CanvasTexture(c);
}
export function makeWorld(scene, index = 0) {
  const cfg = tracks[index],
    group = new THREE.Group();
  scene.add(group);
  scene.background = new THREE.Color(cfg.sky);
  scene.fog = new THREE.Fog(cfg.fog, 220, 780);
  const points =
    cfg.points ||
    (index === 1
      ? [
          [0, 160],
          [-95, 140],
          [-165, 60],
          [-150, -45],
          [-80, -140],
          [25, -145],
          [145, -100],
          [170, 10],
          [120, 110],
        ]
      : index === 2
        ? [
            [0, 150],
            [-100, 140],
            [-165, 60],
            [-140, -50],
            [-65, -80],
            [-60, -155],
            [75, -160],
            [155, -65],
            [125, 15],
            [160, 100],
            [75, 145],
          ]
        : [
            [0, 155],
            [-90, 140],
            [-155, 80],
            [-160, -15],
            [-115, -115],
            [-35, -145],
            [40, -115],
            [75, -40],
            [150, -10],
            [158, 75],
            [100, 145],
          ]);
  const curve = new THREE.CatmullRomCurve3(
    points.map(([x, z]) => new THREE.Vector3(x, 0, z)),
    true,
    "catmullrom",
    0.45,
  );
  curve.arcLengthDivisions = 1600;
  const length = curve.getLength(),
    samples = Array.from({ length: 800 }, (_, i) => curve.getPointAt(i / 800));
  const sample = (s) => {
    const t = (((s / length) % 1) + 1) % 1,
      p = curve.getPointAt(t),
      tan = curve.getTangentAt(t);
    return {
      p,
      tan,
      right: new THREE.Vector3(-tan.z, 0, tan.x),
      angle: Math.atan2(-tan.x, -tan.z),
    };
  };
  const roadWidth = 19;
  const waveCanvas = document.createElement("canvas");
  waveCanvas.width = 128;
  waveCanvas.height = 128;
  const waveCtx = waveCanvas.getContext("2d"),
    wavePixels = waveCtx.createImageData(128, 128);
  for (let y = 0; y < 128; y++)
    for (let x = 0; x < 128; x++) {
      const k = (y * 128 + x) * 4;
      wavePixels.data[k] = 128 + Math.sin(x * 0.147 + Math.sin(y * 0.098)) * 32;
      wavePixels.data[k + 1] =
        128 + Math.cos(y * 0.147 + Math.cos(x * 0.098)) * 25;
      wavePixels.data[k + 2] = 245;
      wavePixels.data[k + 3] = 255;
    }
  waveCtx.putImageData(wavePixels, 0, 0);
  const waveNormal = new THREE.CanvasTexture(waveCanvas);
  waveNormal.wrapS = waveNormal.wrapT = THREE.RepeatWrapping;
  waveNormal.repeat.set(150, 150);
  let water = new THREE.Mesh(
    new THREE.PlaneGeometry(5000, 5000),
    new THREE.MeshStandardMaterial({
      color: cfg.water,
      roughness: 0.3,
      metalness: 0.18,
      normalMap: waveNormal,
      normalScale: new THREE.Vector2(0.4, 0.4),
    }),
  );
  water.rotation.x = -Math.PI / 2;
  water.position.y = -2;
  group.add(water);
  // Ocean ripple highlights, kept subtle so the toy island stays the focus.
  const ripples = new THREE.Group();
  for (let i = 0; i < 180; i++) {
    const x = Math.sin(i * 79.31) * 1100,
      z = Math.cos(i * 37.17) * 1100;
    const r = box(
      ripples,
      x,
      -1.96,
      z,
      5 + (i % 7) * 3,
      0.015,
      0.25,
      index === 2 ? 0x355274 : 0x6bc5be,
      false,
    );
    r.rotation.y = -0.2;
  }
  group.add(ripples);
  const island = new THREE.Mesh(
    new THREE.CylinderGeometry(218, 232, 7, 64),
    M(cfg.ground),
  );
  island.scale.z = 0.93;
  island.position.y = -4;
  island.receiveShadow = true;
  group.add(island);
  const green =
    cfg.infield ?? (index === 0 ? 0x8aab63 : index === 1 ? 0xdcb77c : 0x62748a);
  const inner = new THREE.Mesh(
    new THREE.CylinderGeometry(133, 146, 4, 30),
    M(green),
  );
  inner.position.set(-10, -2.4, 0);
  inner.scale.z = 0.87;
  inner.receiveShadow = true;
  group.add(inner);
  group.add(ribbon(curve, 26, 0.11, cfg.ground));
  group.add(ribbon(curve, roadWidth, 0.22, cfg.road));
  group.add(ribbon(curve, 0.22, 0.25, 0xe8e8c7, -8.7));
  group.add(ribbon(curve, 0.22, 0.25, 0xe8e8c7, 8.7));
  for (let i = 0; i < Math.floor(length / 4); i++) {
    let a = sample(i * 4);
    for (let side of [-1, 1]) {
      let m = box(
        group,
        a.p.x + a.right.x * 9.75,
        0.3,
        a.p.z + a.right.z * 9.75,
        0.85,
        0.35,
        4.05,
        i % 2 ? 0xf0e9d0 : cfg.accent,
      );
      m.rotation.y = a.angle;
    }
    if (i % 4 === 0) {
      let m = box(
        group,
        a.p.x,
        0.245,
        a.p.z,
        0.15,
        0.025,
        2.2,
        0xd1d9ca,
        false,
      );
      m.rotation.y = a.angle;
    }
  }
  // Checkerboard starting line and grand prix gantry.
  const start = sample(0),
    gate = new THREE.Group();
  gate.position.copy(start.p);
  gate.rotation.y = start.angle;
  group.add(gate);
  for (let x = 0; x < 16; x++)
    for (let z = 0; z < 3; z++)
      box(
        gate,
        (x - 7.5) * 1.1,
        0.27,
        (z - 1) * 0.9,
        1.1,
        0.03,
        0.9,
        (x + z) % 2 ? 0x253943 : 0xf4eed7,
        false,
      );
  for (let side of [-1, 1]) {
    brick(gate, side * 12, 4.7, 0, 1.1, 9.4, 1.3, 0xf3e6c6, false);
    box(gate, side * 12, 0.5, 0, 3, 1, 3, 0x2e4850);
    box(gate, side * 12, 4, 0, 1.3, 1.4, 1.5, cfg.accent);
  }
  box(gate, 0, 9.3, 0, 26, 2.7, 1, 0x1c3541);
  const sign = new THREE.Mesh(
    new THREE.PlaneGeometry(22, 2.15),
    new THREE.MeshBasicMaterial({
      map: textTexture("BRICK  RACERS"),
      side: THREE.DoubleSide,
    }),
  );
  sign.position.set(0, 9.3, 0.52);
  gate.add(sign);
  for (let i = 0; i < 5; i++) {
    const lamp = new THREE.Mesh(
      new THREE.SphereGeometry(0.27, 12, 8),
      M(0xa9d254),
    );
    lamp.position.set((i - 2) * 1.2, 7.4, 0);
    gate.add(lamp);
  }
  // Deterministic decorative vegetation, architecture and cliffs.
  let seed = 93;
  function rnd() {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  }
  function away(x, z, margin = 23) {
    return samples.every(
      (p) => (p.x - x) ** 2 + (p.z - z) ** 2 > margin * margin,
    );
  }
  function palm(x, z, scale = 1) {
    const g = new THREE.Group();
    g.position.set(x, 0.2, z);
    g.scale.setScalar(scale);
    group.add(g);
    for (let i = 0; i < 7; i++) {
      const m = box(
        g,
        i * 0.12,
        0.7 + i * 1.05,
        0,
        0.85,
        1.05,
        0.85,
        i % 2 ? 0x997450 : 0xab8255,
      );
      m.rotation.z = -0.1;
    }
    for (let j = 0; j < 7; j++) {
      const leaf = new THREE.Group();
      leaf.position.set(0.8, 7.5, 0);
      leaf.rotation.y = (j * Math.PI * 2) / 7;
      leaf.rotation.z = 0.12;
      g.add(leaf);
      for (let k = 0; k < 4; k++) {
        let m = box(
          leaf,
          0,
          0.3 - k * k * 0.15,
          k * 1.2,
          1.4 - k * 0.25,
          0.18,
          1.6,
          k % 2 ? 0x3c7d58 : 0x4c9160,
        );
        m.rotation.x = k * 0.14;
      }
    }
  }
  function pine(x, z, scale = 1) {
    const g = new THREE.Group();
    g.position.set(x, 0, z);
    g.scale.setScalar(scale);
    group.add(g);
    box(g, 0, 2, 0, 0.7, 4, 0.7, 0x7a6853);
    for (let i = 0; i < 3; i++) {
      let m = new THREE.Mesh(
        new THREE.ConeGeometry(3.4 - i * 0.65, 4.7, 5),
        M(cfg.theme === "ice" ? 0xd8e8ed : index === 2 ? 0x86a7c4 : 0x547d61),
      );
      m.position.y = 4 + i * 2;
      m.castShadow = true;
      g.add(m);
    }
  }
  function cactus(x, z) {
    const g = new THREE.Group();
    g.position.set(x, 0, z);
    group.add(g);
    brick(g, 0, 3.4, 0, 1.5, 6.8, 1.5, 0x60836c, false);
    for (let side of [-1, 1]) {
      box(g, side * 1.7, 3.4, 0, 2.5, 1.2, 1.2, 0x6c9075);
      box(g, side * 2.3, 4.5 + side * 0.5, 0, 1.2, 3, 1.2, 0x6c9075);
    }
  }
  for (let i = 0; i < 125; i++) {
    let x = (rnd() - 0.5) * 410,
      z = (rnd() - 0.5) * 380;
    if ((x * x) / 45000 + (z * z) / 40000 > 1 || !away(x, z, 23)) continue;
    if (i % 3 === 0) {
      let g = new THREE.Group();
      g.position.set(x, 0, z);
      group.add(g);
      for (let j = 0; j < 3; j++)
        box(
          g,
          j * 1.3,
          1.2 + j * 0.4,
          0,
          3.5,
          2.4 + j * 0.8,
          3.5,
          index === 0 ? 0xb6b49a : index === 1 ? 0xc08b62 : 0x788aa5,
        );
    } else if (index === 0 || cfg.theme === "jungle")
      palm(x, z, 0.8 + rnd() * 0.7);
    else if (index === 1) cactus(x, z);
    else if (cfg.theme !== "volcano") pine(x, z, 0.7 + rnd());
  }
  // Low brick foliage adds depth and scale along the verges.
  for (let i = 0; i < 230; i++) {
    const x = (rnd() - 0.5) * 390,
      z = (rnd() - 0.5) * 360;
    if ((x * x) / 39000 + (z * z) / 34000 > 1 || !away(x, z, 15)) continue;
    const color =
      cfg.theme === "ice"
        ? 0xd3e3e8
        : cfg.theme === "jungle"
          ? 0x4e824a
          : cfg.theme === "volcano"
            ? 0x544450
            : index === 0
              ? [0x5b965e, 0x75a75a, 0x91b563][i % 3]
              : index === 1
                ? [0xc59659, 0xb9a172, 0x8d9b69][i % 3]
                : [0x8394a8, 0x6a86a3, 0x96a9ba][i % 3];
    const g = new THREE.Group();
    g.position.set(x, 0.05, z);
    group.add(g);
    box(g, 0, 0.4, 0, 2.3, 0.8, 2.3, color);
    box(g, 0.3, 1, 0, 1.5, 0.6, 1.5, color);
    if (i % 7 === 0)
      box(g, 0.2, 1.5, 0, 0.5, 0.5, 0.5, index === 0 ? 0xf8c455 : 0xc7cbd9);
  }
  if (index < 3) {
    // Centerpiece fortress: stacked stone towers, crenellations and red toy roofs.
    const castle = new THREE.Group();
    castle.position.set(-30, 0, -28);
    group.add(castle);
    for (let tier = 0; tier < 5; tier++)
      box(
        castle,
        0,
        tier * 3 - 1,
        0,
        69 - tier * 7,
        3.1,
        48 - tier * 5,
        index === 0 ? 0x9caa94 : index === 1 ? 0xc28d5d : 0x65798c,
      );
    if (index !== 2) {
      for (let side of [-1, 1]) {
        const tower = new THREE.Group();
        tower.position.set(side * 20, 8, 0);
        castle.add(tower);
        for (let i = 0; i < 7; i++) {
          box(
            tower,
            0,
            i * 2.2,
            0,
            11,
            2.15,
            11,
            index === 0 ? (i % 2 ? 0xd6cdb0 : 0xc2c2a8) : 0xdfb477,
          );
          for (let x of [-4, 0, 4])
            if (i === 6) box(tower, x, 16, 0, 2.5, 3, 11, 0xd6cdb0);
        }
        for (let y of [5, 11]) box(tower, 0, y, 5.52, 1.5, 2.7, 0.1, 0x455350);
        const roof = new THREE.Mesh(
          new THREE.ConeGeometry(9, 9, 4),
          M(index === 0 ? 0xc66347 : 0x36a4a6),
        );
        roof.rotation.y = Math.PI / 4;
        roof.position.y = 21;
        roof.castShadow = true;
        tower.add(roof);
        box(tower, 0, 28, 0, 0.25, 7, 0.25, 0x474c45);
        box(tower, 2, 30, 0, 4, 2.5, 0.1, cfg.accent);
      }
      box(castle, 0, 14, 0, 32, 15, 9, index === 0 ? 0xc4c7ad : 0xd9ad77);
      for (let x = -14; x <= 14; x += 4)
        box(castle, x, 23, 0, 2.5, 3, 9, index === 0 ? 0xd5d2b6 : 0xe2bd88);
      for (let x of [-10, -5, 0, 5, 10])
        box(castle, x, 16, 4.6, 1.8, 3.2, 0.12, 0x4b5a52);
    } else {
      const rocket = new THREE.Group();
      rocket.position.set(0, 12, 0);
      castle.add(rocket);
      let hull = new THREE.Mesh(
        new THREE.CylinderGeometry(4, 4, 26, 12),
        M(0xd1e1e5),
      );
      hull.position.y = 17;
      rocket.add(hull);
      let tip = new THREE.Mesh(new THREE.ConeGeometry(4, 10, 12), M(0xf16d57));
      tip.position.y = 35;
      rocket.add(tip);
      for (let i = 0; i < 4; i++) {
        let fin = box(
          rocket,
          Math.sin((i * Math.PI) / 2) * 5,
          8,
          Math.cos((i * Math.PI) / 2) * 5,
          2,
          9,
          6,
          0xf16d57,
        );
        fin.rotation.y = (i * Math.PI) / 2;
      }
      box(rocket, 0, 20, 4.01, 3, 4, 0.2, 0x234b6a);
    }
    if (index !== 2) {
      for (let row = 0; row < 6; row++)
        for (let col = 0; col < 8; col++) {
          const x = (col - 3.5) * 3.8 + (row % 2) * 0.5;
          box(
            castle,
            x,
            8 + row * 2.2,
            4.65,
            3.7,
            2.06,
            0.18,
            index === 0
              ? [0xb2bba6, 0xc1c8b2, 0xabb6a3][(row + col) % 3]
              : [0xd2a474, 0xe3b881, 0xcfa273][(row + col) % 3],
          );
        }
      box(castle, 0, 11.5, 4.9, 6, 8, 0.3, 0x354a48);
      for (let side of [-1, 1]) {
        box(castle, side * 10, 17, 4.9, 2.8, 7, 0.25, cfg.accent);
        box(castle, side * 10, 17, 5.05, 0.45, 6, 0.08, 0xf6d66d);
      }
    }
  }
  const stageObstacles = [];
  const updateScenery = addStageScenery({
    obstacles: stageObstacles,
    group,
    cfg,
    box,
    brick,
    mat,
    sample,
    length,
  });
  // Tunnel and trackside billboards.
  const tunnelAt = length * 0.47,
    ts = sample(tunnelAt),
    tunnel = new THREE.Group();
  tunnel.position.copy(ts.p);
  tunnel.rotation.y = ts.angle;
  group.add(tunnel);
  for (let side of [-1, 1])
    for (let j = 0; j < 4; j++)
      box(
        tunnel,
        side * 12,
        2 + j * 2.5,
        0,
        4,
        2.45,
        26,
        index === 0 ? 0xa5af9b : index === 1 ? 0xc08d63 : 0x70829c,
      );
  box(
    tunnel,
    0,
    11.2,
    0,
    28,
    3.5,
    28,
    index === 0 ? 0xa5af9b : index === 1 ? 0xc08d63 : 0x70829c,
  );
  for (let j = 0; j < 3; j++)
    box(
      tunnel,
      0,
      9.35,
      (j - 1) * 8,
      15,
      0.1,
      0.5,
      index === 2 ? 0x9ddfff : 0xf0dd97,
    );
  for (let i = 0; i < 8; i++) {
    let a = sample((length * (i + 0.35)) / 8),
      signGroup = new THREE.Group();
    signGroup.position
      .copy(a.p)
      .addScaledVector(a.right, 15.5 * (i % 2 ? -1 : 1));
    signGroup.rotation.y = a.angle + (i % 2 ? Math.PI / 2 : -Math.PI / 2);
    group.add(signGroup);
    box(signGroup, -4, 2, 0, 0.35, 4, 0.35, 0x485552);
    box(signGroup, 4, 2, 0, 0.35, 4, 0.35, 0x485552);
    const board = new THREE.Mesh(
      new THREE.PlaneGeometry(12, 3.2),
      new THREE.MeshStandardMaterial({
        map: textTexture(
          i % 2 ? "FULL BRICK." : "LET’S RACE!",
          i % 2 ? "#dfef86" : "#e96850",
          i % 2 ? "#233b38" : "#fff0d2",
        ),
        side: THREE.DoubleSide,
      }),
    );
    board.position.y = 4;
    signGroup.add(board);
  }
  // Harbor and anchored brick ship.
  if (index === 0) {
    const dock = new THREE.Group();
    dock.position.set(120, -0.25, 164);
    group.add(dock);
    for (let i = 0; i < 24; i++)
      box(dock, i * 0.9, 0, 0, 0.8, 0.3, 12, 0xa17e53);
    for (let i = 0; i < 5; i++)
      for (let side of [-1, 1])
        box(dock, i * 5, -1, side * 5, 1, 4, 1, 0x735c46);
    const ship = new THREE.Group();
    ship.position.set(157, -0.5, 188);
    ship.rotation.y = -0.7;
    group.add(ship);
    box(ship, 0, 2, 0, 9, 5, 27, 0x694c3c);
    box(ship, 0, 4, 0, 11, 2, 29, 0x9d6b48);
    box(ship, 0, 5, 0, 9, 0.4, 26, 0xc7995e);
    for (let side of [-1, 1])
      box(ship, side * 5.4, 5.2, 0, 0.5, 2.4, 28, 0x5a4438);
    box(ship, 0, 16, 0, 0.7, 26, 0.7, 0x674d3a);
    box(ship, 0, 24, 0, 18, 0.6, 0.6, 0x674d3a);
    let sail = box(ship, 0, 17, 0.3, 17, 13, 0.2, 0xf5e7be);
    box(ship, 0, 16, 0.45, 4, 4, 0.03, 0x283c3d);
    box(ship, 0, 30, 0, 0.3, 5, 0.3, 0x574d3f);
    box(ship, 2.5, 31, 0, 5, 2.5, 0.1, 0x22393b);
  }
  // Flags and spectator stands along the start straight.
  for (let i = 0; i < 12; i++) {
    const a = sample(i * 4 + 20);
    for (let side of [-1, 1]) {
      const g = new THREE.Group();
      g.position.copy(a.p).addScaledVector(a.right, side * 16);
      group.add(g);
      box(g, 0, 4.5, 0, 0.16, 9, 0.16, 0xe9e3cd);
      box(
        g,
        1.1,
        7.5,
        0,
        2.4,
        2.2,
        0.08,
        i % 3 === 0 ? 0xd8ec87 : i % 3 === 1 ? cfg.accent : 0xf2e9cd,
      );
    }
  }
  const obstacles = [
    ...stageObstacles,
    ...[-1, 1].map((side) => ({
      s: 0,
      lane: side * 12,
      halfWidth: 1.5,
      halfLength: 1.5,
      kind: "start gantry",
    })),
    ...[-1, 1].map((side) => ({
      s: tunnelAt,
      lane: side * 12,
      halfWidth: 2,
      halfLength: 13,
      kind: "tunnel wall",
    })),
  ];
  const wallLimitAt = (s) => {
    const d = Math.abs(
      ((((s - tunnelAt + length / 2) % length) + length) % length) - length / 2,
    );
    return d < 16 ? 10 : 14;
  };
  for (let i = 0; i < Math.ceil(length / 4); i++) {
    const a = sample(i * 4);
    for (const side of [-1, 1]) {
      const rail = box(
        group,
        a.p.x + a.right.x * side * 14.35,
        0.95,
        a.p.z + a.right.z * side * 14.35,
        0.7,
        1.55,
        4.1,
        i % 3 === 0 ? cfg.accent : 0xe0e4d5,
      );
      rail.rotation.y = a.angle;
    }
  }
  for (let i = 0; i < 7; i++) {
    const s = length * (0.13 + i * 0.115),
      lane = (i % 2 ? 1 : -1) * 11.1;
    if (Math.abs(s - tunnelAt) < 30) continue;
    const a = sample(s),
      g = new THREE.Group();
    g.position.copy(a.p).addScaledVector(a.right, lane);
    g.rotation.y = a.angle;
    group.add(g);
    const kind =
      cfg.theme === "ice"
        ? "ice block"
        : cfg.theme === "volcano"
          ? "basalt rock"
          : "crate";
    const color =
      cfg.theme === "ice"
        ? 0xaad9e8
        : cfg.theme === "volcano"
          ? 0x493d4d
          : 0xb88852;
    brick(g, 0, 1.2, 0, 2.5, 2.4, 2.5, color, false);
    box(g, 0, 1.2, 1.27, 2.55, 0.25, 0.08, 0xe5d6a5);
    box(g, 0, 1.2, -1.27, 2.55, 0.25, 0.08, 0xe5d6a5);
    obstacles.push({ s, lane, halfWidth: 1.25, halfLength: 1.25, kind });
  }
  const pickups = [];
  const colors = [0x6cdb78, 0xed635b, 0x64b9f2, 0xffd563];
  for (let row = 0; row < 14; row++) {
    const s = ((row + 0.6) * length) / 14;
    for (let lane = -1; lane <= 1; lane++) {
      const type = (row + lane + 4) % 4,
        g = new THREE.Group();
      brick(g, 0, 0, 0, 1.25, 0.8, 1.25, colors[type]);
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(1.15, 0.035, 4, 24),
        new THREE.MeshBasicMaterial({
          color: colors[type],
          transparent: true,
          opacity: 0.65,
        }),
      );
      ring.rotation.x = Math.PI / 2;
      ring.position.y = -0.8;
      g.add(ring);
      const a = sample(s);
      g.position.copy(a.p).addScaledVector(a.right, lane * 5.6);
      g.position.y = 1.7;
      group.add(g);
      pickups.push({ s, lane: lane * 5.6, type, mesh: g, cooldown: 0 });
    }
  }
  const boostPads = [];
  for (let i of [0.2, 0.63, 0.84]) {
    const s = length * i,
      a = sample(s),
      g = new THREE.Group();
    g.position.copy(a.p);
    g.rotation.y = a.angle;
    group.add(g);
    box(g, 0, 0.3, 0, 7, 0.08, 7, index === 2 ? 0x8d87f0 : 0x65c6b3);
    for (let j = -1; j <= 1; j++) {
      for (let side of [-1, 1]) {
        let m = box(
          g,
          side * 0.9,
          0.36,
          j * 1.8,
          2.4,
          0.03,
          0.25,
          0xe4ffad,
          false,
        );
        m.rotation.y = side * 0.6;
      }
    }
    boostPads.push({ s, lane: 0 });
  }
  const clouds = [];
  if (index !== 2) {
    for (let i = 0; i < 17; i++) {
      const g = new THREE.Group();
      g.position.set(
        Math.sin(i * 3.87) * 500,
        85 + (i % 4) * 18,
        Math.cos(i * 3.87) * 500,
      );
      group.add(g);
      for (let j = 0; j < 4; j++)
        box(
          g,
          j * 10,
          Math.sin(j) * 5,
          0,
          15,
          8 + (j % 2) * 7,
          12,
          0xf8f5de,
          false,
        );
      clouds.push(g);
    }
  } else {
    const geo = new THREE.BufferGeometry(),
      pos = [];
    for (let i = 0; i < 600; i++) {
      pos.push((rnd() - 0.5) * 1800, 100 + rnd() * 500, (rnd() - 0.5) * 1800);
    }
    geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    group.add(
      new THREE.Points(
        geo,
        new THREE.PointsMaterial({ color: 0xd7edff, size: 1.2 }),
      ),
    );
  }
  batchBricks(group, new Set([ripples, ...pickups.map((p) => p.mesh)]));
  return {
    group,
    curve,
    length,
    sample,
    roadWidth,
    wallLimitAt,
    obstacles,
    pickups,
    boostPads,
    cfg,
    clouds,
    update(t) {
      updateScenery(t);
      pickups.forEach((p) => {
        p.mesh.rotation.y = t * 0.8;
        p.mesh.position.y = 1.8 + Math.sin(t * 2 + p.s) * 0.24;
        p.mesh.visible = p.cooldown <= 0;
      });
      waveNormal.offset.set(t * 0.008, t * 0.004);
      ripples.position.x = Math.sin(t * 0.15) * 2;
    },
    dispose() {
      scene.remove(group);
      releaseModel(group);
    },
  };
}

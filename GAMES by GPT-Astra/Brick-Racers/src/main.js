import * as THREE from "three";
import { makeWorld, makeCar, mat, releaseModel, tracks } from "./world.js";
import { RaceAudio, preloadEngine } from "./audio.js";
import {
  resetContactState,
  integrateContactMotion,
  resolveCarContacts,
  resolveTrackContacts,
  sweptHit,
} from "./physics.js";
const $ = (s) => document.querySelector(s),
  $$ = (s) => [...document.querySelectorAll(s)];
const canvas = $("#game");
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: false,
  powerPreference: "high-performance",
  preserveDrawingBuffer: true,
});
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;
renderer.outputColorSpace = THREE.SRGBColorSpace;
const scene = new THREE.Scene(),
  camera = new THREE.PerspectiveCamera(53, innerWidth / innerHeight, 0.1, 1600);
const hemi = new THREE.HemisphereLight(0xd6efff, 0x79745b, 1.35);
scene.add(hemi);
const sun = new THREE.DirectionalLight(0xffefce, 2.6);
sun.position.set(-90, 180, 90);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
Object.assign(sun.shadow.camera, {
  left: -110,
  right: 110,
  top: 110,
  bottom: -110,
  near: 1,
  far: 480,
});
sun.shadow.bias = -0.0003;
sun.shadow.normalBias = 0.06;
scene.add(sun);
scene.add(sun.target);
const fills = new THREE.DirectionalLight(0xaddcff, 0.65);
fills.position.set(100, 50, -80);
scene.add(fills);
let saved = {};
try {
  saved = JSON.parse(localStorage.getItem("brick-racers-v1") || "{}");
} catch {}
const paints = [
  ["RED COMET", 0xf04d43],
  ["OCEAN RUNNER", 0x30a5be],
  ["SUN CHASER", 0xf5c842],
  ["MINT CONDITION", 0x80c98e],
  ["PURPLE HAZE", 0x9975cb],
  ["MIDNIGHT CLUB", 0x303e4b],
];
const state = {
  mode: "menu",
  page: "play",
  track: 0,
  time: 0,
  clock: 0,
  countdown: 3.5,
  paint: saved.paint ?? 0,
  chassis: saved.chassis || "balanced",
  difficulty: saved.difficulty || "normal",
  muted: saved.muted ?? false,
  mix: { master: 0.8, engine: 0.8, effects: 0.8, music: 0.24, ...saved.mix },
  cameraShake: 0,
  quality: saved.quality || "high",
  best: saved.best || {},
  lastLap: 0,
  lapTimes: [],
  toast: 0,
  drift: 0,
  boost: 0,
  shield: 0,
  power: null,
  powerLevel: 0,
  finishRank: 0,
};
const keys = new Set(),
  rivals = ["YOU", "CAPTAIN RED", "AXLE", "NOVA", "DUSTY", "BOLT"];
let world,
  player,
  cars = [],
  particles = [],
  rockets = [],
  oils = [],
  cameraReady = false,
  previousLap = 1,
  padCooldown = 0,
  lastNow = performance.now(),
  manualUntil = 0,
  audio = null;
function save() {
  try {
    localStorage.setItem(
      "brick-racers-v1",
      JSON.stringify({
        paint: state.paint,
        chassis: state.chassis,
        difficulty: state.difficulty,
        muted: state.muted,
        mix: state.mix,
        quality: state.quality,
        best: state.best,
      }),
    );
  } catch {}
}
preloadEngine().catch(() => {});

function audioInit() {
  try {
    if (!audio) audio = new RaceAudio(new AudioContext(), state.mix);
    else if (audio.sampleStatus === "error")
      audio.ready = audio.loadRecording();
    if (audio.ctx.state === "suspended") audio.ctx.resume().catch(() => {});
    audio.setMix(state.mix, state.muted);
  } catch {}
}
function sound(name, options = {}) {
  if (audio) audio.event(name, options);
}
function updateAudio(dt) {
  if (!audio) return;
  const near = cars
    .filter((c) => c !== player)
    .sort(
      (a, b) =>
        Math.abs(relative(a.s, player.s)) - Math.abs(relative(b.s, player.s)),
    )[0];
  audio.update(dt, {
    mode: state.mode,
    speed: player.speed,
    throttle: keys.has("ArrowUp") || keys.has("KeyW"),
    braking: keys.has("ArrowDown") || keys.has("KeyS"),
    drift: state.drift,
    boost: state.boost,
    offroad: Math.abs(player.lane) > 9.2,
    theme: world.cfg.theme,
    paused: state.mode === "paused",
    rival: near
      ? {
          distance: relative(near.s, player.s),
          lane: near.lane - player.lane,
          speed: near.speed,
        }
      : null,
  });
}
function contactFeedback({ a, b, strength, kind, pan }) {
  positionCar(a);
  if (b) positionCar(b);
  if (a !== player && b !== player) {
    if (Math.abs(relative(a.s, player.s)) < 25)
      sound("impact", {
        strength: strength * 0.3,
        pan: (a.lane - player.lane) / 10,
      });
    return;
  }
  state.cameraShake = Math.min(0.45, state.cameraShake + strength * 0.3);
  particle(
    player,
    kind === "ice block" ? 0xc6f2ff : 0xffd891,
    Math.ceil(4 + strength * 12),
  );
  sound("impact", { strength, pan });
}
function toast(text) {
  $("#toast").textContent = text;
  $("#toast").classList.add("show");
  state.toast = 2.8;
}
function fmt(t) {
  let m = Math.floor(t / 60),
    s = Math.floor(t % 60),
    cs = Math.floor((t % 1) * 100);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}.${String(cs).padStart(2, "0")}`;
}
function relative(a, b) {
  return (
    ((((a - b + world.length / 2) % world.length) + world.length) %
      world.length) -
    world.length / 2
  );
}
function buildTrack(index) {
  if (world) world.dispose();
  cars.forEach((c) => {
    scene.remove(c.mesh);
    releaseModel(c.mesh);
  });
  clearEffects();
  state.track = index;
  world = makeWorld(scene, index);
  hemi.intensity = index === 2 ? 1.4 : 1.35;
  sun.intensity = index === 2 ? 2 : 2.6;
  sun.color.setHex(
    world.cfg.theme === "ice"
      ? 0xe5f6ff
      : world.cfg.theme === "volcano"
        ? 0xffbd99
        : index === 2
          ? 0xa8c5ff
          : 0xffefce,
  );
  renderer.toneMappingExposure = index === 2 ? 1.35 : 1.15;
  cars = [];
  let colors = [
    paints[state.paint][1],
    0xe4bd49,
    0x57b7a1,
    0x9793ce,
    0xe6e6cd,
    0x3c789e,
  ];
  for (let i = 0; i < 6; i++) {
    let mesh = makeCar(colors[i]);
    scene.add(mesh);
    cars.push({
      mesh,
      name: rivals[i],
      color: colors[i],
      s: -18 + (5 - i) * 4,
      lane: i % 2 === 0 ? -2.8 : 2.8,
      speed: 0,
      laneVel: 0,
      spin: 0,
      boost: 0,
      shield: 0,
      finished: false,
      finishTime: 0,
      aiPhase: i * 1.82,
      hitCd: 0,
    });
  }
  player = cars[0];
  player.s = -18;
  cars[1].s = 1;
  cars[2].s = -3;
  cars[3].s = -7;
  cars[4].s = -11;
  cars[5].s = -15;
  for (let c of cars) {
    resetContactState(c);
    positionCar(c);
  }
  cameraReady = false;
  $("#track-name").textContent = world.cfg.name;
  $("#track-type").textContent = world.cfg.cup;
  $("#track-desc").textContent = world.cfg.desc;
  $("#track-difficulty").textContent = world.cfg.difficulty;
  $("#track-weather").textContent = world.cfg.weather;
  $("#track-surface").textContent = world.cfg.surface || "CLASSIC TARMAC";
  $("#track-count").innerHTML =
    `${String(index + 1).padStart(2, "0")} <b>/ ${String(tracks.length).padStart(2, "0")}</b>`;
  $("#track-length").textContent = (world.length / 1000).toFixed(1) + " KM";
  $("#race-cup").textContent = world.cfg.cup;
  $("#race-track").textContent = world.cfg.name.toUpperCase();
  setupMap();
}
function setupMap() {
  let path = [];
  for (let i = 0; i <= 100; i++) {
    let a = world.sample((world.length * i) / 100).p;
    path.push(`${i ? "L" : "M"}${120 + a.x * 0.55},${85 + a.z * 0.42}`);
  }
  $("#map-path").setAttribute("d", path.join(" ") + "Z");
  $("#map-shadow").setAttribute("d", path.join(" ") + "Z");
  $("#map-dots").innerHTML = cars
    .map(
      (c, i) =>
        `<circle id="map-${i}" r="${i ? 3.5 : 5}" fill="${i ? "#" + c.color.toString(16).padStart(6, "0") : "#dcff64"}" stroke="#102733" stroke-width="2"/>`,
    )
    .join("");
}
function clearEffects() {
  for (let item of [...particles, ...rockets, ...oils]) {
    scene.remove(item.mesh);
    releaseModel(item.mesh);
  }
  particles = [];
  rockets = [];
  oils = [];
}
function positionCar(c) {
  const a = world.sample(c.s);
  c.mesh.position.copy(a.p).addScaledVector(a.right, c.lane);
  c.mesh.position.y =
    0.28 + Math.sin(state.clock * 13 + c.s) * 0.016 * Math.min(c.speed / 30, 1);
  c.mesh.rotation.y =
    a.angle -
    Math.atan2(c.laneVel, Math.max(12, c.speed)) *
      (c === player && state.drift > 0 ? 1.4 : 1) +
    (c.spin > 0 ? Math.sin(c.spin * 15) * 0.35 : 0) +
    (c.impactYaw || 0);
  c.mesh.userData.body.rotation.z = -c.laneVel * 0.007;
  c.mesh.userData.wheels.forEach((w) => {
    w.rotation.x = -c.s / 0.56;
    if (w.position.z < 0) w.rotation.y = -c.laneVel * 0.018;
  });
}
function startRace() {
  audioInit();
  state.mode = "countdown";
  state.page = "play";
  state.time = 0;
  state.countdown = 3.5;
  state.lastLap = 0;
  state.lapTimes = [];
  state.drift = 0;
  state.boost = 0;
  state.shield = 0;
  state.power = null;
  state.powerLevel = 0;
  state.finishRank = 0;
  state.cameraShake = 0;
  previousLap = 1;
  padCooldown = 0;
  keys.clear();
  clearEffects();
  cars.forEach((c, i) => {
    c.s = i === 0 ? -18 : 5 - i * 4;
    c.lane = i % 2 === 0 ? -2.8 : 2.8;
    c.speed = 0;
    c.laneVel = 0;
    c.spin = 0;
    c.boost = 0;
    c.shield = 0;
    c.finished = false;
    c.finishTime = 0;
    c.aiAttackCd = 0;
    c.mass =
      i === 0
        ? state.chassis === "speed"
          ? 0.9
          : state.chassis === "grip"
            ? 1.12
            : 1
        : 1 + (i % 3) * 0.06;
    resetContactState(c);
    c.mesh.visible = true;
    c.mesh.scale.setScalar(1);
    positionCar(c);
  });
  world.pickups.forEach((p) => (p.cooldown = 0));
  $("#menu").classList.add("hidden");
  $("#modal").classList.add("hidden");
  $("#hud").classList.remove("hidden");
  document.body.classList.add("racing");
  $("#countdown").classList.remove("hidden");
  cameraReady = false;
  updateHUD();
}
function setPage(page) {
  state.toast = 0;
  $("#toast").classList.remove("show");
  if (player) player.mesh.userData.aura.visible = false;
  state.page = page;
  state.mode = "menu";
  $("#menu").classList.remove("hidden");
  $("#hud").classList.add("hidden");
  $("#modal").classList.add("hidden");
  $("#countdown").classList.add("hidden");
  document.body.classList.remove("racing");
  $$(".page").forEach((p) =>
    p.classList.toggle("hidden", p.id !== page + "-page"),
  );
  $$("[data-page]").forEach((b) =>
    b.classList.toggle("active", b.dataset.page === page),
  );
  keys.clear();
  cameraReady = false;
  player.s = world.length * 0.11;
  player.lane = 0;
  player.laneVel = 0;
  player.speed = 0;
  resetContactState(player);
  player.mesh.scale.setScalar(page === "garage" ? 2 : 1.8);
  positionCar(player);
  cars.forEach((c, i) => {
    c.mesh.visible = i === 0;
  });
  clearEffects();
}
function pause() {
  if (!["race", "countdown", "paused"].includes(state.mode)) return;
  if (state.mode === "paused") {
    state.mode = state.beforePause;
    $("#modal").classList.add("hidden");
    lastNow = performance.now();
    return;
  }
  state.beforePause = state.mode;
  state.mode = "paused";
  keys.clear();
  $("#modal-content").innerHTML =
    `<div class="eyebrow">TAKE A BREATHER</div><h2>IN THE PIT LANE.</h2><p>Your rivals can wait. Ready when you are.</p><button class="primary" id="resume-btn">BACK TO THE RACE <span>↗</span></button><button class="secondary" id="restart-btn">RESTART RACE <span>↻</span></button><button class="secondary" id="race-settings-btn">SOUND & SETTINGS <span>⚙</span></button><button class="secondary" id="exit-btn">EXIT TO MENU <span>←</span></button>`;
  $("#modal").classList.remove("hidden");
  $("#resume-btn").onclick = pause;
  $("#restart-btn").onclick = startRace;
  $("#exit-btn").onclick = () => setPage("play");
  $("#race-settings-btn").onclick = settings;
}
function settings() {
  audioInit();
  const was = state.mode;
  if (was === "race" || was === "countdown") pause();
  $("#modal-content").innerHTML =
    `<div class="eyebrow">MAKE YOURSELF AT HOME</div><h2>RACE SETTINGS.</h2><label class="setting">Rival difficulty <select id="difficulty"><option value="easy">Sunday drive</option><option value="normal">Racer</option><option value="hard">Expert</option></select></label><label class="setting">Graphics <select id="quality"><option value="high">High — shadows + detail</option><option value="low">Performance</option></select></label><label class="setting">Sound <select id="audio"><option value="on">On</option><option value="off">Off</option></select></label><div class="mixer">${[
      ["master", "MASTER"],
      ["engine", "ENGINE & TIRES"],
      ["effects", "EFFECTS & AMBIENCE"],
      ["music", "MUSIC"],
    ]
      .map(
        ([key, label]) =>
          `<label class="mix-row"><span>${label}</span><input type="range" id="mix-${key}" aria-label="${label} volume" min="0" max="100" value="${Math.round(state.mix[key] * 100)}"><output id="mix-value-${key}">${Math.round(state.mix[key] * 100)}%</output></label>`,
      )
      .join(
        "",
      )}</div><p class="audio-credit">Engine recording: <a href="https://opengameart.org/content/car-engine-loop-96khz-4s" target="_blank" rel="noopener">qubodup</a> · <a href="https://creativecommons.org/licenses/by/3.0/" target="_blank" rel="noopener">CC BY 3.0</a> · adapted.</p><p>Steering assistance keeps racing approachable. Drift, collect bricks, and find the quickest line to get ahead.</p><button class="primary" id="settings-done">ALL SET <span>✓</span></button>`;
  $("#difficulty").value = state.difficulty;
  $("#quality").value = state.quality;
  $("#audio").value = state.muted ? "off" : "on";
  $("#modal").classList.remove("hidden");
  for (const key of ["master", "engine", "effects", "music"])
    $("#mix-" + key).oninput = (e) => {
      state.mix[key] = Number(e.target.value) / 100;
      $("#mix-value-" + key).textContent =
        Math.round(state.mix[key] * 100) + "%";
      audio?.setMix(state.mix, state.muted);
      save();
    };
  $("#settings-done").onclick = () => {
    state.difficulty = $("#difficulty").value;
    state.quality = $("#quality").value;
    state.muted = $("#audio").value === "off";
    applyQuality();
    save();
    $("#modal").classList.add("hidden");
    updateSound();
    if (state.mode === "paused") pause();
  };
}
function applyQuality() {
  renderer.setPixelRatio(
    state.quality === "low" ? 1 : Math.min(devicePixelRatio, 1.75),
  );
  renderer.shadowMap.enabled = state.quality !== "low";
  scene.traverse((o) => {
    if (o.material) o.material.needsUpdate = true;
  });
}
function updateSound() {
  audio?.setMix(state.mix, state.muted);
  $("#sound-btn").textContent = state.muted ? "♪̸" : "♫";
  $("#sound-btn").title = state.muted ? "Enable sound" : "Mute sound";
}
function toggleSound() {
  audioInit();
  state.muted = !state.muted;
  save();
  updateSound();
}
function particle(c, color, count = 8) {
  const a = world.sample(c.s);
  for (let i = 0; i < count; i++) {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.16, 0.16, 0.16),
      mat(color),
    );
    mesh.position.copy(c.mesh.position).addScaledVector(a.tan, -1.5);
    mesh.position.x += (Math.random() - 0.5) * 2;
    mesh.position.y += 0.35;
    scene.add(mesh);
    particles.push({
      mesh,
      life: 0.3 + Math.random() * 0.45,
      max: 0.75,
      v: new THREE.Vector3(
        (Math.random() - 0.5) * 7,
        2 + Math.random() * 4,
        (Math.random() - 0.5) * 7,
      ).addScaledVector(a.tan, -c.speed * 0.2),
    });
  }
}
function pickup(p, c) {
  p.cooldown = 5;
  if (c !== player) {
    if (p.type === 0) c.boost = 1.2;
    if (p.type === 2) c.shield = 4;
    if ((c.aiAttackCd || 0) <= 0 && p.type === 1) {
      const target = cars
        .filter(
          (v) =>
            v !== c &&
            !v.finished &&
            relative(v.s, c.s) > 4 &&
            relative(v.s, c.s) < 100,
        )
        .sort((a, b) => relative(a.s, c.s) - relative(b.s, c.s))[0];
      if (target) {
        spawnRocket(c, target);
        c.aiAttackCd = 9;
        if (target === player) {
          toast("INCOMING ROCKET / FIND COVER OR USE A SHIELD");
          sound("warning");
        }
      }
    }
    if ((c.aiAttackCd || 0) <= 0 && p.type === 3) {
      spawnOil(c, c.s - 5, c.lane);
      c.aiAttackCd = 10;
    }
    return;
  }
  if (state.power === p.type)
    state.powerLevel = Math.min(3, state.powerLevel + 1);
  else {
    state.power = p.type;
    state.powerLevel = 1;
  }
  const names = ["TURBO", "HOMING ROCKET", "SHIELD", "OIL SLICK"];
  toast(`${names[p.type]}  /  LEVEL ${state.powerLevel}`);
  sound("pickup", { level: state.powerLevel });
  particle(c, [0x6cdb78, 0xed635b, 0x64b9f2, 0xffd563][p.type], 12);
}
function spawnRocket(owner, target) {
  const mesh = new THREE.Mesh(
    new THREE.ConeGeometry(0.35, 1.4, 8),
    mat(0xfa644b),
  );
  mesh.rotation.x = Math.PI / 2;
  scene.add(mesh);
  rockets.push({
    mesh,
    s: owner.s + 3,
    lane: owner.lane,
    target,
    life: 5,
    speed: 80,
    owner,
  });
}
function spawnOil(owner, s, lane) {
  const mesh = new THREE.Mesh(
    new THREE.CylinderGeometry(2.2, 2.2, 0.04, 24),
    new THREE.MeshStandardMaterial({
      color: 0x182d39,
      roughness: 0.1,
      metalness: 0.7,
    }),
  );
  let a = world.sample(s);
  mesh.position.copy(a.p).addScaledVector(a.right, lane);
  mesh.position.y = 0.3;
  scene.add(mesh);
  oils.push({ mesh, s, lane, life: 20, owner });
}
function usePower() {
  if (state.mode !== "race" || state.power === null) return;
  const level = state.powerLevel,
    type = state.power;
  state.power = null;
  state.powerLevel = 0;
  if (type === 0) {
    state.boost = 1.8 + level * 0.8;
    toast(level === 3 ? "SUPER TURBO!" : "TURBO ENGAGED");
    sound("boost");
  }
  if (type === 1) {
    let targets = cars
      .filter((c) => c !== player && !c.finished)
      .sort((a, b) => {
        let da =
            (((a.s - player.s) % world.length) + world.length) % world.length,
          db =
            (((b.s - player.s) % world.length) + world.length) % world.length;
        return da - db;
      });
    for (let i = 0; i < level; i++) {
      let mesh = new THREE.Mesh(
        new THREE.ConeGeometry(0.35, 1.4, 8),
        mat(0xfa644b),
      );
      mesh.rotation.x = Math.PI / 2;
      scene.add(mesh);
      rockets.push({
        mesh,
        s: player.s + 3 + i * 2,
        lane: player.lane,
        target: targets[i % targets.length],
        life: 8,
        speed: 90,
        owner: player,
      });
    }
    toast("ROCKET AWAY");
    sound("rocket");
  }
  if (type === 2) {
    state.shield = 3 + level * 3;
    toast(`SHIELD UP / ${3 + level * 3} SECONDS`);
    sound("shield");
  }
  if (type === 3) {
    for (let i = 0; i < level; i++) {
      let mesh = new THREE.Mesh(
        new THREE.CylinderGeometry(2.2, 2.2, 0.04, 24),
        new THREE.MeshStandardMaterial({
          color: 0x182d39,
          roughness: 0.1,
          metalness: 0.7,
        }),
      );
      let s = player.s - 5 - i * 4,
        a = world.sample(s);
      mesh.position
        .copy(a.p)
        .addScaledVector(a.right, player.lane + (i - 1) * 2);
      mesh.position.y = 0.3;
      scene.add(mesh);
      oils.push({
        mesh,
        s,
        lane: player.lane + (i - 1) * 2,
        life: 20,
        owner: player,
      });
    }
    toast("A LITTLE SURPRISE FOR THE COMPETITION");
    sound("oil");
  }
}
function hit(c) {
  if (c === player && state.shield > 0) {
    state.shield = 0;
    toast("SHIELD BLOCKED THE HIT");
    sound("block");
    return;
  }
  if (c.shield > 0) {
    c.shield = 0;
    return;
  }
  c.spin = 1.35;
  c.speed *= 0.35;
  particle(c, 0xffcc68, 20);
  if (c === player) {
    toast("HIT! GET BACK UP TO SPEED");
    sound("explosion");
    state.cameraShake = 0.4;
  }
}
function finish() {
  state.mode = "finished";
  player.finished = true;
  player.finishTime = state.time;
  state.finishRank = rankings().indexOf(player) + 1;
  let best = state.best[state.track];
  if (!best || state.time < best) state.best[state.track] = state.time;
  save();
  let order = rankings();
  $("#modal-content").innerHTML =
    `<div class="eyebrow">${state.finishRank === 1 ? "THE TOP STEP IS YOURS" : "THAT’S A WRAP"}</div><h2>${state.finishRank === 1 ? "BRICK BY BRICK. VICTORY." : "WHAT A RACE."}</h2><p>${world.cfg.name} · 3 laps · ${fmt(state.time)}<br>Best lap ${fmt(Math.min(...state.lapTimes))}</p>${order.map((c, i) => `<div class="result-row ${c === player ? "me" : ""}"><b>${i + 1} &nbsp; ${c.name}</b><span>${c.finishTime ? fmt(c.finishTime) : c === player ? fmt(state.time) : "+" + Math.max(0, Math.round(player.s - c.s)) + " m"}</span></div>`).join("")}<button class="primary" id="again-btn">ONE MORE RACE <span>↻</span></button><button class="secondary" id="next-circuit-btn">NEXT CIRCUIT <span>→</span></button><button class="secondary" id="menu-btn">BACK TO MENU <span>←</span></button>`;
  $("#modal").classList.remove("hidden");
  $("#again-btn").onclick = startRace;
  $("#next-circuit-btn").onclick = () => {
    buildTrack((state.track + 1) % tracks.length);
    setPage("play");
  };
  $("#menu-btn").onclick = () => setPage("play");
  sound("finish");
}
function rankings() {
  return [...cars].sort((a, b) =>
    a.finished && b.finished
      ? a.finishTime - b.finishTime
      : a.finished
        ? -1
        : b.finished
          ? 1
          : b.s - a.s,
  );
}
function update(dt) {
  const steps = Math.max(1, Math.ceil(dt * 120));
  for (let i = 0; i < steps; i++) simulate(dt / steps);
}
function simulate(dt) {
  state.clock += dt;
  if (state.toast > 0) {
    state.toast -= dt;
    if (state.toast <= 0) $("#toast").classList.remove("show");
  }
  if (state.mode === "paused") {
    updateAudio(dt);
    return;
  }
  world.update(state.clock);
  if (state.mode === "countdown") {
    const old = Math.ceil(state.countdown);
    state.countdown -= dt;
    let count = Math.ceil(state.countdown);
    $("#countdown").textContent = count > 0 ? Math.min(3, count) : "GO!";
    if (count !== old && count > 0) sound("countdown");
    if (state.countdown <= 0) {
      state.mode = "race";
      sound("go");
      state.goTime = 0.7;
    }
  }
  if (state.mode === "race") {
    state.time += dt;
    state.goTime = (state.goTime || 0) - dt;
    if (state.goTime <= 0) $("#countdown").classList.add("hidden");
    state.boost = Math.max(0, state.boost - dt);
    state.shield = Math.max(0, state.shield - dt);
    padCooldown = Math.max(0, padCooldown - dt);
    const steer =
        (keys.has("ArrowRight") || keys.has("KeyD") ? 1 : 0) -
        (keys.has("ArrowLeft") || keys.has("KeyA") ? 1 : 0),
      throttle = keys.has("ArrowUp") || keys.has("KeyW"),
      brake = keys.has("ArrowDown") || keys.has("KeyS"),
      drifting =
        (keys.has("ShiftLeft") || keys.has("ShiftRight")) &&
        Math.abs(player.speed) > 12 &&
        steer !== 0;
    const surfaceGrip = world.cfg.grip || 1;
    const setup = {
      balanced: { top: 48, accel: 21, grip: 1 },
      speed: { top: 53, accel: 17, grip: 0.85 },
      grip: { top: 46, accel: 23, grip: 1.22 },
    }[state.chassis];
    if (drifting) {
      state.drift = Math.min(
        3,
        state.drift + dt * (state.chassis === "grip" ? 1.3 : 1),
      );
      if (Math.random() < 0.6)
        particle(player, state.drift > 1.8 ? 0xffca52 : 0x58c9ff, 2);
    } else if (state.drift > 0) {
      if (state.drift > 0.65) {
        state.boost = Math.max(state.boost, state.drift > 1.8 ? 2.1 : 1.1);
        toast(
          state.drift > 1.8 ? "PERFECT DRIFT / SUPER BOOST" : "DRIFT BOOST",
        );
        sound("boost");
      }
      state.drift = 0;
    }
    let vmax = setup.top + (state.boost > 0 ? 24 : 0),
      accel = throttle ? setup.accel : player.speed > 0 ? -8 : 4;
    if (brake) accel = player.speed > 0 ? -45 : -10;
    if (player.spin > 0) {
      accel = -12;
      player.spin = Math.max(0, player.spin - dt);
    }
    player.speed = THREE.MathUtils.clamp(
      player.speed + accel * dt,
      brake ? -10 : 0,
      vmax,
    );
    if (state.boost > 0 && throttle) {
      player.speed = Math.min(vmax, player.speed + dt * 38);
      if (Math.random() < 0.7) particle(player, 0x9eeaff, 2);
    }
    const s1 = world.sample(player.s),
      s2 = world.sample(player.s + 3),
      curvature = (s1.tan.x * s2.tan.z - s1.tan.z * s2.tan.x) / 3;
    player.laneVel = THREE.MathUtils.damp(
      player.laneVel,
      steer *
        Math.min(17, Math.abs(player.speed) * 0.31) *
        (drifting ? 1.15 : 1) *
        setup.grip +
        (Math.abs(player.speed) > 20
          ? curvature * player.speed * player.speed * 0.09
          : 0) /
          surfaceGrip,
      (drifting ? 3 : 7) * surfaceGrip,
      dt,
    );
    player.lane += player.laneVel * dt;
    if (Math.abs(player.lane) > 9.2) {
      player.speed = THREE.MathUtils.damp(
        player.speed,
        Math.sign(player.speed) * Math.min(Math.abs(player.speed), 24),
        3,
        dt,
      );
      if (Math.random() < 0.18) particle(player, world.cfg.ground, 2);
    }
    player.s = Math.max(
      -30,
      player.s + player.speed * dt * (drifting ? 0.94 : 1),
    );
    for (let i = 1; i < cars.length; i++) {
      let c = cars[i];
      if (c.finished) continue;
      c.spin = Math.max(0, c.spin - dt);
      c.boost = Math.max(0, c.boost - dt);
      c.shield = Math.max(0, c.shield - dt);
      let diff =
        state.difficulty === "easy"
          ? 0.78
          : state.difficulty === "hard"
            ? 1.07
            : 0.93;
      let catchup = THREE.MathUtils.clamp((player.s - c.s) * 0.018, -3, 4);
      let desired =
        (39.8 + i * 0.8 + Math.sin(state.time * 0.2 + i) * 2 + catchup) * diff +
        (c.boost > 0 ? 15 : 0);
      if (c.spin > 0) desired = 8;
      c.speed = THREE.MathUtils.damp(c.speed, desired, 1.1, dt);
      let targetLane = Math.sin(state.time * 0.25 + c.aiPhase) * 5.7;
      let next = world.pickups.find(
        (p) =>
          relative(p.s, c.s) > 0 && relative(p.s, c.s) < 22 && p.cooldown <= 0,
      );
      if (next) targetLane = next.lane;
      for (let other of cars)
        if (
          other !== c &&
          relative(other.s, c.s) > 0 &&
          relative(other.s, c.s) < 9 &&
          Math.abs(other.lane - targetLane) < 2
        )
          targetLane = other.lane > 0 ? -5.6 : 5.6;
      c.laneVel = THREE.MathUtils.damp(
        c.laneVel,
        THREE.MathUtils.clamp((targetLane - c.lane) * 1.2, -7, 7),
        5 * surfaceGrip,
        dt,
      );
      c.lane += c.laneVel * dt;
      c.s += c.speed * dt;
      if (c.s >= world.length * 3) {
        c.finished = true;
        c.finishTime = state.time;
      }
    }
    for (const c of cars) integrateContactMotion(c, dt);
    resolveCarContacts(cars, world.length, contactFeedback);
    for (const c of cars) resolveTrackContacts(c, world, dt, contactFeedback);
    for (let c of cars) {
      c.hitCd = Math.max(0, c.hitCd - dt);
      c.aiAttackCd = Math.max(0, (c.aiAttackCd || 0) - dt);
      c.mesh.userData.aura.visible =
        c === player ? state.shield > 0 : c.shield > 0;
      for (let p of world.pickups) {
        if (
          p.cooldown <= 0 &&
          Math.abs(relative(c.s, p.s)) < 2 &&
          Math.abs(c.lane - p.lane) < 1.8
        )
          pickup(p, c);
      }
      for (let pad of world.boostPads)
        if (Math.abs(relative(c.s, pad.s)) < 3.5 && Math.abs(c.lane) < 3.5) {
          if (c === player && padCooldown <= 0) {
            state.boost = Math.max(state.boost, 1.3);
            padCooldown = 2;
            sound("boost");
            toast("BOOST STRIP");
          } else if (c !== player) c.boost = Math.max(c.boost, 0.8);
        }
      positionCar(c);
    }
    let lap = Math.min(3, Math.floor(Math.max(0, player.s) / world.length) + 1);
    if (lap > previousLap) {
      state.lapTimes.push(state.time - state.lastLap);
      state.lastLap = state.time;
      previousLap = lap;
      toast(
        lap === 3 ? "FINAL LAP / MAKE IT COUNT" : `LAP ${lap} / KEEP IT UP`,
      );
      sound("lap");
    }
    if (player.s >= world.length * 3) {
      state.lapTimes.push(state.time - state.lastLap);
      finish();
    }
    for (let p of world.pickups) p.cooldown = Math.max(0, p.cooldown - dt);
    for (let r of rockets) {
      r.life -= dt;
      const previousDistance = r.target
        ? relative(r.s, r.target.s - r.target.speed * dt)
        : 0;
      r.s += r.speed * dt;
      if (r.target)
        r.lane = THREE.MathUtils.damp(r.lane, r.target.lane, 1.8, dt);
      let a = world.sample(r.s);
      r.mesh.position.copy(a.p).addScaledVector(a.right, r.lane);
      r.mesh.position.y = 1.3;
      r.mesh.rotation.set(Math.PI / 2, a.angle, 0);
      if (
        r.target &&
        sweptHit(
          previousDistance,
          previousDistance + (r.speed - r.target.speed) * dt,
          r.lane - r.target.lane,
        )
      ) {
        hit(r.target);
        r.life = 0;
        if (r.owner === player) toast("DIRECT HIT!");
      }
    }
    for (let o of oils) {
      o.life -= dt;
      for (let c of cars)
        if (
          c !== o.owner &&
          Math.abs(relative(c.s, o.s)) < 2.6 &&
          Math.abs(c.lane - o.lane) < 2.5 &&
          c.spin <= 0
        ) {
          hit(c);
          o.life = 0;
        }
    }
    rockets = rockets.filter((r) => {
      if (r.life <= 0) {
        scene.remove(r.mesh);
        r.mesh.geometry.dispose();
        r.mesh.material.dispose();
        return false;
      }
      return true;
    });
    oils = oils.filter((o) => {
      if (o.life <= 0) {
        scene.remove(o.mesh);
        o.mesh.geometry.dispose();
        o.mesh.material.dispose();
        return false;
      }
      return true;
    });
  }
  for (let p of particles) {
    p.life -= dt;
    p.mesh.position.addScaledVector(p.v, dt);
    p.v.y -= dt * 12;
    p.mesh.rotation.x += dt * 8;
    p.mesh.scale.setScalar(Math.max(0.01, p.life / p.max));
  }
  particles = particles.filter((p) => {
    if (p.life <= 0) {
      scene.remove(p.mesh);
      p.mesh.geometry.dispose();
      p.mesh.material.dispose();
      return false;
    }
    return true;
  });
  updateAudio(dt);
  state.cameraShake *= Math.exp(-dt * 9);
  updateCamera(dt);
  updateHUD();
}
const desiredCamera = new THREE.Vector3(),
  lookTarget = new THREE.Vector3(),
  smoothLook = new THREE.Vector3();
function updateCamera(dt) {
  let a = world.sample(player.s),
    p = player.mesh.position;
  if (state.mode === "menu") {
    const garage = state.page === "garage",
      orbit = Math.sin(state.clock * 0.15) * 0.06;
    desiredCamera.copy(p).add(new THREE.Vector3(-15, garage ? 9 : 12, 25));
    lookTarget.copy(p).add(new THREE.Vector3(-6, garage ? 1.5 : 1, -8));
    desiredCamera.x += orbit * 4;
  } else {
    const dist = state.boost > 0 ? 13 : 11.8;
    desiredCamera
      .copy(p)
      .addScaledVector(a.tan, -dist)
      .addScaledVector(a.right, -player.laneVel * 0.08);
    desiredCamera.y = 7.3;
    lookTarget.copy(p).addScaledVector(a.tan, 12);
    lookTarget.y = 1.7;
    camera.fov = THREE.MathUtils.damp(
      camera.fov,
      state.boost > 0 ? 65 : 56,
      3,
      dt,
    );
    camera.updateProjectionMatrix();
  }
  if (!cameraReady) {
    camera.position.copy(desiredCamera);
    smoothLook.copy(lookTarget);
    cameraReady = true;
  } else {
    camera.position.lerp(desiredCamera, 1 - Math.exp(-dt * 5));
    smoothLook.lerp(lookTarget, 1 - Math.exp(-dt * 7));
  }
  if (state.mode === "race" && state.cameraShake > 0.002) {
    camera.position.x += Math.sin(state.clock * 91) * state.cameraShake;
    camera.position.y += Math.cos(state.clock * 74) * state.cameraShake * 0.55;
  }
  camera.lookAt(smoothLook);
  if (state.mode === "menu") {
    camera.fov = 53;
    camera.updateProjectionMatrix();
  }
  sun.position.set(p.x - 80, 160, p.z + 80);
  sun.target.position.set(p.x, 0, p.z);
}
let hudTick = 0;
function updateHUD() {
  if (state.mode === "menu") return;
  let rank = rankings(),
    speed = Math.round(Math.abs(player.speed) * 3.1);
  $("#speed").textContent = String(speed).padStart(3, "0");
  $("#speed-bar").style.width = Math.min(100, speed / 2.2) + "%";
  $("#drive-state").textContent =
    state.shield > 0
      ? "SHIELD ACTIVE"
      : state.boost > 0
        ? "TURBO ENGAGED"
        : state.drift > 0
          ? "HOLD THAT DRIFT"
          : Math.abs(player.lane) > 9.2
            ? "OFF ROAD"
            : player.speed > 1
              ? "FULL BRICK AHEAD"
              : "READY TO ROLL";
  $("#position").textContent = rank.indexOf(player) + 1;
  $("#lap").innerHTML =
    `${Math.min(3, Math.floor(Math.max(0, player.s) / world.length) + 1)} <small>/ 3</small>`;
  $("#time").textContent = fmt(state.time);
  $("#best-lap").textContent =
    "BEST " + (state.lapTimes.length ? fmt(Math.min(...state.lapTimes)) : "—");
  let icons = ["↯", "➤", "⬡", "≋"],
    names = ["TURBO", "HOMING ROCKET", "SHIELD", "OIL SLICK"],
    cols = ["#7cdf8c", "#fa8176", "#83d6ff", "#ffe07b"];
  $("#powerup").classList.toggle("empty", state.power === null);
  $("#power-icon").textContent =
    state.power === null ? "＋" : icons[state.power];
  $("#power-icon").style.color =
    state.power === null ? "#a9c1cc" : cols[state.power];
  $("#power-name").textContent =
    state.power === null ? "PICK UP A BRICK" : names[state.power];
  $("#power-level").textContent =
    state.power === null
      ? "POWER YOUR NEXT MOVE"
      : `LEVEL ${state.powerLevel} ${"■".repeat(state.powerLevel)}${"□".repeat(3 - state.powerLevel)} · READY TO USE`;
  $("#drift-meter").classList.toggle("hidden", state.drift <= 0);
  $("#drift-meter i").style.width =
    Math.min(100, (state.drift / 2.5) * 100) + "%";
  $("#drift-meter i").style.background =
    state.drift > 1.8 ? "#ffcd53" : "#61daff";
  if (++hudTick % 6 === 0) {
    $("#leaderboard").innerHTML = rank
      .map(
        (c, i) =>
          `<div class="leader-row ${c === player ? "me" : ""}"><b>${i + 1}</b><i style="background:#${c.color.toString(16).padStart(6, "0")}"></i><span>${c.name}</span><span>${c === player ? "YOU" : ""}</span></div>`,
      )
      .join("");
    cars.forEach((c, i) => {
      let p = world.sample(c.s).p;
      $("#map-" + i).setAttribute("cx", 120 + p.x * 0.55);
      $("#map-" + i).setAttribute("cy", 85 + p.z * 0.42);
    });
  }
}
function resetCar() {
  if (state.mode !== "race") return;
  player.lane = 0;
  player.laneVel = 0;
  player.speed = Math.min(player.speed, 12);
  player.spin = 0;
  resetContactState(player);
  cameraReady = false;
  toast("BACK ON TRACK");
}
function paintCar() {
  const old = player.mesh;
  scene.remove(old);
  releaseModel(old);
  player.mesh = makeCar(paints[state.paint][1]);
  scene.add(player.mesh);
  player.color = paints[state.paint][1];
  player.mesh.scale.setScalar(state.page === "garage" ? 2 : 1.8);
  positionCar(player);
  $("#car-name").textContent = "THE " + paints[state.paint][0];
  $$("[data-paint]").forEach((b) =>
    b.classList.toggle("selected", +b.dataset.paint === state.paint),
  );
  save();
}
function chassisUI() {
  $$("[data-chassis]").forEach((b) =>
    b.classList.toggle("selected", b.dataset.chassis === state.chassis),
  );
  const stats = {
    balanced: [75, 75, 80],
    speed: [95, 55, 60],
    grip: [65, 95, 90],
  }[state.chassis];
  ["speed", "grip", "accel"].forEach((s, i) =>
    $("#stat-" + s).style.setProperty("--value", stats[i] + "%"),
  );
}
function chooseCircuit() {
  $("#modal-content").innerHTML =
    `<div class="eyebrow">SIX WORLDS. ONE STARTING GRID.</div><h2>CHOOSE YOUR STAGE.</h2><div class="circuit-grid">${tracks.map((track, index) => `<button class="circuit-option ${state.track === index ? "selected" : ""}" data-circuit="${index}"><span>0${index + 1} / ${track.cup.replace("THE ", "")}</span><b>${track.name}</b><small>${track.surface || "CLASSIC TARMAC"} ${index > 2 ? "· NEW" : ""}</small></button>`).join("")}</div><button class="secondary" id="close-circuits">BACK <span>←</span></button>`;
  $("#modal").classList.remove("hidden");
  $$("[data-circuit]").forEach(
    (button) =>
      (button.onclick = () => {
        buildTrack(+button.dataset.circuit);
        setPage("play");
      }),
  );
  $("#close-circuits").onclick = () => $("#modal").classList.add("hidden");
}
$("#all-circuits").onclick = chooseCircuit;
$("#paint-options").innerHTML = paints
  .map(
    (p, i) =>
      `<button data-paint="${i}" style="background:#${p[1].toString(16)}" title="${p[0]}" aria-label="${p[0]}"></button>`,
  )
  .join("");
$$("[data-paint]").forEach(
  (b) =>
    (b.onclick = () => {
      state.paint = +b.dataset.paint;
      paintCar();
    }),
);
$$("[data-chassis]").forEach(
  (b) =>
    (b.onclick = () => {
      state.chassis = b.dataset.chassis;
      chassisUI();
      save();
    }),
);
$$("[data-page]").forEach((b) => (b.onclick = () => setPage(b.dataset.page)));
$(".brand").onclick = (e) => {
  e.preventDefault();
  setPage("play");
};
$("#start-btn").onclick = startRace;
$("#prev-track").onclick = () => {
  buildTrack((state.track + tracks.length - 1) % tracks.length);
  setPage("play");
};
$("#next-track").onclick = () => {
  buildTrack((state.track + 1) % tracks.length);
  setPage("play");
};
$("#garage-done").onclick = () => setPage("play");
$("#guide-done").onclick = () => setPage("play");
$("#pause-btn").onclick = pause;
$("#settings-btn").onclick = settings;
$("#sound-btn").onclick = toggleSound;
window.addEventListener("keydown", (e) => {
  if (
    [
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "Space",
      "Tab",
    ].includes(e.code) &&
    state.mode !== "menu"
  )
    e.preventDefault();
  if (e.repeat) {
    keys.add(e.code);
    return;
  }
  keys.add(e.code);
  if (
    e.code === "Enter" &&
    state.mode === "menu" &&
    $("#modal").classList.contains("hidden")
  )
    startRace();
  if (e.code === "Escape") {
    if (!$("#modal").classList.contains("hidden") && state.mode === "menu")
      $("#modal").classList.add("hidden");
    else pause();
  }
  if (e.code === "Space") usePower();
  if (e.code === "KeyR") resetCar();
  if (e.code === "KeyM") toggleSound();
  if (e.code === "KeyF") {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen?.().catch(() => {});
  }
});
window.addEventListener("keyup", (e) => keys.delete(e.code));
window.addEventListener("blur", () => {
  keys.clear();
  if (state.mode === "race" || state.mode === "countdown") pause();
});
document.addEventListener("visibilitychange", () => {
  if (document.hidden && (state.mode === "race" || state.mode === "countdown"))
    pause();
});
$$("[data-key]").forEach((b) => {
  b.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    b.setPointerCapture(e.pointerId);
    keys.add(b.dataset.key);
    if (b.dataset.key === "Space") usePower();
  });
  for (let ev of ["pointerup", "pointercancel", "lostpointercapture"])
    b.addEventListener(ev, () => keys.delete(b.dataset.key));
});
window.addEventListener("resize", () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
  cameraReady = false;
});
window.render_game_to_text = () =>
  JSON.stringify({
    mode: state.mode,
    page: state.page,
    track: world.cfg.name,
    trackCount: tracks.length,
    surface: world.cfg.surface || "CLASSIC TARMAC",
    audio: audio
      ? audio.snapshot()
      : { unlocked: false, muted: state.muted, mix: state.mix },
    coordinateSystem:
      "s is meters forward around the closed circuit; lane is meters right of center; y is up",
    trackLength: +world.length.toFixed(1),
    raceTime: +state.time.toFixed(2),
    countdown: +state.countdown.toFixed(2),
    lap: Math.min(3, Math.floor(Math.max(0, player.s) / world.length) + 1),
    position: rankings().indexOf(player) + 1,
    player: {
      s: +player.s.toFixed(2),
      lane: +player.lane.toFixed(2),
      speedKmh: Math.round(player.speed * 3.1),
      spin: +player.spin.toFixed(2),
      collisions: player.collisionCount,
      impactYaw: +(player.impactYaw || 0).toFixed(3),
      impulseLane: +(player.impulseLane || 0).toFixed(3),
      wallScrape: player.wallScrape,
    },
    drift: +state.drift.toFixed(2),
    boost: +state.boost.toFixed(2),
    shield: +state.shield.toFixed(2),
    power:
      state.power === null
        ? null
        : ["turbo", "rocket", "shield", "oil"][state.power],
    powerLevel: state.powerLevel,
    paint: paints[state.paint][0],
    chassis: state.chassis,
    difficulty: state.difficulty,
    lapTimes: state.lapTimes,
    finishRank: state.finishRank,
    rivals: cars.slice(1).map((c) => ({
      name: c.name,
      s: +c.s.toFixed(1),
      lane: +c.lane.toFixed(1),
      speed: +c.speed.toFixed(1),
      spin: +c.spin.toFixed(1),
      finished: c.finished,
    })),
    nearbyPickups: world.pickups
      .filter(
        (p) =>
          p.cooldown <= 0 &&
          relative(p.s, player.s) > -5 &&
          relative(p.s, player.s) < 65,
      )
      .map((p) => ({
        ahead: +relative(p.s, player.s).toFixed(1),
        lane: p.lane,
        type: ["turbo", "rocket", "shield", "oil"][p.type],
      })),
    rockets: rockets.length,
    oilSlicks: oils.length,
  });
window.advanceTime = (ms) => {
  manualUntil = performance.now() + 100;
  let steps = Math.max(1, Math.round(ms / (1000 / 60)));
  for (let i = 0; i < steps; i++) update(1 / 60);
  renderer.render(scene, camera);
};
// Debug access is opt-in for deterministic integration tests, and absent in normal play.
if (new URLSearchParams(location.search).has("test"))
  window.__raceTest = {
    setPlayer: (values) => Object.assign(player, values),
    setRival: (index, values) => Object.assign(cars[index], values),
    setState: (values) => Object.assign(state, values),
    givePower: (type, level = 1) => {
      state.power = type;
      state.powerLevel = level;
    },
    getWorld: () => ({
      length: world.length,
      pickups: world.pickups.map(({ s, lane, type }) => ({ s, lane, type })),
      boostPads: world.boostPads,
      obstacles: world.obstacles,
      wallLimit: world.wallLimitAt(player.s),
    }),
    loadTrack: (index) => {
      buildTrack(index);
      setPage("play");
    },
    audioEngine: () => audio,
    start: startRace,
    hit: () => hit(player),
  };
buildTrack(0);
setPage("play");
paintCar();
chassisUI();
updateSound();
applyQuality();
updateCamera(0.016);
renderer.render(scene, camera);
$("#loading").classList.add("hidden");
function frame(now) {
  requestAnimationFrame(frame);
  const dt = Math.min(0.04, Math.max(0, (now - lastNow) / 1000));
  lastNow = now;
  if (now > manualUntil && !window.__raceTest) update(dt);
  renderer.render(scene, camera);
}
requestAnimationFrame(frame);

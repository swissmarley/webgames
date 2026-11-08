import { chromium } from "playwright";
import assert from "node:assert/strict";
import fs from "node:fs";
fs.mkdirSync("output/upgrade", { recursive: true });
const browser = await chromium.launch({
  headless: true,
  args: [
    "--use-gl=angle",
    "--use-angle=swiftshader",
    "--enable-unsafe-swiftshader",
  ],
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } }),
  errors = [],
  checks = [];
page.on("pageerror", (e) => errors.push(e.message));
const check = (label, result) => {
  assert(result, label);
  checks.push(label);
  console.log("PASS", label);
};
const state = () =>
  page.evaluate(() => JSON.parse(window.render_game_to_text()));
const step = (ms) => page.evaluate((ms) => window.advanceTime(ms), ms);
const snap = async (name) => {
  await page.waitForTimeout(450);
  await page.screenshot({ path: `output/upgrade/${name}.png` });
};
const seed = (values) =>
  page.evaluate((v) => window.__raceTest.setPlayer(v), values);
const reset = async () => {
  await page.evaluate(() => window.__raceTest.start());
  await step(3550);
  await page.evaluate(() => {
    for (let i = 1; i < 6; i++)
      window.__raceTest.setRival(i, { s: 300 + i * 40, lane: 0, speed: 0 });
  });
};
await page.goto((process.env.BASE_URL || "http://127.0.0.1:5174") + "/?test");
await page.waitForFunction(() => window.__raceTest);
check("Six stages are registered", (await state()).trackCount === 6);
await page.click("#all-circuits");
check(
  "All six stage choices are visible",
  (await page.locator("[data-circuit]").count()) === 6,
);
await snap("stage-picker");
await page.click('[data-circuit="3"]');
check(
  "Direct stage selection works",
  (await state()).track === "Frostbite Pass",
);
await page.click("#prev-track");
check(
  "Previous-stage navigation works",
  (await state()).track === "Lunar Launchpad",
);
await page.click("#settings-btn");
await page.selectOption("#audio", "on");
for (const [key, value] of [
  ["master", 65],
  ["engine", 72],
  ["effects", 85],
  ["music", 18],
])
  await page.locator("#mix-" + key).evaluate((el, value) => {
    el.value = value;
    el.dispatchEvent(new Event("input", { bubbles: true }));
  }, value);
await snap("sound-mixer");
await page.click("#settings-done");
await page.reload();
await page.waitForFunction(() => window.__raceTest);
check(
  "Sound mix persists after reload",
  (await state()).audio.mix.engine === 0.72 &&
    (await state()).audio.mix.music === 0.18,
);
await page.click("#start-btn");
await step(3550);
check("Sound unlocks on user interaction", (await state()).audio.unlocked);
await page.keyboard.down("ArrowUp");
await step(3000);
await page.keyboard.up("ArrowUp");
let a = await state();
check(
  "Engine responds with RPM and gear shifts",
  a.audio.rpm > 2000 && a.audio.gear >= 3 && (a.audio.events.shift || 0) > 0,
);
await page.waitForTimeout(150);
check(
  "Audio graph produces non-silent output",
  (await state()).audio.peak > 0.0001,
);
await page.keyboard.press("KeyM");
await page.waitForTimeout(300);
check(
  "Mute silences the output",
  (await state()).audio.muted && (await state()).audio.peak < 0.0001,
);
await page.keyboard.press("KeyM");
await page.keyboard.press("Escape");
await step(17);
await page.waitForTimeout(650);
check("Pause fades all continuous sound", (await state()).audio.peak < 0.0005);
await page.click("#race-settings-btn");
check(
  "Mixer accessible from pause menu",
  await page.locator("#mix-master").isVisible(),
);
await page.click("#settings-done");
await reset();
await seed({ s: 100, lane: 0, speed: 48, laneVel: 0 });
await page.evaluate(() =>
  window.__raceTest.setRival(1, { s: 104, lane: 0, speed: 10 }),
);
await step(17);
a = await state();
check(
  "Rear impact triggers feedback and loses appropriate speed",
  a.player.collisions >= 1 &&
    a.player.speedKmh < 145 &&
    (a.audio.events.impact || 0) > 0,
);
await snap("rear-impact");
await reset();
await seed({ s: 100, lane: 1, speed: 40, laneVel: 12 });
await page.evaluate(() =>
  window.__raceTest.setRival(1, { s: 100, lane: 3.5, speed: 40 }),
);
await step(17);
a = await state();
check(
  "Sideswipe deflects the kart without stopping it",
  a.player.impulseLane < 0 && a.player.speedKmh > 105,
);
await step(1000);
check(
  "Impact rotation recovers",
  Math.abs((await state()).player.impactYaw) < 0.1,
);
await reset();
await seed({ s: 100, lane: 12.7, speed: 40, laneVel: 13 });
await step(17);
a = await state();
check(
  "Visible guardrail contains and rebounds the kart",
  a.player.lane <= 12.59 && a.player.impulseLane < 0 && a.player.collisions > 0,
);
await snap("barrier-impact");
await page.keyboard.down("ArrowLeft");
await step(500);
await page.keyboard.up("ArrowLeft");
check("Player can steer away from a barrier", (await state()).player.lane < 11);
await reset();
let w = await page.evaluate(() => window.__raceTest.getWorld());
const obstacle = w.obstacles.find((o) => o.kind === "crate");
await seed({ s: obstacle.s - 3.1, lane: obstacle.lane, speed: 55, laneVel: 0 });
await step(17);
check(
  "Trackside crate stops a direct hit",
  (await state()).player.speedKmh < 20 && (await state()).player.collisions > 0,
);
await snap("crate-impact");
await reset();
w = await page.evaluate(() => window.__raceTest.getWorld());
const tunnel = w.obstacles.find((o) => o.kind === "tunnel wall");
await seed({
  s: tunnel.s - tunnel.halfLength - 1.8,
  lane: tunnel.lane,
  speed: 48,
  laneVel: 0,
});
await step(17);
check(
  "Tunnel entrance has a solid collision face",
  (await state()).player.speedKmh < 25,
);
await page.keyboard.press("KeyR");
check(
  "Reset clears collision impulses",
  (await state()).player.impulseLane === 0 &&
    (await state()).player.impactYaw === 0,
);
const races = [];
for (const [index, name] of [
  [3, "Frostbite Pass"],
  [4, "Jungle Run"],
  [5, "Ember Ridge"],
]) {
  await page.evaluate((index) => window.__raceTest.loadTrack(index), index);
  await step(17);
  check(name + " selects correct environment", (await state()).track === name);
  await snap(name.replaceAll(" ", "-").toLowerCase() + "-menu");
  await page.evaluate(() => window.__raceTest.start());
  await step(3550);
  await page.keyboard.down("ArrowUp");
  await step(3500);
  await snap(name.replaceAll(" ", "-").toLowerCase() + "-race");
  for (let i = 0; i < 230; i++) {
    a = await state();
    if (a.mode === "finished") break;
    if (a.player.lane > 2) await page.keyboard.down("ArrowLeft");
    else if (a.player.lane < -2) await page.keyboard.down("ArrowRight");
    await step(500);
    await page.keyboard.up("ArrowLeft");
    await page.keyboard.up("ArrowRight");
    if ((await state()).power !== null) await page.keyboard.press("Space");
  }
  await page.keyboard.up("ArrowUp");
  a = await state();
  check(
    name + " completes a full three-lap race",
    a.mode === "finished" && a.lapTimes.length === 3,
  );
  races.push({
    name,
    time: a.raceTime,
    position: a.position,
    collisions: a.player.collisions,
  });
  await page.click("#menu-btn");
}
await page.click("#next-track");
check(
  "Next-stage navigation wraps from six to one",
  (await state()).track === "Buccaneer Bay",
);
await page.setViewportSize({ width: 390, height: 844 });
await page.click("#all-circuits");
await snap("mobile-stage-picker");
check(
  "Six-stage picker fits mobile viewport",
  await page.locator('[data-circuit="5"]').isVisible(),
);
await page.click('[data-circuit="5"]');
await page.click("#settings-btn");
await snap("mobile-mixer");
check(
  "Sound mixer fits mobile viewport",
  await page.locator("#mix-music").isVisible(),
);
// Render actual PCM from the same sound engine, including effects at full mix.
const audioSource = fs.readFileSync("src/audio.js", "utf8");
const audioResult = await page.evaluate(async (source) => {
  const { RaceAudio } = await import(
    "data:text/javascript;base64," + btoa(source)
  );
  const ctx = new OfflineAudioContext(2, 44100 * 10, 44100),
    sound = new RaceAudio(ctx, {
      master: 1,
      engine: 1,
      effects: 1,
      music: 0.45,
    });
  await sound.ready;
  if (sound.sampleStatus !== "ready")
    throw new Error("Recording failed to load");
  for (let i = 0; i < 600; i++) {
    let t = i / 60;
    sound.update(
      1 / 60,
      {
        mode: t < 0.6 ? "countdown" : t > 8.7 ? "finished" : "race",
        speed: Math.min(65, t * 10),
        throttle: true,
        drift: t > 3 && t < 4 ? 1 : 0,
        boost: t > 4 && t < 5 ? 1 : 0,
        offroad: t > 5 && t < 6,
        theme: "pirate",
      },
      t,
    );
  }
  for (const [name, t] of [
    ["countdown", 0.1],
    ["go", 0.6],
    ["pickup", 2],
    ["boost", 4],
    ["impact", 6],
    ["rocket", 6.3],
    ["explosion", 6.7],
    ["shield", 7.5],
    ["finish", 8.7],
  ])
    sound.event(name, { strength: 1 }, t);
  const buffer = await ctx.startRendering();
  let peak = 0,
    total = 0,
    clipped = 0;
  const left = buffer.getChannelData(0),
    right = buffer.getChannelData(1);
  const pcm = new Int16Array(left.length * 2);
  for (let i = 0; i < left.length; i++) {
    peak = Math.max(peak, Math.abs(left[i]), Math.abs(right[i]));
    total += left[i] * left[i] + right[i] * right[i];
    if (Math.abs(left[i]) >= 0.99 || Math.abs(right[i]) >= 0.99) clipped++;
    pcm[i * 2] = Math.max(-32768, Math.min(32767, left[i] * 32767));
    pcm[i * 2 + 1] = Math.max(-32768, Math.min(32767, right[i] * 32767));
  }
  let binary = "";
  const bytes = new Uint8Array(pcm.buffer);
  for (let i = 0; i < bytes.length; i += 8192)
    binary += String.fromCharCode(...bytes.subarray(i, i + 8192));
  return {
    peak,
    rms: Math.sqrt(total / (left.length * 2)),
    clipped,
    pcm: btoa(binary),
  };
}, audioSource);
check(
  "Engine and effects render audible PCM without clipping",
  audioResult.rms > 0.005 &&
    audioResult.peak < 0.99 &&
    audioResult.clipped === 0,
);
const pcm = Buffer.from(audioResult.pcm, "base64"),
  header = Buffer.alloc(44);
header.write("RIFF");
header.writeUInt32LE(36 + pcm.length, 4);
header.write("WAVEfmt ", 8);
header.writeUInt32LE(16, 16);
header.writeUInt16LE(1, 20);
header.writeUInt16LE(2, 22);
header.writeUInt32LE(44100, 24);
header.writeUInt32LE(176400, 28);
header.writeUInt16LE(4, 32);
header.writeUInt16LE(16, 34);
header.write("data", 36);
header.writeUInt32LE(pcm.length, 40);
fs.writeFileSync(
  "output/upgrade/audio-preview.wav",
  Buffer.concat([header, pcm]),
);
delete audioResult.pcm;
check("No uncaught browser errors", errors.length === 0);
fs.writeFileSync(
  "output/upgrade/results.json",
  JSON.stringify({ checks, errors, races, audio: audioResult }, null, 2),
);
console.log(checks.length + " upgrade checks passed");
await browser.close();

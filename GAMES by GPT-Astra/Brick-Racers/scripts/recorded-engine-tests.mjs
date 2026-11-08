import { chromium } from "playwright";
import assert from "node:assert/strict";
import fs from "node:fs";
const browser = await chromium.launch({
  headless: true,
  args: [
    "--use-gl=angle",
    "--use-angle=swiftshader",
    "--enable-unsafe-swiftshader",
  ],
});
const page = await browser.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
await page.goto("http://127.0.0.1:5174/?test");
await page.click("#start-btn");
await page.waitForFunction(
  () => window.__raceTest.audioEngine()?.sampleStatus === "ready",
);
const result = await page.evaluate(async () => {
  const audio = window.__raceTest.audioEngine();
  const buffer = audio.motor.source.buffer;
  const frame = { mode: "race", speed: 0, throttle: false, theme: "pirate" };
  for (let i = 0; i < 120; i++) audio.update(1 / 60, frame);
  const idle = audio.snapshot();
  for (let i = 0; i < 240; i++)
    audio.update(1 / 60, { ...frame, speed: i / 4, throttle: true });
  const accelerating = audio.snapshot();
  const loadedCutoff = audio.motor.filter.frequency.value;
  for (let i = 0; i < 120; i++) audio.update(1 / 60, { ...frame, speed: 59 });
  return {
    idle,
    accelerating,
    channels: buffer.numberOfChannels,
    duration: buffer.duration,
    sampleRate: buffer.sampleRate,
    recorded: audio.motor.source instanceof AudioBufferSourceNode,
    rivalRecorded: audio.rival.source instanceof AudioBufferSourceNode,
  };
});
assert(result.recorded && result.rivalRecorded);
assert.equal(result.channels, 2);
assert(Math.abs(result.duration - 3.96) < 0.01);
assert(result.accelerating.playbackRate > result.idle.playbackRate);
assert(result.accelerating.gear === 5);
assert(result.accelerating.events.shift >= 4);
// Fail the cold preload, then restore networking and retry via the next gesture.
const recovery = await browser.newPage();
await recovery.route("**/audio/engine/engine-loop.wav", (route) =>
  route.abort(),
);
await recovery.goto("http://127.0.0.1:5174/?test");
await recovery.click("#settings-btn");
await recovery.waitForFunction(
  () => window.__raceTest.audioEngine()?.sampleStatus === "error",
);
await recovery.unroute("**/audio/engine/engine-loop.wav");
await recovery.click("#settings-done");
await recovery.click("#start-btn");
await recovery.waitForFunction(
  () => window.__raceTest.audioEngine()?.sampleStatus === "ready",
);
assert.equal(errors.length, 0);
fs.mkdirSync("output/recorded-engine", { recursive: true });
fs.writeFileSync(
  "output/recorded-engine/results.json",
  JSON.stringify({ result, recovery: true, errors }, null, 2),
);
console.log(
  "PASS real stereo recording, pitch, five gears, four shifts, failed-load recovery, no runtime errors",
);
await browser.close();

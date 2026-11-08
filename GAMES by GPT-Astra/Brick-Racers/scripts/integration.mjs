import { chromium } from "playwright";
import assert from "node:assert/strict";
import fs from "node:fs";
fs.mkdirSync("output/qa", { recursive: true });
const browser = await chromium.launch({
  headless: true,
  args: [
    "--use-gl=angle",
    "--use-angle=swiftshader",
    "--enable-unsafe-swiftshader",
  ],
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [],
  checks = [];
page.on("pageerror", (e) => errors.push(e.message));
const state = () =>
  page.evaluate(() => JSON.parse(window.render_game_to_text()));
const step = (ms) => page.evaluate((ms) => window.advanceTime(ms), ms);
const check = (label, condition) => {
  assert(condition, label);
  checks.push(label);
  console.log("PASS", label);
};
const snap = (name) => page.screenshot({ path: `output/qa/${name}.png` });
const seed = (values) =>
  page.evaluate((v) => window.__raceTest.setPlayer(v), values);
const start = async () => {
  await page.evaluate(() => window.__raceTest.start());
  await step(3550);
};
await page.goto((process.env.BASE_URL || "http://localhost:5173") + "/?test");
await page.waitForFunction(() => window.__raceTest);
await step(17);
await snap("menu");
check("Menu ready", (await state()).mode === "menu");
await page.click('[data-page="garage"]');
await page.click('[data-paint="1"]');
await page.click('[data-chassis="grip"]');
await step(17);
check(
  "Garage paint and chassis applied",
  (await state()).paint === "OCEAN RUNNER" &&
    (await state()).chassis === "grip",
);
await snap("garage");
await page.reload();
await page.waitForFunction(() => window.__raceTest);
check(
  "Garage preferences persist",
  (await state()).paint === "OCEAN RUNNER" &&
    (await state()).chassis === "grip",
);
await page.click('[data-page="garage"]');
await page.click('[data-paint="0"]');
await page.click('[data-chassis="balanced"]');
await page.click("#garage-done");
await page.click('[data-page="guide"]');
check("Help opens", await page.locator(".guide-box").isVisible());
await page.click("#guide-done");
await page.click("#settings-btn");
await page.selectOption("#difficulty", "easy");
await page.selectOption("#quality", "low");
await page.selectOption("#audio", "off");
await page.click("#settings-done");
check("Settings apply", (await state()).difficulty === "easy");
await page.click("#settings-btn");
await page.selectOption("#difficulty", "normal");
await page.selectOption("#quality", "high");
await page.click("#settings-done");
await page.click("#start-btn");
check("Countdown begins", (await state()).mode === "countdown");
await step(3550);
check("Countdown enters race", (await state()).mode === "race");
await page.keyboard.down("ArrowUp");
await step(3000);
let a = await state();
check(
  "Acceleration moves player forward",
  a.player.speedKmh > 110 && a.player.s > 50,
);
await snap("race");
await page.keyboard.down("ArrowRight");
await step(300);
await page.keyboard.up("ArrowRight");
let right = (await state()).player.lane;
check("Right steering moves right", right > a.player.lane + 1);
await page.keyboard.down("ArrowLeft");
await step(600);
await page.keyboard.up("ArrowLeft");
check("Left steering moves left", (await state()).player.lane < right);
await page.keyboard.up("ArrowUp");
await page.keyboard.down("ArrowDown");
await step(1600);
await page.keyboard.up("ArrowDown");
check("Brake then reverse", (await state()).player.speedKmh <= 31);
await page.keyboard.press("KeyR");
check(
  "Reset restores center lane",
  Math.abs((await state()).player.lane) < 0.01,
);
await page.keyboard.press("Escape");
a = await state();
await step(3000);
check(
  "Pause freezes race time",
  (await state()).mode === "paused" && (await state()).raceTime === a.raceTime,
);
await page.click("#resume-btn");
check("Resume restores race", (await state()).mode === "race");
await seed({ s: 50, lane: 0, laneVel: 0, speed: 35 });
await page.keyboard.down("ArrowUp");
await page.keyboard.down("ShiftLeft");
await page.keyboard.down("ArrowRight");
await step(900);
check("Drifting charges boost", (await state()).drift > 0.65);
await snap("drift");
await page.keyboard.up("ShiftLeft");
await page.keyboard.up("ArrowRight");
await step(17);
check("Releasing drift awards turbo", (await state()).boost > 0);
await page.keyboard.up("ArrowUp");
await start();
let world = await page.evaluate(() => window.__raceTest.getWorld());
for (let pick of world.pickups.filter((p) => p.type === 0).slice(0, 3)) {
  await seed({ s: pick.s, lane: pick.lane, speed: 0, laneVel: 0 });
  await step(17);
}
a = await state();
check(
  "Matching bricks stack to level three",
  a.power === "turbo" && a.powerLevel === 3,
);
await page.keyboard.press("Space");
check(
  "Turbo consumed and activated",
  (await state()).power === null && (await state()).boost > 4,
);
await page.evaluate(() => window.__raceTest.givePower(2, 3));
await page.keyboard.press("Space");
check("Shield duration scales with level", (await state()).shield === 12);
await page.evaluate(() => window.__raceTest.hit());
check(
  "Shield blocks incoming damage",
  (await state()).shield === 0 && (await state()).player.spin === 0,
);
await page.evaluate(() => window.__raceTest.hit());
check("Unshielded hits spin the kart", (await state()).player.spin > 0);
await start();
await seed({ s: 30, lane: 0, speed: 0, laneVel: 0 });
await page.evaluate(() => {
  window.__raceTest.setRival(1, { s: 45, lane: 0, speed: 0 });
  window.__raceTest.givePower(1, 1);
});
await page.keyboard.press("Space");
check("Rocket launches", (await state()).rockets === 1);
await step(200);
check(
  "Rocket hits a rival",
  (await state()).rivals.some((r) => r.spin > 0),
);
await page.evaluate(() => window.__raceTest.givePower(3, 3));
await page.keyboard.press("Space");
check("Level three oil deploys three hazards", (await state()).oilSlicks >= 3);
await start();
world = await page.evaluate(() => window.__raceTest.getWorld());
await seed({ s: world.boostPads[0].s, lane: 0, speed: 30 });
await step(17);
check("Track boost pads trigger turbo", (await state()).boost > 0);
await seed({ s: world.length - 0.1, lane: 0, speed: 30 });
await step(17);
check(
  "Crossing finish increments lap",
  (await state()).lap === 2 && (await state()).lapTimes.length === 1,
);
// Run a complete race using acceleration and lane feedback, with no progress teleportation.
await start();
await page.keyboard.down("ArrowUp");
for (let i = 0; i < 190; i++) {
  a = await state();
  if (a.mode === "finished") break;
  if (a.player.lane > 3) await page.keyboard.down("ArrowLeft");
  else if (a.player.lane < -3) await page.keyboard.down("ArrowRight");
  await step(600);
  await page.keyboard.up("ArrowLeft");
  await page.keyboard.up("ArrowRight");
  if ((await state()).power !== null) await page.keyboard.press("Space");
}
await page.keyboard.up("ArrowUp");
a = await state();
check(
  "Complete three-lap race reaches results",
  a.mode === "finished" &&
    a.lapTimes.length === 3 &&
    a.finishRank >= 1 &&
    a.finishRank <= 6,
);
check("Result buttons visible", await page.locator("#again-btn").isVisible());
await snap("results");
await page.click("#again-btn");
check(
  "Race can restart",
  (await state()).mode === "countdown" && (await state()).raceTime === 0,
);
await step(3550);
await page.keyboard.press("Escape");
await page.click("#exit-btn");
check("Exit returns to menu", (await state()).mode === "menu");
for (let name of ["Sunstone Speedway", "Lunar Launchpad"]) {
  await page.click("#next-track");
  await step(17);
  check(name + " loads", (await state()).track === name);
  await snap(name.startsWith("Sunstone") ? "desert" : "lunar");
  await start();
  await page.keyboard.down("ArrowUp");
  await step(5500);
  await page.keyboard.up("ArrowUp");
  check(name + " is driveable", (await state()).player.s > 100);
  await snap(name.startsWith("Sunstone") ? "desert-race" : "lunar-race");
  await page.keyboard.press("Escape");
  await page.click("#exit-btn");
}
await page.setViewportSize({ width: 390, height: 844 });
await step(17);
await snap("mobile");
check(
  "Mobile menu fits viewport",
  await page.evaluate(() =>
    [...document.querySelectorAll("header button")].every((button) => {
      const bounds = button.getBoundingClientRect();
      return bounds.left >= 0 && bounds.right <= innerWidth;
    }),
  ),
);
await page.click("#start-btn");
await step(3550);
check(
  "Touch controls visible",
  await page.locator("#touch-controls").isVisible(),
);
await snap("mobile-race");
const accelerator = await page.locator('[data-key="ArrowUp"]').boundingBox();
await page.mouse.move(
  accelerator.x + accelerator.width / 2,
  accelerator.y + accelerator.height / 2,
);
await page.mouse.down();
await step(1500);
await page.mouse.up();
check(
  "Touch accelerator drives the kart",
  (await state()).player.speedKmh > 70,
);
await page.keyboard.press("Escape");
await page.click("#exit-btn");
await page.setViewportSize({ width: 844, height: 390 });
await step(17);
await snap("landscape");
check(
  "Landscape race button is reachable",
  await page.locator("#start-btn").isVisible(),
);
check("No uncaught browser errors", errors.length === 0);
fs.writeFileSync(
  "output/qa/results.json",
  JSON.stringify({ checks, errors, fullRace: a }, null, 2),
);
console.log(`${checks.length} integration checks passed`);
await browser.close();

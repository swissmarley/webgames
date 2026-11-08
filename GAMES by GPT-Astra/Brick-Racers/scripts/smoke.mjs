import { chromium } from "playwright";
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
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
await page.goto("http://localhost:5173/?test");
await page.waitForFunction(() => window.render_game_to_text);
await page.screenshot({ path: "output/qa/menu.png" });
await page.click("#start-btn");
await page.evaluate(() => window.advanceTime(3600));
await page.keyboard.down("ArrowUp");
await page.evaluate(() => window.advanceTime(4500));
await page.keyboard.up("ArrowUp");
await page.screenshot({ path: "output/qa/race.png" });
console.log(await page.evaluate(() => window.render_game_to_text()));
console.log({ errors });
await browser.close();

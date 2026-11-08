import {chromium} from 'playwright';
import assert from 'node:assert/strict';
const browser=await chromium.launch({headless:true,args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const page=await browser.newPage({viewport:{width:1440,height:900}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto('http://127.0.0.1:5174/?test');await page.waitForFunction(()=>window.__raceTest);
for(const [index,kind] of [[0,'start gantry'],[4,'stone arch']]){
 await page.evaluate(index=>{window.__raceTest.loadTrack(index);window.__raceTest.start();window.advanceTime(3550);for(let i=1;i<6;i++)window.__raceTest.setRival(i,{s:500+i*30,lane:0,speed:0});},index);
 await page.evaluate(kind=>{const o=window.__raceTest.getWorld().obstacles.find(o=>o.kind===kind);window.__raceTest.setPlayer({s:o.s-o.halfLength-1.9,lane:o.lane,speed:45,laneVel:0});window.advanceTime(17)},kind);
 const state=await page.evaluate(()=>JSON.parse(window.render_game_to_text()));assert(state.player.collisions>0&&state.player.speedKmh<30);console.log('PASS solid '+kind);
}
await page.evaluate(()=>{window.__raceTest.loadTrack(5);window.advanceTime(17)});await page.waitForTimeout(500);assert(!await page.locator('#toast').evaluate(e=>e.classList.contains('show')));await page.screenshot({path:'output/upgrade/final-ember-menu.png'});console.log('PASS menu clears race effects');
await page.click('#start-btn');await page.evaluate(()=>window.advanceTime(3550));await page.keyboard.down('ArrowUp');await page.evaluate(()=>window.advanceTime(3500));await page.keyboard.up('ArrowUp');await page.waitForTimeout(500);await page.screenshot({path:'output/upgrade/final-ember-race.png'});assert.equal(errors.length,0);console.log('PASS final production smoke test');await browser.close();

import assert from "node:assert/strict";
import {
  resetContactState,
  resolveCarContacts,
  resolveTrackContacts,
  integrateContactMotion,
  sweptHit,
  trackDelta,
} from "../src/physics.js";
const results = [];
const test = (name, fn) => {
  fn();
  results.push(name);
  console.log("PASS", name);
};
const car = (s = 0, lane = 0, speed = 20, laneVel = 0, mass = 1) => {
  let c = { s, lane, speed, laneVel, mass };
  resetContactState(c);
  return c;
};
const world = { length: 1000, wallLimitAt: () => 14, obstacles: [] };
test("Rear impact transfers momentum and separates the karts", () => {
  let a = car(0, 0, 45),
    b = car(3.6, 0, 15);
  resolveCarContacts([a, b], 1000);
  assert(a.speed < 45 && b.speed > 15);
  assert(Math.abs(a.speed + b.speed - 60) < 1e-8);
  assert(b.s - a.s >= 4.24);
});
test("Equal-speed overlap resolves without artificial slowdown", () => {
  let a = car(0, 0, 40),
    b = car(3, 0, 40);
  resolveCarContacts([a, b], 1000);
  assert.equal(a.speed, 40);
  assert.equal(b.speed, 40);
  assert.equal(a.collisionCount, 0);
});
test("Side swipe preserves forward motion and deflects laterally", () => {
  let a = car(0, 0, 40, 9),
    b = car(0, 2.5, 40);
  resolveCarContacts([a, b], 1000);
  assert.equal(a.speed, 40);
  assert.equal(b.speed, 40);
  assert(a.impulseLane < 0 && b.impulseLane > 0);
  assert(b.lane - a.lane >= 2.84);
});
test("Car contacts work across the lap seam", () => {
  let a = car(998, 0, 45),
    b = car(1, 0, 20);
  resolveCarContacts([a, b], 1000);
  assert(a.speed < 45);
  assert(Math.abs(trackDelta(b.s, a.s, 1000)) >= 4.24);
});
test("All rival pairs also collide", () => {
  let a = car(100, -5),
    b = car(0, 0, 45),
    c = car(3.5, 0, 10);
  resolveCarContacts([a, b, c], 1000);
  assert(b.speed < 45 && c.speed > 10);
});
test("Head-on collision does not add kinetic energy", () => {
  let a = car(0, 0, 45),
    b = car(3, 0, -10);
  let before = a.speed ** 2 + b.speed ** 2;
  resolveCarContacts([a, b], 1000);
  assert(a.speed ** 2 + b.speed ** 2 <= before);
});
test("Wall impact reflects lateral motion and remains inside geometry", () => {
  let a = car(0, 13, 40, 12);
  resolveTrackContacts(a, world, 1 / 120);
  assert(a.lane <= 12.58);
  assert(a.laneVel + a.impulseLane < 0);
  assert(a.speed < 40 && a.speed > 20);
  assert.equal(a.collisionCount, 1);
});
test("Repeated wall rubbing is bounded and steering away releases contact", () => {
  let a = car(0, 13, 40, 12);
  resolveTrackContacts(a, world, 1 / 120);
  a.laneVel = -8;
  integrateContactMotion(a, 0.05);
  resolveTrackContacts(a, world, 0.05);
  assert(a.lane < 12.58);
  assert(a.speed > 20);
});
test("Trackside crate stops a direct high-speed impact", () => {
  let a = car(97, 11, 70);
  resolveTrackContacts(
    a,
    {
      ...world,
      obstacles: [
        { s: 100, lane: 11, halfWidth: 1.25, halfLength: 1.25, kind: "crate" },
      ],
    },
    1 / 120,
  );
  assert(a.speed < 0);
  assert(a.s < 96.7);
});
test("Contact feedback cooldown never disables overlap correction", () => {
  let a = car(0, 0),
    b = car(3, 0);
  a.contactCooldown = b.contactCooldown = 1;
  resolveCarContacts([a, b], 1000);
  assert(b.s - a.s >= 4.24);
});
test("Impact yaw settles rather than accumulating forever", () => {
  let a = car();
  a.yawVelocity = 2;
  for (let i = 0; i < 360; i++) integrateContactMotion(a, 1 / 120);
  assert(Math.abs(a.impactYaw) < 0.001);
});
test("Swept rockets hit crossed targets and respect lateral misses", () => {
  assert(sweptHit(-9, 9, 0));
  assert(!sweptHit(-9, 9, 8));
  assert(!sweptHit(9, 15, 0));
});
console.log(results.length + " physics checks passed");

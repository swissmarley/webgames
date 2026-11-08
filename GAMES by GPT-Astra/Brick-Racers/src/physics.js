export const CAR_HALF_WIDTH = 1.42;
export const CAR_HALF_LENGTH = 2.12;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
export function trackDelta(a, b, length) {
  return ((((a - b + length / 2) % length) + length) % length) - length / 2;
}
export function resetContactState(car) {
  car.mass = car.mass || 1;
  car.impulseLane = 0;
  car.impactYaw = 0;
  car.yawVelocity = 0;
  car.collisionCount = 0;
  car.contactCooldown = 0;
  car.wallScrape = 0;
}
export function integrateContactMotion(car, dt) {
  car.lane += (car.impulseLane || 0) * dt;
  car.impulseLane *= Math.exp(-dt * 4.2);
  car.yawVelocity *= Math.exp(-dt * 8);
  car.impactYaw =
    clamp((car.impactYaw || 0) + (car.yawVelocity || 0) * dt, -0.6, 0.6) *
    Math.exp(-dt * 5);
  car.contactCooldown = Math.max(0, (car.contactCooldown || 0) - dt);
  car.wallScrape = Math.max(0, (car.wallScrape || 0) - dt);
}
/** Resolve all pairs symmetrically. Position correction does not depend on impact cooldown. */
export function resolveCarContacts(cars, length, onImpact = () => {}) {
  for (let pass = 0; pass < 3; pass++)
    for (let i = 0; i < cars.length; i++)
      for (let j = i + 1; j < cars.length; j++) {
        const a = cars[i],
          b = cars[j];
        if (a.finished || b.finished) continue;
        const ds = trackDelta(b.s, a.s, length),
          dx = b.lane - a.lane;
        const depthS = CAR_HALF_LENGTH * 2 - Math.abs(ds),
          depthX = CAR_HALF_WIDTH * 2 - Math.abs(dx);
        if (depthS <= 0 || depthX <= 0) continue;
        const lateral = depthX < depthS,
          n = (lateral ? Math.sign(dx) : Math.sign(ds)) || 1;
        const ia = 1 / (a.mass || 1),
          ib = 1 / (b.mass || 1),
          sum = ia + ib;
        const correction = ((lateral ? depthX : depthS) + 0.006) / sum;
        if (lateral) {
          a.lane -= n * correction * ia;
          b.lane += n * correction * ib;
        } else {
          a.s -= n * correction * ia;
          b.s += n * correction * ib;
        }
        const va = lateral ? a.laneVel + (a.impulseLane || 0) : a.speed,
          vb = lateral ? b.laneVel + (b.impulseLane || 0) : b.speed;
        const closing = (va - vb) * n;
        if (closing <= 0) continue;
        const impulse = Math.min(24, ((1 + 0.18) * closing) / sum);
        if (lateral) {
          a.impulseLane = (a.impulseLane || 0) - n * impulse * ia;
          b.impulseLane = (b.impulseLane || 0) + n * impulse * ib;
        } else {
          a.speed -= n * impulse * ia;
          b.speed += n * impulse * ib;
        }
        a.yawVelocity =
          (a.yawVelocity || 0) + (lateral ? -n : dx * 0.2) * impulse * 0.09;
        b.yawVelocity =
          (b.yawVelocity || 0) + (lateral ? n : -dx * 0.2) * impulse * 0.09;
        if (closing > 1.5 && a.contactCooldown <= 0 && b.contactCooldown <= 0) {
          a.collisionCount++;
          b.collisionCount++;
          a.contactCooldown = b.contactCooldown = 0.16;
          onImpact({
            a,
            b,
            strength: clamp(closing / 22, 0.12, 1),
            kind: "kart",
            pan: n,
          });
        }
      }
}
export function resolveTrackContacts(car, world, dt, onImpact = () => {}) {
  for (const obstacle of world.obstacles) {
    const ds = trackDelta(car.s, obstacle.s, world.length),
      dx = car.lane - obstacle.lane;
    const sx = CAR_HALF_WIDTH + obstacle.halfWidth,
      sz = CAR_HALF_LENGTH + obstacle.halfLength;
    if (Math.abs(ds) >= sz || Math.abs(dx) >= sx) continue;
    const lateral = sx - Math.abs(dx) < sz - Math.abs(ds),
      sign = (lateral ? Math.sign(dx) : Math.sign(ds)) || -1;
    let impact = 0;
    if (lateral) {
      car.lane = obstacle.lane + sign * (sx + 0.02);
      impact = Math.max(0, -sign * (car.laneVel + (car.impulseLane || 0)));
      car.impulseLane += sign * impact * 1.25;
      car.speed *= 0.95;
    } else {
      car.s += sign * (sz - Math.abs(ds) + 0.02);
      impact = Math.max(0, -sign * car.speed);
      if (impact > 0) car.speed = -car.speed * 0.12;
      car.impulseLane += (dx >= 0 ? 1 : -1) * Math.min(6, impact * 0.16);
    }
    if (impact > 1 && car.contactCooldown <= 0) {
      car.contactCooldown = 0.25;
      car.collisionCount++;
      car.yawVelocity += (dx >= 0 ? 1 : -1) * Math.min(2, impact * 0.07);
      onImpact({
        a: car,
        strength: clamp(impact / 38, 0.15, 1),
        kind: obstacle.kind,
        pan: Math.sign(dx),
      });
    }
  }
  const centerLimit = world.wallLimitAt(car.s) - CAR_HALF_WIDTH;
  if (Math.abs(car.lane) > centerLimit) {
    const side = Math.sign(car.lane),
      outward = (car.laneVel + (car.impulseLane || 0)) * side;
    car.lane = side * centerLimit;
    if (outward > 0) {
      car.impulseLane = (car.impulseLane || 0) - side * outward * 1.22;
      car.laneVel *= 0.55;
      car.speed *= 1 - Math.min(0.24, outward * 0.012);
      car.yawVelocity -= side * outward * 0.055;
    }
    car.wallScrape = 0.18;
    // Continuous sliding friction, not repeated collision impulses.
    car.speed *= Math.exp(-dt * 0.35);
    if (outward > 2 && car.contactCooldown <= 0) {
      car.contactCooldown = 0.22;
      car.collisionCount++;
      onImpact({
        a: car,
        strength: clamp(outward / 18, 0.1, 1),
        kind: "barrier",
        pan: side,
      });
    }
  }
}
/** Relative swept interval test catches projectiles even between simulation frames. */
export function sweptHit(
  previousDistance,
  currentDistance,
  lateralDistance,
  radius = 2.8,
) {
  return (
    Math.abs(lateralDistance) < 2.5 &&
    Math.min(previousDistance, currentDistance) <= radius &&
    Math.max(previousDistance, currentDistance) >= -radius
  );
}

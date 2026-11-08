# Brick Racers

An original, playable 3D brick kart racer inspired by the spirit of the 1999 classic. Built with Three.js and Vite. All cars, scenery, track meshes, signs, and pickups are generated in code.

## Play locally

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. For a production build:

```sh
npm run build
npm run preview
```

## Included

- Six circuits: Buccaneer Bay, Sunstone Speedway, Lunar Launchpad, Frostbite Pass, Jungle Run, and Ember Ridge. Choose directly from the stage picker or use the arrows.
- Snowy switchbacks with reduced grip, a jungle temple circuit, and a volcanic rim with glowing lava and drifting embers.
- Six-car, three-lap races, live standings, minimap, lap timing, finish results, and saved personal bests.
- Arcade driving with steering assistance, surface-dependent grip, braking/reverse, and off-road drag.
- Mass-aware impacts between every kart, overlap separation, solid guardrails and obstacles, glancing impacts, impact rotation and recovery, and camera feedback. Rocket hits use swept detection.
- Charged drifting with two boost tiers and track boost strips.
- Four power-ups that stack to three levels: turbo, homing rockets, shields, and oil slicks.
- Rivals that overtake, collect items, attack, and adapt their pace, with three difficulty settings.
- Six paint colors and three chassis setups. Preferences persist locally.
- Recorded WAV engine sound with smooth RPM-driven playback with five gears, shifts, tire squeal, road/wind noise, stereo rival engines, distinct impact and power-up effects, and an original procedural arcade soundtrack.
- Saved master, engine, effects, and music volume sliders in Settings, also available from the pause menu.
- Keyboard and touch controls, pause/restart, fullscreen, and performance settings.
- Batched static brick geometry, dynamic shadows, animated pickups, and particle effects.

## Controls

| Action               | Key                                         |
| -------------------- | ------------------------------------------- |
| Accelerate           | W / Up                                      |
| Steer                | A and D / Left and Right                    |
| Brake, then reverse  | S / Down                                    |
| Drift                | Hold Shift while steering, release to boost |
| Use power-up         | Space                                       |
| Reset to road center | R                                           |
| Pause/resume         | Escape                                      |
| Fullscreen           | F                                           |
| Mute/unmute          | M                                           |

Mobile browsers show touch controls during racing. Landscape orientation offers more space for the track.

## Verification

The integration suite exercises movement, reverse, drift boosts, garage persistence, settings, power-up stacking and effects, laps, an entire three-lap race, restart/exit, every circuit, and the mobile layout.

```sh
npx playwright install chromium
node scripts/physics-tests.mjs
node scripts/integration.mjs
BASE_URL=http://localhost:5173 node scripts/upgrade-tests.mjs
```

The upgrade suite checks the audio graph and mixer, renders a ten-second stereo audio preview without clipping, verifies collisions, and completes races on all three added stages. Artifacts are saved in `output/upgrade/`.

Run the Vite development server on port 5173 first. `scripts/game-client.mjs` is a local copy of the web-game skill's Playwright client, retained so it can resolve this project's Playwright dependency. `window.render_game_to_text()` exposes concise game state, and `window.advanceTime(ms)` supports deterministic stepping. The `?test` URL enables integration fixtures and disables automatic time advancement; it is not the normal play URL.

## Scope

This is a standalone reinterpretation, with original geometry and circuits. It does not reproduce the original game's assets, characters, licensed branding, full campaign, unrestricted brick editor, or multiplayer. Steering follows the course with player-controlled lateral handling; it is an arcade model rather than a free-roaming vehicle simulation.

Engine recording: [Car Engine Loop 96kHz, 4s by qubodup / Iwan Gabovitch](https://opengameart.org/content/car-engine-loop-96khz-4s), [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/). Adapted with filtering, loop crossfade, normalization and 48 kHz/24-bit conversion. Full attribution: `public/audio/engine/CREDITS.txt`. Rebuild the asset with `python3 scripts/prepare-engine.py`.

<div align="center">
  <img src="assets/swissmarley-logo.png" width="140" alt="Swissmarley Logo" />
  <h1>SWISSMARLEY // WEBGAMES OS</h1>
  <p><strong>Interactive Console Launcher & Web Arcade Collection</strong><br/>Inspired by EmulationStation, RetroArch XMB & Modern Console Decks</p>
  <p>
    <a href="https://swissmarley.github.io/webgames/"><strong>▶ PLAY LIVE ON GITHUB PAGES (swissmarley.github.io/webgames)</strong></a>
  </p>
</div>

---

## 🎮 Overview

**SWISSMARLEY // WEBGAMES OS** is an interactive console frontend and curated collection of **11 browser games & interactive 3D simulations** built with **Claude Opus 5.5** and **GPT-6 Astra**.

### ✨ Launcher Highlights
- **Interactive Swissmarley Boot Loader**: Features the `@swissmarley` cyber-circuit emblem with real-time Canvas2D PCB trace energy packets, magnetic cursor particles, 3D parallax tilt, and an interactive **Overclock / Hyper-Charge** mechanic (`Click` or hold `SPACE`).
- **Three Console View Modes (`V`)**:
  - **Console Deck View (`DECK`)**: Full-bleed dynamic color-graded backdrop, live telemetry showcase, interactive screenshot monitor, and bottom cartridge carousel dock.
  - **RetroArch Split View (`RETROARCH`)**: Classic dual-pane ROM table and technical inspector inspired by RetroArch Ozone & EmulationStation.
  - **Arcade Cabinet Wall (`GRID`)**: High-density museum grid of all 11 cartridges.
- **In-Console Game Runner**: Play any cartridge directly inside the launcher with a collapsible **RetroArch Quick Menu** (`Eject [F1]`, `Restart ROM`, `CRT Scanline Shader`, `Session Timer`, `Fullscreen`, or `Standalone Tab ↗`).
- **Full Input & Audio Support**: Procedural WebAudio UI synthesizer (`M` to mute), CRT scanline & cabinet shaders (`C`), persistent Favorites (`F`) & play history, plus full **Keyboard + HTML5 Gamepad API** navigation.

---

## 🕹️ Included Cartridges (11 Games)

### ⚡ GPT-6 Astra Core (`GAMES by GPT-Astra`)
| Code | Title | Genre | Renderer |
| :--- | :--- | :--- | :--- |
| `ASTRA-001` | **Brick Racers** | 3D Kart Racer | Three.js + Custom Physics + WebAudio |
| `ASTRA-002` | **VANTA PULSE** | Kinetic Rhythm Runner | Three.js + 128 BPM Procedural Synth |
| `ASTRA-003` | **ASCII DISTRICT** | First-Person ASCII Shooter | WebGL2 Real-Time ASCII Shader |
| `ASTRA-004` | **Voxel Vale** | 3D Voxel Sandbox | Three.js Procedural Voxel Engine |
| `ASTRA-005` | **Frostwake Fisheries** | Cozy 3D Winter Fishing | Three.js Isometric Diorama |
| `ASTRA-006` | **Red Light, Green Light** | 3D Survival Sprint | Three.js Crowd & Character Rig |
| `ASTRA-007` | **NOIR — The Social Casino** | Luxury Casino Lounge | Bespoke DOM + Physics Animation |
| `ASTRA-008` | **Sunwing Coast** | 3D Island Arcade Flyer | Three.js Tropical Shader |

### 🔶 Claude Opus 5.5 Core (`GAMES by Opus`)
| Code | Title | Genre | Renderer |
| :--- | :--- | :--- | :--- |
| `OPUS-001` | **Golden Miner** | 3D Mining Adventure | Three.js + Tripo 3D GLB |
| `OPUS-002` | **AEROS TF-9 Turbofan** | 3D Aerospace Simulation | Three.js + Procedural Mesh BVH |
| `OPUS-003` | **ASCII Ripple Field** | Generative Wave Toy | HTML5 2D Wave Equation Solver |

---

## ⌨️ Console Hotkeys

| Key / Button | Action |
| :--- | :--- |
| `←` `→` / `WASD` / `D-Pad` | Navigate cartridges |
| `ENTER` / `SPACE` / `Gamepad A` | Launch selected cartridge |
| `Q` / `E` / `L1` / `R1` | Switch System Core (`All`, `Astra`, `Opus`, `Favorites`, `Recent`) |
| `F` / `Gamepad Y` | Toggle Favorite (`★`) |
| `V` | Cycle View Mode (`Deck` → `RetroArch` → `Grid`) |
| `C` | Cycle CRT Shader (`Off` → `Scanlines` → `Cabinet`) |
| `I` | Open ROM Technical Specs & Controls Modal |
| `M` | Toggle Console UI Synth Audio |
| `/` | Focus Quick Search |
| `F1` | Eject active game & return to Console Launcher |

/**
 * ============================================================================
 * SWISSMARLEY // WEBGAMES ARCADE OS v4.8
 * Interactive Console Launcher, Swissmarley Circuit Loader & RetroArch Frontend
 * ============================================================================
 */

const GAMES_CATALOG = [
  {
    id: "brick-racers",
    romCode: "ASTRA-001",
    title: "Brick Racers",
    tagline: "Small bricks. Big rivalries. Built for the thrill.",
    core: "astra",
    coreName: "GPT-6 Astra",
    genre: "3D Action & Racing",
    subGenre: "3D Kart Racer",
    path: "GAMES by GPT-Astra/Brick-Racers/dist/index.html",
    screenshots: ["assets/previews/brick-racers.png"],
    renderer: "Three.js + Custom Physics",
    romFormat: "Multi-File Vite Build",
    romSize: "1.8 MB",
    players: "1P vs 5 AI Rivals",
    accent: "#d9f99d",
    secondary: "#ef4444",
    glow: "rgba(217, 249, 157, 0.28)",
    description:
      "An original 3D brick-built kart racer inspired by the spirit of the 1999 classic. Tear across six handcrafted circuits—Buccaneer Bay, Sunstone Speedway, Lunar Launchpad, Frostbite Pass, Jungle Run, and Ember Ridge—featuring a custom brick garage, surface grip physics, and color-coded powerbricks.",
    controls: [
      { key: "W / ↑", action: "Accelerate" },
      { key: "S / ↓", action: "Brake / Reverse" },
      { key: "A D / ← →", action: "Steer Kart" },
      { key: "SPACE", action: "Use Powerbrick" },
      { key: "C", action: "Camera View" },
      { key: "R", action: "Reset on Track" }
    ]
  },
  {
    id: "golden-miner",
    romCode: "OPUS-001",
    title: "Golden Miner",
    tagline: "Time the swing. Pick the prize. Beat the clock.",
    core: "opus",
    coreName: "Claude Opus 5.5",
    genre: "Rhythm & Arcade",
    subGenre: "3D Mining Adventure",
    path: "GAMES by Opus/golden-miner/dist/index.html",
    altPath: "GAMES by Opus/golden-miner/golden-miner.html",
    screenshots: [
      "assets/previews/golden-miner.png",
      "assets/previews/golden-miner-2.png",
      "assets/previews/golden-miner-3.png"
    ],
    renderer: "Three.js + Tripo 3D GLB",
    romFormat: "Multi-File + Standalone HTML",
    romSize: "3.0 MB",
    players: "1 Player (Campaign / Daily / Endless)",
    accent: "#fbbf24",
    secondary: "#10b981",
    glow: "rgba(251, 191, 36, 0.30)",
    description:
      "A rich 3D one-button mining expedition across four distinct geological regions: Gilded Cavern, Amethyst Depths, Ember Forge, and Glacier Rift. Switch live between bespoke Tripo 3D GLB assets and procedural Three.js models, buy between-level rig upgrades, and compete in Daily & Endless modes.",
    controls: [
      { key: "SPACE / ↓", action: "Drop Claw" },
      { key: "B / ↑", action: "Throw Dynamite" },
      { key: "MOUSE / TAP", action: "Shop & Region Map" },
      { key: "MODEL SWITCH", action: "Toggle Tripo GLB / Three.js" }
    ]
  },
  {
    id: "vanta-pulse",
    romCode: "ASTRA-002",
    title: "VANTA PULSE",
    tagline: "Ride the signal. Break the silence.",
    core: "astra",
    coreName: "GPT-6 Astra",
    genre: "Rhythm & Arcade",
    subGenre: "Kinetic Rhythm Runner",
    path: "GAMES by GPT-Astra/vanta-pulse.html",
    screenshots: ["assets/previews/vanta-pulse.png"],
    renderer: "Three.js + 128 BPM Synth",
    romFormat: "Single-File HTML",
    romSize: "68 KB",
    players: "1 Player (Flow & Challenge)",
    accent: "#fb7185",
    secondary: "#fb923c",
    glow: "rgba(251, 113, 133, 0.28)",
    description:
      "A high-velocity kinetic rhythm experience inside an endless brutalist void tunnel. Synchronize every lane shift and jump to the 128 BPM procedural audio transmission ('NULL BLOOM') across three escalating acts in either Flow (no-fail) or high-stakes Challenge mode.",
    controls: [
      { key: "A D / ← →", action: "Switch Lanes" },
      { key: "SPACE / ↑", action: "Jump Barrier" },
      { key: "ENTER", action: "Enter the Void" },
      { key: "ESC", action: "Pause Signal" }
    ]
  },
  {
    id: "turbofan-explorer",
    romCode: "OPUS-002",
    title: "AEROS TF-9 Turbofan",
    tagline: "130 kN-class high-bypass turbofan interactive engineering lab.",
    core: "opus",
    coreName: "Claude Opus 5.5",
    genre: "Simulation & Sandbox",
    subGenre: "3D Aerospace Simulation",
    path: "GAMES by Opus/turbofan-explorer.html",
    screenshots: ["assets/previews/turbofan-explorer.png"],
    renderer: "Three.js + Mesh BVH + Synth",
    romFormat: "Single-File HTML",
    romSize: "186 KB",
    players: "Interactive Sandbox",
    accent: "#818cf8",
    secondary: "#38bdf8",
    glow: "rgba(129, 140, 248, 0.30)",
    description:
      "A precision 3D aerospace product & engineering simulator for the AEROS TF-9 high-bypass turbofan. Control live engine throttle from IDLE to TOGA, monitor N1/N2 spool telemetry and EGT thermal glow, visualize hot/cold airflow streamlines, and smoothly explode 11 internal modules.",
    controls: [
      { key: "DRAG", action: "Orbit Camera" },
      { key: "SCROLL", action: "Zoom Engine" },
      { key: "CLICK", action: "Inspect Component" },
      { key: "DBL-CLICK", action: "Focus Module" },
      { key: "SLIDERS", action: "Throttle & Exploded View" }
    ]
  },
  {
    id: "ascii-district",
    romCode: "ASTRA-003",
    title: "ASCII DISTRICT",
    tagline: "One character. One shot. The system wants you dead.",
    core: "astra",
    coreName: "GPT-6 Astra",
    genre: "ASCII & Shader",
    subGenre: "First-Person ASCII Shooter",
    path: "GAMES by GPT-Astra/ascii-district.html",
    screenshots: ["assets/previews/ascii-district.png"],
    renderer: "WebGL2 Real-Time ASCII Pipeline",
    romFormat: "Single-File HTML",
    romSize: "191 KB",
    players: "Solo / Endless Waves",
    accent: "#a3e635",
    secondary: "#22d3ee",
    glow: "rgba(163, 230, 53, 0.28)",
    description:
      "A fast-paced first-person arena boomer-shooter rendered entirely through a custom WebGL2 ASCII character post-processing shader (.:+*#%@). Sprint, slide, and chain headshots across endless cybernetic enemy waves in an open brutalist district.",
    controls: [
      { key: "WASD", action: "Move" },
      { key: "MOUSE", action: "Aim & Fire" },
      { key: "SHIFT", action: "Sprint" },
      { key: "SPACE", action: "Jump" },
      { key: "C", action: "Tactical Slide" },
      { key: "1-4 / Q", action: "Switch Weapons" }
    ]
  },
  {
    id: "voxel-minecraft",
    romCode: "ASTRA-004",
    title: "Voxel Vale",
    tagline: "Small blocks. Endless possibility. A little world of your own.",
    core: "astra",
    coreName: "GPT-6 Astra",
    genre: "Simulation & Sandbox",
    subGenre: "3D Voxel World Builder",
    path: "GAMES by GPT-Astra/voxel-minecraft.html",
    screenshots: ["assets/previews/voxel-minecraft.png"],
    renderer: "Three.js Procedural Voxel Core",
    romFormat: "Single-File HTML",
    romSize: "96 KB",
    players: "1 Player (Persistent World Save)",
    accent: "#fb923c",
    secondary: "#84cc16",
    glow: "rgba(251, 146, 60, 0.28)",
    description:
      "A serene procedural voxel sandbox set across 'The Sunlit Isles'. Explore rolling hills in golden-hour lighting, mine and place blocks freely, seek out three hidden amber waystones to awaken the ancient beacon, and automatically persist your creations in browser storage.",
    controls: [
      { key: "WASD", action: "Walk / Strafe" },
      { key: "L-CLICK", action: "Mine Block" },
      { key: "R-CLICK", action: "Place Block" },
      { key: "SPACE", action: "Jump" },
      { key: "F", action: "Toggle Flight" },
      { key: "1-9", action: "Select Block Type" }
    ]
  },
  {
    id: "frostwake-fisheries",
    romCode: "ASTRA-005",
    title: "Frostwake Fisheries",
    tagline: "A little dock. A big catch. Waking up the North Shore.",
    core: "astra",
    coreName: "GPT-6 Astra",
    genre: "Tabletop & Cozy",
    subGenre: "Winter Fishing Diorama",
    path: "GAMES by GPT-Astra/frostwake-fisheries.html",
    screenshots: ["assets/previews/frostwake-fisheries.png"],
    renderer: "Three.js Isometric Diorama",
    romFormat: "Single-File HTML",
    romSize: "78 KB",
    players: "1 Player (Cozy Progression)",
    accent: "#38bdf8",
    secondary: "#2dd4bf",
    glow: "rgba(56, 189, 248, 0.28)",
    description:
      "A pocket-sized winter fishing escape on the North Shore (−4°C). Drag to cast and sweep your net through shimmering schools of fish, release to haul your catch to the snow-dusted timber dock, and upgrade your net width, winch speed, and fishery.",
    controls: [
      { key: "DRAG", action: "Cast & Sweep Net" },
      { key: "RELEASE", action: "Haul Catch to Dock" },
      { key: "UPGRADES", action: "Wider Net / Winch / Boat" }
    ]
  },
  {
    id: "red-light-green-light",
    romCode: "ASTRA-006",
    title: "Red Light, Green Light",
    tagline: "62 metres. 42 seconds. One life. A game of self-control.",
    core: "astra",
    coreName: "GPT-6 Astra",
    genre: "3D Action & Racing",
    subGenre: "3D Survival Sprint",
    path: "GAMES by GPT-Astra/red-light-green-light.html",
    screenshots: ["assets/previews/red-light-green-light.png"],
    renderer: "Three.js Crowd & Character Rig",
    romFormat: "Single-File HTML",
    romSize: "92 KB",
    players: "1P vs 23 AI Contestants",
    accent: "#bef264",
    secondary: "#f87171",
    glow: "rgba(190, 242, 100, 0.28)",
    description:
      "Step onto the sun-bleached survival playground alongside 23 AI competitors. Hold to sprint across 62 meters while the giant animatronic doll chants away—and freeze with split-second discipline before her head turns back.",
    controls: [
      { key: "HOLD SPACE / W", action: "Run Forward" },
      { key: "SHIFT", action: "Sprint Boost" },
      { key: "RELEASE", action: "Freeze Instantly" }
    ]
  },
  {
    id: "casino-game",
    romCode: "ASTRA-007",
    title: "NOIR — The Social Casino",
    tagline: "A little luck. A lot of atmosphere. Your table is ready.",
    core: "astra",
    coreName: "GPT-6 Astra",
    genre: "Tabletop & Cozy",
    subGenre: "Luxury Casino Lounge",
    path: "GAMES by GPT-Astra/casino-game.html",
    screenshots: ["assets/previews/casino-game.png"],
    renderer: "Bespoke DOM + Physics Reels",
    romFormat: "Single-File HTML",
    romSize: "50 KB",
    players: "1 Player (3 Table Games)",
    accent: "#fcd34d",
    secondary: "#34d399",
    glow: "rgba(252, 211, 77, 0.26)",
    description:
      "An atmospheric gold-and-velvet social gaming lounge housing three timeless classics: Golden Hour three-reel slots (up to 100× payout), Club Twenty-One Blackjack (Hit, Stand, Double, Split), and La Roulette European wheel with a persistent 10,000-chip bankroll.",
    controls: [
      { key: "CLICK / TAP", action: "Select Stakes & Place Bets" },
      { key: "SLOTS", action: "Spin Golden Hour Reels" },
      { key: "BLACKJACK", action: "Hit / Stand / Double" },
      { key: "ROULETTE", action: "Inside & Outside Bets" }
    ]
  },
  {
    id: "sunwing-coast",
    romCode: "ASTRA-008",
    title: "Sunwing Coast",
    tagline: "One small bird. A wide blue world. Find your sunshine.",
    core: "astra",
    coreName: "GPT-6 Astra",
    genre: "Rhythm & Arcade",
    subGenre: "3D Island Arcade Flyer",
    path: "GAMES by GPT-Astra/sunwing-coast.html",
    screenshots: ["assets/previews/sunwing-coast.png"],
    renderer: "Three.js Coastal Diorama",
    romFormat: "Single-File HTML",
    romSize: "47 KB",
    players: "1 Player + Auto-Demo AI",
    accent: "#2dd4bf",
    secondary: "#facc15",
    glow: "rgba(45, 212, 191, 0.28)",
    description:
      "A breezy 3D coastal arcade flight game. Flap through emerald pipe gates along a sunlit tropical archipelago, relax with the built-in AI Auto-Demo flight mode, and customize visual quality from Low to Ultra.",
    controls: [
      { key: "SPACE / CLICK", action: "Flap Wings" },
      { key: "AUTO DEMO", action: "AI autopilot mode" },
      { key: "ESC", action: "Pause Flight" }
    ]
  },
  {
    id: "ascii-ripple-field",
    romCode: "OPUS-003",
    title: "ASCII Ripple Field",
    tagline: "Interactive typographic wave-equation fluid field.",
    core: "opus",
    coreName: "Claude Opus 5.5",
    genre: "ASCII & Shader",
    subGenre: "Generative Wave Toy",
    path: "GAMES by Opus/ASCII Ripple Field.html",
    screenshots: ["assets/previews/ascii-ripple-field.png"],
    renderer: "HTML5 2D Wave Solver",
    romFormat: "Single-File HTML",
    romSize: "65 KB",
    players: "Interactive Toy",
    accent: "#60a5fa",
    secondary: "#c084fc",
    glow: "rgba(96, 165, 250, 0.28)",
    description:
      "A meditative full-bleed ASCII glyph wave simulation created by Claude Opus 5.5. Carve fluid wake trails with your cursor, trigger radial interference shockwaves on click, and customize glyph sets (a–z, binary 0/1, density ramps) and color palettes.",
    controls: [
      { key: "MOVE / DRAG", action: "Create Wave Trail" },
      { key: "CLICK / TAP", action: "Radial Ripple Shockwave" },
      { key: "TWEAKS", action: "Switch Palette & Glyph Set" }
    ]
  }
];

/* ============================================================================
   PROCEDURAL WEBAUDIO CONSOLE SYNTHESIZER
   ============================================================================ */
class ConsoleSynth {
  constructor() {
    this.ctx = null;
    this.muted = localStorage.getItem("sm_webgames_mute") === "1";
  }

  ensureContext() {
    if (this.muted) return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  toggleMute() {
    this.muted = !this.muted;
    localStorage.setItem("sm_webgames_mute", this.muted ? "1" : "0");
    if (!this.muted) this.playTick(660);
    return this.muted;
  }

  playTick(freq = 520, duration = 0.045) {
    const ctx = this.ensureContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.35, now + duration);
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + duration);
  }

  playTabSwitch() {
    const ctx = this.ensureContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    [440, 587.33].forEach((f, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(f, now + i * 0.04);
      gain.gain.setValueAtTime(0.07, now + i * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.04 + 0.09);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + i * 0.04);
      osc.stop(now + i * 0.04 + 0.09);
    });
  }

  playLaunchChord() {
    const ctx = this.ensureContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const notes = [261.63, 329.63, 392.0, 523.25, 659.25];
    notes.forEach((f, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = i % 2 === 0 ? "triangle" : "sine";
      osc.frequency.setValueAtTime(f, now + i * 0.055);
      gain.gain.setValueAtTime(0.09, now + i * 0.055);
      gain.gain.exponentialRampToValueAtTime(0.0008, now + i * 0.055 + 0.45);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + i * 0.055);
      osc.stop(now + i * 0.055 + 0.46);
    });
  }

  playOverclockPulse(progressRatio = 0.5) {
    const ctx = this.ensureContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const base = 220 + progressRatio * 440;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(base, now);
    osc.frequency.exponentialRampToValueAtTime(base * 1.5, now + 0.12);
    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.12);
  }
}

const soundFX = new ConsoleSynth();

/* ============================================================================
   INTERACTIVE SWISSMARLEY LOGO BOOT LOADER (CANVAS + PCB CIRCUIT ENGINE)
   ============================================================================ */
class SwissmarleyBootLoader {
  constructor(onComplete) {
    this.onComplete = onComplete;
    this.screen = document.getElementById("boot-screen");
    this.canvas = document.getElementById("loader-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.emblemStage = document.getElementById("emblem-stage");
    this.emblemCore = document.getElementById("emblem-core-wrap");
    this.progressFill = document.getElementById("boot-progress-fill");
    this.progressPct = document.getElementById("boot-progress-pct");
    this.progressStatus = document.getElementById("boot-progress-status");
    this.biosLog = document.getElementById("bios-log");
    this.pauseBtn = document.getElementById("btn-pause-boot");

    this.active = true;
    this.paused = false;
    this.overclocking = false;
    this.progress = 0;
    this.mouseX = window.innerWidth / 2;
    this.mouseY = window.innerHeight / 2;
    this.particles = [];
    this.pulses = [];
    this.traces = [];
    this.lastLogIdx = -1;

    this.biosMessages = [
      "SWISSMARLEY ARCADE BIOS v4.8.0 // INITIALIZING CORE BUS",
      "VERIFYING GITHUB/SWISSMARLEY SIGNATURE EMBLEM [SHA-256 OK]",
      "MOUNTING VFS: CLAUDE OPUS 5.5 CORE (3 CARTRIDGES READY)",
      "MOUNTING VFS: GPT-6 ASTRA CORE (8 CARTRIDGES READY)",
      "LOADING THREE.JS / WEBGL2 / PROCEDURAL AUDIO SHADERS",
      "CALIBRATING RETROARCH XMB & EMULATIONSTATION CAROUSEL",
      "ALL 11 WEBGAMES VERIFIED // SYSTEM READY FOR LAUNCH"
    ];

    this.initCanvas();
    this.bindEvents();
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  initCanvas() {
    const resize = () => {
      this.canvas.width = window.innerWidth * window.devicePixelRatio;
      this.canvas.height = window.innerHeight * window.devicePixelRatio;
      this.ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
      this.buildCircuitTraces();
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 75; i++) {
      this.particles.push(this.createParticle());
    }
  }

  createParticle(x, y, burst = false) {
    const angle = Math.random() * Math.PI * 2;
    const speed = burst ? 2 + Math.random() * 5.5 : 0.3 + Math.random() * 1.2;
    const isGold = Math.random() > 0.42;
    return {
      x: x ?? Math.random() * window.innerWidth,
      y: y ?? Math.random() * window.innerHeight,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: burst ? 2 + Math.random() * 3.5 : 1.2 + Math.random() * 2.2,
      color: isGold ? "#ffd86b" : "#39e75f",
      alpha: burst ? 1 : 0.25 + Math.random() * 0.55,
      life: burst ? 40 + Math.random() * 30 : Infinity
    };
  }

  buildCircuitTraces() {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2 - 40;
    this.traces = [];
    const count = 16;
    for (let i = 0; i < count; i++) {
      const baseAngle = (i / count) * Math.PI * 2;
      const points = [];
      let r = 115;
      let a = baseAngle;
      points.push({ x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r });
      for (let step = 0; step < 3; step++) {
        r += 55 + Math.random() * 65;
        if (step % 2 === 1) {
          a += (Math.random() > 0.5 ? 1 : -1) * 0.22;
        }
        points.push({ x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r });
      }
      this.traces.push({
        points,
        color: i % 2 === 0 ? "#ffd86b" : "#39e75f",
        chargeOffset: Math.random() * 100
      });
    }
  }

  spawnShockwave(x, y) {
    this.pulses.push({ x, y, r: 30, maxR: 380, alpha: 0.85, color: "#ffd86b" });
    this.pulses.push({ x, y, r: 15, maxR: 290, alpha: 0.75, color: "#39e75f" });
    for (let i = 0; i < 24; i++) {
      this.particles.push(this.createParticle(x, y, true));
    }
  }

  bindEvents() {
    window.addEventListener("mousemove", (e) => {
      if (!this.active) return;
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;

      // 3D parallax tilt on the Swissmarley emblem
      const rect = this.emblemStage.getBoundingClientRect();
      const ex = rect.left + rect.width / 2;
      const ey = rect.top + rect.height / 2;
      const dx = (e.clientX - ex) / (window.innerWidth * 0.35);
      const dy = (e.clientY - ey) / (window.innerHeight * 0.35);
      const tiltX = Math.max(-18, Math.min(18, -dy * 18));
      const tiltY = Math.max(-18, Math.min(18, dx * 18));
      this.emblemCore.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;

      if (Math.random() > 0.55) {
        this.particles.push(this.createParticle(e.clientX, e.clientY, true));
      }
    });

    const startOverclock = (e) => {
      if (!this.active) return;
      this.overclocking = true;
      this.emblemStage.classList.add("overclocking");
      const rect = this.emblemStage.getBoundingClientRect();
      const cx = e.clientX || rect.left + rect.width / 2;
      const cy = e.clientY || rect.top + rect.height / 2;
      this.spawnShockwave(cx, cy);
      soundFX.playOverclockPulse(this.progress / 100);
      this.progress = Math.min(100, this.progress + 14);
    };

    const stopOverclock = () => {
      this.overclocking = false;
      this.emblemStage.classList.remove("overclocking");
    };

    this.emblemStage.addEventListener("mousedown", startOverclock);
    window.addEventListener("mouseup", stopOverclock);
    this.emblemStage.addEventListener("touchstart", (e) => {
      e.preventDefault();
      startOverclock(e.touches[0] || {});
    });
    window.addEventListener("touchend", stopOverclock);

    document.getElementById("btn-boot-now").addEventListener("click", () => {
      soundFX.playLaunchChord();
      this.finishBoot();
    });

    this.pauseBtn.addEventListener("click", () => {
      this.paused = !this.paused;
      this.pauseBtn.classList.toggle("active-hold", this.paused);
      this.pauseBtn.textContent = this.paused
        ? "⚙ INTERACTIVE MODE LOCKED (CLICK TO RESUME)"
        : "⏸ HOLD / EXPLORE LOADER ANIMATION";
      soundFX.playTick(480);
    });
  }

  replay() {
    this.progress = 0;
    this.lastLogIdx = -1;
    this.biosLog.innerHTML = "";
    this.paused = true;
    this.pauseBtn.classList.add("active-hold");
    this.pauseBtn.textContent = "⚙ INTERACTIVE MODE LOCKED (CLICK TO AUTO-BOOT)";
    this.active = true;
    this.screen.classList.remove("boot-hidden");
    this.buildCircuitTraces();
    const rect = this.emblemStage.getBoundingClientRect();
    this.spawnShockwave(rect.left + rect.width / 2, rect.top + rect.height / 2);
    soundFX.playTabSwitch();
    requestAnimationFrame(this.animate);
  }

  finishBoot() {
    if (!this.active) return;
    this.active = false;
    this.screen.classList.add("boot-hidden");
    if (this.onComplete) this.onComplete();
  }

  animate() {
    if (!this.active) return;

    const w = window.innerWidth;
    const h = window.innerHeight;
    const ctx = this.ctx;
    ctx.clearRect(0, 0, w, h);

    // Get emblem center coordinates
    const rect = this.emblemStage.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    // 1. Draw PCB circuit traces radiating from Swissmarley emblem
    const speedMult = this.overclocking ? 4.5 : 1.2;
    this.traces.forEach((t, idx) => {
      t.chargeOffset = (t.chargeOffset + speedMult) % 260;
      ctx.beginPath();
      t.points.forEach((pt, i) => {
        if (i === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      });
      ctx.strokeStyle =
        idx % 2 === 0 ? "rgba(255, 216, 107, 0.16)" : "rgba(57, 231, 95, 0.16)";
      ctx.lineWidth = 1.6;
      ctx.stroke();

      // Draw glowing circuit nodes (vias) matching the Swissmarley logo aesthetic
      const lastPt = t.points[t.points.length - 1];
      ctx.beginPath();
      ctx.arc(lastPt.x, lastPt.y, 4, 0, Math.PI * 2);
      ctx.strokeStyle = t.color;
      ctx.lineWidth = 1.8;
      ctx.stroke();

      // Traveling energy packet along trace
      const segIdx = Math.floor((t.chargeOffset / 260) * (t.points.length - 1));
      const segFrac = ((t.chargeOffset / 260) * (t.points.length - 1)) % 1;
      const p1 = t.points[segIdx];
      const p2 = t.points[segIdx + 1] || p1;
      const px = p1.x + (p2.x - p1.x) * segFrac;
      const py = p1.y + (p2.y - p1.y) * segFrac;

      ctx.beginPath();
      ctx.arc(px, py, this.overclocking ? 4.2 : 2.8, 0, Math.PI * 2);
      ctx.fillStyle = t.color;
      ctx.shadowColor = t.color;
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    // 2. Draw shockwave pulses
    for (let i = this.pulses.length - 1; i >= 0; i--) {
      const p = this.pulses[i];
      p.r += 6.5;
      p.alpha *= 0.94;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.strokeStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.lineWidth = 2.2;
      ctx.stroke();
      ctx.globalAlpha = 1;
      if (p.alpha < 0.03 || p.r > p.maxR) this.pulses.splice(i, 1);
    }

    // 3. Update & draw interactive particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const pt = this.particles[i];
      pt.x += pt.vx * (this.overclocking ? 2.4 : 1);
      pt.y += pt.vy * (this.overclocking ? 2.4 : 1);

      // Gentle magnetic attraction toward cursor
      const dx = this.mouseX - pt.x;
      const dy = this.mouseY - pt.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 180 && dist > 5) {
        pt.x += (dx / dist) * 0.85;
        pt.y += (dy / dist) * 0.85;
      }

      if (pt.life !== Infinity) {
        pt.life -= 1;
        pt.alpha = Math.max(0, pt.life / 50);
        if (pt.life <= 0) {
          this.particles.splice(i, 1);
          continue;
        }
      } else {
        if (pt.x < 0) pt.x = w;
        if (pt.x > w) pt.x = 0;
        if (pt.y < 0) pt.y = h;
        if (pt.y > h) pt.y = 0;
      }

      ctx.beginPath();
      ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
      ctx.fillStyle = pt.color;
      ctx.globalAlpha = pt.alpha;
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    // 4. Advance BIOS Boot Progress
    if (!this.paused || this.overclocking) {
      const delta = this.overclocking ? 1.85 : 0.42;
      this.progress = Math.min(100, this.progress + delta);
    }

    const pct = Math.floor(this.progress);
    this.progressFill.style.width = `${pct}%`;
    this.progressPct.textContent = `${pct}%`;

    const msgIdx = Math.min(
      this.biosMessages.length - 1,
      Math.floor((this.progress / 100) * this.biosMessages.length)
    );
    if (msgIdx > this.lastLogIdx) {
      this.lastLogIdx = msgIdx;
      const line = document.createElement("div");
      line.className = "bios-line";
      line.innerHTML = `<span class="tag-ok">[OK]</span> ${this.biosMessages[msgIdx]}`;
      this.biosLog.appendChild(line);
      while (this.biosLog.children.length > 4) {
        this.biosLog.removeChild(this.biosLog.firstChild);
      }
      this.progressStatus.textContent = this.biosMessages[msgIdx];
    }

    if (this.progress >= 100 && !this.paused) {
      setTimeout(() => this.finishBoot(), 260);
      return;
    }

    requestAnimationFrame(this.animate);
  }
}

/* ============================================================================
   MAIN CONSOLE OS CONTROLLER
   ============================================================================ */
class WebGamesConsoleOS {
  constructor() {
    this.games = GAMES_CATALOG;
    this.activeCore = "all";
    this.activeGenre = "all";
    this.searchQuery = "";
    this.viewMode = "deck"; // 'deck' | 'retroarch' | 'grid'
    this.crtModes = ["off", "scanlines", "cabinet"];
    this.crtIdx = 0;

    this.selectedIndex = 0;
    this.activeShotIdx = 0;
    this.runningGame = null;
    this.sessionTimerInterval = null;
    this.sessionSeconds = 0;

    // Persistent State
    this.favorites = new Set(
      JSON.parse(localStorage.getItem("sm_webgames_favs") || "[]")
    );
    this.recentIds = JSON.parse(
      localStorage.getItem("sm_webgames_recent") || "[]"
    );
    this.playStats = JSON.parse(
      localStorage.getItem("sm_webgames_stats") || "{}"
    );

    this.initDOMRefs();
    this.initBackgroundCanvas();
    this.bindUIEvents();
    this.bindKeyboardAndGamepad();
    this.startClock();
    this.renderAll();
  }

  initDOMRefs() {
    this.ambientImg = document.getElementById("ambient-hero-img");
    this.sysTabs = document.querySelectorAll(".sys-tab");
    this.genrePills = document.querySelectorAll(".genre-pill");
    this.viewBtns = document.querySelectorAll(".view-btn");
    this.searchInput = document.getElementById("search-input");

    // Hero Showcase Refs
    this.heroBadges = document.getElementById("hero-badges");
    this.heroTitle = document.getElementById("hero-title");
    this.heroTagline = document.getElementById("hero-tagline");
    this.heroDesc = document.getElementById("hero-description");
    this.specRenderer = document.getElementById("spec-renderer");
    this.specFormat = document.getElementById("spec-format");
    this.specSize = document.getElementById("spec-size");
    this.specStats = document.getElementById("spec-stats");
    this.heroControlsBar = document.getElementById("hero-controls-bar");
    this.btnFavHero = document.getElementById("btn-fav-hero");

    // Monitor Refs
    this.monitorFrame = document.getElementById("preview-monitor-frame");
    this.monitorImg = document.getElementById("monitor-screenshot");
    this.monitorRomCode = document.getElementById("monitor-rom-code");
    this.shotDotsWrap = document.getElementById("shot-dots");

    // Containers
    this.carouselTrack = document.getElementById("carousel-track");
    this.raRomList = document.getElementById("ra-rom-scroll");
    this.raInspector = document.getElementById("ra-inspector-pane");
    this.cabinetGrid = document.getElementById("cabinet-grid");

    // Runner Refs
    this.runnerModal = document.getElementById("game-runner");
    this.runnerIframe = document.getElementById("game-iframe");
    this.runnerTitle = document.getElementById("runner-game-title");
    this.runnerCoreBadge = document.getElementById("runner-core-badge");
    this.runnerTimer = document.getElementById("runner-timer");

    // Specs Modal Refs
    this.specsModal = document.getElementById("specs-modal");
    this.specsModalContent = document.getElementById("specs-modal-body");
  }

  getFilteredGames() {
    return this.games.filter((g) => {
      if (this.activeCore === "opus" && g.core !== "opus") return false;
      if (this.activeCore === "astra" && g.core !== "astra") return false;
      if (this.activeCore === "favorites" && !this.favorites.has(g.id)) return false;
      if (this.activeCore === "recent" && !this.recentIds.includes(g.id)) return false;

      if (this.activeGenre !== "all" && g.genre !== this.activeGenre) return false;

      if (this.searchQuery) {
        const q = this.searchQuery.toLowerCase();
        const hay = `${g.title} ${g.tagline} ${g.genre} ${g.subGenre} ${g.coreName} ${g.description}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }

  getSelectedGame() {
    const list = this.getFilteredGames();
    if (list.length === 0) return this.games[0];
    if (this.selectedIndex >= list.length) this.selectedIndex = 0;
    if (this.selectedIndex < 0) this.selectedIndex = list.length - 1;
    return list[this.selectedIndex];
  }

  selectGameByIndex(idx, playSound = true) {
    const list = this.getFilteredGames();
    if (list.length === 0) return;
    this.selectedIndex = (idx + list.length) % list.length;
    this.activeShotIdx = 0;
    if (playSound) soundFX.playTick(540);
    this.renderAll();
  }

  toggleFavorite(gameId) {
    const id = gameId || this.getSelectedGame().id;
    if (this.favorites.has(id)) {
      this.favorites.delete(id);
      soundFX.playTick(380);
    } else {
      this.favorites.add(id);
      soundFX.playTabSwitch();
    }
    localStorage.setItem("sm_webgames_favs", JSON.stringify([...this.favorites]));
    this.updateTabCounts();
    this.renderAll();
  }

  updateTabCounts() {
    const favCountEl = document.getElementById("count-favorites");
    const recCountEl = document.getElementById("count-recent");
    if (favCountEl) favCountEl.textContent = this.favorites.size;
    if (recCountEl) recCountEl.textContent = this.recentIds.length;
  }

  /* --------------------------------------------------------------------------
     RENDERING PIPELINE
     -------------------------------------------------------------------------- */
  renderAll() {
    this.updateTabCounts();
    const list = this.getFilteredGames();
    const game = this.getSelectedGame();

    // Update CSS custom properties for dynamic game aura
    document.documentElement.style.setProperty("--game-accent", game.accent);
    document.documentElement.style.setProperty("--game-secondary", game.secondary);
    document.documentElement.style.setProperty("--game-glow", game.glow);

    // Update ambient background hero
    const shotUrl = game.screenshots[this.activeShotIdx] || game.screenshots[0];
    if (this.ambientImg.getAttribute("src") !== shotUrl) {
      this.ambientImg.setAttribute("src", shotUrl);
    }

    // Update telemetry counters
    document.getElementById("visible-rom-count").textContent = list.length;
    document.getElementById("active-selection-pos").textContent =
      list.length > 0 ? `${String(this.selectedIndex + 1).padStart(2, "0")} / ${String(list.length).padStart(2, "0")}` : "00 / 00";

    this.renderDeckHero(game);
    this.renderCarouselDock(list, game);
    this.renderRetroArchView(list, game);
    this.renderCabinetGridView(list);
  }

  renderDeckHero(game) {
    const isFav = this.favorites.has(game.id);
    const stats = this.playStats[game.id] || { plays: 0, seconds: 0 };
    const mins = Math.floor(stats.seconds / 60);

    this.heroBadges.innerHTML = `
      <span class="core-pill ${game.core === "opus" ? "core-opus" : "core-astra"}">
        ● ${game.coreName}
      </span>
      <span class="meta-pill">${game.romCode}</span>
      <span class="meta-pill">${game.subGenre}</span>
      <span class="meta-pill">${game.players}</span>
    `;

    this.heroTitle.textContent = game.title;
    this.heroTagline.textContent = game.tagline;
    this.heroDesc.textContent = game.description;

    this.specRenderer.textContent = game.renderer;
    this.specFormat.textContent = game.romFormat;
    this.specSize.textContent = game.romSize;
    this.specStats.textContent =
      stats.plays > 0 ? `${stats.plays} runs · ${mins}m` : "Ready to boot";

    this.heroControlsBar.innerHTML = game.controls
      .map((c) => `<div class="ctrl-chip"><kbd>${c.key}</kbd><span>${c.action}</span></div>`)
      .join("");

    this.btnFavHero.classList.toggle("is-fav", isFav);
    this.btnFavHero.innerHTML = isFav ? "★ FAVORITED [F]" : "☆ FAVORITE [F]";

    const shotUrl = game.screenshots[this.activeShotIdx] || game.screenshots[0];
    this.monitorImg.src = shotUrl;
    this.monitorImg.alt = `${game.title} screenshot`;
    this.monitorRomCode.textContent = `${game.romCode} // ${game.core.toUpperCase()}`;

    // Render screenshot switcher dots if multiple screenshots exist
    if (game.screenshots.length > 1) {
      this.shotDotsWrap.innerHTML = game.screenshots
        .map(
          (_, i) =>
            `<span class="shot-dot ${i === this.activeShotIdx ? "active" : ""}" data-shot="${i}"></span>`
        )
        .join("");
      this.shotDotsWrap.querySelectorAll(".shot-dot").forEach((dot) => {
        dot.addEventListener("click", (e) => {
          e.stopPropagation();
          this.activeShotIdx = Number(dot.dataset.shot);
          soundFX.playTick(680);
          this.renderDeckHero(game);
        });
      });
    } else {
      this.shotDotsWrap.innerHTML = `<span class="shot-dot active"></span>`;
    }
  }

  renderCarouselDock(list, selectedGame) {
    if (list.length === 0) {
      this.carouselTrack.innerHTML = `<div style="padding: 24px; color: var(--text-muted); font-family: var(--font-mono);">No cartridges match current filter. Press [ALL SYSTEMS] to reset.</div>`;
      return;
    }

    this.carouselTrack.innerHTML = list
      .map((g, idx) => {
        const isSel = g.id === selectedGame.id;
        const isFav = this.favorites.has(g.id);
        return `
          <div class="cartridge-card ${isSel ? "selected" : ""}" data-idx="${idx}" data-id="${g.id}">
            <img class="cartridge-thumb" src="${g.screenshots[0]}" alt="${g.title}" loading="lazy" />
            <div class="cartridge-scrim"></div>
            <div class="cartridge-top">
              <span class="cart-core-dot ${g.core}">${g.core === "opus" ? "OPUS 5.5" : "ASTRA 6"}</span>
              ${isFav ? `<span class="cart-fav-star">★</span>` : `<span></span>`}
            </div>
            <div class="cartridge-bottom">
              <div class="cart-title">${g.title}</div>
              <div class="cart-genre">${g.subGenre}</div>
            </div>
          </div>
        `;
      })
      .join("");

    this.carouselTrack.querySelectorAll(".cartridge-card").forEach((card) => {
      card.addEventListener("click", () => {
        const idx = Number(card.dataset.idx);
        if (this.selectedIndex === idx) {
          this.launchGame(this.getSelectedGame());
        } else {
          this.selectGameByIndex(idx);
        }
      });
    });

    const activeCard = this.carouselTrack.querySelector(".cartridge-card.selected");
    if (activeCard) {
      activeCard.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }

  renderRetroArchView(list, selectedGame) {
    this.raRomList.innerHTML = list
      .map((g, idx) => {
        const isSel = g.id === selectedGame.id;
        const isFav = this.favorites.has(g.id);
        return `
          <div class="ra-rom-row ${isSel ? "selected" : ""}" data-idx="${idx}">
            <div class="ra-idx">${String(idx + 1).padStart(2, "0")}</div>
            <div class="ra-title-cell">
              <img class="ra-mini-thumb" src="${g.screenshots[0]}" alt="" />
              <span class="ra-name">${g.title} ${isFav ? "★" : ""}</span>
            </div>
            <div class="ra-genre-cell">${g.subGenre}</div>
            <div class="ra-core-cell">
              <span class="cart-core-dot ${g.core}">${g.core === "opus" ? "OPUS 5.5" : "ASTRA 6"}</span>
            </div>
            <div class="ra-size-cell">${g.romSize}</div>
          </div>
        `;
      })
      .join("");

    this.raRomList.querySelectorAll(".ra-rom-row").forEach((row) => {
      row.addEventListener("click", () => {
        const idx = Number(row.dataset.idx);
        if (this.selectedIndex === idx) {
          this.launchGame(this.getSelectedGame());
        } else {
          this.selectGameByIndex(idx);
        }
      });
    });

    // Render RetroArch right-hand inspector
    this.raInspector.innerHTML = `
      <div>
        <div class="ra-preview-box">
          <img src="${selectedGame.screenshots[0]}" alt="${selectedGame.title}" />
        </div>
        <div style="margin-top: 14px; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div style="font-family: var(--font-mono); font-size: 11px; color: var(--sm-gold);">${selectedGame.romCode} // ${selectedGame.coreName}</div>
            <h3 style="font-family: var(--font-display); font-size: 22px; margin-top: 2px;">${selectedGame.title}</h3>
          </div>
          <button class="btn-launch-main" id="ra-launch-btn" style="padding: 10px 20px; font-size: 13px;">
            ▶ RUN ROM
          </button>
        </div>
        <p style="margin-top: 10px; font-size: 13px; line-height: 1.55; color: var(--text-muted);">
          ${selectedGame.description}
        </p>
        <div class="ra-telemetry-table">
          <div class="spec-card"><div class="spec-label">CORE ENGINE</div><div class="spec-value">${selectedGame.coreName}</div></div>
          <div class="spec-card"><div class="spec-label">RENDERER</div><div class="spec-value">${selectedGame.renderer}</div></div>
          <div class="spec-card"><div class="spec-label">ROM FORMAT</div><div class="spec-value">${selectedGame.romFormat}</div></div>
          <div class="spec-card"><div class="spec-label">PLAYERS</div><div class="spec-value">${selectedGame.players}</div></div>
        </div>
      </div>
      <div class="hero-controls-bar" style="margin-top: 14px;">
        ${selectedGame.controls
          .map((c) => `<div class="ctrl-chip"><kbd>${c.key}</kbd><span>${c.action}</span></div>`)
          .join("")}
      </div>
    `;

    const raLaunchBtn = document.getElementById("ra-launch-btn");
    if (raLaunchBtn) {
      raLaunchBtn.addEventListener("click", () => this.launchGame(selectedGame));
    }
  }

  renderCabinetGridView(list) {
    this.cabinetGrid.innerHTML = list
      .map((g, idx) => {
        const isFav = this.favorites.has(g.id);
        return `
          <div class="cabinet-card" data-idx="${idx}">
            <div class="cabinet-art-wrap">
              <img src="${g.screenshots[0]}" alt="${g.title}" loading="lazy" />
              <div class="cartridge-top" style="position:absolute; inset:0 0 auto 0;">
                <span class="cart-core-dot ${g.core}">${g.coreName}</span>
                ${isFav ? `<span class="cart-fav-star">★</span>` : ""}
              </div>
            </div>
            <div class="cabinet-body">
              <div>
                <div style="font-family:var(--font-mono); font-size:10.5px; color:var(--sm-gold); margin-bottom:3px;">${g.romCode} · ${g.subGenre}</div>
                <div class="cabinet-title">${g.title}</div>
                <div class="cabinet-desc" style="margin-top:6px;">${g.description}</div>
              </div>
              <div class="cabinet-footer">
                <span>${g.romSize}</span>
                <span style="color:var(--sm-emerald); font-weight:700;">▶ PLAY CARTRIDGE</span>
              </div>
            </div>
          </div>
        `;
      })
      .join("");

    this.cabinetGrid.querySelectorAll(".cabinet-card").forEach((card) => {
      card.addEventListener("click", () => {
        const idx = Number(card.dataset.idx);
        this.selectGameByIndex(idx, false);
        this.launchGame(this.getSelectedGame());
      });
    });
  }

  /* --------------------------------------------------------------------------
     LAUNCHING & RUNNING GAMES IN CONSOLE VIEWPORT
     -------------------------------------------------------------------------- */
  launchGame(game, standalone = false) {
    const targetGame = game || this.getSelectedGame();
    if (!targetGame) return;

    soundFX.playLaunchChord();

    // Record in Recent & Stats
    this.recentIds = [
      targetGame.id,
      ...this.recentIds.filter((id) => id !== targetGame.id)
    ].slice(0, 11);
    localStorage.setItem("sm_webgames_recent", JSON.stringify(this.recentIds));

    if (!this.playStats[targetGame.id]) {
      this.playStats[targetGame.id] = { plays: 0, seconds: 0 };
    }
    this.playStats[targetGame.id].plays += 1;
    localStorage.setItem("sm_webgames_stats", JSON.stringify(this.playStats));
    this.updateTabCounts();

    const encodedUrl = encodeURI(targetGame.path);

    if (standalone) {
      window.open(encodedUrl, "_blank", "noopener");
      this.renderAll();
      return;
    }

    this.runningGame = targetGame;
    this.runnerTitle.textContent = targetGame.title;
    this.runnerCoreBadge.textContent = targetGame.coreName;
    this.runnerCoreBadge.className = `core-pill ${
      targetGame.core === "opus" ? "core-opus" : "core-astra"
    }`;

    this.runnerModal.classList.remove("bar-collapsed");
    this.runnerModal.classList.add("runner-active");
    this.runnerIframe.src = encodedUrl;

    this.runnerIframe.onload = () => {
      try {
        this.runnerIframe.contentWindow.focus();
      } catch (_) {}
    };

    // Start live session timer
    this.sessionSeconds = 0;
    this.runnerTimer.textContent = "00:00";
    clearInterval(this.sessionTimerInterval);
    this.sessionTimerInterval = setInterval(() => {
      this.sessionSeconds += 1;
      const m = String(Math.floor(this.sessionSeconds / 60)).padStart(2, "0");
      const s = String(this.sessionSeconds % 60).padStart(2, "0");
      this.runnerTimer.textContent = `${m}:${s}`;
      if (this.runningGame) {
        this.playStats[this.runningGame.id].seconds += 1;
        if (this.sessionSeconds % 5 === 0) {
          localStorage.setItem("sm_webgames_stats", JSON.stringify(this.playStats));
        }
      }
    }, 1000);
  }

  ejectGame() {
    if (!this.runningGame) return;
    soundFX.playTick(320);
    clearInterval(this.sessionTimerInterval);
    localStorage.setItem("sm_webgames_stats", JSON.stringify(this.playStats));
    this.runnerModal.classList.remove("runner-active");
    setTimeout(() => {
      this.runnerIframe.src = "about:blank";
    }, 300);
    this.runningGame = null;
    this.renderAll();
  }

  openSpecsModal(game) {
    const g = game || this.getSelectedGame();
    const stats = this.playStats[g.id] || { plays: 0, seconds: 0 };
    this.specsModalContent.innerHTML = `
      <div class="modal-header">
        <div>
          <span class="core-pill ${g.core === "opus" ? "core-opus" : "core-astra"}">● ${g.coreName}</span>
          <h2 style="font-family:var(--font-display); font-size:28px; margin-top:8px;">${g.title}</h2>
          <div style="color:var(--game-accent); font-size:14px; margin-top:2px;">${g.tagline}</div>
        </div>
        <button class="modal-close-btn" id="btn-close-modal">✕</button>
      </div>
      <div style="border-radius:12px; overflow:hidden; border:1px solid var(--border-subtle); aspect-ratio:16/9; margin-bottom:16px;">
        <img src="${g.screenshots[0]}" alt="${g.title}" style="width:100%; height:100%; object-fit:cover;" />
      </div>
      <p style="font-size:14px; line-height:1.65; color:#cbd5e1; margin-bottom:16px;">${g.description}</p>
      <div class="hero-specs-grid" style="margin-bottom:16px;">
        <div class="spec-card"><div class="spec-label">ROM ID</div><div class="spec-value">${g.romCode}</div></div>
        <div class="spec-card"><div class="spec-label">RENDERER</div><div class="spec-value">${g.renderer}</div></div>
        <div class="spec-card"><div class="spec-label">SIZE</div><div class="spec-value">${g.romSize}</div></div>
        <div class="spec-card"><div class="spec-label">PLAY HISTORY</div><div class="spec-value">${stats.plays} runs (${Math.floor(stats.seconds / 60)}m)</div></div>
      </div>
      <div style="font-family:var(--font-mono); font-size:11px; color:var(--text-dim); margin-bottom:8px;">CONTROLLER & KEYBOARD MAPPING</div>
      <div class="hero-controls-bar" style="margin-bottom:20px;">
        ${g.controls.map((c) => `<div class="ctrl-chip"><kbd>${c.key}</kbd><span>${c.action}</span></div>`).join("")}
      </div>
      <div style="display:flex; gap:12px; flex-wrap:wrap;">
        <button class="btn-launch-main" id="modal-launch-btn">▶ LAUNCH CARTRIDGE</button>
        <button class="btn-console-action" id="modal-standalone-btn">↗ OPEN IN NEW TAB</button>
        ${
          g.altPath
            ? `<button class="btn-console-action" id="modal-alt-btn">⚡ RUN SINGLE-FILE BUILD (3MB)</button>`
            : ""
        }
      </div>
    `;

    this.specsModal.classList.add("modal-open");
    document.getElementById("btn-close-modal").onclick = () =>
      this.specsModal.classList.remove("modal-open");
    document.getElementById("modal-launch-btn").onclick = () => {
      this.specsModal.classList.remove("modal-open");
      this.launchGame(g, false);
    };
    document.getElementById("modal-standalone-btn").onclick = () => {
      this.specsModal.classList.remove("modal-open");
      this.launchGame(g, true);
    };
    const altBtn = document.getElementById("modal-alt-btn");
    if (altBtn) {
      altBtn.onclick = () => {
        window.open(encodeURI(g.altPath), "_blank", "noopener");
      };
    }
  }

  /* --------------------------------------------------------------------------
     UI & INPUT EVENT BINDINGS
     -------------------------------------------------------------------------- */
  bindUIEvents() {
    // System Core Tabs
    this.sysTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        this.sysTabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        this.activeCore = tab.dataset.core;
        this.selectedIndex = 0;
        soundFX.playTabSwitch();
        this.renderAll();
      });
    });

    // Genre Filter Pills
    this.genrePills.forEach((pill) => {
      pill.addEventListener("click", () => {
        this.genrePills.forEach((p) => p.classList.remove("active"));
        pill.classList.add("active");
        this.activeGenre = pill.dataset.genre;
        this.selectedIndex = 0;
        soundFX.playTick(600);
        this.renderAll();
      });
    });

    // View Mode Switcher
    this.viewBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.setViewMode(btn.dataset.view);
      });
    });

    // Search Box
    this.searchInput.addEventListener("input", (e) => {
      this.searchQuery = e.target.value.trim();
      this.selectedIndex = 0;
      this.renderAll();
    });

    // Hero CTA Buttons
    document.getElementById("btn-launch-hero").addEventListener("click", () => {
      this.launchGame(this.getSelectedGame(), false);
    });
    document.getElementById("btn-standalone-hero").addEventListener("click", () => {
      this.launchGame(this.getSelectedGame(), true);
    });
    this.btnFavHero.addEventListener("click", () => {
      this.toggleFavorite();
    });
    document.getElementById("btn-specs-hero").addEventListener("click", () => {
      soundFX.playTick(620);
      this.openSpecsModal(this.getSelectedGame());
    });
    this.monitorFrame.addEventListener("click", () => {
      this.launchGame(this.getSelectedGame(), false);
    });

    // Dock Prev/Next
    document.getElementById("dock-prev").addEventListener("click", () => {
      this.selectGameByIndex(this.selectedIndex - 1);
    });
    document.getElementById("dock-next").addEventListener("click", () => {
      this.selectGameByIndex(this.selectedIndex + 1);
    });

    // CRT Shader Toggle
    const crtBtn = document.getElementById("btn-crt-toggle");
    crtBtn.addEventListener("click", () => this.cycleCRT());

    // Audio Synth Mute Toggle
    const audioBtn = document.getElementById("btn-audio-toggle");
    const updateAudioLabel = () => {
      audioBtn.textContent = soundFX.muted ? "🔇 SFX OFF" : "🔊 SFX ON";
      audioBtn.classList.toggle("active", !soundFX.muted);
    };
    updateAudioLabel();
    audioBtn.addEventListener("click", () => {
      soundFX.toggleMute();
      updateAudioLabel();
    });

    // Replay Swissmarley Boot Loader Button
    document.getElementById("btn-replay-boot").addEventListener("click", () => {
      if (window.bootLoader) window.bootLoader.replay();
    });
    document.getElementById("brand-avatar-btn").addEventListener("click", () => {
      if (window.bootLoader) window.bootLoader.replay();
    });

    // Runner Controls
    document.getElementById("btn-runner-eject").addEventListener("click", () => {
      this.ejectGame();
    });
    document.getElementById("btn-runner-restart").addEventListener("click", () => {
      if (this.runningGame) {
        soundFX.playTick(580);
        this.runnerIframe.src = encodeURI(this.runningGame.path);
      }
    });
    document.getElementById("btn-runner-crt").addEventListener("click", () => {
      this.cycleCRT();
    });
    document.getElementById("btn-runner-collapse").addEventListener("click", () => {
      this.runnerModal.classList.add("bar-collapsed");
    });
    document.getElementById("runner-expand-pill").addEventListener("click", () => {
      this.runnerModal.classList.remove("bar-collapsed");
    });
    document.getElementById("btn-runner-fullscreen").addEventListener("click", () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    });
    document.getElementById("btn-runner-newtab").addEventListener("click", () => {
      if (this.runningGame) {
        window.open(encodeURI(this.runningGame.path), "_blank", "noopener");
      }
    });

    // Close modal on backdrop click
    this.specsModal.addEventListener("click", (e) => {
      if (e.target === this.specsModal) {
        this.specsModal.classList.remove("modal-open");
      }
    });
  }

  setViewMode(mode) {
    this.viewMode = mode;
    this.viewBtns.forEach((b) => b.classList.toggle("active", b.dataset.view === mode));
    document.querySelectorAll(".view-panel").forEach((p) => p.classList.remove("active-view"));
    document.getElementById(`${mode}-view`).classList.add("active-view");
    soundFX.playTabSwitch();
    this.renderAll();
  }

  cycleCRT() {
    this.crtIdx = (this.crtIdx + 1) % this.crtModes.length;
    const mode = this.crtModes[this.crtIdx];
    document.body.setAttribute("data-crt", mode);
    const crtBtn = document.getElementById("btn-crt-toggle");
    const labels = {
      off: "📺 CRT: OFF",
      scanlines: "📺 CRT: SCANLINES",
      cabinet: "📺 CRT: CABINET"
    };
    crtBtn.textContent = labels[mode];
    crtBtn.classList.toggle("active", mode !== "off");
    soundFX.playTick(720);
  }

  bindKeyboardAndGamepad() {
    window.addEventListener("keydown", (e) => {
      // If Boot Screen is active
      if (window.bootLoader && window.bootLoader.active) {
        if (e.key === "Enter") {
          soundFX.playLaunchChord();
          window.bootLoader.finishBoot();
        } else if (e.key === " ") {
          window.bootLoader.overclocking = true;
          window.bootLoader.emblemStage.classList.add("overclocking");
        }
        return;
      }

      // If Game Runner is active
      if (this.runningGame) {
        if (e.key === "F1") {
          e.preventDefault();
          this.ejectGame();
        }
        return;
      }

      // If Specs Modal is open
      if (this.specsModal.classList.contains("modal-open")) {
        if (e.key === "Escape") {
          this.specsModal.classList.remove("modal-open");
        }
        return;
      }

      // Ignore hotkeys when typing in search box
      if (document.activeElement === this.searchInput) {
        if (e.key === "Escape") {
          this.searchInput.blur();
        }
        return;
      }

      if (e.key === "/") {
        e.preventDefault();
        this.searchInput.focus();
      } else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        this.selectGameByIndex(this.selectedIndex + 1);
      } else if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        this.selectGameByIndex(this.selectedIndex - 1);
      } else if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") {
        this.selectGameByIndex(this.selectedIndex + 1);
      } else if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") {
        this.selectGameByIndex(this.selectedIndex - 1);
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.launchGame(this.getSelectedGame(), false);
      } else if (e.key === "f" || e.key === "F") {
        this.toggleFavorite();
      } else if (e.key === "v" || e.key === "V") {
        const order = ["deck", "retroarch", "grid"];
        const next = order[(order.indexOf(this.viewMode) + 1) % order.length];
        this.setViewMode(next);
      } else if (e.key === "c" || e.key === "C") {
        this.cycleCRT();
      } else if (e.key === "m" || e.key === "M") {
        document.getElementById("btn-audio-toggle").click();
      } else if (e.key === "i" || e.key === "I") {
        this.openSpecsModal(this.getSelectedGame());
      } else if (e.key === "q" || e.key === "Q" || e.key === "e" || e.key === "E") {
        const cores = ["all", "astra", "opus", "favorites", "recent"];
        const dir = e.key.toLowerCase() === "e" ? 1 : -1;
        const nextCore = cores[(cores.indexOf(this.activeCore) + dir + cores.length) % cores.length];
        const tabEl = document.querySelector(`.sys-tab[data-core="${nextCore}"]`);
        if (tabEl) tabEl.click();
      }
    });

    window.addEventListener("keyup", (e) => {
      if (window.bootLoader && window.bootLoader.active && e.key === " ") {
        window.bootLoader.overclocking = false;
        window.bootLoader.emblemStage.classList.remove("overclocking");
      }
    });

    // HTML5 Gamepad Polling Loop
    let lastPadTime = 0;
    const pollGamepad = (now) => {
      const pads = navigator.getGamepads ? navigator.getGamepads() : [];
      const pad = pads[0] || pads[1] || pads[2] || pads[3];
      const padStatus = document.getElementById("gamepad-status");

      if (pad) {
        if (padStatus) padStatus.textContent = `🎮 GAMEPAD ONLINE (${pad.id.slice(0, 14)})`;
        if (now - lastPadTime > 190 && !this.runningGame) {
          const axX = pad.axes[0] || 0;
          const dRight = pad.buttons[15]?.pressed || axX > 0.55;
          const dLeft = pad.buttons[14]?.pressed || axX < -0.55;
          const btnA = pad.buttons[0]?.pressed;
          const btnY = pad.buttons[3]?.pressed;
          const btnL1 = pad.buttons[4]?.pressed;
          const btnR1 = pad.buttons[5]?.pressed;

          if (dRight) {
            this.selectGameByIndex(this.selectedIndex + 1);
            lastPadTime = now;
          } else if (dLeft) {
            this.selectGameByIndex(this.selectedIndex - 1);
            lastPadTime = now;
          } else if (btnA) {
            if (window.bootLoader && window.bootLoader.active) {
              window.bootLoader.finishBoot();
            } else {
              this.launchGame(this.getSelectedGame(), false);
            }
            lastPadTime = now + 250;
          } else if (btnY) {
            this.toggleFavorite();
            lastPadTime = now + 200;
          } else if (btnL1 || btnR1) {
            const cores = ["all", "astra", "opus", "favorites", "recent"];
            const dir = btnR1 ? 1 : -1;
            const nextCore = cores[(cores.indexOf(this.activeCore) + dir + cores.length) % cores.length];
            const tabEl = document.querySelector(`.sys-tab[data-core="${nextCore}"]`);
            if (tabEl) tabEl.click();
            lastPadTime = now + 200;
          }
        }
      }
      requestAnimationFrame(pollGamepad);
    };
    requestAnimationFrame(pollGamepad);
  }

  initBackgroundCanvas() {
    const canvas = document.getElementById("bg-canvas");
    const ctx = canvas.getContext("2d");
    const nodes = Array.from({ length: 34 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: 1.2 + Math.random() * 1.8
    }));

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 216, 107, 0.28)";
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const d = Math.hypot(n.x - m.x, n.y - m.y);
          if (d < 160) {
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.strokeStyle = `rgba(57, 231, 95, ${(1 - d / 160) * 0.12})`;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    };
    requestAnimationFrame(draw);
  }

  startClock() {
    const clockEl = document.getElementById("console-clock");
    const tick = () => {
      const now = new Date();
      clockEl.textContent = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
      });
    };
    tick();
    setInterval(tick, 1000);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  window.consoleOS = new WebGamesConsoleOS();
  window.bootLoader = new SwissmarleyBootLoader(() => {
    soundFX.playTabSwitch();
  });
});

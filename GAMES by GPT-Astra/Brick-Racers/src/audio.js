const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

const ENGINE_URL = "/audio/engine/engine-loop.wav";
let engineBytes;
export function preloadEngine() {
  if (!engineBytes) {
    engineBytes = fetch(ENGINE_URL)
      .then((response) => {
        if (!response.ok)
          throw new Error(`Engine recording: HTTP ${response.status}`);
        return response.arrayBuffer();
      })
      .catch((error) => {
        engineBytes = null;
        throw error;
      });
  }
  return engineBytes;
}

/** Recorded engine and procedural effects, each on a bounded mixer bus. */
export class RaceAudio {
  constructor(context, mix = {}) {
    this.ctx = context;
    this.mix = { master: 0.8, engine: 0.8, effects: 0.8, music: 0.24, ...mix };
    this.muted = false;
    this.gear = 1;
    this.rpm = 1100;
    this.nextBeat = 0;
    this.beat = 0;
    this.shiftUntil = 0;
    this.events = {};
    this.master = context.createGain();
    this.master.gain.value = 0;
    this.limiter = context.createDynamicsCompressor();
    this.limiter.threshold.value = -8;
    this.limiter.knee.value = 10;
    this.limiter.ratio.value = 8;
    this.limiter.attack.value = 0.003;
    this.limiter.release.value = 0.16;
    this.analyser = context.createAnalyser();
    this.analyser.fftSize = 256;
    this.master
      .connect(this.limiter)
      .connect(this.analyser)
      .connect(context.destination);
    this.buses = {};
    for (const name of ["engine", "effects", "music", "ambience"]) {
      this.buses[name] = context.createGain();
      this.buses[name].connect(this.master);
    }
    this.noise = context.createBuffer(
      1,
      context.sampleRate * 2,
      context.sampleRate,
    );
    const data = this.noise.getChannelData(0);
    let seed = 13,
      brown = 0;
    for (let i = 0; i < data.length; i++) {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      const white = seed / 2147483648 - 1;
      brown = (brown + 0.045 * white) / 1.045;
      data[i] = white * 0.5 + brown * 2;
    }
    this.motor = null;
    this.rival = null;
    this.sampleStatus = "loading";
    this.playbackRate = 0.6;
    this.tires = this.loopNoise("engine", "bandpass", 1700, 1.9);
    this.wind = this.loopNoise("ambience", "lowpass", 480, 0.7);
    this.road = this.loopNoise("engine", "lowpass", 900, 0.7);
    this.ready = this.loadRecording();
    this.setMix(this.mix);
  }
  async loadRecording() {
    if (this.sampleStatus === "ready") return true;
    this.sampleStatus = "loading";
    try {
      const bytes = await preloadEngine();
      const buffer = await this.ctx.decodeAudioData(bytes.slice(0));
      this.motor = this.loopRecording(buffer);
      this.rival = this.loopRecording(buffer, true);
      this.sampleStatus = "ready";
      return true;
    } catch (error) {
      this.sampleStatus = "error";
      this.sampleError = error.message;
      return false;
    }
  }
  loopRecording(buffer, stereo = false) {
    const source = this.ctx.createBufferSource(),
      filter = this.ctx.createBiquadFilter(),
      gain = this.ctx.createGain();
    source.buffer = buffer;
    source.loop = true;
    source.playbackRate.value = 0.6;
    filter.type = "lowpass";
    filter.frequency.value = 1800;
    filter.Q.value = 0.5;
    gain.gain.value = 0;
    source.connect(filter).connect(gain);
    let pan;
    if (stereo) {
      pan = this.ctx.createStereoPanner();
      gain.connect(pan).connect(this.buses.engine);
    } else gain.connect(this.buses.engine);
    source.start(this.ctx.currentTime, stereo ? buffer.duration * 0.37 : 0);
    return { source, filter, gain, pan };
  }
  loopNoise(bus, type, frequency, q) {
    const source = this.ctx.createBufferSource(),
      filter = this.ctx.createBiquadFilter(),
      gain = this.ctx.createGain();
    source.buffer = this.noise;
    source.loop = true;
    filter.type = type;
    filter.frequency.value = frequency;
    filter.Q.value = q;
    gain.gain.value = 0;
    source.connect(filter).connect(gain).connect(this.buses[bus]);
    source.start();
    return { source, filter, gain };
  }
  setMix(mix, muted = this.muted, time = this.ctx.currentTime) {
    this.mix = { ...this.mix, ...mix };
    this.muted = muted;
    this.master.gain.setTargetAtTime(
      muted ? 0 : clamp(this.mix.master, 0, 1),
      time,
      0.025,
    );
    for (const name of ["engine", "effects", "music"])
      this.buses[name].gain.setTargetAtTime(
        clamp(this.mix[name], 0, 1),
        time,
        0.025,
      );
  }
  tone(
    freq,
    duration,
    type = "sine",
    volume = 0.1,
    time = this.ctx.currentTime,
    endFreq = freq,
    bus = "effects",
    pan = 0,
  ) {
    const oscillator = this.ctx.createOscillator(),
      gain = this.ctx.createGain(),
      panner = this.ctx.createStereoPanner();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(freq, time);
    oscillator.frequency.exponentialRampToValueAtTime(
      Math.max(20, endFreq),
      time + duration,
    );
    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(volume, time + 0.007);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);
    panner.pan.value = clamp(pan, -1, 1);
    oscillator.connect(gain).connect(panner).connect(this.buses[bus]);
    oscillator.start(time);
    oscillator.stop(time + duration + 0.02);
    oscillator.onended = () => {
      oscillator.disconnect();
      gain.disconnect();
      panner.disconnect();
    };
  }
  burst(
    duration,
    volume,
    frequency,
    time = this.ctx.currentTime,
    pan = 0,
    bus = "effects",
  ) {
    const source = this.ctx.createBufferSource(),
      filter = this.ctx.createBiquadFilter(),
      gain = this.ctx.createGain(),
      panner = this.ctx.createStereoPanner();
    source.buffer = this.noise;
    filter.type = "lowpass";
    filter.frequency.value = frequency;
    gain.gain.setValueAtTime(volume, time);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);
    panner.pan.value = clamp(pan, -1, 1);
    source
      .connect(filter)
      .connect(gain)
      .connect(panner)
      .connect(this.buses[bus]);
    source.start(time);
    source.stop(time + duration + 0.02);
    source.onended = () => {
      source.disconnect();
      filter.disconnect();
      gain.disconnect();
      panner.disconnect();
    };
  }
  event(
    name,
    { strength = 1, pan = 0, level = 1 } = {},
    time = this.ctx.currentTime,
  ) {
    this.events[name] = (this.events[name] || 0) + 1;
    const tone = (f, d, type, volume, offset = 0, end = f) =>
      this.tone(f, d, type, volume, time + offset, end, "effects", pan);
    if (name === "impact") {
      this.burst(
        0.12 + strength * 0.12,
        0.13 * strength,
        650 + strength * 1600,
        time,
        pan,
      );
      tone(90 + strength * 30, 0.18, "triangle", 0.15 * strength, 0, 35);
      tone(1800, 0.055, "sine", 0.035 * strength);
    }
    if (name === "pickup")
      [660, 880, 1100 + level * 90].forEach((f, i) =>
        tone(f, 0.14, "sine", 0.075, i * 0.045),
      );
    if (name === "boost") {
      this.burst(0.65, 0.12, 1300, time);
      tone(120, 0.5, "sawtooth", 0.035, 0, 700);
      tone(360, 0.4, "sine", 0.06, 0.05, 920);
    }
    if (name === "rocket") {
      this.burst(0.4, 0.22, 1800, time, pan);
      tone(700, 0.32, "triangle", 0.07, 0, 130);
    }
    if (name === "explosion") {
      this.burst(0.65, 0.3, 1300, time, pan);
      tone(100, 0.4, "sine", 0.22, 0, 24);
    }
    if (name === "shield")
      [480, 720, 960].forEach((f) => tone(f, 0.7, "sine", 0.045));
    if (name === "block") {
      tone(1300, 0.2, "sine", 0.12, 0, 370);
      this.burst(0.12, 0.07, 4000, time, pan);
    }
    if (name === "oil") {
      tone(190, 0.22, "sine", 0.12, 0, 55);
      this.burst(0.2, 0.09, 400, time);
    }
    if (name === "warning")
      [0, 0.18].forEach((t) => tone(750, 0.09, "square", 0.035, t));
    if (name === "countdown") tone(440, 0.16, "sine", 0.12);
    if (name === "go")
      [660, 880, 1320].forEach((f, i) =>
        tone(f, 0.38, "triangle", 0.09, i * 0.06),
      );
    if (name === "lap" || name === "finish")
      [523, 659, 784, 1047].forEach((f, i) =>
        tone(f, name === "finish" ? 0.65 : 0.25, "triangle", 0.075, i * 0.12),
      );
    if (name === "shift") {
      this.burst(0.045, 0.018, 950, time);
    }
  }
  update(dt, data, time = this.ctx.currentTime) {
    const racing = data.mode === "race",
      idling = data.mode === "countdown",
      active = racing || idling;
    const speed = Math.abs(data.speed || 0),
      throttle = racing && data.throttle ? 1 : 0;
    // Hysteresis avoids a repeated shift at a gear boundary.
    const up = [0, 11, 23, 36, 51, Infinity],
      down = [0, 0, 8, 19, 31, 45];
    let gear = this.gear;
    if (speed > up[gear] && gear < 5) gear++;
    else if (speed < down[gear] && gear > 1) gear--;
    if (gear !== this.gear) {
      if (racing) this.event("shift", {}, time);
      this.gear = gear;
      this.shiftUntil = time + 0.1;
    }
    const ratios = [0, 1, 0.63, 0.45, 0.34, 0.27];
    const targetRpm =
      1050 +
      speed * ratios[this.gear] * 340 +
      throttle * 500 +
      (data.boost > 0 ? 600 : 0);
    this.rpm +=
      (clamp(targetRpm, 1000, 7700) - this.rpm) * (1 - Math.exp(-dt * 9));
    const load = throttle ? 1 : 0.52,
      shift = time < this.shiftUntil ? 0.58 : 1;
    const smooth = (param, value, rate = 0.08) =>
      param.setTargetAtTime(value, time, rate);
    // A restrained pitch range preserves the recorded engine's body.
    this.playbackRate = 0.55 + ((this.rpm - 1000) / 6700) * 1.15;
    if (this.motor) {
      smooth(this.motor.source.playbackRate, this.playbackRate, 0.055);
      smooth(this.motor.filter.frequency, 1100 + this.rpm * 0.55 * load);
      smooth(
        this.motor.gain.gain,
        active ? (0.24 + load * 0.28) * shift : 0,
        0.035,
      );
    }
    const slip = data.drift > 0 ? 0.06 : data.braking && speed > 10 ? 0.025 : 0;
    smooth(this.tires.gain.gain, racing ? slip : 0);
    smooth(
      this.tires.filter.frequency,
      1450 + Math.sin(time * 13) * 150 + speed * 7,
    );
    smooth(
      this.road.gain.gain,
      racing ? Math.min(0.07, speed * 0.00045) * (data.offroad ? 2.6 : 1) : 0,
    );
    smooth(this.road.filter.frequency, data.offroad ? 1500 : 480);
    smooth(this.wind.gain.gain, active ? speed * 0.0003 : 0);
    smooth(this.wind.filter.frequency, data.theme === "space" ? 150 : 440);
    smooth(this.buses.ambience.gain, this.mix.effects * (data.paused ? 0 : 1));
    const rival = data.rival;
    if (this.rival) {
      smooth(
        this.rival.gain.gain,
        racing && rival
          ? 0.1 * Math.max(0, 1 - Math.abs(rival.distance) / 28)
          : 0,
      );
      if (rival) {
        smooth(
          this.rival.source.playbackRate,
          clamp(0.65 + rival.speed * 0.012, 0.55, 1.5),
        );
        smooth(this.rival.pan.pan, clamp(rival.lane / 9, -1, 1));
      }
    }
    smooth(
      this.buses.effects.gain,
      data.mode === "paused" ? 0 : this.mix.effects,
    );
    smooth(this.buses.music.gain, data.mode === "paused" ? 0 : this.mix.music);
    if (
      this.mix.music > 0 &&
      !this.muted &&
      ["race", "countdown", "menu"].includes(data.mode)
    ) {
      if (this.nextBeat < time - 0.1) this.nextBeat = time;
      if (this.nextBeat <= time + 0.08) {
        const beatTime = Math.max(time, this.nextBeat),
          roots = {
            pirate: 146.83,
            desert: 130.81,
            space: 164.81,
            ice: 174.61,
            jungle: 146.83,
            volcano: 123.47,
          };
        const root = roots[data.theme] || 146.83,
          pattern = [0, 7, 12, 7, 3, 7, 10, 7, 5, 9, 12, 9, 3, 7, 10, 14];
        this.tone(
          root * 2 ** (pattern[this.beat % 16] / 12),
          0.18,
          "triangle",
          0.07,
          beatTime,
          root * 2 ** (pattern[this.beat % 16] / 12),
          "music",
          Math.sin(this.beat) * 0.35,
        );
        if (this.beat % 4 === 0) {
          this.tone(root / 2, 0.3, "sine", 0.16, beatTime, root / 2, "music");
          this.tone(110, 0.12, "sine", 0.13, beatTime, 36, "music");
        }
        if (this.beat % 2)
          this.burst(0.045, 0.055, 4200, beatTime, 0.3, "music");
        this.beat++;
        this.nextBeat = beatTime + 0.23;
      }
    } else this.nextBeat = time;
  }
  snapshot() {
    const values = new Float32Array(this.analyser.fftSize);
    this.analyser.getFloatTimeDomainData(values);
    return {
      unlocked: this.ctx.state === "running",
      muted: this.muted,
      sampleStatus: this.sampleStatus,
      engineSource: "qubodup / CC BY 3.0",
      playbackRate: this.playbackRate,
      sampleDuration: this.motor?.source.buffer.duration || 0,
      gear: this.gear,
      rpm: Math.round(this.rpm),
      mix: { ...this.mix },
      peak: Math.max(...values.map(Math.abs)),
      events: { ...this.events },
    };
  }
}

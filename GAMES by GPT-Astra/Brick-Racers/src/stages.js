import * as THREE from "three";
export const extraTracks = [
  {
    name: "Frostbite Pass",
    cup: "THE ALPINE CUP",
    desc: "Blue ice. Tight switchbacks. Keep your cool.",
    difficulty: "● ● ●  EXPERT",
    weather: "❄  LIGHT SNOW",
    sky: 0xc9e1ee,
    fog: 0xd4e7ee,
    water: 0x749fb6,
    ground: 0xe1edf0,
    infield: 0xc6dce2,
    road: 0x759aaa,
    accent: 0x5fc7e2,
    theme: "ice",
    surface: "PACKED SNOW",
    grip: 0.7,
    offroadGrip: 0.48,
    points: [
      [0, 165],
      [-110, 145],
      [-170, 70],
      [-165, -50],
      [-115, -145],
      [-40, -155],
      [-30, -70],
      [45, -70],
      [55, -150],
      [135, -125],
      [175, -25],
      [125, 70],
      [80, 150],
    ],
  },
  {
    name: "Jungle Run",
    cup: "THE EXPLORER CUP",
    desc: "Ancient ruins. Wild corners. No looking back.",
    difficulty: "● ● ○  INTERMEDIATE",
    weather: "☀  TROPICAL HAZE",
    sky: 0xc1dfc6,
    fog: 0xbcd6b5,
    water: 0x438e80,
    ground: 0xb1b17b,
    infield: 0x5d8a55,
    road: 0x7f8970,
    accent: 0xefb84f,
    theme: "jungle",
    surface: "JUNGLE TARMAC",
    grip: 1.12,
    offroadGrip: 0.65,
    points: [
      [0, 150],
      [-95, 150],
      [-165, 85],
      [-140, 0],
      [-170, -70],
      [-100, -150],
      [0, -125],
      [85, -155],
      [155, -85],
      [120, -5],
      [170, 65],
      [105, 140],
    ],
  },
  {
    name: "Ember Ridge",
    cup: "THE INFERNO CUP",
    desc: "Race the rim. Leave the competition in ashes.",
    difficulty: "● ● ●  EXPERT",
    weather: "✧  VOLCANIC DUSK",
    sky: 0x55445b,
    fog: 0x795c68,
    water: 0xd75826,
    ground: 0x65545a,
    infield: 0x493e49,
    road: 0x716777,
    accent: 0xff9b45,
    theme: "volcano",
    surface: "VOLCANIC ASPHALT",
    grip: 0.9,
    offroadGrip: 0.5,
    points: [
      [0, 165],
      [-100, 130],
      [-170, 45],
      [-145, -75],
      [-85, -155],
      [20, -165],
      [150, -100],
      [165, 0],
      [85, 35],
      [120, 100],
      [60, 150],
    ],
  },
];

export function addStageScenery({
  group,
  cfg,
  box,
  brick,
  mat,
  sample,
  length,
  obstacles,
}) {
  const animated = [];
  const addMesh = (geo, color, x, y, z) => {
    const m = new THREE.Mesh(geo, mat(color));
    m.position.set(x, y, z);
    m.castShadow = true;
    m.receiveShadow = true;
    group.add(m);
    return m;
  };
  if (cfg.theme === "ice") {
    for (let i = 0; i < 5; i++) {
      const x = -45 + i * 14,
        z = -15 - Math.sin(i) * 14;
      const mountain = addMesh(
        new THREE.ConeGeometry(22, 42 + i * 5, 4),
        0xb8d1dd,
        x,
        20 + i * 2,
        z,
      );
      mountain.rotation.y = Math.PI / 4;
      const cap = addMesh(
        new THREE.ConeGeometry(10, 20, 4),
        0xf2f6ee,
        x,
        36 + i * 2,
        z,
      );
      cap.rotation.y = Math.PI / 4;
    }
    // Timber alpine lodge on the infield.
    const lodge = new THREE.Group();
    lodge.position.set(-35, 0, 65);
    group.add(lodge);
    for (let row = 0; row < 5; row++)
      box(
        lodge,
        0,
        1.5 + row * 2.7,
        0,
        30,
        2.5,
        16,
        row % 2 ? 0x946e54 : 0xa67b58,
      );
    for (let side of [-1, 1]) {
      const roof = box(lodge, side * 8, 16, 0, 18, 1, 21, 0xf0f3e9);
      roof.rotation.z = -side * 0.35;
      for (let i = 0; i < 3; i++)
        box(lodge, -10 + i * 10, 8, side * 8.1, 4, 4, 0.2, 0x567f97);
    }
    box(lodge, 0, 4, 8.2, 4, 8, 0.2, 0x684e42);
    for (let t of [0.25, 0.58, 0.78]) {
      const a = sample(length * t),
        g = new THREE.Group();
      g.position.copy(a.p).addScaledVector(a.right, 19);
      group.add(g);
      for (let i = 0; i < 3; i++) {
        const crystal = new THREE.Mesh(
          new THREE.ConeGeometry(2 + i * 0.4, 9 + i * 3, 5),
          mat(0x90d8ea, 0.22),
        );
        crystal.position.set(i * 3, 4 + i, 0);
        g.add(crystal);
      }
    }
  }
  if (cfg.theme === "jungle") {
    const temple = new THREE.Group();
    temple.position.set(-20, 0, -5);
    group.add(temple);
    for (let i = 0; i < 7; i++)
      box(
        temple,
        0,
        i * 3 + 1,
        0,
        64 - i * 6,
        3,
        48 - i * 4,
        i % 2 ? 0xa6aa78 : 0xbbbd8d,
      );
    box(temple, 0, 25, 0, 18, 10, 16, 0xc4c798);
    box(temple, 0, 25, 8.1, 6, 8, 0.25, 0x344d3c);
    box(temple, 0, 31, 0, 23, 3, 21, 0x637e50);
    for (let i = 0; i < 14; i++)
      box(temple, 0, i * 1.6 + 0.5, 28 - i * 0.9, 9, 1.6, 2, 0xc9c79a);
    for (let side of [-1, 1]) {
      box(temple, side * 27, 9, 0, 4, 20, 4, 0x507e4a);
      for (let j = 0; j < 4; j++)
        box(temple, side * 24, 10 + j * 3, 1, 9, 1.5, 5, 0x618d50);
    }
    // Freestanding stone arches keep the racing corridor clear.
    for (let t of [0.2, 0.71]) {
      for (const side of [-1, 1])
        obstacles.push({
          s: length * t,
          lane: side * 12,
          halfWidth: 1.5,
          halfLength: 2,
          kind: "stone arch",
        });
      const a = sample(length * t),
        g = new THREE.Group();
      g.position.copy(a.p);
      g.rotation.y = a.angle;
      group.add(g);
      for (let side of [-1, 1]) {
        box(g, side * 12, 6, 0, 3, 12, 4, 0xaaa97d);
        brick(g, side * 12, 13, 0, 4, 2, 5, 0x91a270, false);
      }
      box(g, 0, 15, 0, 27, 3, 5, 0xb8bd8e);
      box(g, 0, 15, 2.6, 4, 2, 0.2, 0xe0b34e);
    }
  }
  if (cfg.theme === "volcano") {
    for (let i = 0; i < 8; i++)
      addMesh(
        new THREE.CylinderGeometry(46 - i * 4, 50 - i * 4, 5, 10),
        i % 2 ? 0x55464d : 0x443c46,
        -15,
        i * 4.5,
        -10,
      );
    const lava = addMesh(
      new THREE.CylinderGeometry(16, 16, 0.5, 24),
      0xff8337,
      -15,
      35,
      -10,
    );
    lava.material = new THREE.MeshStandardMaterial({
      color: 0xff7a26,
      emissive: 0xff4b08,
      emissiveIntensity: 1.3,
    });
    for (let i = 0; i < 4; i++) {
      const flow = box(
        group,
        -15 + (i - 1.5) * 8,
        17,
        -10 + 33,
        3,
        33,
        1,
        new THREE.MeshStandardMaterial({
          color: 0xff9b35,
          emissive: 0xff4c08,
          emissiveIntensity: 0.6,
        }),
      );
      flow.rotation.x = -0.43;
    }
    for (let t of [0.15, 0.35, 0.65, 0.9]) {
      const a = sample(length * t),
        g = new THREE.Group();
      g.position.copy(a.p).addScaledVector(a.right, 20);
      group.add(g);
      for (let i = 0; i < 4; i++) {
        const pillar = new THREE.Mesh(
          new THREE.CylinderGeometry(2, 2.5, 7 + i * 3, 6),
          mat(0x443d4d),
        );
        pillar.position.set((i - 1.5) * 3, 3.5 + i * 1.5, 0);
        pillar.castShadow = true;
        g.add(pillar);
      }
    }
  }
  if (cfg.theme === "ice" || cfg.theme === "volcano") {
    const count = 180,
      positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = Math.sin(i * 93.7) * 200;
      positions[i * 3 + 1] = (i * 7.13) % 65;
      positions[i * 3 + 2] = Math.cos(i * 27.3) * 180;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const snow = cfg.theme === "ice";
    const particles = new THREE.Points(
      geo,
      new THREE.PointsMaterial({
        color: snow ? 0xf8ffff : 0xffaf53,
        size: snow ? 0.32 : 0.45,
        transparent: true,
        opacity: 0.8,
        depthWrite: false,
      }),
    );
    group.add(particles);
    animated.push((t) => {
      for (let i = 0; i < count; i++)
        positions[i * 3 + 1] =
          (((i * 7.13 + (snow ? -t * 2 : t * 3)) % 65) + 65) % 65;
      geo.attributes.position.needsUpdate = true;
    });
  }
  return (t) => animated.forEach((fn) => fn(t));
}

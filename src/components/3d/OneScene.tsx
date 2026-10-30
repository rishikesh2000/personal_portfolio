import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';
import type { Project } from '../../types';
import { projectsData } from '../../data/projectsData';

// Custom Cyber Grid Shaders with wave, curl, crosshairs, and exhibit spotlight wave
const gridVertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uWave;
  uniform float uCurl;
  uniform float uSize;
  varying vec2 vUv;
  varying vec3 vWorldPos;

  void main() {
    vUv = uv;
    vec3 p = position;
    float h = sin(uTime * 0.85 + p.x * 0.16 + p.z * 0.12) * 0.45 * uWave;
    vec3 q = vec3(p.x, h, p.z);
    float k = uCurl * 6.2831853 / uSize;
    if (abs(k) > 1e-4) {
      float a = p.x * k;
      q = vec3(sin(a) / k - sin(a) * h, (1.0 - cos(a)) / k + cos(a) * h, p.z);
    }
    vWorldPos = (modelMatrix * vec4(q, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(q, 1.0);
  }
`;

const gridFragmentShader = /* glsl */ `
  uniform vec3 uLineDark;
  uniform vec3 uLineLight;
  uniform float uLight;
  uniform float uOpacity;
  uniform float uFlow;
  uniform float uCells;
  uniform float uCurl;
  uniform float uExtent;
  uniform vec2 uFocus;
  uniform float uFocusAmp;
  uniform vec3 uBlue;
  uniform vec2 uSpot;
  uniform float uSpotHalf;
  uniform float uSpotAmp;
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vWorldPos;

  float sdPlus(vec2 p, float size, float thickness) {
    vec2 d = abs(p) - vec2(size, thickness);
    float h = length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
    d = abs(p) - vec2(thickness, size);
    float v = length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
    return min(h, v);
  }

  float grid(vec2 g) {
    vec2 f = fract(g);
    vec2 w = max(abs(dFdx(g)), abs(dFdy(g))) * 1.1;
    vec2 lines = abs(f - 0.5);
    vec2 aa = smoothstep(0.5 - w, 0.5 - w * 0.5, lines);
    return max(aa.x, aa.y);
  }

  void main() {
    vec2 g = (vUv - 0.5) * uCells;
    g.y += uFlow;

    float lineMask = grid(g);
    vec2 cell = floor(g / 2.0 + 0.5) * 2.0;
    float plus = 1.0 - smoothstep(0.0, max(fwidth(g.x), 0.01) * 1.2, sdPlus(g - cell, 0.18, 0.02));

    vec2 d = (vUv - 0.5) * 2.0;
    d.x *= 1.0 - clamp(uCurl, 0.0, 1.0) * 0.92;
    vec2 d4 = d * d * d * d;
    float r = mix(length(d), pow(d4.x + d4.y, 0.25), 1.0 - uExtent);
    float inner = uExtent * (0.3 + (1.0 - uExtent) * 0.7);
    float fade = 1.0 - smoothstep(inner, uExtent, r);

    vec3 color = mix(uLineDark, uLineLight, uLight);
    float lineAlpha = mix(0.45, 0.16, uLight);
    float plusAlpha = mix(0.92, 0.58, uLight);
    float a = max(lineMask * lineAlpha, plus * plusAlpha);

    // Pointer focus: blue aura around pointer coordinates
    float near = (1.0 - smoothstep(0.6, 3.2, length(g - uFocus))) * uFocusAmp;
    color = mix(color, uBlue, near);
    a = max(a, lineMask * near * 0.75);

    // Active exhibit highlight: blue signal pulse outward beneath rising panels
    if (uSpotAmp > 0.001) {
      vec2 q = (vUv - 0.5) * uCells - uSpot;
      float dist = length(vec2(max(abs(q.x) - uSpotHalf, 0.0), q.y));
      float reach = uSpotAmp * 4.5;
      float lit = (1.0 - smoothstep(reach - 2.2, reach, dist)) * uSpotAmp;
      float signal = exp(-pow((dist - mod(uTime * 1.6, 6.0)) * 1.8, 2.0)) * smoothstep(0.7, 1.0, uSpotAmp);
      float on = max(lit, signal * 0.85);
      color = mix(color, uBlue, on);
      a = max(a, max(lineMask, plus) * on * 0.95);
    }

    gl_FragColor = vec4(color, a * fade * uOpacity);
  }
`;

// Camera Rig that smoothly travels along the Z track
function CameraRig({
  progress,
  pointerX,
  pointerY
}: {
  progress: number;
  pointerX: number;
  pointerY: number;
}) {
  const { camera } = useThree();

  useFrame(() => {
    // Progress 0.0 -> z = 5.5; Progress 1.0 -> z = -86.0
    const targetZ = 5.5 + progress * (-91.5);
    const targetY = 1.15 + Math.sin(progress * Math.PI) * 0.35 - pointerY * 0.25;
    const targetX = pointerX * 0.8;

    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.1);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.1);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.1);

    // Camera always looks ahead along the track with slight mouse sway
    const lookTarget = new THREE.Vector3(
      camera.position.x * 0.25,
      camera.position.y * 0.6,
      camera.position.z - 7.5
    );
    camera.lookAt(lookTarget);
  });

  return null;
}

// Infinite Grid extending throughout the 3D track
function TrackGrid({
  pointerX,
  pointerY,
  camZ
}: {
  pointerX: number;
  pointerY: number;
  camZ: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uWave: { value: 0.6 },
      uCurl: { value: 0.02 },
      uSize: { value: 48.0 },
      uLineDark: { value: new THREE.Color('#1c2333') },
      uLineLight: { value: new THREE.Color('#3b82f6') },
      uLight: { value: 0.28 },
      uOpacity: { value: 0.95 },
      uFlow: { value: 0.0 },
      uCells: { value: 36.0 },
      uExtent: { value: 0.92 },
      uFocus: { value: new THREE.Vector2(0, 0) },
      uFocusAmp: { value: 1.0 },
      uBlue: { value: new THREE.Color('#0052ff') },
      uSpot: { value: new THREE.Vector2(0, 0) },
      uSpotHalf: { value: 1.2 },
      uSpotAmp: { value: 0.8 }
    }),
    []
  );

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    uniforms.uTime.value = elapsed;
    uniforms.uFlow.value = -camZ * 0.15; // Grid lines flow dynamically as camera travels!

    // Pointer focus
    uniforms.uFocus.value.x = THREE.MathUtils.lerp(uniforms.uFocus.value.x, pointerX * 14.0, 0.08);
    uniforms.uFocus.value.y = THREE.MathUtils.lerp(uniforms.uFocus.value.y, pointerY * 14.0, 0.08);

    if (meshRef.current) {
      meshRef.current.position.z = camZ - 10.0;
      meshRef.current.position.y = -2.1;
      meshRef.current.rotation.x = -Math.PI / 2.3;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[48, 80, 80, 80]} />
      <shaderMaterial
        vertexShader={gridVertexShader}
        fragmentShader={gridFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// 1. HERO 3D ELEMENT: Floating Holographic Core & Title
function Hero3DElement({ camZ }: { camZ: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (coreRef.current) {
      coreRef.current.rotation.x = t * 0.35;
      coreRef.current.rotation.y = t * 0.5;
    }
    // Fade out as camera travels past z = -5
    if (groupRef.current) {
      const dist = Math.abs(camZ - 0);
      groupRef.current.visible = dist < 12;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.4, -1.0]}>
      {/* Spinning Geometric Core */}
      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh ref={coreRef} position={[0, 1.2, -0.5]}>
          <octahedronGeometry args={[0.9, 0]} />
          <meshStandardMaterial
            color="#0052ff"
            wireframe
            emissive="#3b82f6"
            emissiveIntensity={0.9}
            roughness={0.2}
          />
        </mesh>
      </Float>

      {/* Orbit ring */}
      <mesh position={[0, 1.2, -0.5]} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.5, 0.012, 16, 64]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.6} />
      </mesh>

      {/* 3D Floating Hero Headline */}
      <Text
        position={[0, 0.3, 0.2]}
        fontSize={0.42}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.06}
        fontWeight="bold"
      >
        RISHI
      </Text>

      <Text
        position={[0, -0.15, 0.2]}
        fontSize={0.14}
        color="#38bdf8"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.12}
      >
        CREATIVE TECHNOLOGIST &bull; 3D AI ENGINEER
      </Text>

      <Text
        position={[0, -0.55, 0.2]}
        fontSize={0.11}
        color="#94a3b8"
        anchorX="center"
        anchorY="middle"
        maxWidth={3.8}
        lineHeight={1.4}
      >
        Interactive Spatial Software &middot; 3D WebGL Worlds &middot; Realtime AI Pipelines
      </Text>

      <Text
        position={[0, -0.95, 0.2]}
        fontSize={0.09}
        color="#3b82f6"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.1}
      >
        [ SCROLL WHEEL &bull; TOUCH SWIPE &bull; ARROW KEYS TO TRAVEL &gt; ]
      </Text>
    </group>
  );
}

// 2. ABOUT / MANIFESTO 3D ELEMENT: Holographic Glass Monolith
function Manifesto3DElement({ camZ }: { camZ: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      const dist = Math.abs(camZ - (-10.0));
      groupRef.current.visible = dist < 14;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.5, -10.0]}>
      {/* 3D Glass Slab */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[4.2, 2.6, 0.1]} />
        <meshPhysicalMaterial
          color="#0d1117"
          transparent
          opacity={0.8}
          roughness={0.1}
          metalness={0.8}
          transmission={0.6}
          ior={1.4}
        />
      </mesh>

      {/* Corner laser accents */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(4.25, 2.65, 0.12)]} />
        <lineBasicMaterial color="#3b82f6" transparent opacity={0.7} />
      </lineSegments>

      <Text
        position={[0, 0.8, 0.08]}
        fontSize={0.22}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.05}
      >
        EXPERIENCES, ENGINEERED.
      </Text>

      <Text
        position={[0, 0.1, 0.08]}
        fontSize={0.13}
        color="#94a3b8"
        maxWidth={3.6}
        lineHeight={1.4}
        anchorX="center"
        anchorY="middle"
      >
        Rishi builds interactive spatial software, real-time AI pipelines, and creative 3D WebGL worlds. One team loop from architecture to code.
      </Text>
    </group>
  );
}

// 3. RISING 3D PROJECT PANEL: Stands up from the floor grid as the camera approaches!
function RisingProjectPanel({
  project,
  index,
  zTarget,
  camZ,
  onSelect
}: {
  project: Project;
  index: number;
  zTarget: number;
  camZ: number;
  onSelect: (p: Project) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!groupRef.current || !meshRef.current) return;

    // Distance from camera to panel along Z
    const dist = camZ - zTarget;

    // RISING PARAMETRIC LOGIC:
    // When camera is approaching (dist between 10.0 and 2.5):
    // Panel rotates from flat on the floor (-Math.PI / 2) to standing upright (0)
    // Height rises from -1.8 to 0.5
    let riseT = 0;
    if (dist > 10.0) {
      riseT = 0; // Flat on floor ahead
    } else if (dist >= 2.5) {
      riseT = (10.0 - dist) / 7.5; // Smoothly rising up
    } else if (dist >= -2.0) {
      riseT = 1.0; // Fully standing upright in front of camera
    } else {
      // Camera passed it, tilts gently back
      riseT = Math.max(0, 1.0 - (-2.0 - dist) / 4.0);
    }

    const targetRotX = THREE.MathUtils.lerp(-Math.PI / 2.1, 0, riseT);
    const targetY = THREE.MathUtils.lerp(-1.8, 0.5, riseT);

    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotX, 0.12);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.12);

    // Subtle side shift for staggered gallery layout
    const xOffset = (index % 2 === 0 ? -1 : 1) * 0.45;
    meshRef.current.position.x = xOffset;

    // Visibility cull
    groupRef.current.visible = Math.abs(dist) < 16;
  });

  return (
    <group ref={groupRef} position={[0, 0, zTarget]}>
      {/* Interactive Panel Mesh */}
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(project);
        }}
        onPointerOver={() => {
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'default';
        }}
      >
        <boxGeometry args={[4.4, 2.7, 0.08]} />
        <meshStandardMaterial
          color="#0c1018"
          roughness={0.2}
          metalness={0.7}
        />

        {/* Laser Border Frame */}
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(4.42, 2.72, 0.09)]} />
          <lineBasicMaterial color="#3b82f6" transparent opacity={0.8} />
        </lineSegments>

        {/* Screen Header */}
        <Text
          position={[-1.9, 1.05, 0.06]}
          fontSize={0.11}
          color="#38bdf8"
          anchorX="left"
          anchorY="middle"
          letterSpacing={0.08}
        >
          {`0${index + 1} // ${project.category.toUpperCase()}`}
        </Text>

        {/* Project Title */}
        <Text
          position={[-1.9, 0.65, 0.06]}
          fontSize={0.24}
          color="#ffffff"
          anchorX="left"
          anchorY="middle"
          fontWeight="bold"
        >
          {project.title.toUpperCase()}
        </Text>

        {/* Headline */}
        <Text
          position={[-1.9, 0.15, 0.06]}
          fontSize={0.12}
          color="#94a3b8"
          maxWidth={3.8}
          lineHeight={1.4}
          anchorX="left"
          anchorY="middle"
        >
          {project.headline}
        </Text>

        {/* Specs Pill */}
        <Text
          position={[-1.9, -0.5, 0.06]}
          fontSize={0.1}
          color="#3b82f6"
          anchorX="left"
          anchorY="middle"
        >
          {`STACK: ${project.tags.slice(0, 3).join(' · ')}`}
        </Text>

        {/* CTA Label */}
        <Text
          position={[1.9, -1.0, 0.06]}
          fontSize={0.11}
          color="#ffffff"
          anchorX="right"
          anchorY="middle"
        >
          CLICK TO OPEN ARCHIVE &gt;
        </Text>
      </mesh>
    </group>
  );
}

// 4. 3D SYSTEMS ARCHITECTURE STACK: 3 Floating isometric slabs at z = -48
function LayerStack3DElement({ camZ }: { camZ: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      const dist = Math.abs(camZ - (-48.0));
      groupRef.current.visible = dist < 14;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.4, -48.0]}>
      {/* Top Slab: Sensory Inputs */}
      <mesh position={[0, 1.1, 0]}>
        <boxGeometry args={[4.2, 0.2, 2.2]} />
        <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.8} />
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(4.22, 0.22, 2.22)]} />
          <lineBasicMaterial color="#38bdf8" />
        </lineSegments>
        <Text position={[0, 0, 1.15]} fontSize={0.13} color="#38bdf8" anchorX="center" anchorY="middle">
          TIER 01: SENSORY I/O (VISION &middot; TOUCH &middot; BARCODE)
        </Text>
      </mesh>

      {/* Middle Slab: AI Inference Engine */}
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[4.2, 0.2, 2.2]} />
        <meshStandardMaterial color="#0b1329" roughness={0.3} metalness={0.8} />
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(4.22, 0.22, 2.22)]} />
          <lineBasicMaterial color="#3b82f6" />
        </lineSegments>
        <Text position={[0, 0, 1.15]} fontSize={0.13} color="#3b82f6" anchorX="center" anchorY="middle">
          TIER 02: AI INFERENCE (GPU FACE-SWAP &middot; LLM &middot; DIFFUSION)
        </Text>
      </mesh>

      {/* Bottom Slab: Edge Systems & Kiosks */}
      <mesh position={[0, -0.9, 0]}>
        <boxGeometry args={[4.2, 0.2, 2.2]} />
        <meshStandardMaterial color="#0a0e1c" roughness={0.3} metalness={0.8} />
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(4.22, 0.22, 2.22)]} />
          <lineBasicMaterial color="#6366f1" />
        </lineSegments>
        <Text position={[0, 0, 1.15]} fontSize={0.13} color="#6366f1" anchorX="center" anchorY="middle">
          TIER 03: EDGE KIOSKS (OFFLINE SQLITE &middot; CHROMIUM &middot; SSE)
        </Text>
      </mesh>
    </group>
  );
}

// 5. 3D PROCESS WAYPOINTS at z = -74
function Process3DElement({ camZ }: { camZ: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      const dist = Math.abs(camZ - (-74.0));
      groupRef.current.visible = dist < 14;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.4, -74.0]}>
      {/* 3 Waypoint Pylons */}
      {[-1.8, 0, 1.8].map((x, i) => (
        <group key={i} position={[x, 0, 0]}>
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.35, 0.45, 1.6, 6]} />
            <meshStandardMaterial color="#0e1422" roughness={0.3} metalness={0.7} />
          </mesh>
          <Text position={[0, 0.1, 0.4]} fontSize={0.18} color="#3b82f6" anchorX="center" anchorY="middle">
            {`0${i + 1}`}
          </Text>
          <Text position={[0, -0.3, 0.4]} fontSize={0.09} color="#94a3b8" anchorX="center" anchorY="middle">
            {i === 0 ? 'CONCEPT FLOW' : i === 1 ? 'RUNNING PROTOTYPE' : 'DEVICE STRESS TEST'}
          </Text>
        </group>
      ))}
    </group>
  );
}

// 6. 3D CONTACT HORIZON PORTAL at z = -86
function ContactHorizon3DElement({
  camZ,
  onOpenContact
}: {
  camZ: number;
  onOpenContact: () => void;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      const dist = Math.abs(camZ - (-86.0));
      groupRef.current.visible = dist < 14;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.6, -86.0]}>
      {/* Holographic Portal Frame */}
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          onOpenContact();
        }}
        onPointerOver={() => {
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'default';
        }}
      >
        <boxGeometry args={[4.6, 2.8, 0.1]} />
        <meshStandardMaterial color="#0b0e17" roughness={0.2} metalness={0.8} />
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(4.62, 2.82, 0.12)]} />
          <lineBasicMaterial color="#0052ff" />
        </lineSegments>

        <Text position={[0, 0.6, 0.1]} fontSize={0.26} color="#ffffff" anchorX="center" anchorY="middle" fontWeight="bold">
          SHALL WE TRANSMIT?
        </Text>

        <Text position={[0, 0.05, 0.1]} fontSize={0.13} color="#94a3b8" anchorX="center" anchorY="middle">
          Direct brief transmission to Rishi &bull; 24h technical turnaround
        </Text>

        <Text position={[0, -0.6, 0.1]} fontSize={0.15} color="#38bdf8" anchorX="center" anchorY="middle">
          CLICK TO OPEN TRANSMITTER &gt;
        </Text>
      </mesh>
    </group>
  );
}

// Background Star Particle Field
function ParticleField() {
  const count = 1000;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 2] = -Math.random() * 95;
    }
    return pos;
  }, [count]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.06} color="#7dd3fc" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

interface OneSceneProps {
  progress: number;
  pointerX: number;
  pointerY: number;
  onSelectProject: (p: Project) => void;
  onOpenContact: () => void;
}

export const OneScene: React.FC<OneSceneProps> = ({
  progress,
  pointerX,
  pointerY,
  onSelectProject,
  onOpenContact
}) => {
  // Approximate camera Z based on progress
  const camZ = 5.5 + progress * (-91.5);

  const projectZPositions = projectsData.map((_, idx) => -20.0 - idx * 6.0);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-auto z-0 select-none bg-[#07080a]">
      <Canvas
        camera={{ position: [0, 1.2, 5.5], fov: 55 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        <color attach="background" args={['#07080a']} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 10, 5]} intensity={0.8} />

        {/* Camera Rig tracking progress */}
        <CameraRig progress={progress} pointerX={pointerX} pointerY={pointerY} />

        {/* Ground Cyber Grid */}
        <TrackGrid pointerX={pointerX} pointerY={pointerY} camZ={camZ} />

        {/* Starfield Particles */}
        <ParticleField />

        {/* 1. Hero 3D Elements */}
        <Hero3DElement camZ={camZ} />

        {/* 2. Manifesto 3D Slab */}
        <Manifesto3DElement camZ={camZ} />

        {/* 3. Rising 3D Project Panels */}
        {projectsData.map((project, idx) => (
          <RisingProjectPanel
            key={project.id}
            project={project}
            index={idx}
            zTarget={projectZPositions[idx]}
            camZ={camZ}
            onSelect={onSelectProject}
          />
        ))}

        {/* 4. 3D Systems Stack */}
        <LayerStack3DElement camZ={camZ} />

        {/* 5. 3D Process Waypoints */}
        <Process3DElement camZ={camZ} />

        {/* 6. Contact Horizon Portal */}
        <ContactHorizon3DElement camZ={camZ} onOpenContact={onOpenContact} />
      </Canvas>
    </div>
  );
};

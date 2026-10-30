import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const gridVertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uWave;
  uniform float uCurl;
  uniform float uSize;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 p = position;
    float h = sin(uTime * 0.85 + p.x * 0.18 + p.z * 0.14) * 0.45 * uWave;
    vec3 q = vec3(p.x, h, p.z);
    float k = uCurl * 6.2831853 / uSize;
    if (abs(k) > 1e-4) {
      float a = p.x * k;
      q = vec3(sin(a) / k - sin(a) * h, (1.0 - cos(a)) / k + cos(a) * h, p.z);
    }
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
    float lineAlpha = mix(0.42, 0.15, uLight);
    float plusAlpha = mix(0.92, 0.58, uLight);
    float a = max(lineMask * lineAlpha, plus * plusAlpha);

    // Pointer focus: lines around pointer turn bright blue
    float near = (1.0 - smoothstep(0.6, 3.2, length(g - uFocus))) * uFocusAmp;
    color = mix(color, uBlue, near);
    a = max(a, lineMask * near * 0.75);

    // Active exhibit highlight: blue signal pulse outward
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

function AnimatedGridMesh({ pointerX, pointerY }: { pointerX: number; pointerY: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const scrollRef = useRef<{ y: number; vel: number }>({ y: 0, vel: 0 });

  useEffect(() => {
    let lastY = window.scrollY;
    const handleScroll = () => {
      const curY = window.scrollY;
      const dy = curY - lastY;
      lastY = curY;
      scrollRef.current.y = curY;
      scrollRef.current.vel = THREE.MathUtils.lerp(scrollRef.current.vel, dy * 0.05, 0.2);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uWave: { value: 0.65 },
      uCurl: { value: 0.04 },
      uSize: { value: 24.0 },
      uLineDark: { value: new THREE.Color('#220d12') },
      uLineLight: { value: new THREE.Color('#ef4444') },
      uLight: { value: 0.28 },
      uOpacity: { value: 0.95 },
      uFlow: { value: 0.0 },
      uCells: { value: 26.0 },
      uExtent: { value: 0.85 },
      uFocus: { value: new THREE.Vector2(0, 0) },
      uFocusAmp: { value: 1.0 },
      uBlue: { value: new THREE.Color('#dc2626') },
      uSpot: { value: new THREE.Vector2(0, 0) },
      uSpotHalf: { value: 0.8 },
      uSpotAmp: { value: 0.45 }
    }),
    []
  );

  useFrame(({ camera, clock }) => {
    const elapsed = clock.getElapsedTime();
    uniforms.uTime.value = elapsed;

    // Decay velocity smoothly
    scrollRef.current.vel *= 0.90;

    // Dynamic grid flow linked directly to scroll position + velocity
    uniforms.uFlow.value = (scrollRef.current.y * 0.004) + (elapsed * 0.06);

    // Dynamic wave perturbation reacts to wheel velocity
    uniforms.uWave.value = 0.65 + Math.min(1.4, Math.abs(scrollRef.current.vel) * 0.45);

    // Smoothly track pointer focus
    uniforms.uFocus.value.x = THREE.MathUtils.lerp(uniforms.uFocus.value.x, pointerX * 12.0, 0.08);
    uniforms.uFocus.value.y = THREE.MathUtils.lerp(uniforms.uFocus.value.y, pointerY * 12.0, 0.08);

    // Breathing pulse
    uniforms.uSpotAmp.value = 0.5 + Math.sin(elapsed * 1.5) * 0.25;

    // Camera 3D spatial reaction to scrolling
    const targetCamY = 1.2 - Math.sin(scrollRef.current.y * 0.0005) * 0.3;
    const targetCamZ = 5.5 + Math.min(1.2, Math.abs(scrollRef.current.vel) * 0.2);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetCamY, 0.08);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetCamZ, 0.08);
    camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, -0.06 + Math.min(0.12, scrollRef.current.vel * 0.02), 0.08);

    if (meshRef.current) {
      meshRef.current.rotation.x = -Math.PI / 2.3 + Math.min(0.08, scrollRef.current.vel * 0.015);
      meshRef.current.position.y = -2.2;
      meshRef.current.position.z = -1.5;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[32, 32, 64, 64]} />
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

function StarField() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 1200;

  const [positions, seeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const s = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 35;
      s[i] = Math.random();
    }
    return [pos, s];
  }, [count]);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      const t = clock.getElapsedTime();
      pointsRef.current.rotation.y = t * 0.015;
      pointsRef.current.rotation.x = Math.sin(t * 0.01) * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSeed" args={[seeds, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#e27070"
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

interface SpaceStageProps {
  pointerX: number;
  pointerY: number;
}

export const SpaceStage: React.FC<SpaceStageProps> = ({ pointerX, pointerY }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 1.2, 5.5], fov: 55 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        <color attach="background" args={['#07080a']} />
        <ambientLight intensity={0.4} />
        <AnimatedGridMesh pointerX={pointerX} pointerY={pointerY} />
        <StarField />
      </Canvas>
    </div>
  );
};

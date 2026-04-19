import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function GlobeMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Create sphere geometry with noise displacement
  const geometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(2, 60);
    const positions = geo.attributes.position.array as Float32Array;
    
    // Add subtle noise to vertices
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];
      const z = positions[i + 2];
      const noise = Math.sin(x * 2) * Math.cos(y * 2) * Math.sin(z * 2) * 0.08;
      const scale = 1 + noise;
      positions[i] *= scale;
      positions[i + 1] *= scale;
      positions[i + 2] *= scale;
    }
    
    geo.computeVertexNormals();
    return geo;
  }, []);

  // Create particles around the globe
  const particlesGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const count = 300;
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 2.5 + Math.random() * 1.5;
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.03;
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <group>
      {/* Main Globe */}
      <mesh ref={meshRef} geometry={geometry}>
        <meshStandardMaterial
          color="#0a0a1a"
          emissive="#1a1a3a"
          emissiveIntensity={0.3}
          roughness={0.4}
          metalness={0.8}
          wireframe={false}
        />
      </mesh>
      
      {/* Wireframe overlay */}
      <mesh ref={meshRef} geometry={geometry} scale={1.01}>
        <meshBasicMaterial
          color="#5C4EFF"
          transparent
          opacity={0.15}
          wireframe
        />
      </mesh>
      
      {/* Particles */}
      <points ref={particlesRef} geometry={particlesGeometry}>
        <pointsMaterial
          color="#5C4EFF"
          size={0.03}
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>
      
      {/* Inner glow */}
      <mesh>
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshBasicMaterial
          color="#5C4EFF"
          transparent
          opacity={0.05}
        />
      </mesh>
      
      {/* Outer atmosphere */}
      <mesh>
        <sphereGeometry args={[2.8, 32, 32]} />
        <meshBasicMaterial
          color="#5C4EFF"
          transparent
          opacity={0.02}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

export function Globe() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#5C4EFF" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#C9A84C" />
        <GlobeMesh />
      </Canvas>
    </div>
  );
}

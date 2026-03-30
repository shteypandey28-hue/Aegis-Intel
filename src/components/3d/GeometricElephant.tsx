'use client'

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Float, Sparkles, MeshTransmissionMaterial } from '@react-three/drei'
import * as THREE from 'three'

export function AbstractElephant({ scale = 1, position = [0, 0, 0] }: { scale?: number, position?: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null)
  const trunkRef = useRef<THREE.Group>(null)
  
  // Custom procedural trunk arc
  const trunkGems = useMemo(() => Array.from({ length: 8 }).map((_, i) => ({
    y: -0.2 * i,
    z: 0.8 + Math.sin(i * 0.4) * 0.4,
    scale: Math.max(0.1, 0.4 - i * 0.04)
  })), [])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1
      const targetX = (state.pointer.x * Math.PI) / 6
      const targetY = (state.pointer.y * Math.PI) / 6
      groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.05
      groupRef.current.rotation.x += (-targetY - groupRef.current.rotation.x) * 0.05
    }
    if (trunkRef.current) {
      trunkRef.current.children.forEach((child, i) => {
        child.position.x = Math.sin(state.clock.elapsedTime * 2 + i * 0.5) * 0.05
      })
    }
  })

  return (
    <group ref={groupRef} scale={scale} position={position}>
      {/* Central Prism (Body) */}
      <mesh position={[0, -0.2, -0.5]} rotation={[Math.PI / 4, 0, 0]}>
        <octahedronGeometry args={[1.5, 0]} />
        <MeshTransmissionMaterial 
          backside
          samples={6}
          thickness={0.8}
          chromaticAberration={0.6}
          anisotropy={0.2}
          distortion={0.15}
          distortionScale={0.6}
          temporalDistortion={0.15}
          color="#10b981"
          emissive="#10b981"
          emissiveIntensity={0.5}
        />
        <meshBasicMaterial color="#059669" wireframe opacity={0.3} transparent />
      </mesh>

      {/* Internal Power Core */}
      <mesh position={[0, -0.2, -0.5]}>
        <icosahedronGeometry args={[0.6, 2]} />
        <meshStandardMaterial color="#ffffff" emissive="#10b981" emissiveIntensity={6} />
      </mesh>

      {/* Cranial Prism (Head) */}
      <mesh position={[0, 0.4, 0.5]} rotation={[0, Math.PI / 4, Math.PI / 4]}>
        <octahedronGeometry args={[0.7, 0]} />
        <MeshTransmissionMaterial thickness={0.5} chromaticAberration={0.5} color="#ecfdf5" />
      </mesh>

      {/* Ethereal Ears */}
      <mesh position={[-0.8, 0.4, 0.2]} rotation={[0, -0.3, 0.5]}>
        <circleGeometry args={[0.9, 6]} />
        <meshPhysicalMaterial color="#020617" emissive="#059669" emissiveIntensity={0.5} wireframe side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0.8, 0.4, 0.2]} rotation={[0, 0.3, -0.5]}>
        <circleGeometry args={[0.9, 6]} />
        <meshPhysicalMaterial color="#020617" emissive="#059669" emissiveIntensity={0.5} wireframe side={THREE.DoubleSide} />
      </mesh>

      {/* Crystal Tusks */}
      <mesh position={[-0.4, -0.3, 0.8]} rotation={[0.4, 0, 0.3]}>
        <coneGeometry args={[0.1, 1.2, 4]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1} wireframe={true} />
      </mesh>
      <mesh position={[0.4, -0.3, 0.8]} rotation={[0.4, 0, -0.3]}>
        <coneGeometry args={[0.1, 1.2, 4]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1} wireframe={true} />
      </mesh>

      {/* Trunk Geometry */}
      <group ref={trunkRef} position={[0, 0.1, 0.8]}>
        {trunkGems.map((gem, i) => (
          <mesh key={i} position={[0, gem.y, gem.z * 0.4]}>
            <octahedronGeometry args={[gem.scale, 0]} />
            <meshStandardMaterial color="#020617" emissive="#10b981" emissiveIntensity={0.8} wireframe />
          </mesh>
        ))}
      </group>

      <Sparkles count={50} scale={3} size={2} color="#10b981" speed={0.4} opacity={0.5} />
    </group>
  )
}

export default function GeometricElephantScene() {
  return (
    <div className="w-full h-full absolute inset-0 pointer-events-none z-10">
      <Canvas camera={{ position: [3, 2, 8], fov: 45 }} gl={{ antialias: true, alpha: true }}>
        <fog attach="fog" args={['#020617', 5, 20]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} intensity={3} color="#10b981" />
        <spotLight position={[-10, -10, -10]} intensity={1} color="#e11d48" />
        
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.8}>
          <AbstractElephant scale={1.2} />
        </Float>

        <Environment preset="city" />
      </Canvas>
    </div>
  )
}

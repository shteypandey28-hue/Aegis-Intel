'use client'

import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function AbstractOwl() {
  const groupRef = useRef<THREE.Group>(null)

  // Gentle hovering and breathing animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <group ref={groupRef} scale={1.2}>
      {/* Central Core / Torso */}
      <mesh position={[0, -0.5, 0]}>
        <octahedronGeometry args={[1, 1]} />
        <meshPhysicalMaterial 
          color="#0f172a" 
          metalness={0.8} 
          roughness={0.2} 
          clearcoat={1} 
          wireframe={true}
          emissive="#10b981"
          emissiveIntensity={0.2}
        />
      </mesh>

      <mesh position={[0, -0.5, 0]}>
        <octahedronGeometry args={[0.9, 0]} />
        <MeshDistortMaterial 
          color="#059669" 
          metalness={0.9} 
          roughness={0.1}
          distort={0.2}
          speed={2}
          emissive="#10b981"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Owl Head structure */}
      <mesh position={[0, 1.2, 0.2]} rotation={[0.2, 0, 0]}>
        <icosahedronGeometry args={[0.6, 0]} />
        <meshStandardMaterial color="#020617" wireframe />
      </mesh>
      
      {/* Eyes (Glowing) */}
      <mesh position={[-0.25, 1.3, 0.7]} rotation={[0, 0, 0]}>
        <coneGeometry args={[0.1, 0.3, 4]} />
        <meshStandardMaterial emissive="#10b981" emissiveIntensity={5} color="#10b981" />
      </mesh>
      <mesh position={[0.25, 1.3, 0.7]} rotation={[0, 0, 0]}>
        <coneGeometry args={[0.1, 0.3, 4]} />
        <meshStandardMaterial emissive="#10b981" emissiveIntensity={5} color="#10b981" />
      </mesh>

      {/* Wings / Flanks */}
      <mesh position={[-1.2, -0.2, -0.3]} rotation={[0, 0, -1.2]}>
        <tetrahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial color="#020617" wireframe emissive="#10b981" emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[1.2, -0.2, -0.3]} rotation={[0, 0, 1.2]}>
        <tetrahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial color="#020617" wireframe emissive="#10b981" emissiveIntensity={0.2} />
      </mesh>
    </group>
  )
}

export default function GuardianOwlScene() {
  return (
    <div className="w-full h-full absolute inset-0 pointer-events-none z-10">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <fog attach="fog" args={['#020617', 5, 15]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} intensity={1.5} color="#10b981" />
        <spotLight position={[-10, -10, -10]} intensity={0.5} color="#059669" />
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <AbstractOwl />
        </Float>

        <Environment preset="city" />
      </Canvas>
    </div>
  )
}

'use client'

import React, { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Threat node data [lat, lng, size, color]
const THREAT_NODES = [
  [51.5, -0.12, 0.8, '#e11d48'],   // London
  [40.7, -74.0, 0.9, '#e11d48'],   // New York
  [35.7, 139.7, 0.7, '#f59e0b'],   // Tokyo
  [22.3, 114.2, 1.0, '#e11d48'],   // Hong Kong
  [1.35, 103.8, 0.8, '#f59e0b'],   // Singapore
  [48.9, 2.35, 0.6, '#f59e0b'],    // Paris
  [19.4, -99.1, 0.5, '#f59e0b'],   // Mexico City
  [-33.9, 18.4, 0.7, '#e11d48'],   // Cape Town
  [-3.7, -38.5, 0.6, '#f59e0b'],   // Fortaleza
  [28.6, 77.2, 0.8, '#f59e0b'],    // Delhi
  [6.5, 3.4, 0.9, '#e11d48'],      // Lagos
  [13.8, 100.5, 0.7, '#e11d48'],   // Bangkok
  [55.8, 37.6, 0.5, '#f59e0b'],    // Moscow
  [-6.2, 106.8, 0.8, '#e11d48'],   // Jakarta
  [31.2, 121.5, 0.9, '#e11d48'],   // Shanghai
]

function latLngToVec3(lat: number, lng: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)
  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  )
}

function Globe() {
  const globeRef = useRef<THREE.Mesh>(null)
  const nodesRef = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (globeRef.current) globeRef.current.rotation.y += delta * 0.15
    if (nodesRef.current) nodesRef.current.rotation.y += delta * 0.15
  })

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} color="#10b981" />
      <directionalLight position={[-5, -3, -5]} intensity={0.5} color="#e11d48" />
      <pointLight position={[0, 0, 0]} intensity={0.3} color="#10b981" />

      {/* Globe sphere */}
      <mesh ref={globeRef}>
        <sphereGeometry args={[2, 48, 48]} />
        <meshPhysicalMaterial
          color="#020617"
          metalness={0.2}
          roughness={0.8}
          wireframe={false}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Wireframe overlay */}
      <mesh ref={globeRef}>
        <sphereGeometry args={[2.01, 24, 24]} />
        <meshBasicMaterial color="#10b981" wireframe transparent opacity={0.08} />
      </mesh>

      {/* Threat nodes */}
      <group ref={nodesRef}>
        {THREAT_NODES.map(([lat, lng, size, color], i) => {
          const pos = latLngToVec3(lat as number, lng as number, 2.05)
          return (
            <group key={i} position={pos}>
              {/* Glowing dot */}
              <mesh>
                <sphereGeometry args={[(size as number) * 0.04, 8, 8]} />
                <meshStandardMaterial
                  color={color as string}
                  emissive={color as string}
                  emissiveIntensity={3}
                />
              </mesh>
              {/* Outer pulse ring */}
              <mesh rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[(size as number) * 0.05, (size as number) * 0.09, 16]} />
                <meshBasicMaterial color={color as string} transparent opacity={0.4} side={THREE.DoubleSide} />
              </mesh>
            </group>
          )
        })}
      </group>
    </>
  )
}

export function ThreatGlobe() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <Suspense fallback={null}>
          <Globe />
        </Suspense>
      </Canvas>
    </div>
  )
}

'use client'

import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group, Mesh } from 'three'
import { Float, MeshDistortMaterial } from '@react-three/drei'

export default function GeometricTurtle(props: any) {
  const group = useRef<Group>(null)
  
  const flipperFL = useRef<Mesh>(null)
  const flipperFR = useRef<Mesh>(null)
  const flipperBL = useRef<Mesh>(null)
  const flipperBR = useRef<Mesh>(null)
  const head = useRef<Mesh>(null)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    // Swimming animation (sine waves)
    if (flipperFL.current && flipperFR.current) {
      flipperFL.current.rotation.z = Math.sin(t * 2) * 0.3 - 0.2
      flipperFR.current.rotation.z = -Math.sin(t * 2) * 0.3 + 0.2
    }
    if (flipperBL.current && flipperBR.current) {
      flipperBL.current.rotation.z = Math.sin(t * 2 - 1) * 0.2
      flipperBR.current.rotation.z = -Math.sin(t * 2 - 1) * 0.2
    }
    if (head.current) {
      head.current.rotation.x = Math.sin(t) * 0.1
    }
    if (group.current) {
      group.current.rotation.y = Math.sin(t * 0.5) * 0.2
      group.current.position.y = Math.sin(t * 1) * 0.1
    }
  })

  // Glassmorphic / Hologram Material
  const shellMaterial = (
    <MeshDistortMaterial
      color="#10b981" // Emerald green
      emissive="#047857"
      emissiveIntensity={0.5}
      transparent
      opacity={0.8}
      roughness={0.2}
      metalness={0.8}
      distort={0.2}
      speed={2}
      wireframe={props.wireframe}
    />
  )

  const bodyMaterial = (
    <MeshDistortMaterial
      color="#34d399"
      emissive="#059669"
      transparent
      opacity={0.6}
      roughness={0.4}
      metalness={0.5}
      distort={0.1}
      speed={1}
      wireframe={props.wireframe}
    />
  )

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1} {...props}>
      <group ref={group}>
        {/* Shell */}
        <mesh position={[0, 0.5, 0]} scale={[1.8, 0.6, 2]}>
          <sphereGeometry args={[1, 32, 32]} />
          {shellMaterial}
        </mesh>
        
        {/* Head */}
        <mesh ref={head} position={[0, 0.2, 2.2]} scale={[0.5, 0.4, 0.6]}>
          <sphereGeometry args={[1, 16, 16]} />
          {bodyMaterial}
        </mesh>

        {/* Flippers */}
        <mesh ref={flipperFL} position={[1.4, 0.2, 1.2]} rotation={[0, -0.5, -0.2]} scale={[1, 0.1, 0.5]}>
          <sphereGeometry args={[1, 16, 16]} />
          {bodyMaterial}
        </mesh>
        <mesh ref={flipperFR} position={[-1.4, 0.2, 1.2]} rotation={[0, 0.5, 0.2]} scale={[1, 0.1, 0.5]}>
          <sphereGeometry args={[1, 16, 16]} />
          {bodyMaterial}
        </mesh>

        <mesh ref={flipperBL} position={[1.2, 0.2, -1.2]} rotation={[0, -2.5, -0.2]} scale={[0.8, 0.1, 0.4]}>
          <sphereGeometry args={[1, 16, 16]} />
          {bodyMaterial}
        </mesh>
        <mesh ref={flipperBR} position={[-1.2, 0.2, -1.2]} rotation={[0, 2.5, 0.2]} scale={[0.8, 0.1, 0.4]}>
          <sphereGeometry args={[1, 16, 16]} />
          {bodyMaterial}
        </mesh>
      </group>
    </Float>
  )
}

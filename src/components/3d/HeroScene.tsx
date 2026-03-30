'use client'

import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls, Sparkles } from '@react-three/drei'
import { AbstractElephant } from './GeometricElephant'

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0 h-full w-full pointer-events-none opacity-90">
      <Canvas camera={{ position: [0, 2, 8], fov: 45 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={1.0} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#34d399" />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#047857" />
        <pointLight position={[0, 0, 4]} intensity={3} color="#10b981" distance={12} />
        <pointLight position={[3, 3, 3]} intensity={2} color="#ecfdf5" distance={8} />
        
        <Suspense fallback={null}>
          <AbstractElephant scale={1} position={[0, -1, 0]} />
          
          <Sparkles 
            count={100}
            scale={10}
            size={4}
            speed={0.4}
            opacity={0.2}
            color="#ecfdf5"
          />
          
          {/* Subtle environment lighting to make the glass material pop */}
          <Environment preset="city" />
        </Suspense>

        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 2.5}
        />
      </Canvas>
    </div>
  )
}

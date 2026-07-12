'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, MeshTransmissionMaterial } from '@react-three/drei'
import { useRef } from 'react'
import type { Group, Mesh } from 'three'

function Sculpture() {
  const group = useRef<Group>(null)
  const core = useRef<Mesh>(null)
  const { pointer, viewport } = useThree()

  useFrame((state, delta) => {
    if (!group.current || !core.current) return
    group.current.rotation.y += delta * 0.12
    group.current.rotation.x += (pointer.y * 0.22 - group.current.rotation.x) * 0.035
    group.current.rotation.z += (pointer.x * 0.18 - group.current.rotation.z) * 0.035
    core.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 1.35) * 0.035)
  })

  const scale = Math.min(1.15, viewport.width / 5.4)

  return (
    <group ref={group} scale={scale}>
      <Float speed={1.4} rotationIntensity={0.22} floatIntensity={0.35}>
        <mesh ref={core} rotation={[0.35, 0.5, 0.18]}>
          <torusKnotGeometry args={[1.18, 0.38, 180, 24, 2, 3]} />
          <MeshTransmissionMaterial
            color="#ff5a36"
            backside
            backsideThickness={0.5}
            thickness={1.2}
            chromaticAberration={0.08}
            anisotropicBlur={0.35}
            distortion={0.35}
            distortionScale={0.3}
            temporalDistortion={0.08}
            roughness={0.16}
            transmission={0.96}
            ior={1.25}
          />
        </mesh>
        <mesh rotation={[1.3, 0.15, 0.7]}>
          <torusGeometry args={[1.9, 0.035, 10, 160]} />
          <meshStandardMaterial color="#191919" roughness={0.55} metalness={0.2} />
        </mesh>
        <mesh rotation={[0.25, 1.2, 0.45]}>
          <torusGeometry args={[2.18, 0.018, 8, 160]} />
          <meshStandardMaterial color="#f2ff54" emissive="#f2ff54" emissiveIntensity={1.4} />
        </mesh>
      </Float>
    </group>
  )
}

export function SyntheticOrbit() {
  return (
    <div className="scene" aria-hidden="true">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 6.2], fov: 42 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={2.2} />
        <directionalLight position={[4, 5, 4]} intensity={4} color="#fffdf7" />
        <pointLight position={[-4, -2, 3]} intensity={8} color="#1846ff" />
        <Sculpture />
      </Canvas>
    </div>
  )
}

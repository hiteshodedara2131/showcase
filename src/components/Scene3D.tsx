"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Float,
  MeshDistortMaterial,
  MeshWobbleMaterial,
  Sphere,
  TorusKnot,
  Ring,
  ContactShadows,
  Environment,
} from "@react-three/drei";
import * as THREE from "three";

interface SceneProps {
  currentModel: "torus" | "sphere" | "ring" | "gem";
  color: string;
  wireframe: boolean;
  roughness: number;
  metalness: number;
  distortion: number;
}

function ShowcaseModel({
  currentModel,
  color,
  wireframe,
  roughness,
  metalness,
  distortion,
}: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4;
      meshRef.current.rotation.x += delta * 0.15;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={1.2} floatIntensity={1.5}>
      {currentModel === "torus" && (
        <mesh ref={meshRef} scale={1.2} castShadow receiveShadow>
          <torusKnotGeometry args={[1, 0.35, 128, 32]} />
          <MeshDistortMaterial
            color={color}
            wireframe={wireframe}
            roughness={roughness}
            metalness={metalness}
            distort={distortion}
            speed={2}
          />
        </mesh>
      )}

      {currentModel === "sphere" && (
        <Sphere ref={meshRef} args={[1.3, 64, 64]} castShadow receiveShadow>
          <MeshDistortMaterial
            color={color}
            wireframe={wireframe}
            roughness={roughness}
            metalness={metalness}
            distort={distortion * 1.5}
            speed={3}
          />
        </Sphere>
      )}

      {currentModel === "ring" && (
        <mesh ref={meshRef} scale={1.4} castShadow receiveShadow>
          <torusGeometry args={[1.1, 0.22, 32, 100]} />
          <meshStandardMaterial
            color={color}
            wireframe={wireframe}
            roughness={roughness}
            metalness={metalness}
          />
        </mesh>
      )}

      {currentModel === "gem" && (
        <mesh ref={meshRef} scale={1.3} castShadow receiveShadow>
          <octahedronGeometry args={[1.3, 0]} />
          <MeshWobbleMaterial
            color={color}
            wireframe={wireframe}
            roughness={roughness}
            metalness={metalness}
            factor={distortion * 0.5}
            speed={1.5}
          />
        </mesh>
      )}
    </Float>
  );
}

export default function Scene3D(props: SceneProps) {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing select-none">
      <Canvas
        camera={{ position: [0, 0, 4.8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 8, 5]} intensity={1.5} castShadow />
        <pointLight position={[-5, -3, -4]} intensity={1} color="#3b82f6" />
        <pointLight position={[5, -2, 2]} intensity={1.2} color="#ec4899" />

        <ShowcaseModel {...props} />

        <ContactShadows
          position={[0, -1.8, 0]}
          opacity={0.65}
          scale={10}
          blur={2.4}
          far={4}
        />
        <Environment preset="city" />
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={2.5}
          maxDistance={8}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
}

"use client";

import React, { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  MeshDistortMaterial,
  MeshWobbleMaterial,
  Sphere,
  ContactShadows,
  Environment,
  useGLTF,
} from "@react-three/drei";
import type { ComponentRef } from "react";
import * as THREE from "three";
import { levelAndCenterShoe, autoCenterAndScale, disposeObject3D } from "@/lib/three/levelShoe";

export interface SceneProps {
  currentModel: "dior_jordan" | "vans_oldskool" | "shoe" | "nike_shoe" | "helmet" | "torus" | "sphere" | "ring" | "gem";
  color: string;
  wireframe: boolean;
  roughness: number;
  metalness: number;
  distortion: number;
  autoRotate?: boolean;
  rotationSpeed?: number;
  environmentPreset?: "studio" | "city" | "dawn" | "sunset" | "apartment";
  cameraPos?: [number, number, number];
  cameraTarget?: [number, number, number];
  activeTool?: "orbit" | "pan" | "zoom";
}

// Cinematic Pedestal Base matching the studio stage
function StagePedestal({ color = "#e8e7e4" }: { color?: string }) {
  return (
    <group position={[0, 0, 0]}>
      {/* Stone disc */}
      <mesh position={[0, -0.04, 0]} receiveShadow>
        <cylinderGeometry args={[1.9, 1.98, 0.08, 64]} />
        <meshStandardMaterial color={color} roughness={0.85} metalness={0.05} />
      </mesh>
      {/* Sub-Pedestal Foundation Ring */}
      <mesh position={[0, -0.1, 0]} receiveShadow>
        <cylinderGeometry args={[2.05, 2.12, 0.04, 64]} />
        <meshStandardMaterial color="#dbdad7" roughness={0.9} metalness={0.02} />
      </mesh>
    </group>
  );
}

// Air Jordan 1 Low Dior Model
function DiorJordanModel({
  wireframe,
  roughness,
  metalness,
}: {
  wireframe?: boolean;
  roughness?: number;
  metalness?: number;
}) {
  const { scene } = useGLTF("/models/dior_jordan.glb");
  const groupRef = useRef<THREE.Group>(null!);
  const { root, meshes } = useMemo(() => {
    const clone = scene.clone(true);
    const meshList: THREE.Mesh[] = [];

    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        if (mesh.material) {
          mesh.material = (mesh.material as THREE.Material).clone();
        }
        meshList.push(mesh);
      }
    });

    return { root: clone, meshes: meshList };
  }, [scene]);

  useEffect(() => {
    if (groupRef.current) {
      autoCenterAndScale(groupRef.current, root, 2.5);
    }
  }, [root]);

  useEffect(() => {
    meshes.forEach((mesh) => {
      if (mesh.material instanceof THREE.MeshStandardMaterial) {
        if (wireframe !== undefined) mesh.material.wireframe = wireframe;
        // Natural leather & rubber: clamp metalness to dielectric range so it never shines like steel
        mesh.material.metalness = Math.min(metalness ?? 0.0, 0.08);
        mesh.material.roughness = Math.max(roughness ?? 0.72, 0.55);
        mesh.material.needsUpdate = true;
      }
    });
  }, [meshes, wireframe, roughness, metalness]);

  useEffect(() => {
    return () => disposeObject3D(root);
  }, [root]);

  return <group ref={groupRef} />;
}

// Vans Old Skool Classic Model
function VansOldskoolModel({
  wireframe,
  roughness,
  metalness,
}: {
  wireframe?: boolean;
  roughness?: number;
  metalness?: number;
}) {
  const { scene } = useGLTF("/models/vans_oldskool.glb");
  const groupRef = useRef<THREE.Group>(null!);
  const { root, meshes } = useMemo(() => {
    const clone = scene.clone(true);
    const meshList: THREE.Mesh[] = [];

    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        if (mesh.material) {
          mesh.material = (mesh.material as THREE.Material).clone();
        }
        meshList.push(mesh);
      }
    });

    return { root: clone, meshes: meshList };
  }, [scene]);

  useEffect(() => {
    if (groupRef.current) {
      autoCenterAndScale(groupRef.current, root, 2.6);
    }
  }, [root]);

  useEffect(() => {
    meshes.forEach((mesh) => {
      if (mesh.material instanceof THREE.MeshStandardMaterial) {
        if (wireframe !== undefined) mesh.material.wireframe = wireframe;
        // Natural suede, canvas, rubber: dielectric non-metal
        mesh.material.metalness = Math.min(metalness ?? 0.0, 0.08);
        mesh.material.roughness = Math.max(roughness ?? 0.75, 0.55);
        mesh.material.needsUpdate = true;
      }
    });
  }, [meshes, wireframe, roughness, metalness]);

  useEffect(() => {
    return () => disposeObject3D(root);
  }, [root]);

  return <group ref={groupRef} />;
}

// Flagship Architectural Shoe Model (Waffle Runner V2)
function FlagshipShoeModel({
  color,
  wireframe,
  roughness,
  metalness,
}: {
  color: string;
  wireframe: boolean;
  roughness: number;
  metalness: number;
}) {
  const { scene } = useGLTF("/models/shoes.glb");
  const groupRef = useRef<THREE.Group>(null!);
  const { rootGroup, meshes } = useMemo(() => {
    const clone = scene.clone(true);
    const meshesList: THREE.Mesh[] = [];

    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        if (mesh.material) {
          mesh.material = (mesh.material as THREE.Material).clone();
        }
        meshesList.push(mesh);
      }
    });

    const levelGroup = new THREE.Group();
    levelGroup.name = "LevelGroup";
    levelGroup.add(clone);
    levelGroup.updateMatrixWorld(true);
    return { rootGroup: levelGroup, meshes: meshesList };
  }, [scene]);

  useEffect(() => {
    // Apply pitch compensation + auto-center via shared util
    const tempGroup = new THREE.Group();
    tempGroup.add(rootGroup);
    levelAndCenterShoe(tempGroup, rootGroup, 2.6);
    const finalGroup = tempGroup.children[0] as THREE.Group;
    // Re-parent for the JSX render
    if (groupRef.current) {
      while (groupRef.current.children.length > 0) {
        groupRef.current.remove(groupRef.current.children[0]);
      }
      groupRef.current.add(finalGroup);
    }
  }, [rootGroup]);

  useEffect(() => {
    meshes.forEach((mesh) => {
      if (mesh.material instanceof THREE.MeshStandardMaterial) {
        if (
          mesh.name.includes("Toe_Box") ||
          mesh.name.includes("Upper") ||
          mesh.name.includes("Vamp") ||
          mesh.name.includes("Foxing")
        ) {
          mesh.material.color = new THREE.Color(color);
        }
        const isEyelet = mesh.name.includes("Eyelet");
        mesh.material.roughness = isEyelet ? 0.25 : Math.max(roughness, 0.55);
        mesh.material.metalness = isEyelet ? 0.9 : Math.min(metalness, 0.08);
        mesh.material.wireframe = wireframe;
        mesh.material.needsUpdate = true;
      }
    });
  }, [meshes, color, roughness, metalness, wireframe]);

  // Dispose on unmount
  useEffect(() => {
    return () => {
      disposeObject3D(rootGroup);
    };
  }, [rootGroup]);

  return (
    <group ref={groupRef} rotation={[0, -Math.PI / 4, 0]} />
  );
}

// Auto-aligning GLB model component for Air Sneaker, Helmet, etc.
function AutoAlignModel({
  url,
  wireframe,
  roughness,
  metalness,
  targetSize = 2.4,
}: {
  url: string;
  color?: string;
  wireframe?: boolean;
  roughness?: number;
  metalness?: number;
  targetSize?: number;
}) {
  const { scene } = useGLTF(url);
  const groupRef = useRef<THREE.Group>(null!);
  const { root, meshes } = useMemo(() => {
    const clone = scene.clone(true);
    const meshList: THREE.Mesh[] = [];

    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        if (mesh.material) {
          mesh.material = (mesh.material as THREE.Material).clone();
        }
        meshList.push(mesh);
      }
    });

    return { root: clone, meshes: meshList };
  }, [scene]);

  useEffect(() => {
    if (groupRef.current) {
      autoCenterAndScale(groupRef.current, root, targetSize);
    }
  }, [root, targetSize]);

  useEffect(() => {
    if (meshes.length > 0) {
      meshes.forEach((mesh) => {
        if (mesh.material instanceof THREE.MeshStandardMaterial) {
          if (wireframe !== undefined) mesh.material.wireframe = wireframe;
          if (roughness !== undefined) mesh.material.roughness = Math.max(roughness, 0.55);
          if (metalness !== undefined) mesh.material.metalness = Math.min(metalness, 0.08);
          mesh.material.needsUpdate = true;
        }
      });
    }
  }, [meshes, wireframe, roughness, metalness]);

  useEffect(() => {
    return () => disposeObject3D(root);
  }, [root]);

  return <group ref={groupRef} />;
}

function ShowcaseModel({
  currentModel,
  color,
  wireframe,
  roughness,
  metalness,
  distortion,
  autoRotate = true,
  rotationSpeed = 1,
}: SceneProps) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y += delta * 0.35 * rotationSpeed;
    }
  });

  return (
    <group ref={groupRef}>
      {currentModel === "dior_jordan" && (
        <React.Suspense fallback={null}>
          <DiorJordanModel
            wireframe={wireframe}
            roughness={roughness}
            metalness={metalness}
          />
        </React.Suspense>
      )}

      {currentModel === "vans_oldskool" && (
        <React.Suspense fallback={null}>
          <VansOldskoolModel
            wireframe={wireframe}
            roughness={roughness}
            metalness={metalness}
          />
        </React.Suspense>
      )}

      {currentModel === "shoe" && (
        <React.Suspense fallback={null}>
          <FlagshipShoeModel
            color={color}
            wireframe={wireframe}
            roughness={roughness}
            metalness={metalness}
          />
        </React.Suspense>
      )}

      {currentModel === "nike_shoe" && (
        <React.Suspense fallback={null}>
          <AutoAlignModel
            url="/models/nike_shoe.glb"
            color={color}
            wireframe={wireframe}
            roughness={roughness}
            metalness={metalness}
            targetSize={2.4}
          />
        </React.Suspense>
      )}

      {currentModel === "helmet" && (
        <React.Suspense fallback={null}>
          <AutoAlignModel
            url="/models/helmet.glb"
            color={color}
            wireframe={wireframe}
            roughness={roughness}
            metalness={metalness}
            targetSize={2.1}
          />
        </React.Suspense>
      )}

      {currentModel === "torus" && (
        <mesh position={[0, 0.7, 0]} scale={0.78} castShadow receiveShadow>
          <torusKnotGeometry args={[0.75, 0.25, 128, 32]} />
          <MeshDistortMaterial
            color={color}
            wireframe={wireframe}
            roughness={roughness}
            metalness={metalness}
            distort={distortion * 0.8}
            speed={2}
          />
        </mesh>
      )}

      {currentModel === "sphere" && (
        <Sphere position={[0, 0.85, 0]} args={[0.85, 64, 64]} castShadow receiveShadow>
          <MeshDistortMaterial
            color={color}
            wireframe={wireframe}
            roughness={roughness}
            metalness={metalness}
            distort={distortion * 1.2}
            speed={2.5}
          />
        </Sphere>
      )}

      {currentModel === "ring" && (
        <mesh position={[0, 0.65, 0]} scale={0.82} castShadow receiveShadow>
          <torusGeometry args={[0.82, 0.18, 32, 100]} />
          <meshStandardMaterial
            color={color}
            wireframe={wireframe}
            roughness={roughness}
            metalness={metalness}
          />
        </mesh>
      )}

      {currentModel === "gem" && (
        <mesh position={[0, 0.75, 0]} scale={0.82} castShadow receiveShadow>
          <octahedronGeometry args={[0.95, 0]} />
          <MeshWobbleMaterial
            color={color}
            wireframe={wireframe}
            roughness={roughness}
            metalness={metalness}
            factor={distortion * 0.4}
            speed={1.5}
          />
        </mesh>
      )}
    </group>
  );
}

// Camera controller with smooth target and position synchronization
function CameraSync({
  cameraPos,
  cameraTarget,
  activeTool = "orbit",
}: {
  cameraPos?: [number, number, number];
  cameraTarget?: [number, number, number];
  activeTool?: "orbit" | "pan" | "zoom";
}) {
  const { camera } = useThree();
  // Drei's OrbitControls ref resolves to its imperative handle (target/update).
  // We use the component's own ref type to stay accurate.
  type ControlsRef = ComponentRef<typeof OrbitControls>;
  const controlsRef = useRef<ControlsRef | null>(null);

  useEffect(() => {
    if (cameraPos) {
      camera.position.set(...cameraPos);
    }
    if (controlsRef.current && cameraTarget) {
      controlsRef.current.target.set(...cameraTarget);
      controlsRef.current.update();
    }
  }, [camera, cameraPos, cameraTarget]);

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      target={cameraTarget || [0, 0.45, 0]}
      enableRotate={activeTool === "orbit"}
      enablePan={activeTool === "pan"}
      enableZoom={activeTool === "zoom" || activeTool === "orbit"}
      minDistance={1.6}
      maxDistance={7.5}
      maxPolarAngle={Math.PI / 2 + 0.05}
      dampingFactor={0.08}
    />
  );
}

export default function Scene3D(props: SceneProps) {
  const envPreset = props.environmentPreset || "studio";
  const defaultCamPos: [number, number, number] = props.cameraPos || [2.2, 1.2, 2.6];
  // defaultCamTarget is exposed for future use; intentionally retained.
  const _defaultCamTarget: [number, number, number] = props.cameraTarget || [0, 0.45, 0];
  void _defaultCamTarget;

  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing select-none">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: defaultCamPos, fov: 38 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05,
        }}
      >
        <CameraSync
          cameraPos={props.cameraPos}
          cameraTarget={props.cameraTarget}
          activeTool={props.activeTool}
        />

        {/* Ambient & Natural Studio Lighting Rig */}
        <hemisphereLight args={["#ffffff", "#deded8", 0.75]} />
        <directionalLight
          position={[4, 5.5, 4]}
          intensity={1.3}
          color="#fffdfa"
          castShadow
          shadow-mapSize={[512, 512]}
          shadow-bias={-0.0001}
        />
        <directionalLight position={[-4, 3, -2]} intensity={0.45} color="#f0f4f8" />
        <directionalLight position={[0, 4, -4]} intensity={0.5} color="#ffffff" />
        <pointLight position={[0, -0.2, 1.8]} intensity={0.15} color="#fff6ed" />

        {/* Illuminated Stone Pedestal Disc */}
        <StagePedestal />

        {/* 3D Model Specimen */}
        <ShowcaseModel {...props} />

        {/* Contact Shadow directly on the pedestal floor */}
        <ContactShadows
          position={[0, -0.05, 0]}
          opacity={0.55}
          scale={5.5}
          blur={2.0}
          far={2.5}
        />

        {/* HDRI Environment Reflection Map with Soft Ambient Intensity */}
        <Environment preset={envPreset} environmentIntensity={0.6} />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/dior_jordan.glb");
useGLTF.preload("/models/vans_oldskool.glb");
useGLTF.preload("/models/shoes.glb");

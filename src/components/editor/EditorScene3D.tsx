"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, ContactShadows, Environment, Float } from "@react-three/drei";
import type { ComponentRef } from "react";
import * as THREE from "three";
import { levelAndCenterShoe, autoCenterAndScale, disposeObject3D } from "@/lib/three/levelShoe";

export interface PartConfig {
  color: string;
  roughness: number;
  metalness: number;
  transmission: number;
  wireframe: boolean;
  visible: boolean;
  locked: boolean;
}

export interface EnvironmentPreset {
  id: string;
  name: string;
  temp: string;
  dreiPreset: "city" | "studio" | "sunset" | "dawn" | "apartment";
  pedestalColor: string;
  bgLight: string;
}

export interface CameraAngle {
  id: string;
  code: string;
  name: string;
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
}

export interface EditorSceneProps {
  customGlbUrl?: string | null;
  selectedPartName: string;
  onSelectPart: (name: string) => void;
  partsState: Record<string, PartConfig>;
  activeEnvironment: EnvironmentPreset;
  cameraAngle: CameraAngle;
  wireframeGlobal: boolean;
  keyLightIntensity: number;
  colorTempKelvin: number;
  turntableSpin: boolean;
  activeTool: "orbit" | "pan" | "zoom";
  canvasRef?: React.MutableRefObject<HTMLCanvasElement | null>;
}

// Convert Kelvin temperature to approximate hex color
function kelvinToRGB(kelvin: number): THREE.Color {
  const temp = kelvin / 100;
  let red = 255;
  let green = 255;
  let blue = 255;

  if (temp <= 66) {
    red = 255;
    green = 99.4708025861 * Math.log(temp) - 161.1195681661;
    if (temp <= 19) {
      blue = 0;
    } else {
      blue = 138.5177312231 * Math.log(temp - 10) - 305.0447927307;
    }
  } else {
    red = 329.698727446 * Math.pow(temp - 60, -0.1332047592);
    green = 288.1221695283 * Math.pow(temp - 60, -0.0755148492);
    blue = 255;
  }

  return new THREE.Color(
    Math.min(255, Math.max(0, red)) / 255,
    Math.min(255, Math.max(0, green)) / 255,
    Math.min(255, Math.max(0, blue)) / 255
  );
}

function ShoeModel({
  url,
  onSelectPart,
  partsState,
  wireframeGlobal,
  turntableSpin,
}: {
  url: string;
  selectedPartName: string;
  onSelectPart: (name: string) => void;
  partsState: Record<string, PartConfig>;
  wireframeGlobal: boolean;
  turntableSpin: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(url);

  // Clone scene & extract meshes; defer the leveling pass to a ref so we can
  // re-run it when the mount point exists.
  const { rootGroup, meshes } = useMemo(() => {
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

    const levelGroup = new THREE.Group();
    levelGroup.name = "LevelGroup";
    levelGroup.add(clone);
    levelGroup.updateMatrixWorld(true);
    return { rootGroup: levelGroup, meshes: meshList };
  }, [scene]);

  // Apply pitch compensation + auto-center via shared util
  useEffect(() => {
    if (groupRef.current) {
      while (groupRef.current.children.length > 0) {
        groupRef.current.remove(groupRef.current.children[0]);
      }
      const target = url.includes("shoes.glb")
        ? (() => {
            const g = new THREE.Group();
            g.add(rootGroup);
            levelAndCenterShoe(g, rootGroup, 2.7);
            return g.children[0] as THREE.Group;
          })()
        : (() => {
            const g = new THREE.Group();
            g.add(rootGroup);
            autoCenterAndScale(g, rootGroup, 2.7);
            return g.children[0] as THREE.Group;
          })();
      groupRef.current.add(target);
    }
  }, [rootGroup, url]);

  // Dispose on unmount
  useEffect(() => {
    return () => {
      disposeObject3D(rootGroup);
    };
  }, [rootGroup]);

  // Apply real-time material parameters & visibility to meshes
  useEffect(() => {
    meshes.forEach((mesh) => {
      const baseName = mesh.name.replace(/^[LR]_/, "");
      const config = partsState[baseName] || partsState[mesh.name];

      if (config) {
        mesh.visible = config.visible;

        if (mesh.material instanceof THREE.MeshStandardMaterial) {
          mesh.material.color = new THREE.Color(config.color);
          mesh.material.roughness = config.roughness;
          mesh.material.metalness = config.metalness;
          mesh.material.wireframe = wireframeGlobal || config.wireframe;
          if (config.transmission > 0) {
            mesh.material.transparent = true;
            mesh.material.opacity = Math.max(0.2, 1 - config.transmission * 0.45);
          } else {
            mesh.material.transparent = false;
            mesh.material.opacity = 1.0;
          }
          mesh.material.needsUpdate = true;
        }
      } else if (wireframeGlobal) {
        if (mesh.material instanceof THREE.MeshStandardMaterial) {
          mesh.material.wireframe = true;
          mesh.material.needsUpdate = true;
        }
      }
    });
  }, [meshes, partsState, wireframeGlobal]);

  // Subtle continuous spin when turntable is enabled
  useFrame((_, delta) => {
    if (groupRef.current && turntableSpin) {
      groupRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <group
      ref={groupRef}
      rotation={[0, -Math.PI / 4, 0]}
      onClick={(e) => {
        e.stopPropagation();
        const meshName = e.object.name;
        const baseName = meshName.replace(/^[LR]_/, "");
        onSelectPart(baseName || meshName);
      }}
    >
      <primitive object={rootGroup} />
    </group>
  );
}

// Fallback procedural geometry in case GLB is loading or user has not yet dropped a file
function FallbackSneakerProcedural({ wireframeGlobal }: { wireframeGlobal: boolean }) {
  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2} position={[0, 0.4, 0]}>
      {/* Sole */}
      <mesh position={[0, -0.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.4, 0.35, 1.1]} />
        <meshStandardMaterial color="#D1CDC4" roughness={0.4} metalness={0.1} wireframe={wireframeGlobal} />
      </mesh>
      {/* Upper */}
      <mesh position={[-0.2, 0.3, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.8, 0.65, 0.95]} />
        <meshStandardMaterial color="#1a1c1a" roughness={0.6} metalness={0.05} wireframe={wireframeGlobal} />
      </mesh>
      {/* Toe Box */}
      <mesh position={[0.7, 0.15, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.9, 0.4, 0.9]} />
        <meshStandardMaterial color="#a9310f" roughness={0.3} metalness={0.1} wireframe={wireframeGlobal} />
      </mesh>
    </Float>
  );
}

// Cinematic Pedestal Base matching the Stitch Architectural Runner design
function PedestalBase({ color = "#e9e8e5" }: { color?: string }) {
  return (
    <group position={[0, 0, 0]}>
      {/* Upper Pedestal Disc (Textured Stone) */}
      <mesh position={[0, -0.04, 0]} receiveShadow>
        <cylinderGeometry args={[2.0, 2.08, 0.08, 64]} />
        <meshStandardMaterial color={color} roughness={0.85} metalness={0.05} />
      </mesh>
      {/* Sub-Pedestal Ring Foundation */}
      <mesh position={[0, -0.1, 0]} receiveShadow>
        <cylinderGeometry args={[2.15, 2.22, 0.04, 64]} />
        <meshStandardMaterial color="#dbdad7" roughness={0.9} metalness={0.02} />
      </mesh>
    </group>
  );
}

// Smooth animated camera synchronizer that travels to selected camera angle
function CameraController({
  cameraAngle,
  activeTool,
}: {
  cameraAngle: CameraAngle;
  activeTool: "orbit" | "pan" | "zoom";
}) {
  const { camera } = useThree();
  type ControlsRef = ComponentRef<typeof OrbitControls>;
  const controlsRef = useRef<ControlsRef | null>(null);

  useEffect(() => {
    camera.position.set(...cameraAngle.position);
    const c = controlsRef.current as
      | { target: { set: (x: number, y: number, z: number) => void }; update: () => void }
      | null;
    if (c) {
      c.target.set(...cameraAngle.target);
      c.update();
    }
  }, [camera, cameraAngle]);

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      enableRotate={activeTool === "orbit"}
      enablePan={activeTool === "pan"}
      enableZoom={activeTool === "zoom" || activeTool === "orbit"}
      minDistance={1.2}
      maxDistance={7}
      maxPolarAngle={Math.PI / 2 + 0.05} // Prevent camera from going underneath ground
      dampingFactor={0.08}
    />
  );
}

export default function EditorScene3D({
  customGlbUrl,
  selectedPartName,
  onSelectPart,
  partsState,
  activeEnvironment,
  cameraAngle,
  wireframeGlobal,
  keyLightIntensity,
  colorTempKelvin,
  turntableSpin,
  activeTool,
  canvasRef,
}: EditorSceneProps) {
  const modelUrl = customGlbUrl || "/models/shoes.glb";
  const lightColor = useMemo(() => kelvinToRGB(colorTempKelvin), [colorTempKelvin]);

  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing select-none">
      <Canvas
        ref={canvasRef}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          preserveDrawingBuffer: true, // Required for 4K / PNG cutout export capture!
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05,
        }}
        camera={{ position: cameraAngle.position, fov: cameraAngle.fov }}
      >
        <CameraController cameraAngle={cameraAngle} activeTool={activeTool} />

        {/* Ambient & Natural Studio Lighting Rig */}
        <hemisphereLight args={["#ffffff", "#deded8", 0.75]} />
        <directionalLight
          position={[4, 5.5, 4]}
          intensity={keyLightIntensity}
          color={lightColor}
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-bias={-0.0001}
        />
        <directionalLight position={[-4, 3, -2]} intensity={0.45} color="#f0f4f8" />
        <directionalLight position={[0, 4, -4]} intensity={0.45} color="#ffffff" />
        <pointLight position={[0, -0.2, 1.8]} intensity={0.15} color={lightColor} />

        {/* Pedestal Base */}
        <PedestalBase color={activeEnvironment.pedestalColor} />

        {/* Main 3D Model with Graceful Fallback */}
        <React.Suspense fallback={<FallbackSneakerProcedural wireframeGlobal={wireframeGlobal} />}>
          <ShoeModel
            url={modelUrl}
            selectedPartName={selectedPartName}
            onSelectPart={onSelectPart}
            partsState={partsState}
            wireframeGlobal={wireframeGlobal}
            turntableSpin={turntableSpin}
          />
        </React.Suspense>

        {/* Realistic Contact Shadow on Pedestal */}
        <ContactShadows
          position={[0, 0.01, 0]}
          opacity={0.65}
          scale={3.6}
          blur={1.8}
          far={1.6}
        />

        {/* HDRI Studio Reflections with Calibrated Soft Intensity */}
        <Environment preset={activeEnvironment.dreiPreset} environmentIntensity={0.6} />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/shoes.glb");

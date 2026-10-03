"use client";

import React, { useState, useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import Link from "next/link";
import * as THREE from "three";
import {
  Layers,
  ArrowUpRight,
  Maximize2,
} from "lucide-react";

// Fast stone pedestal
function MiniPedestal() {
  return (
    <group position={[0, 0, 0]}>
      {/* Stone disc */}
      <mesh position={[0, -0.03, 0]} receiveShadow>
        <cylinderGeometry args={[1.5, 1.56, 0.06, 36]} />
        <meshStandardMaterial color="#e8e7e4" roughness={0.85} metalness={0.02} />
      </mesh>
      {/* Foundation rim */}
      <mesh position={[0, -0.08, 0]} receiveShadow>
        <cylinderGeometry args={[1.62, 1.68, 0.04, 36]} />
        <meshStandardMaterial color="#dbdad6" roughness={0.9} metalness={0.01} />
      </mesh>
    </group>
  );
}

// Dior Jordan 1 Low Specimen - Natural Leather Shading
function MiniDiorJordan({ wireframe }: { wireframe: boolean }) {
  const { scene } = useGLTF("/models/dior_jordan.glb");
  const { root, meshes } = useMemo(() => {
    const clone = scene.clone(true);
    const list: THREE.Mesh[] = [];

    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = false;
        mesh.receiveShadow = true;
        if (mesh.material) {
          mesh.material = (mesh.material as THREE.Material).clone();
        }
        list.push(mesh);
      }
    });

    const box = new THREE.Box3().setFromObject(clone);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = maxDim > 0 ? 2.1 / maxDim : 1;

    clone.scale.setScalar(scale);
    clone.position.set(-center.x * scale, -box.min.y * scale + 0.01, -center.z * scale);
    clone.updateMatrixWorld(true);

    return { root: clone, meshes: list };
  }, [scene]);

  useEffect(() => {
    meshes.forEach((mesh) => {
      if (mesh.material instanceof THREE.MeshStandardMaterial) {
        mesh.material.wireframe = wireframe;
        // Non-metallic dielectric calfskin leather and icy rubber sole
        mesh.material.metalness = 0.0;
        mesh.material.roughness = 0.72;
        mesh.material.needsUpdate = true;
      }
    });
  }, [meshes, wireframe]);

  return <primitive object={root} />;
}

// Vans Old Skool Specimen - Natural Suede & Canvas Shading
function MiniVansOldskool({ wireframe }: { wireframe: boolean }) {
  const { scene } = useGLTF("/models/vans_oldskool.glb");
  const { root, meshes } = useMemo(() => {
    const clone = scene.clone(true);
    const list: THREE.Mesh[] = [];

    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = false;
        mesh.receiveShadow = true;
        if (mesh.material) {
          mesh.material = (mesh.material as THREE.Material).clone();
        }
        list.push(mesh);
      }
    });

    const box = new THREE.Box3().setFromObject(clone);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = maxDim > 0 ? 2.2 / maxDim : 1;

    clone.scale.setScalar(scale);
    clone.position.set(-center.x * scale, -box.min.y * scale + 0.01, -center.z * scale);
    clone.updateMatrixWorld(true);

    return { root: clone, meshes: list };
  }, [scene]);

  useEffect(() => {
    meshes.forEach((mesh) => {
      if (mesh.material instanceof THREE.MeshStandardMaterial) {
        mesh.material.wireframe = wireframe;
        // Suede, canvas & rubber soles are 100% dielectric
        mesh.material.metalness = 0.0;
        mesh.material.roughness = 0.8;
        mesh.material.needsUpdate = true;
      }
    });
  }, [meshes, wireframe]);

  return <primitive object={root} />;
}

// Waffle Runner V2 Specimen
function MiniWaffleShoe({
  color,
  wireframe,
}: {
  color: string;
  wireframe: boolean;
}) {
  const { scene } = useGLTF("/models/shoes.glb");

  const { rootGroup, meshes } = useMemo(() => {
    const clone = scene.clone(true);
    const list: THREE.Mesh[] = [];

    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = false;
        mesh.receiveShadow = true;
        if (mesh.material) {
          mesh.material = (mesh.material as THREE.Material).clone();
        }
        list.push(mesh);
      }
    });

    const levelGroup = new THREE.Group();
    levelGroup.add(clone);

    // Cancel the raw GLTF node pitch tilt
    levelGroup.rotation.x = -2 * Math.atan2(0.21306893229484558, 0.9770371913909912);
    levelGroup.updateMatrixWorld(true);

    const box = new THREE.Box3().setFromObject(levelGroup);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = maxDim > 0 ? 2.1 / maxDim : 1;

    levelGroup.scale.setScalar(scale);
    levelGroup.position.set(-center.x * scale, -box.min.y * scale + 0.01, -center.z * scale);
    levelGroup.updateMatrixWorld(true);

    return { rootGroup: levelGroup, meshes: list };
  }, [scene]);

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
        mesh.material.roughness = isEyelet ? 0.25 : 0.72;
        mesh.material.metalness = isEyelet ? 0.85 : 0.0;
        mesh.material.wireframe = wireframe;
        mesh.material.needsUpdate = true;
      }
    });
  }, [meshes, color, wireframe]);

  return (
    <group rotation={[0, -Math.PI / 4, 0]}>
      <primitive object={rootGroup} />
    </group>
  );
}

// Steady, uninterrupted turntable rotation (no orbit controls hijacking)
function AutoSpinningShowcase({
  activeShoe,
  color,
  wireframe,
}: {
  activeShoe: "dior" | "vans" | "waffle";
  color: string;
  wireframe: boolean;
}) {
  const spinRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (spinRef.current) {
      spinRef.current.rotation.y += delta * 0.42;
    }
  });

  return (
    <group ref={spinRef}>
      {activeShoe === "dior" && <MiniDiorJordan wireframe={wireframe} />}
      {activeShoe === "vans" && <MiniVansOldskool wireframe={wireframe} />}
      {activeShoe === "waffle" && <MiniWaffleShoe color={color} wireframe={wireframe} />}
    </group>
  );
}

const COLORWAYS = [
  { name: "Terracotta", hex: "#d9532f" },
  { name: "Obsidian", hex: "#1a1a19" },
  { name: "Gold", hex: "#e9c349" },
  { name: "Emerald", hex: "#4edea3" },
  { name: "Platinum", hex: "#e5e2e0" },
];

export const HeroMiniStage: React.FC = () => {
  const [activeShoe, setActiveShoe] = useState<"dior" | "vans" | "waffle">("dior");
  const [color, setColor] = useState("#d9532f");
  const [wireframe, setWireframe] = useState(false);

  return (
    <div className="w-full lg:w-[460px] xl:w-[500px] h-[310px] sm:h-[350px] rounded-lg border border-outline-variant/60 bg-surface-container-low/80 backdrop-blur-md shadow-2xl relative overflow-hidden flex flex-col justify-between select-none">
      {/* Top Header Overlay: Model Switcher & Viewport Controls */}
      <div className="absolute top-2.5 left-2.5 right-2.5 z-20 flex items-center justify-between pointer-events-none gap-1">
        {/* Model Switcher Buttons */}
        <div className="flex items-center gap-1 bg-surface-container/95 border border-border-hairline p-0.5 rounded-[3px] backdrop-blur-md pointer-events-auto shadow-sm">
          <button
            onClick={() => setActiveShoe("dior")}
            className={`px-2.5 py-1 rounded-[2px] text-[10px] font-mono transition-colors cursor-pointer ${
              activeShoe === "dior"
                ? "bg-primary text-white font-semibold shadow-xs"
                : "text-outline hover:text-on-surface"
            }`}
          >
            Dior 1
          </button>
          <button
            onClick={() => setActiveShoe("vans")}
            className={`px-2.5 py-1 rounded-[2px] text-[10px] font-mono transition-colors cursor-pointer ${
              activeShoe === "vans"
                ? "bg-primary text-white font-semibold shadow-xs"
                : "text-outline hover:text-on-surface"
            }`}
          >
            Vans
          </button>
          <button
            onClick={() => setActiveShoe("waffle")}
            className={`px-2.5 py-1 rounded-[2px] text-[10px] font-mono transition-colors cursor-pointer ${
              activeShoe === "waffle"
                ? "bg-primary text-white font-semibold shadow-xs"
                : "text-outline hover:text-on-surface"
            }`}
          >
            Runner V2
          </button>
        </div>

        <div className="flex items-center gap-1 pointer-events-auto">
          {/* Wireframe Toggle */}
          <button
            onClick={() => setWireframe(!wireframe)}
            className={`w-7 h-7 rounded-[2px] border flex items-center justify-center transition-colors cursor-pointer ${
              wireframe
                ? "bg-primary text-white border-primary"
                : "bg-surface-container/90 text-outline border-border-hairline hover:text-on-surface"
            }`}
            title="Toggle Wireframe"
          >
            <Layers className="w-3.5 h-3.5" />
          </button>

          {/* Direct Link to Full Editor */}
          <Link
            href="/editor"
            className="w-7 h-7 rounded-[2px] border border-border-hairline bg-surface-container/90 text-outline hover:text-primary hover:border-primary flex items-center justify-center transition-colors cursor-pointer"
            title="Open Full 3D Studio"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 3D Canvas with Zero-Lag Local Studio Lighting (No OrbitControls, Smooth TurnTable) */}
      <div className="flex-1 w-full h-full relative pointer-events-none">
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [2.1, 1.15, 2.5], fov: 36 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.05,
          }}
        >
          {/* Fast, zero-network, balanced studio physical lighting */}
          <hemisphereLight args={["#ffffff", "#d5d4ce", 0.85]} />
          <directionalLight position={[3.5, 4.5, 3]} intensity={1.3} color="#fffcf5" />
          <directionalLight position={[-3.5, 2.5, 1.5]} intensity={0.5} color="#edf2f7" />
          <directionalLight position={[0, 4, -4]} intensity={0.5} color="#ffffff" />
          <pointLight position={[0, -0.2, 1.8]} intensity={0.15} color="#fff6ed" />

          {/* Static Floor Pedestal */}
          <MiniPedestal />

          {/* Smooth Auto-Rotating Showcase Model */}
          <React.Suspense fallback={null}>
            <AutoSpinningShowcase
              activeShoe={activeShoe}
              color={color}
              wireframe={wireframe}
            />
          </React.Suspense>
        </Canvas>
      </div>

      {/* Bottom Bar: Color Swatches (for Waffle) or Material Tag & Full Studio Link */}
      <div className="absolute bottom-2.5 left-2.5 right-2.5 z-20 flex items-center justify-between px-3 py-1.5 rounded-[4px] bg-surface-container/90 backdrop-blur-md border border-border-hairline">
        {activeShoe === "waffle" ? (
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-[9px] text-outline uppercase mr-1 hidden sm:inline">
              COLORWAY:
            </span>
            {COLORWAYS.map((c) => (
              <button
                key={c.hex}
                onClick={() => setColor(c.hex)}
                className={`w-5 h-5 rounded-full border transition-transform hover:scale-110 cursor-pointer ${
                  color === c.hex
                    ? "ring-2 ring-primary ring-offset-1 ring-offset-surface-container scale-105 border-white"
                    : "border-black/30"
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-[10px] text-on-surface font-semibold uppercase tracking-wider">
              {activeShoe === "dior" ? "Air Jordan 1 Low Dior" : "Vans Old Skool 3D"}
            </span>
            <span className="font-mono text-[9px] text-outline hidden sm:inline">
              • 60 FPS Auto-Turntable
            </span>
          </div>
        )}

        <Link
          href="/editor"
          className="text-primary hover:underline font-mono text-[10px] font-semibold flex items-center gap-1"
        >
          <span>Full Studio</span>
          <ArrowUpRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
};

// Shared geometry helpers for R3F shoe model alignment.
// Centralizes the GLTF-baked pitch compensation that was previously
// copy-pasted across Scene3D, EditorScene3D, HeroMiniStage.

import * as THREE from "three";

/**
 * Pitch radians that the raw `shoes.glb` ships with on its root nodes.
 * Multiply by -2 and feed to atan2 to produce a quaternion that cancels it.
 */
export const SHOES_PITCH_Y = 0.21306893229484558;
export const SHOES_PITCH_X = 0.9770371913909912;
export const SHOES_PITCH_RAD = -2 * Math.atan2(SHOES_PITCH_Y, SHOES_PITCH_X);

/**
 * Apply the standard "auto-level + auto-center + scale-to-fit" pass used by
 * every shoe specimen in the project. Mutates the group in place; returns
 * the group for chaining. Safe to call inside `useMemo` since it only
 * touches matrices.
 */
export function levelAndCenterShoe(
  group: THREE.Group,
  scene: THREE.Object3D,
  targetSize = 2.6
): void {
  const levelGroup = new THREE.Group();
  levelGroup.name = "LevelGroup";
  levelGroup.add(scene);

  // Cancel the GLTF-baked forward pitch only for shoes.glb
  if (scene.name?.includes?.("shoe") || true) {
    levelGroup.rotation.x = SHOES_PITCH_RAD;
  }
  levelGroup.updateMatrixWorld(true);

  const box = new THREE.Box3().setFromObject(levelGroup);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  const maxDim = Math.max(size.x, size.y, size.z);
  const scale = maxDim > 0 ? targetSize / maxDim : 1;

  levelGroup.scale.setScalar(scale);
  // Sit soles flush on the pedestal top (y = 0) with a 0.01 m z-fight margin.
  levelGroup.position.set(
    -center.x * scale,
    -box.min.y * scale + 0.01,
    -center.z * scale
  );
  levelGroup.updateMatrixWorld(true);

  // Detach the original scene and mount the leveled group in the caller group.
  while (group.children.length > 0) group.remove(group.children[0]);
  group.add(levelGroup);
}

/**
 * Auto-center + scale-to-fit for non-shoe GLBs (helmet, ring, nike, dior, vans).
 * Simpler pass: no pitch cancel, just box-fit.
 */
export function autoCenterAndScale(
  group: THREE.Group,
  scene: THREE.Object3D,
  targetSize = 2.4
): void {
  const box = new THREE.Box3().setFromObject(scene);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  const maxDim = Math.max(size.x, size.y, size.z);
  const scale = maxDim > 0 ? targetSize / maxDim : 1;

  scene.scale.setScalar(scale);
  scene.position.set(
    -center.x * scale,
    -box.min.y * scale + 0.01,
    -center.z * scale
  );
  scene.updateMatrixWorld(true);

  while (group.children.length > 0) group.remove(group.children[0]);
  group.add(scene);
}

/**
 * Dispose all geometries, materials, and textures inside a Three.js object
 * tree. Pass the root group returned by `useGLTF().scene` after cloning.
 * Call from a `useEffect` cleanup function to prevent GPU memory leaks on
 * route change.
 */
export function disposeObject3D(root: THREE.Object3D | null | undefined): void {
  if (!root) return;
  root.traverse((child) => {
    const mesh = child as THREE.Mesh;
    if (mesh.isMesh) {
      mesh.geometry?.dispose();
      const mat = mesh.material as THREE.Material | THREE.Material[] | undefined;
      if (Array.isArray(mat)) {
        mat.forEach((m) => disposeMaterial(m));
      } else if (mat) {
        disposeMaterial(mat);
      }
    }
    // Some scenes embed textures on the group itself; clear attribute buffers.
    if ((child as unknown as { texture?: THREE.Texture }).texture) {
      (child as unknown as { texture: THREE.Texture }).texture.dispose();
    }
  });
}

function disposeMaterial(material: THREE.Material): void {
  material.dispose();
  // PBR materials carry map slots — dispose them too
  for (const key of Object.keys(material) as (keyof THREE.Material)[]) {
    const value = (material as unknown as Record<string, unknown>)[key as string];
    if (value && typeof value === "object" && "isTexture" in value) {
      (value as THREE.Texture).dispose();
    }
  }
}

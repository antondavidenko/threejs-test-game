import * as THREE from 'three';
import { HeightGenerator } from './HeightGenerator';
import { Heightmap } from './Heightmap';
import { GROUND_SCALE, DETAILS } from '../world.component';

export function createTerrainLayer(scene: THREE.Group, hightMap: string, material: THREE.MeshPhongMaterial, offsetZ: number, highScale: number): void {
  const manager = new THREE.LoadingManager();
  const loader = new THREE.TextureLoader(manager);
  loader.load(hightMap, (result) => {
    rebuild(result.image, createPlane(scene, material), offsetZ, highScale);
  });
}

function createPlane(scene, material) {
  const size = new THREE.Vector3(GROUND_SCALE, 0, GROUND_SCALE);
  const geometry = new THREE.PlaneGeometry(size.x, size.z, DETAILS, DETAILS);
  const plane = new THREE.Mesh(geometry, material);
  plane.castShadow = false;
  plane.receiveShadow = true;
  plane.rotation.x = -Math.PI / 2;
  plane.rotation.z = -Math.PI / 2;
  scene.add(plane);
  return plane;
}

function rebuild(img, plane, offsetZ: number, highScale: number) {
  const offset = new THREE.Vector2(0, 0);
  const generator = new HeightGenerator(new Heightmap(img, highScale), offset, 1000, 1000 + 1);

  const { position } = plane.geometry.attributes;
  for (let i = 0; i < plane.geometry.attributes.position.count; i++) {
    const heightPairs = generator.get(position.getX(i), position.getY(i));
    position.setZ(i, heightPairs[0] + offsetZ);
  }

  plane.geometry.computeVertexNormals();
}

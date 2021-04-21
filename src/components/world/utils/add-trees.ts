import * as THREE from 'three';
import { loadFBX } from '@src/utils/loadFBX';

export async function addTrees(scene: THREE.Scene) {
  const forest: THREE.Group = await loadFBX('models/trees.FBX');
  const pine1 = forest.getObjectByName('Fir_v1_1').clone();
  scene.add(pine1);
  pine1.position.x = 5;
  pine1.position.z = 0;
  const pine2 = forest.getObjectByName('Fir_v1_2').clone();
  scene.add(pine2);
  pine2.position.x = -5;
  pine2.position.z = 0;

  const map = ((pine1 as THREE.Mesh).material as any).map;
  const newMaterial = new THREE.MeshBasicMaterial({ map });

  (pine1 as THREE.Mesh).material = newMaterial;
  (pine1 as THREE.Mesh).castShadow = true;
  (pine1 as THREE.Mesh).receiveShadow = true;

  (pine2 as THREE.Mesh).material = newMaterial;
  (pine2 as THREE.Mesh).castShadow = true;
  (pine2 as THREE.Mesh).receiveShadow = true;
}

import * as THREE from 'three';
import { loadFBX } from '@src/utils/loadFBX';
import { getImageData } from './getImageData';

const tree1 = 'Fir_v1_1';
const tree2 = 'Fir_v1_2';
let forest: THREE.Group = null;
let treeCounter = 0;

export async function addTrees(scene: THREE.Group, tree_map: string, getTerrainHigh: (x: number, y: number) => number) {
  forest = await loadFBX('models/trees.FBX');

  const manager = new THREE.LoadingManager();
  const loader = new THREE.TextureLoader(manager);
  loader.load(tree_map, (result: THREE.Texture) => {
    const data = getImageData(result.image, true);

    for(let x = 0; x < 128; x++) {
      for(let y = 0; y < 128; y++) {
        const pixelDataG = getPixelAsFloat(y, x, data, 1);

        if (pixelDataG > 200) {
          const tx = (x - 65) * 1.55;
          const tz = (y - 65) * 1.55;
          const ty = getTerrainHigh(tx, tz);
          addTree(scene, tree1, new THREE.Vector3(tx, ty, tz));
        }
        const pixelDataR = getPixelAsFloat(y, x, data, 0);
        if (pixelDataR > 200) {
          const tx = (x - 65) * 1.55;
          const tz = (y - 65) * 1.55;
          const ty = getTerrainHigh(tx, tz);
         addTree(scene, tree2, new THREE.Vector3(tx, ty, tz));
        }
      }
    }
  });
}

async function addTree(scene: THREE.Group, treeId: string, position: THREE.Vector3) {
  treeCounter++;
  // console.log(`added ${treeCounter} trees`);

  const pine = forest.getObjectByName(treeId).clone();
  scene.add(pine);

  pine.position.set(position.x, position.y, position.z);
  pine.scale.setScalar(treeId === tree1 ? 1 : 2);

  const map = ((pine as THREE.Mesh).material as any).map;
  const newMaterial = new THREE.MeshBasicMaterial({ map });

  (pine as THREE.Mesh).material = newMaterial;
  (pine as THREE.Mesh).castShadow = true;
  (pine as THREE.Mesh).receiveShadow = true;
}

function getPixelAsFloat(x, y, data, colorId): any {
  const position = ((x * (data.width * 4)) + (y * 4) + colorId);
  return data.data[position];
}
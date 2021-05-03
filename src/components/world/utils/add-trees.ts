import * as THREE from 'three';
import { loadFBX } from '@src/utils/loadFBX';
import { getImageData } from './getImageData';

const tree1 = 'Fir_v1_1';
const tree2 = 'Fir_v1_2';
let forest: THREE.Group = null;
let treeCounter = 0;

type ColorDataRGB = {
  r: number,
  g: number,
  b: number,
}

type TerrainHighGetter = (x: number, y: number) => number;

export async function addTrees(scene: THREE.Group, tree_map: string, getTerrainHigh: TerrainHighGetter) {
  forest = await loadFBX('models/trees.fbx');

  const manager = new THREE.LoadingManager();
  const loader = new THREE.TextureLoader(manager);
  loader.load(tree_map, (result: THREE.Texture) => {
    const data = getImageData(result.image, true);

    for(let x = 0; x < 128; x++) {
      for(let y = 0; y < 128; y++) {
        const pixelData = getPixelAsFloat(y, x, data);
        if (pixelData.g > 200) {
          addTree(scene, tree1, getTreePosition(x, y, getTerrainHigh));
        } else if (pixelData.r > 200) {
         addTree(scene, tree2, getTreePosition(x, y, getTerrainHigh));
        }
      }
    }
  });
}

function getTreePosition(x: number, y: number, getTerrainHigh: TerrainHighGetter): THREE.Vector3 {
  const tx = (x - 65) * 1.55;
  const tz = (y - 65) * 1.55;
  const ty = getTerrainHigh(tx, tz);
 return new THREE.Vector3(tx, ty, tz);
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

function getPixelAsFloat(x: number, y: number, data): ColorDataRGB {
  const positionR = ((x * (data.width * 4)) + (y * 4) + 0);
  const positionG = ((x * (data.width * 4)) + (y * 4) + 1);
  const positionB = ((x * (data.width * 4)) + (y * 4) + 2);
  return { r: data.data[positionR], g: data.data[positionG], b: data.data[positionB]};
}

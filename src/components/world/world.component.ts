import * as THREE from 'three';
import { addTrees } from './utils/add-trees';
import { addSkyBox } from './utils/addSkyBox';
import { createTerrainLayer } from './utils/CreateTerrainLayer';

export const GROUND_SCALE = 200;

function getTexture(fileName: string): string {
  return `textures/panorama/${fileName}.jpg`;
}

function planeMaterial(fileName: string): THREE.MeshPhongMaterial {
  const material = new THREE.MeshPhongMaterial({ color: 0xffffff });
  material.map = new THREE.TextureLoader().load(getTexture(fileName));
  material.map.repeat.set(10, 10);
  material.map.wrapS = material.map.wrapT = THREE.RepeatWrapping;
  return material;
}

function waterMaterial(fileName: string): THREE.MeshPhongMaterial {
  const material = new THREE.MeshPhongMaterial({ color: 0xffffff });
  material.map = new THREE.TextureLoader().load(getTexture(fileName));
  material.map.repeat.set(10, 10);
  material.map.wrapS = material.map.wrapT = THREE.RepeatWrapping;
  material.transparent = true;
  material.opacity = 0.75;
  return material;
}

export class WorldComponent {

  constructor(private scene: THREE.Scene) {
    addSkyBox(this.scene);
    createTerrainLayer(this.scene, getTexture('map_ground'), planeMaterial('ground'), -32.4, 64);
    createTerrainLayer(this.scene, getTexture('map_rock'), planeMaterial('rock'), -32.6, 64);
    createTerrainLayer(this.scene, getTexture('map_sand'), planeMaterial('sand'), -32.42, 64);
    createTerrainLayer(this.scene, getTexture('map_sand'), waterMaterial('water'), -1, 0);
    addTrees(this.scene);
  }

}
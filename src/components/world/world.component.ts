import * as THREE from 'three';
import { addTrees } from './utils/add-trees';
import { addSkyBox } from './utils/addSkyBox';
import { createTerrainLayer } from './utils/CreateTerrainLayer';

export const GROUND_SCALE = 200;
export const DETAILS = 128;

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

class WorldComponent {

  private terrain = new THREE.Group();
  private forest = new THREE.Group();

  init(scene: THREE.Scene) {
    addSkyBox(scene);
    createTerrainLayer(this.terrain, getTexture('map_ground'), planeMaterial('ground'), -32.4, 64);
    createTerrainLayer(this.terrain, getTexture('map_rock'), planeMaterial('rock'), -32.6, 64);
    createTerrainLayer(this.terrain, getTexture('map_sand'), planeMaterial('sand'), -32.42, 64);
    createTerrainLayer(this.terrain, getTexture('map_sand'), waterMaterial('water'), -1, 0);
    scene.add(this.terrain);
    addTrees(this.forest, getTexture('map_trees'), this.getTerrainHigh.bind(this));
    scene.add(this.forest);
  }

  getTerrainHigh(x: number, y: number): number {
    const raycast = new THREE.Raycaster();
    const from = new THREE.Vector3(x, 1000, y);
    var to = new THREE.Vector3(0, -1, 0);
    raycast.set(from, to.normalize());
    var intersection = raycast.intersectObject(this.terrain, true);
    return intersection[0] ? 1000 - this.findMaxDistance(intersection) : 0;
  }

  private findMaxDistance(intersection: THREE.Intersection[]): number {
    return intersection.reduce((min: THREE.Intersection, currentValue: THREE.Intersection) => {
      return min.distance < currentValue.distance ? min : currentValue;
    }).distance;
  }

}

export const worldComponent = new WorldComponent();

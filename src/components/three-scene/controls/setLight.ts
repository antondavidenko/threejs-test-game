import * as THREE from 'three';

type LightConfig = {
  type: string,
  color: string,
  intensity: number,
  position: {
    x: number,
    y: number,
    z: number,
  },
  shadow: {
    castShadow: boolean,
    mapSize: {
      width: number,
      height: number,
    },
    camera: {
      near: number,
      far: number
    }
  }
}

export function setLight(scene: THREE.Scene, config: LightConfig[]): void {
  setPointLight(scene, config[0]);
  setAmbientLight(scene, config[1]);
}

function setPointLight(scene: THREE.Scene, config: LightConfig) :void {
  const { color, intensity } = config;
  const { x, y, z } = config.position;
  const light = new THREE.PointLight(parseInt(color, 16), intensity);
  light.position.set(x, y, z);
  setupShadow(light, config);
  scene.add(light);
}

function setupShadow(light: THREE.PointLight, config: LightConfig) {
  const { castShadow, mapSize, camera } = config.shadow;
  light.castShadow = castShadow;
  light.shadow.mapSize.width = mapSize.width;
  light.shadow.mapSize.height = mapSize.height;
  light.shadow.camera.near = camera.near;
  light.shadow.camera.far = camera.far;
}

function setAmbientLight(scene: THREE.Scene, config: LightConfig) :void {
  const { color, intensity } = config;
  const ambientLight = new THREE.AmbientLight(parseInt(color, 16), intensity);
  scene.add(ambientLight);
}

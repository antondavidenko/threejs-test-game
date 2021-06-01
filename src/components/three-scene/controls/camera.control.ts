import { Character } from '@antondavidenko/modular-character-threejs';
import * as THREE from 'three';

type CameraConfig = {
  fov: number;
  near: number;
  far: number;
}

class CameraControl {

  private camera: THREE.PerspectiveCamera;
  private updateCamera: boolean;

  init(config: CameraConfig, updateCamera: boolean): void {
    this.camera = this.createCamera(config);
    this.updateCamera = updateCamera;
  }

  update(cameraTarget: Character): void {
    if (cameraTarget && cameraTarget.getIsReady() && this.updateCamera) {
      const pos = cameraTarget.position.clone();
      const angle = cameraTarget.rotation.y;
      pos.y += 2;
      pos.z -= 5 * Math.cos(angle);
      pos.x -= 4 * Math.sin(angle);
      this.camera.position.lerp(pos, 0.05);
      this.camera.lookAt(cameraTarget.position);
    }
  }

  getCamera(): THREE.PerspectiveCamera {
    return this.camera;
  }

  onResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }

  private createCamera(config: CameraConfig): THREE.PerspectiveCamera {
    const camera = new THREE.PerspectiveCamera(
      config.fov,
      window.innerWidth / window.innerHeight,
      config.near,
      config.far,
    );
    const zoom = 2.5;
    camera.position.set(0 * zoom, 1.4 * zoom, -3.0 * zoom);
    return camera;
  }

}

export const cameraControl = new CameraControl();

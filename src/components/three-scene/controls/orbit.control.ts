import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { cameraControl } from './camera.control';

class OrbitControl {

  private controls: OrbitControls;
  private useOrbitControl: boolean;

  init(useOrbitControl: boolean, renderer: THREE.WebGLRenderer): void {
    this.useOrbitControl = useOrbitControl;
    if (useOrbitControl) {
      this.controls = this.createControls(cameraControl.getCamera(), renderer);
    }
  }

  update(): void {
    if (this.useOrbitControl) {
      this.controls.update();
    }
  }

  private createControls(camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer) {
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.screenSpacePanning = true;
    controls.target.set(0, 1, 0);
    controls.minDistance = 3;
    controls.maxDistance = 400;
    controls.maxPolarAngle = Math.PI / 2;
    return controls;
  }

}

export const orbitControl = new OrbitControl();

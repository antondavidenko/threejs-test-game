import * as THREE from 'three';
import { charactersCollection, worldComponent } from '@src/components/';
import CONFIG from '@src/models/game.config.json';
import { updateFPS } from '@src/utils';
import { ControlType } from '@src/app';
import { orbitControl, cameraControl, getRender, setLight, statsControl } from './controls';

class ThreeScene {

  private scene: THREE.Scene;
  private renderer: THREE.WebGLRenderer;

  init(controlType: ControlType): void {
    this.scene = new THREE.Scene();
    setLight(this.scene, CONFIG.lights);
    cameraControl.init(CONFIG.camera, controlType !== 'orbit');
    this.renderer = getRender(this.scene, cameraControl.getCamera());
    window.addEventListener('resize', this.onWindowResize.bind(this), false);
    statsControl.init(CONFIG.debug.stats);
    orbitControl.init(controlType === 'orbit', this.renderer);
    this.addSceneObjects();
    this.animate();
  }

  getDomElement(): HTMLCanvasElement {
    return this.renderer.domElement;
  }

  private onWindowResize(): void {
    cameraControl.onResize();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderScreen();
  }

  private renderScreen(): void {
    this.renderer.render(this.scene, cameraControl.getCamera());
  }

  private addSceneObjects(): void {
    worldComponent.init(this.scene);
    charactersCollection.init(this.scene, () => {
      cameraControl.getCamera().lookAt(charactersCollection.selected().position);
    });
  }

  private animate(): void {
    if (CONFIG.debug.counterFPS) {
      updateFPS();
    }
    statsControl.update();
    this.renderScreen();
    requestAnimationFrame(this.animate.bind(this));
    orbitControl.update();
    cameraControl.update();
    charactersCollection.update();
  }

}

export const threeScene = new ThreeScene();

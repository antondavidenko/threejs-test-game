import * as THREE from 'three';
import { Character } from '@antondavidenko/modular-character-threejs';
import CONFIG from '@src/models/game.config.json';
import { updateFPS } from '@src/utils';
import { ControlType } from '@src/app';
import { orbitControl, cameraControl, getRender, setLight, statsControl } from './controls';

class ThreeScene {

  private scene: THREE.Scene;
  private renderer: THREE.WebGLRenderer;
  private cameraTarget: Character;

  init(controlType: ControlType): void {
    this.scene = new THREE.Scene();
    setLight(this.scene, CONFIG.lights);
    cameraControl.init(CONFIG.camera, controlType !== 'orbit');
    this.renderer = getRender(this.scene, cameraControl.getCamera());
    window.addEventListener('resize', this.onWindowResize.bind(this), false);
    statsControl.init(CONFIG.debug.stats);
    orbitControl.init(controlType === 'orbit', this.renderer);
    this.update();
  }

  getDomElement(): HTMLCanvasElement {
    return this.renderer.domElement;
  }

  getScene(): THREE.Scene {
    return this.scene;
  }

  setCameraTarget(cameraTarget: Character): void {
    this.cameraTarget = cameraTarget;
  }

  private onWindowResize(): void {
    cameraControl.onResize();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderScreen();
  }

  private renderScreen(): void {
    this.renderer.render(this.scene, cameraControl.getCamera());
  }

  private update(): void {
    if (CONFIG.debug.counterFPS) {
      updateFPS();
    }
    statsControl.update();
    this.renderScreen();
    orbitControl.update();
    cameraControl.update(this.cameraTarget);
    requestAnimationFrame(this.update.bind(this));
  }

}

export const threeScene = new ThreeScene();

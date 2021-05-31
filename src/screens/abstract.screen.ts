import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';
import CONFIG from '../models/game.config.json';
import { updateShaderMaterial, updateFPS, getCamera, getRender, setLight } from '../utils';

export class AbstractScreen {

  protected scene: THREE.Scene;
  protected camera: THREE.PerspectiveCamera;
  protected renderer: THREE.WebGLRenderer;
  protected stats: Stats;

  constructor() {
    this.prepareScene();
    this.addStatsOnDemand();
  }

  protected addStatsOnDemand(): void {
    if (CONFIG.debug.stats) {
      this.stats = Stats();
      document.body.appendChild(this.stats.dom);
    }
  }

  protected prepareScene(): void {
    this.scene = new THREE.Scene();
    setLight(this.scene);
    this.camera = getCamera();
    this.renderer = getRender(this.scene, this.camera);
    window.addEventListener('resize', this.onWindowResize.bind(this), false);
  }

  protected onWindowResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderScreen();
  }

  protected renderScreen(): void {
    this.renderer.render(this.scene, this.camera);
  }

  protected animate(): void {
    if (CONFIG.debug.counterFPS) {
      updateFPS();
    }
    if (CONFIG.debug.stats) {
      this.stats.update();
    }
    this.renderScreen();
    // updateShaderMaterial();
  }

}

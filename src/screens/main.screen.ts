import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { updateShaderMaterial, updateFPS, getCamera, getRender, getControls, setLight } from '../utils/';
import { JoyStick, charactersCollection, WorldComponent } from '../components/';
import { TransitionsLogicEngine } from '@antondavidenko/fsm';
import { slotMachineDefinition } from '@src/models/fsm';
import { initAllStates } from '@src/states';

type ControlType = 'joystic' | 'orbit';

export interface IStateContext {
  dispatchEvent(eventId: string): void;
}

export class MainScreen {

  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private controls: OrbitControls | JoyStick;
  private stats: Stats;

  private levelFSM: TransitionsLogicEngine;

  constructor(private controlType: ControlType) {
    this.levelFSM = new TransitionsLogicEngine(slotMachineDefinition);
    initAllStates(this.levelFSM, this.getStateContext());
    this.levelFSM.run();

    this.prepareScene();
    this.addSceneObjects();
    this.animate();
  }

  private getStateContext(): IStateContext {
    return {
      dispatchEvent: this.levelFSM.dispatchEvent,
    };
  }

  private addSceneObjects(): void {
    this.stats = Stats();
    document.body.appendChild(this.stats.dom);
    new WorldComponent(this.scene);
    charactersCollection.init(this.scene, () => {
      this.camera.lookAt(charactersCollection.selected().position);
    });
  }

  private initInput(input: JoyStick): void {
    if (this.controlType === 'joystic') {
      input.onTouchStart(this.levelFSM.onTouchStart);
      input.onTouchMove(this.levelFSM.onTouchMove);
      input.onTouchEnd(this.levelFSM.onTouchEnd);
    }
  }

  private prepareScene(): void {
    this.scene = new THREE.Scene();
    setLight(this.scene);
    this.camera = getCamera();
    this.renderer = getRender(this.scene, this.camera);
    if (this.controlType === 'orbit') {
      this.controls = getControls(this.camera, this.renderer);
    } else if (this.controlType === 'joystic') {
      this.controls = new JoyStick();
      this.initInput(this.controls);
    }
    window.addEventListener('resize', this.onWindowResize.bind(this), false);
  }

  private onWindowResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderScreen();
  }

  private renderScreen(): void {
    this.renderer.render(this.scene, this.camera);
  }

  private animate(): void {
    updateFPS();
    requestAnimationFrame(this.animate.bind(this));
    if (this.controlType === 'orbit') {
      (this.controls as OrbitControls).update();
    } else {
      this.updateCamera();
    }
    charactersCollection.update();
    this.renderScreen();
    this.stats.update();
    updateShaderMaterial();
  }

  private updateCamera(): void {
    if (charactersCollection.selected().getIsReady()) {
      const pos = charactersCollection.selected().position.clone();
      const angle = charactersCollection.selected().rotation.y;
      pos.y += 2;
      pos.z -= 4 * Math.cos(angle);
      pos.x -= 4 * Math.sin(angle);
      this.camera.position.lerp(pos, 0.05);
      this.camera.lookAt(charactersCollection.selected().position);
    }
  }

}

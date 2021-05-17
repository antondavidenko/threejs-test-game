import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { getControls } from '../utils/';
import { pixiUI, charactersCollection, worldComponent } from '@src/components/';
import { TransitionsLogicEngine } from '@antondavidenko/fsm';
import { slotMachineDefinition } from '@src/models/fsm';
import { initAllStates } from '@src/states';
import { AbstractScreen } from './abstract.screen';

type ControlType = 'joystic' | 'orbit';

export interface IStateContext {
  dispatchEvent: (eventId: string) => void;
}

export class MainScreen extends AbstractScreen {

  private controls: OrbitControls;
  private levelFSM: TransitionsLogicEngine;

  constructor(private controlType: ControlType) {
    super();
    this.levelFSM = new TransitionsLogicEngine(slotMachineDefinition);
    initAllStates(this.levelFSM, this.getStateContext());
    this.levelFSM.run();

    this.initControls();
    this.addSceneObjects();
    this.animate();
  }

  private getStateContext(): IStateContext {
    return {
      dispatchEvent: this.levelFSM.dispatchEvent,
    };
  }

  private addSceneObjects(): void {
    worldComponent.init(this.scene);
    charactersCollection.init(this.scene, () => {
      this.camera.lookAt(charactersCollection.selected().position);
    });
  }

  private initInput(): void {
    if (this.controlType === 'joystic') {
      pixiUI.onTouchStart(this.levelFSM.onTouchStart);
      pixiUI.onTouchMove(this.levelFSM.onTouchMove);
      pixiUI.onTouchEnd(this.levelFSM.onTouchEnd);
    }
  }

  private initControls(): void {
    if (this.controlType === 'orbit') {
      this.controls = getControls(this.camera, this.renderer);
    } else if (this.controlType === 'joystic') {
      this.initInput();
      pixiUI.init(this.renderer.domElement);
    }
  }

  protected animate(): void {
    super.animate();
    requestAnimationFrame(this.animate.bind(this));
    if (this.controlType === 'orbit') {
      (this.controls as OrbitControls).update();
    } else {
      this.updateCamera();
    }
    charactersCollection.update();
  }

  private updateCamera(): void {
    if (charactersCollection.selected().getIsReady()) {
      const pos = charactersCollection.selected().position.clone();
      const angle = charactersCollection.selected().rotation.y;
      pos.y += 2;
      pos.z -= 5 * Math.cos(angle);
      pos.x -= 4 * Math.sin(angle);
      this.camera.position.lerp(pos, 0.05);
      this.camera.lookAt(charactersCollection.selected().position);
    }
  }

}

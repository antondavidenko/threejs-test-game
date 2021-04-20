import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { getControls } from '../utils/';
import { JoyStick, charactersCollection, WorldComponent } from '../components/';
import { TransitionsLogicEngine } from '@antondavidenko/fsm';
import { slotMachineDefinition } from '@src/models/fsm';
import { initAllStates } from '@src/states';
import { AbstractScreen } from './abstract.screen';

type ControlType = 'joystic' | 'orbit';

export interface IStateContext {
  dispatchEvent(eventId: string): void;
}

export class MainScreen extends AbstractScreen {

  private controls: OrbitControls | JoyStick;
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

  private initControls(): void {
    if (this.controlType === 'orbit') {
      this.controls = getControls(this.camera, this.renderer);
    } else if (this.controlType === 'joystic') {
      this.controls = new JoyStick();
      this.initInput(this.controls);
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
      pos.z -= 4 * Math.cos(angle);
      pos.x -= 4 * Math.sin(angle);
      this.camera.position.lerp(pos, 0.05);
      this.camera.lookAt(charactersCollection.selected().position);
    }
  }

}

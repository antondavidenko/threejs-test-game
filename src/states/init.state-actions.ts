import { StateActions } from '@antondavidenko/fsm';
import { GameInput, IStateContext } from '@src/app';
import { charactersCollection, pixiUI, worldComponent } from '@src/components';
import { threeScene } from '@src/components/three-scene/three-scene.component';
import { LevelEvents } from '../models/fsm/fsm.enum';

export function getInitStateActions(context: IStateContext): StateActions {
  return {
    stateStart: async () => {
      threeScene.init(context.controlType);
      if (context.controlType === 'joystic') {
        initInput(context.input);
        pixiUI.init(threeScene.getDomElement());
      }
      worldComponent.init(threeScene.getScene());
      charactersCollection.init(threeScene.getScene(), () => {
        threeScene.setCameraTarget(charactersCollection.selected());
      });
      context.dispatchEvent(LevelEvents.READY);
    },
  };
}

function initInput(input: GameInput): void {
  pixiUI.onTouchStart(input.onTouchStart);
  pixiUI.onTouchMove(input.onTouchMove);
  pixiUI.onTouchEnd(input.onTouchEnd);
}

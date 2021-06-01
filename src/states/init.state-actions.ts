import { StateActions } from '@antondavidenko/fsm';
import { GameInput, IStateContext } from '@src/app';
import { pixiUI } from '@src/components';
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
      context.dispatchEvent(LevelEvents.READY);
    },
  };
}

function initInput(input: GameInput): void {
  pixiUI.onTouchStart(input.onTouchStart);
  pixiUI.onTouchMove(input.onTouchMove);
  pixiUI.onTouchEnd(input.onTouchEnd);
}

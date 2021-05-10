import { StateActions } from '@antondavidenko/fsm';
import { IStateContext } from '../screens/main.screen';
import { LevelEvents } from '../models/fsm/fsm.enum';
import { pixiUI } from '@src/components/ui/ui.pixi.component';

export function getInitStateActions(context: IStateContext): StateActions {
  return {
    stateStart: async () => {
      pixiUI.init(context.renderCanvas);
      console.log('InitState');
      context.dispatchEvent(LevelEvents.READY);
    },
  };
}

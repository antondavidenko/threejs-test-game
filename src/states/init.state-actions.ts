import { StateActions } from '@antondavidenko/fsm';
import { IStateContext } from '../screens/main.screen';
import { LevelEvents } from '../models/fsm/fsm.enum';

export function getInitStateActions(context: IStateContext): StateActions {
  return {
    stateStart: async () => {
      console.log('InitState');
      context.dispatchEvent(LevelEvents.READY);
    },
  };
}

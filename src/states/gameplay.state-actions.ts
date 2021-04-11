import { StateActions } from '@antondavidenko/fsm';
import { IStateContext } from '../screens/main.screen';
import { LevelEvents } from '../models/fsm/fsm.enum';
import { charactersCollection } from '@src/components';

export function getGameplayStateActions(context: IStateContext): StateActions {
  return {
    stateStart: async () => {
      console.log('GameplayState');
      // context.dispatchEvent(LevelEvents.WIN);
    },
    touchEnd: () => {
      charactersCollection.onTouchMove(0, 0);
    },
    touchMove: (event: {forward: number, turn: number}) => {
      charactersCollection.onTouchMove(event.forward, event.turn);
    }
  };
}

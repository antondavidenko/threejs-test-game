import { StateActions } from '@antondavidenko/fsm';
import { IStateContext } from '../screens/main.screen';
import { LevelEvents } from '../models/fsm/fsm.enum';
import { charactersCollection } from '@src/components';
import { UiEvent } from '@src/components/ui/ui.pixi.component';

export function getGameplayStateActions(context: IStateContext): StateActions {
  return {
    stateStart: async () => {
      console.log('GameplayState');
      // context.dispatchEvent(LevelEvents.WIN);
    },
    touchEnd: () => {
      charactersCollection.onTouchMove(0, 0);
    },
    touchMove: (event: UiEvent) => {
      charactersCollection.onTouchMove(event.joystic.y / -240, event.joystic.x / 240);
    },
    touchStart: (event: UiEvent) => {
      console.log(event);
    }
  };
}

import { StateActions } from '@antondavidenko/fsm';

export function getLoseStateActions(): StateActions {
  return {
    stateStart: async () => {
      console.log('LoseState');
    },
  };
}

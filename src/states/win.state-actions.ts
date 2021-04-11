import { StateActions } from '@antondavidenko/fsm';

export function getWinStateActions(): StateActions {
  return {
    stateStart: async () => {
      console.log('WinState');
    },
  };
}

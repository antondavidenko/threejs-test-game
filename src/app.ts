import { initStorage } from '@antondavidenko/modular-character-threejs';
import { slotMachineDefinition } from '@src/models/fsm';
import { initAllStates } from '@src/states';
import { TransitionsLogicEngine } from '@antondavidenko/fsm';

export type ControlType = 'joystic' | 'orbit';

export type GameInput = {
  onTouchStart: (event: any) => void;
  onTouchMove: (event: any) => void;
  onTouchEnd: (event: any) => void;
}

export interface IStateContext {
  dispatchEvent: (eventId: string) => void;
  controlType: ControlType;
  input: GameInput;
}

export const CDN_ROOT = '/show/chr_cdn_v1/';
initStorage(CDN_ROOT, () => {
  const levelFSM = new TransitionsLogicEngine(slotMachineDefinition);
  initAllStates(levelFSM, {
    dispatchEvent: levelFSM.dispatchEvent,
    controlType: 'joystic',
    input: {
      onTouchStart: levelFSM.onTouchStart,
      onTouchMove: levelFSM.onTouchMove,
      onTouchEnd: levelFSM.onTouchEnd,
    },
  });
  levelFSM.run();
});

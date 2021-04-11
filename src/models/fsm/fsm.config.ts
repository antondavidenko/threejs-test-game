import { SlotMachineDefinition } from '@antondavidenko/fsm';
import { LevelStates, LevelEvents } from './fsm.enum';

export const slotMachineDefinition: SlotMachineDefinition = {
  startState: LevelStates.INIT,
  states: [
    {
      name: LevelStates.INIT,
      transitions: [
        { target: LevelStates.GAMEPLAY, event: LevelEvents.READY },
      ],
    },
    {
      name: LevelStates.GAMEPLAY,
      transitions: [
        { target: LevelStates.WIN, event: LevelEvents.WIN },
        { target: LevelStates.LOSE, event: LevelEvents.LOSE },
      ],
    },
    {
      name: LevelStates.WIN,
      transitions: [],
    },
    {
      name: LevelStates.LOSE,
      transitions: [],
    },
  ],
};

import { StateActions, TransitionsLogicEngine } from '@antondavidenko/fsm';
import { IStateContext } from '../screens/main.screen';
import { LevelStates } from '../models/fsm/fsm.enum';
import { getGameplayStateActions } from './gameplay.state-actions';
import { getInitStateActions } from './init.state-actions';
import { getLoseStateActions } from './lose.state-actions';
import { getWinStateActions } from './win.state-actions';

type ActionsGetter = (context: IStateContext) => StateActions;

const statesMap: Map<LevelStates, ActionsGetter> = new Map([
  [LevelStates.INIT, getInitStateActions],
  [LevelStates.GAMEPLAY, getGameplayStateActions],
  [LevelStates.WIN, getWinStateActions],
  [LevelStates.LOSE, getLoseStateActions],
]);

export function initAllStates(fsm: TransitionsLogicEngine, context: IStateContext) {
  statesMap.forEach((getActions: ActionsGetter, levelState: LevelStates) => {
    fsm.setStateAction(levelState, getActions(context));
  });
}

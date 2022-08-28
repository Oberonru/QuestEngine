import { Scene } from './Scene.types';
import { Transition } from './Transition.types';
import { IPlayer } from './Player.types';

export interface IQuest {
  currentNode: Scene | Transition;
  player: IPlayer;
}

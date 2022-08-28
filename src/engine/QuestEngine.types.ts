import { Scene } from 'src/entities/Scene.types';
import { Transition } from 'src/entities/Transition.types';

export interface IQuestEngine {
  readonly transitions: Transition[];
  readonly currentScene: Scene;

  goTo(transition: Transition): Scene;
}

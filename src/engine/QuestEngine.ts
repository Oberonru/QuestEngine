import { Quest } from 'src/entities/Quest';
import { Scene } from 'src/entities/Scene.types';
import { Transition } from 'src/entities/Transition.types';
import { IQuestEngine } from './QuestEngine.types';

export class QuestEngine implements IQuestEngine {
  private readonly _quest: Quest;
  private _currentScene: Scene;

  constructor(quest: Quest) {
    this._quest = quest;
    this._currentScene = this._quest.scenes.find((scene) => scene.type === 'start');
  }

  get currentScene(): Scene {
    return this._currentScene;
  }

  get transitions(): Transition[] {
    return this._currentScene.transitions;
  }

  goTo(transition: Transition) {
    this._currentScene = this._quest.scenes.find((scene) => scene.id === transition.target);

    return this._currentScene;
  }
}

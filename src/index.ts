import { QuestEngine } from './engine/QuestEngine';
import { logger } from './logger/logger';
import quest from './quest.json';
import cliSelect from 'cli-select';
import { Scene } from './entities/Scene.types';
import { Transition } from './entities/Transition.types';

logger().info('Started the app');

(async function () {
  const engine = new QuestEngine(quest);

  do {
    const transition = await render(engine.currentScene);

    engine.goTo(transition);
  } while (engine.currentScene.type !== 'end');
})();

async function render(scene: Scene): Promise<Transition> {
  console.log(scene.description);

  const selected = await cliSelect({ values: scene.transitions.map((el) => el.text) });
  const transition = scene.transitions.find((transition) => selected.value === transition.text);

  console.clear();

  return transition;
}

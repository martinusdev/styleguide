import KOContext from './campaign/ko/context';
import KOScene from './campaign/ko/scene';

const context = new KOContext('container');

const scene = new KOScene(
  'view-1',
  '/images/content/campaign/knizna-odysea/models/planet.json',
);
scene.loadScene();

const scene2 = new KOScene(
  'view-2',
  '/images/content/campaign/knizna-odysea/models/planet.json',
);
scene2.loadScene();

const scene3 = new KOScene(
  'view-3',
  '/images/content/campaign/knizna-odysea/models/Knihonaut-animated.json',
);
scene3.loadModel();

context.addScene(scene);
context.addScene(scene2);
context.addScene(scene3);

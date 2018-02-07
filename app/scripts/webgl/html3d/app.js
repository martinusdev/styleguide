import GGMap from './map';
import GGContext from './context';
import GGScene from './scene';

export default class GGApp {
  static start() {
    const context = new GGContext('container');

    const scene = new GGScene(
      'view-1',
      'http://knihonaut.blur.sk/models/planet.json',
    );
    scene.loadScene();

    const scene2 = new GGScene(
      'view-2',
      'http://knihonaut.blur.sk/models/planet.json',
    );
    scene2.loadScene();

    const scene3 = new GGScene(
      'view-3',
      'http://knihonaut.blur.sk/models/Knihonaut-animated.json',
    );
    scene3.loadModel();

    const scene4 = new GGScene(
      'view-4',
      'http://knihonaut.blur.sk/models/Knihonaut-animated.json',
    );
    scene4.loadModel();

    const scene5 = new GGScene(
      'view-5',
      'http://knihonaut.blur.sk/models/planet.json',
    );
    scene5.loadScene();

    const scene6 = new GGScene(
      'view-6',
      'http://knihonaut.blur.sk/models/planet.json',
    );
    scene6.loadScene();

    context.addScene(scene);
    context.addScene(scene2);
    context.addScene(scene3);
    context.addScene(scene4);
    context.addScene(scene5);
    context.addScene(scene6);

    const map = new GGMap('map', 'map-container');
    map.dummy();
  }
}

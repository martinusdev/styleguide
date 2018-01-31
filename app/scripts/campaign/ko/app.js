import KOMap from './map';
import KOContext from './3d/context';
import KOScene from './3d/scene';

export default class KOApp {
  static start() {
    const context = new KOContext('container');

    // const scene = new KOScene(
    //   'view-1',
    //   'images/content/campaign/knizna-odysea/models/planet.json',
    // );
    // scene.loadScene();
    //
    // const scene2 = new KOScene(
    //   'view-2',
    //   'images/content/campaign/knizna-odysea/models/planet.json',
    // );
    // scene2.loadScene();
    //
    // const scene3 = new KOScene(
    //   'view-3',
    //   'images/content/campaign/knizna-odysea/models/Knihonaut-animated.json',
    // );
    // scene3.loadModel();

    const scene4 = new KOScene(
      'view-4',
      'http://knihonaut.blur.sk/models/Knihonaut-animated.json',
    );
    scene4.loadModel();

    const scene5 = new KOScene(
      'view-5',
      'http://knihonaut.blur.sk/models/planet.json',
    );
    scene5.loadScene();

    const scene6 = new KOScene(
      'view-6',
      'http://knihonaut.blur.sk/models/planet.json',
    );
    scene6.loadScene();

    // context.addScene(scene);
    // context.addScene(scene2);
    // context.addScene(scene3);
    context.addScene(scene4);
    context.addScene(scene5);
    context.addScene(scene6);

    const map = new KOMap('map', 'map-container');
    map.dummy();
  }
}

import * as THREE from 'three';

export default class KOScene {
  constructor(selector, file) {
    this.container = document.getElementById(selector);
    this.file = file;
    this.loaded = false;

    this.objectLoader = new THREE.ObjectLoader();
    this.jsonLoader = new THREE.JSONLoader();

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      40,
      this.container.clientWidth / this.container.clientHeight,
      0.1,
      1000,
    );
    this.camera.position.set(0, 0, 10);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffaa00, 1);
    this.scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(2, 1.75, 1);
    this.scene.add(dirLight);
  }

  loadScene() {
    this.objectLoader.load(this.file, obj => {
      obj.scale.set(2, 2, 2);
      obj.rotateY(Math.PI / 2);

      this.scene.add(obj);

      this.loaded = true;
    });
  }

  loadModel() {
    this.jsonLoader.load(this.file, (geometry, materials) => {
      materials.forEach(material => {
        material.skinning = true;
      });
      const model = new THREE.SkinnedMesh(
        geometry,
        new THREE.MeshFaceMaterial(materials),
      );
      model.receiveShadow = true;

      this.mixer = new THREE.AnimationMixer(model);
      const action = this.mixer.clipAction(geometry.animations[0]);
      action.enabled = true;

      this.scene.add(model);
      action.play();

      this.loaded = true;
    });
  }

  _updateSize() {
    this.camera.aspect =
      this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();
  }

  _render(delta) {
    this.scene.children[2].rotation.y -= delta * 0.25;

    if (this.mixer) {
      this.mixer.update(delta);
    }
  }
}

import * as THREE from 'three';

export default class GGScene {
  constructor(selector, file) {
    this.container = document.getElementById(selector);
    this.file = file;
    this.loaded = false;
    this.playing = false;

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    this.container.appendChild(this.renderer.domElement);

    this.clock = new THREE.Clock();

    this.objectLoader = new THREE.ObjectLoader();
    this.jsonLoader = new THREE.JSONLoader();
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      40,
      this.container.clientWidth / this.container.clientHeight,
      0.1,
      1000,
    );
    this.camera.position.set(0, 0.5, 8);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffaa00, 1);
    this.scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(2, 1.75, 1);
    this.scene.add(dirLight);

    window.addEventListener('resize', () => this._updateSize(), false);
    this._updateSize();

    this._animate = () => {
      window.requestAnimationFrame(this._animate);
      this._render();
    };

    this._animate();
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
      this.model = new THREE.SkinnedMesh(
        geometry,
        new THREE.MeshFaceMaterial(materials),
      );
      this.model.receiveShadow = true;

      this.mixer = new THREE.AnimationMixer(this.model);
      const action = this.mixer.clipAction(geometry.animations[0]);
      action.enabled = true;

      this.scene.add(this.model);
      action.play();

      this.model.rotation.y = 0.25;

      this.loaded = true;
    });
  }

  _updateSize() {
    this.renderer.setSize(
      this.container.clientWidth,
      this.container.clientHeight,
    );

    this.camera.aspect = this.container.clientWidth / this.container.clientHeight;

    this.camera.updateProjectionMatrix();
  }

  _render() {
    const delta = this.clock.getDelta();

    if (this.mixer) {
      this.mixer.update(delta);
    }

    if (this.playing) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  play() {
    this.playing = true;
  }

  stop() {
    this.playing = false;
  }
}

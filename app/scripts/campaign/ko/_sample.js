import * as THREE from 'three';

export default class KOObject {
  constructor(selector) {
    this.selector = selector;

    this.textureLoader = new THREE.TextureLoader();
    this.objectLoader = new THREE.ObjectLoader();
    this.loader = new THREE.JSONLoader();

    this.action = {};

    this.activeActionName = 'idle';
    this.arrAnimations = ['idle'];
    this.actualAnimation = 0;
    this.height = () => 500;

    this._animate = () => {
      window.requestAnimationFrame(this._animate);
      this._render();
    };

    this._init();
    this._load();
  }

  _fadeAction(name) {
    const from = this.action[this.activeActionName].play();
    const to = this.action[name].play();

    from.enabled = true;
    to.enabled = true;

    if (to.loop === THREE.LoopOnce) {
      to.reset();
    }

    from.crossFadeTo(to, 0.3);
    this.activeActionName = name;
  }

  _onWindowResize() {
    this.camera.aspect = window.innerWidth / this.height();
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, this.height());
  }

  _onDoubleClick() {
    const now = new Date().getTime();
    const timesince = now - this.mylatesttap;
    if (timesince < 600 && timesince > 0) {
      if (this.actualAnimation === this.arrAnimations.length - 1) {
        this.actualAnimation = 0;
      } else {
        this.actualAnimation += 1;
      }
      this._fadeAction(this.arrAnimations[this.actualAnimation]);
    } else {
      // too much time to be a doubletap
    }

    this.mylatesttap = new Date().getTime();
  }

  _render() {
    const delta = this.clock.getDelta();
    this.mixer.update(delta);

    this.scene.children[2].rotation.y = Date.now() * 0.00025;

    this.renderer.render(this.scene, this.camera);
  }

  _init() {
    this.clock = new THREE.Clock();
    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, this.height());

    this.container = document.getElementById(this.selector);
    this.container.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / this.height(),
      0.1,
      1000,
    );
    this.camera.position.set(0, 0, 10);
    this.listener = new THREE.AudioListener();
    this.camera.add(this.listener);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffaa00, 1);
    this.scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(2, 1.75, 1);
    this.scene.add(dirLight);
  }

  _load() {
    this.textureLoader.load(
      '/images/content/campaign/knizna-odysea/textures/ground.png',
      texture => {
        const geometry = new THREE.PlaneBufferGeometry(15, 15);
        geometry.translate(0, 0, -2);
        geometry.rotateX(-Math.PI / 2);
        const material = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
        });
        this.ground = new THREE.Mesh(geometry, material);
        this.ground.receiveShadow = true;
        // this.scene.add(this.ground);
      },
    );

    this.loader.load(
      '/images/content/campaign/knizna-odysea/models/Knihonaut-animated.json',
      (geometry, materials) => {
        materials.forEach(material => {
          material.skinning = true;
        });
        this.character = new THREE.SkinnedMesh(
          geometry,
          new THREE.MeshFaceMaterial(materials),
        );
        // character.receiveShadow = true;

        this.mixer = new THREE.AnimationMixer(this.character);

        this.action.idle = this.mixer.clipAction(geometry.animations[0]);
        // action.run = mixer.clipAction(geometry.animations[ 1 ]);

        this.action.idle.setEffectiveWeight(1);
        // action.run.setEffectiveWeight(1);

        // action.hello.setLoop(THREE.LoopOnce, 0);
        // action.hello.clampWhenFinished = true;

        this.action.idle.enabled = true;
        // action.run.enabled = true;

        this.scene.add(this.character);

        window.addEventListener('resize', this._onWindowResize, false);
        window.addEventListener('click', this._onDoubleClick, false);
        // console.log('Double click to change animation');
        this._animate();

        this.action.idle.play();
      },
    );

    // this.objectLoader.load(
    //   '/images/content/campaign/knizna-odysea/models/planet.json',
    //   obj => {
    //     console.log(obj);
    //     obj.scale.set(2, 2, 2);
    //     obj.rotateY(Math.PI / 2);
    //
    //     this.mixer = new THREE.AnimationMixer(obj);
    //
    //     this.action.idle = this.mixer.clipAction(obj.animations[0]);
    //     console.log(this.action.idle);
    //     this.action.idle.setEffectiveWeight(1);
    //     this.action.idle.enabled = true;
    //
    //     this.scene.add(obj);
    //
    //     console.log(this.scene);
    //
    //     this._animate();
    //
    //     this.action.idle.play();
    //   },
    // );
  }
}

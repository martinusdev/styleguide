import * as THREE from 'three';
// import OrbitControls from 'orbit-controls-es6';

let clock;
let container;
let camera;
let scene;
let renderer;
// let controls;
let listener;

let ground;
let character;

const textureLoader = new THREE.TextureLoader();
const loader = new THREE.JSONLoader();

const action = {};
let mixer;

let activeActionName = 'idle';

let hemiLight;
let dirLight;

const arrAnimations = ['idle'];
let actualAnimation = 0;

let mylatesttap;

const height = () => 500;

function fadeAction(name) {
  const from = action[activeActionName].play();
  const to = action[name].play();

  from.enabled = true;
  to.enabled = true;

  if (to.loop === THREE.LoopOnce) {
    to.reset();
  }

  from.crossFadeTo(to, 0.3);
  activeActionName = name;
}

function onWindowResize() {
  camera.aspect = window.innerWidth / height();
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, height());
}

function onDoubleClick() {
  const now = new Date().getTime();
  const timesince = now - mylatesttap;
  if (timesince < 600 && timesince > 0) {
    if (actualAnimation === arrAnimations.length - 1) {
      actualAnimation = 0;
    } else {
      actualAnimation += 1;
    }
    fadeAction(arrAnimations[actualAnimation]);
  } else {
    // too much time to be a doubletap
  }

  mylatesttap = new Date().getTime();
}

function render() {
  const delta = clock.getDelta();
  mixer.update(delta);
  renderer.render(scene, camera);
}

function animate() {
  requestAnimationFrame(animate);
  // controls.update();
  render();
}

function init() {
  clock = new THREE.Clock();

  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, height());

  container = document.getElementById('container');
  container.appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(
    80,
    window.innerWidth / height(),
    0.1,
    1000,
  );
  camera.position.set(0, 2.4, 5);
  listener = new THREE.AudioListener();
  camera.add(listener);

  // controls = new OrbitControls(camera, renderer.domElement);
  // controls.target = new THREE.Vector3(0, 0.6, 0);

  hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
  hemiLight.color.setHSL(0.6, 1, 0.6);
  hemiLight.groundColor.setHSL(0.095, 1, 0.75);
  hemiLight.position.set(0, 50, 0);
  scene.add(hemiLight);

  dirLight = new THREE.DirectionalLight(0xffffff, 2);
  dirLight.color.setHSL(0.1, 1, 0.95);
  dirLight.position.set(-1, 1.75, 1);
  dirLight.position.multiplyScalar(30);
  scene.add(dirLight);

  dirLight.castShadow = true;
  dirLight.shadow.mapSize.width = 2048;
  dirLight.shadow.mapSize.height = 2048;
  const d = 50;
  dirLight.shadow.camera.left = -d;
  dirLight.shadow.camera.right = d;
  dirLight.shadow.camera.top = d;
  dirLight.shadow.camera.bottom = -d;
  dirLight.shadow.camera.far = 3500;
  dirLight.shadow.bias = -0.0001;

  textureLoader.load(
    '/images/content/campaign/knizna-odysea/textures/ground.png',
    texture => {
      const geometry = new THREE.PlaneBufferGeometry(15, 15);
      geometry.translate(0, 0, -2);
      geometry.rotateX(-Math.PI / 2);
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
      });
      ground = new THREE.Mesh(geometry, material);
      ground.receiveShadow = true;
      scene.add(ground);
    },
  );

  loader.load(
    '/images/content/campaign/knizna-odysea/models/Knihonaut-animated.json',
    (geometry, materials) => {
      materials.forEach(material => {
        material.skinning = true;
      });
      character = new THREE.SkinnedMesh(
        geometry,
        new THREE.MeshFaceMaterial(materials),
      );
      // character.receiveShadow = true;

      mixer = new THREE.AnimationMixer(character);

      action.idle = mixer.clipAction(geometry.animations[0]);
      // action.run = mixer.clipAction(geometry.animations[ 1 ]);

      action.idle.setEffectiveWeight(1);
      // action.run.setEffectiveWeight(1);

      // action.hello.setLoop(THREE.LoopOnce, 0);
      // action.hello.clampWhenFinished = true;

      action.idle.enabled = true;
      // action.run.enabled = true;

      scene.add(character);

      window.addEventListener('resize', onWindowResize, false);
      window.addEventListener('click', onDoubleClick, false);
      // console.log('Double click to change animation');
      animate();

      action.idle.play();
    },
  );
}

init();

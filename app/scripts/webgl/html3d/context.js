import * as THREE from 'three';

export default class GGContext {
  constructor(selector) {
    this.canvas = document.getElementById(selector);
    this.scenes = [];

    this.canvasHeight = this.canvas.clientHeight;

    this.clock = new THREE.Clock();

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
    });
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    this._animate = () => {
      window.requestAnimationFrame(this._animate);
      this._render();
    };

    window.addEventListener('resize', () => this._updateSize(), false);
    this._updateSize();

    this._animate();
  }

  addScene(scene) {
    this.scenes.push(scene);
  }

  _updateSize() {
    if (window.innerWidth < 768) {
      this.canvas.style.height = '100%';
      this.canvas.style.position = 'fixed';
    } else {
      this.canvas.style.height = `${this.canvasHeight}px`;
      this.canvas.style.position = 'absolute';
    }

    const width = this.canvas.clientWidth;
    const height = this.canvas.clientHeight;

    if (this.canvas.width !== width || this.canvas.height !== height) {
      this.renderer.setSize(width, height, false);
    }

    this.scenes.forEach(scene => {
      scene._updateSize();
    });
  }

  _render() {
    const delta = this.clock.getDelta();

    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setScissorTest(false);
    this.renderer.clear();
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setScissorTest(true);

    this.scenes.forEach(scene => {
      if (!scene.loaded) {
        return;
      }

      const { container } = scene;

      const rect = container.getBoundingClientRect();

      if (
        rect.bottom < 0
        || rect.top > this.canvas.clientHeight
        || rect.right < 0
        || rect.left > this.canvas.clientWidth
      ) {
        return;
      }

      const width = rect.right - rect.left;
      const height = rect.bottom - rect.top;
      const { left } = rect;
      const top = rect.top - this.canvas.getBoundingClientRect().y;

      this.renderer.setViewport(left, top, width, height);
      this.renderer.setScissor(left, top, width, height);

      scene._render(delta);

      this.renderer.render(scene.scene, scene.camera);
    });
  }
}

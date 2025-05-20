import { TOGGLE_EVT, doToggle } from './Toggle';

const defaultConfig = {};

export default class AudioPlayer {
  constructor(selector = 'data-audioplayer', config = {}) {
    this.selector = selector;
    this.config = { ...defaultConfig, ...config };
    this.players = [];
    this._init();
  }

  _init = () => {
    this.players = [...document.querySelectorAll(`[${this.selector}]`)];
    this.players.forEach(player => {
      player.addEventListener(TOGGLE_EVT, this._onToggle);
      player.addEventListener('ended', this._onEnd);
    });
    return this.players;
  }

  _onToggle = (e) => {
    const player = e.detail.target;
    if (player.paused) {
      player.play();
    } else {
      player.pause();
      player.currentTime = 0;
    }
  }

  _onEnd = (e) => {
    const target = e.target.parentNode.querySelector('button');
    if (target) {
      doToggle({
        target,
        icon: target.getAttribute('data-toggle-icon'),
        text: target.getAttribute('data-toggle-text'),
        dispatchEvent: false,
      });
    }
  }
  
  update = () => {
    this.destroy();
    this._init();
  }

  destroy = () => {
    this.players.forEach(player => {
      player.removeEventListener(TOGGLE_EVT, this._onToggle);
      player.removeEventListener('ended', this._onEnd);
    });
    this.players = [];
  }
}

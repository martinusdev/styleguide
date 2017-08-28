import { TOGGLE_EVT } from './Toggle';

const defaultConfig = {};

export default class AudioPlayer {
  constructor(selector = 'data-audioplayer', config) {
    this.selector = selector;
    this.config = { ...defaultConfig, ...config };

    this.players = [];

    this._onToggle = this._onToggle.bind(this);
    this._init();

    return this;
  }

  _init() {
    this.players.push.apply(
      this.players,
      document.querySelectorAll(`[${this.selector}]`),
    );
    for (let i = 0, l = this.players.length; i < l; i++) {
      this.players[i].addEventListener(TOGGLE_EVT, this._onToggle);
    }
    return this.players;
  }

  _onToggle(e) { //eslint-disable-line
    const player = e.detail.target;
    if (player.paused) {
      player.play();
    } else {
      player.pause();
      player.currentTime = 0;
    }
  }
}

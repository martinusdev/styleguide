import { TOGGLE_EVT, doToggle } from './Toggle';

const defaultConfig = {};

export default class AudioPlayer {
  constructor(selector = 'data-audioplayer', config = {}) {
    this.selector = selector;
    this.config = { ...defaultConfig, ...config };

    this.players = [];

    this._onToggle = this._onToggle.bind(this);
    this._onEnd = this._onEnd.bind(this);

    this._init();
  }

  _init() {
    this.players.push.apply(
      this.players,
      document.querySelectorAll(`[${this.selector}]`),
    );
    for (let i = 0, l = this.players.length; i < l; i++) {
      this.players[i].addEventListener(TOGGLE_EVT, this._onToggle);

      this.players[i].addEventListener('ended', this._onEnd);
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

  _onEnd(e) { //eslint-disable-line
    const target = e.target.parentNode.querySelector('button');
    doToggle({
      target,
      icon: target.getAttribute('data-toggle-icon'),
      text: target.getAttribute('data-toggle-text'),
      dispatchEvent: false,
    });
  }
}

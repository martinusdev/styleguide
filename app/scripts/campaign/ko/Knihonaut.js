import GGScene from '../../webgl/3d/scene';

const templateContainer = () => `
  <div class="ko-knihonaut" id="knihonaut">
    <div class="bar">
      <div class="bar__item">
        <div class="ko-knihonaut__scene" id="knihonaut-scene"></div>
      </div>
      <div class="bar__item bar__item--fill">
        <div class="card card--arrowhead card--arrowhead-left">
          <div class="card__content" id="knihonaut-content"></div>
        </div>
      </div>
    </div>
  </div>
`;

const templateContent = data => `
  <div class="bar">
    <div class="bar__item bar__item--fill">
      <h3 class="h3 mb-none">${data.title}</h3>
    </div>
    <div class="bar__item bar__item--shrinkable">
      <div class="btn btn--small clickable btn--clean" id="knihonaut-close">
          ${data.icon}
      </div>
    </div>
  </div>
  ${data.content}
`;

export default class Knihonaut {
  constructor(container) {
    document.getElementById(container).innerHTML += templateContainer();
    this.object = document.getElementById('knihonaut');

    this.content = document.getElementById('knihonaut-content');
    this.scene = new GGScene(
      'knihonaut-scene',
      '//mrtns.eu/assets/martinus/campaign/knizna-odysea/models/Knihonaut-animated.json',
    );
    this.scene.loadModel();
  }

  show(content = {}) {
    this.content.innerHTML = templateContent(content);

    this.scene.play();
    this.object.classList.add('ko-knihonaut--active');

    document.getElementById('knihonaut-close').addEventListener('click', () => {
      this.hide();
    });
  }

  hide() {
    this.scene.stop();
    this.object.classList.remove('ko-knihonaut--active');
  }
}

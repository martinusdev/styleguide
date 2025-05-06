import Tooltip from './Tooltip';

const defaultConfig = {
  arrow: true,
  interactive: true,
  allowHTML: true,
  appendTo: 'parent',
  delay: 500,
  theme: 'success',
  showOnCreate: true,
  hideOnClick: false,
  trigger: 'manual',
  placement: 'top',
  zIndex: 999,
  onShow(instance) {
    if (window.matchMedia('(max-width: 768px)').matches) {
      instance.setProps({ placement: 'bottom' }); // Change to bottom on mobile
    }
  },
  // Custom handler for adding a close button
  onMount(instance) {
    const box = instance.popper.querySelector('.tippy-content');

    // Only add close button if not already present
    if (!box.querySelector('.feature-highlight-close')) {
      // Create close button
      const closeButton = document.createElement('button');
      closeButton.className = 'feature-highlight-close link link--white ml-small';
      closeButton.innerHTML = '<i class="far fa-xmark fa-lg"></i>';

      // Add event listener to close button
      closeButton.addEventListener('click', () => {
        instance.hide();

        // Optionally, remember that this highlight was dismissed
        const reference = instance.reference;
        if (reference && reference.dataset.featureHighlight) {
          localStorage.setItem(`feature-highlight-${reference.dataset.featureHighlight}-dismissed`, 'true');
        }
      });

      // Append close button to tooltip content
      box.appendChild(closeButton);
    }
  },
}

export default class FeatureHighlight extends Tooltip {
  constructor(selector = '[data-feature-highlight]') {
    super(selector, defaultConfig);
  }
}

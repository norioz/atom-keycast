'use babel';

export default class KeycastView {
  constructor(serializedState) {
    this.element = document.createElement('div');
    this.element.classList.add('keycast-view');
    const message = document.createElement('div');
    message.textContent = 'Keycasting...';
    message.classList.add('message');
    this.element.appendChild(message);
  }

  serialize() {}

  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

  setCount(count) {
    let displayText = `There are ${count} words.`;
    this.element.children[0].textContent = displayText;
  }
}

class BaseComponent {
  constructor() {
    this.htmlElem = null;
  }

  clean() {
    if (this.htmlElem) this.htmlElem.remove();
  }
}

export default BaseComponent;

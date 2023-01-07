class BaseComponent {
  constructor(parent) {
    this.htmlElem = null;
    this.parent = parent;
  }

  clean() {
    if (this.htmlElem) this.htmlElem.remove();
  }
}

export default BaseComponent;

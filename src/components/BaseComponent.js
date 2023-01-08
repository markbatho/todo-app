class BaseComponent {
  constructor(parent) {
    this.htmlElem = null;
    this.parent = parent;
  }

  update() {}

  clean() {
    if (this.htmlElem) this.htmlElem.remove();
  }

  render() {}
}

export default BaseComponent;

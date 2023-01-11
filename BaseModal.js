import BaseComponent from "./src/components/BaseComponent";

class BaseModal extends BaseComponent {
  constructor(parent) {
    super(parent);
  }

  close() {
    this.htmlElem.remove();
    delete this;
  }
}

export default BaseModal;

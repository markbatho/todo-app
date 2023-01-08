import BaseComponent from "./BaseComponent";

class CollectionListItem extends BaseComponent {
  constructor(parent, display, icon) {
    super(parent);
    this.display = display;
    this.icon = icon;
    this.render();
  }

  render() {
    super.clean();
    const collectionListItem = document.createElement("li");
    const icon = document.createElement("div");
    const display = document.createElement("a");

    icon.classList.add("project-list-icon");
    icon.innerHTML = this.icon;

    display.textContent = this.display;

    collectionListItem.appendChild(icon);
    collectionListItem.appendChild(display);
    this.htmlElem = collectionListItem;
    this.parent.appendChild(collectionListItem);
  }
}

export default CollectionListItem;

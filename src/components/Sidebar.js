import BaseComponent from "./BaseComponent";
import projectIcon from "../icons/project.svg";
import "../styles/sidebar.css";

class SidebarListItem extends BaseComponent {
  constructor(parent, display) {
    super(parent);
    this.display = display;

    this.render();
  }

  render() {
    super.clean();

    const sidebarListItem = document.createElement("li");
    const icon = document.createElement("div");
    const display = document.createElement("a");

    icon.classList.add("project-list-icon");
    icon.innerHTML = projectIcon;

    display.textContent = this.display;

    sidebarListItem.appendChild(icon);
    sidebarListItem.appendChild(display);
    this.htmlElem = sidebarListItem;
    this.parent.appendChild(sidebarListItem);
  }
}

class Sidebar extends BaseComponent {
  constructor(parent, eventManager, projectManager) {
    super(parent);
    this.eventManager = eventManager;
    this.projectManager = projectManager;
    this.list = [];
    this.activeListItem = null;

    this.render();
  }

  render() {
    super.clean();

    const sidebar = document.createElement("aside");
    const brand = document.createElement("div");
    const brandLink = document.createElement("a");

    brandLink.textContent = "Todo App";
    brand.classList.add("brand");
    brand.appendChild(brandLink);

    const projectList = document.createElement("ul");
    projectList.classList.add("project-list");

    const projects = this.projectManager.findAll();

    projects.forEach((project) => {
      const projectListItem = new SidebarListItem(projectList, project.name);
      projectListItem.htmlElem.onclick = () => {
        if (this.activeListItem) this.activeListItem.classList.remove("active");
        this.activeListItem = projectListItem.htmlElem;
        this.activeListItem.classList.add("active");
        this.eventManager.emit("project", { activeProject: project });
      };
    });

    sidebar.appendChild(brand);
    sidebar.appendChild(projectList);
    this.htmlElem = sidebar;
    this.parent.appendChild(sidebar);
  }
}

export default Sidebar;

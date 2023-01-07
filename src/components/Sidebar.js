import BaseComponent from "../../components/BaseComponent";
import projectIcon from "../icons/project.svg";

class SidebarListItem extends BaseComponent {
  constructor(display) {
    super();
    this.display = display;
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
    return sidebarListItem;
  }
}

class Sidebar extends BaseComponent {
  constructor(eventManager, projectManager) {
    super();
    this.eventManager = eventManager;
    this.projectManager = projectManager;
    this.list = [];
    this.activeListItem = null;
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
      const projectListItem = new SidebarListItem(project.name).render();

      projectListItem.onclick = () => {
        if (this.activeListItem) this.activeListItem.classList.remove("active");
        this.activeListItem = projectListItem;
        this.activeListItem.classList.add("active");
        this.eventManager.emit("project", { activeProject: project });
      };

      projectList.appendChild(projectListItem);
    });

    sidebar.appendChild(brand);
    sidebar.appendChild(projectList);
    this.htmlElem = sidebar;
    return sidebar;
  }
}

export default Sidebar;

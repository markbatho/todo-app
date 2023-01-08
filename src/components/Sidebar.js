import "../styles/sidebar.css";
import projectIcon from "../icons/project.svg";
import allIcon from "../icons/inbox.svg";
import todayIcon from "../icons/today.svg";
import weekIcon from "../icons/week.svg";
import impIcon from "../icons/star.svg";
import BaseComponent from "./BaseComponent";
import createProjectIcon from "../icons/plus.svg";
import CreateProjectModal from "./CreateProjectModal";

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
    this.parent.prepend(sidebarListItem);
  }
}

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

class Sidebar extends BaseComponent {
  constructor(parent, eventManager, projectManager) {
    super(parent);
    this.eventManager = eventManager;
    this.projectManager = projectManager;
    this.list = [];
    this.activeListItem = null;
    this.isModalOpen = false;
    this.render();
  }

  closeModal(modal) {
    modal.remove();
    this.isModalOpen = false;
  }

  setActiveItem(item) {
    if (this.activeListItem) this.activeListItem.classList.remove("active");
    this.activeListItem = item;
    this.activeListItem.classList.add("active");
  }

  update(data) {
    this.render();

    if (data.projectName) {
      const newActiveItem = this.list.reduce((prev, curr) => {
        return curr.innerText === data.projectName ? curr : prev;
      });
      this.setActiveItem(newActiveItem);
      console.log(newActiveItem.innerText);
    }
  }

  render() {
    super.clean();
    const sidebar = document.createElement("aside");
    const brand = document.createElement("div");
    const brandLink = document.createElement("a");

    brandLink.textContent = "Todo App";
    brand.classList.add("brand");
    brand.appendChild(brandLink);

    const collectionList = document.createElement("ul");
    const listAll = new CollectionListItem(collectionList, "All", allIcon);
    const listToday = new CollectionListItem(
      collectionList,
      "Today",
      todayIcon
    );
    const listWeek = new CollectionListItem(collectionList, "Week", weekIcon);
    const listImportant = new CollectionListItem(
      collectionList,
      "Important",
      impIcon
    );

    listAll.htmlElem.onclick = () => {
      this.setActiveItem(listAll.htmlElem);
      this.eventManager.emit("collection", { activeCollection: "All" });
    };

    listToday.htmlElem.onclick = () => {
      this.setActiveItem(listToday.htmlElem);
      this.eventManager.emit("collection", { activeCollection: "Today" });
    };

    listWeek.htmlElem.onclick = () => {
      this.setActiveItem(listWeek.htmlElem);
      this.eventManager.emit("collection", { activeCollection: "Week" });
    };

    listImportant.htmlElem.onclick = () => {
      this.setActiveItem(listImportant.htmlElem);
      this.eventManager.emit("collection", { activeCollection: "Important" });
    };

    const projectHeader = document.createElement("div");
    const projectHeaderTitle = document.createElement("h3");
    const createProjectBtn = document.createElement("button");

    projectHeaderTitle.textContent = "Projects";
    createProjectBtn.innerHTML = createProjectIcon;

    createProjectBtn.onclick = () => {
      console.log(this.isModalOpen);
      if (!this.isModalOpen) {
        this.isModalOpen = true;
        new CreateProjectModal(
          document.body,
          this.eventManager,
          this.projectManager,
          this.closeModal,
          this
        );
      }
    };

    projectHeader.classList.add("project-header");
    projectHeader.appendChild(projectHeaderTitle);
    projectHeader.appendChild(createProjectBtn);

    const projectList = document.createElement("ul");
    projectList.classList.add("project-list");

    const projects = this.projectManager.findAll();

    projects.forEach((project) => {
      const projectListItem = new SidebarListItem(projectList, project.name);
      this.list.push(projectListItem.htmlElem);
      projectListItem.htmlElem.onclick = () => {
        this.setActiveItem(projectListItem.htmlElem);
        this.eventManager.emit("project", { activeProject: project });
      };
    });

    sidebar.appendChild(brand);
    sidebar.appendChild(collectionList);
    sidebar.appendChild(projectHeader);
    sidebar.appendChild(projectList);
    this.htmlElem = sidebar;
    this.parent.appendChild(sidebar);
  }
}

export default Sidebar;

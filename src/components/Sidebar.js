import "../styles/sidebar.css";
import allIcon from "../icons/inbox.svg";
import todayIcon from "../icons/today.svg";
import weekIcon from "../icons/week.svg";
import impIcon from "../icons/star.svg";
import BaseComponent from "./BaseComponent";
import createProjectIcon from "../icons/plus.svg";
import CreateProjectModal from "./CreateProjectModal";
import CollectionListItem from "./CollectionListItem";
import SidebarListItem from "./SidebarListItem";

class Sidebar extends BaseComponent {
  constructor(parent, eventManager, projectManager) {
    super(parent);
    this.eventManager = eventManager;
    this.projectManager = projectManager;
    this.list = [];
    this.activeListItem = null;
    this.render();
  }

  setActiveItem(item) {
    if (this.activeListItem) this.activeListItem.classList.remove("active");
    this.activeListItem = item;
    this.activeListItem.classList.add("active");
  }

  update(data) {
    this.render();
    if (data && data.projectName) {
      const newActiveItem = this.list.reduce((prev, curr) => {
        return curr.innerText === data.projectName ? curr : prev;
      });
      this.setActiveItem(newActiveItem);
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

    // Default active item
    this.setActiveItem(listAll.htmlElem);

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
      new CreateProjectModal(
        document.body,
        this.eventManager,
        this.projectManager,
        this.closeModal
      );
    };

    projectHeader.classList.add("project-header");
    projectHeader.appendChild(projectHeaderTitle);
    projectHeader.appendChild(createProjectBtn);

    const projectList = document.createElement("ul");
    projectList.classList.add("project-list");

    const projects = this.projectManager.findAll();

    projects.forEach((project) => {
      const projectListItem = new SidebarListItem(
        projectList,
        project,
        this.eventManager,
        this.projectManager
      );
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

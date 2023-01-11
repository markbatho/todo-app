import projectIcon from "../icons/project.svg";
import deleteIcon from "../icons/delete.svg";
import editIcon from "../icons/edit-project.svg";
import BaseComponent from "./BaseComponent";
import DeleteProjectModal from "./DeleteProjectModal";
import EditProjectModal from "./EditProjectModal";

class SidebarListItem extends BaseComponent {
  constructor(parent, project, eventManager, projectManager) {
    super(parent);
    this.project = project;
    this.eventManager = eventManager;
    this.projectManager = projectManager;
    this.render();
  }

  render() {
    super.clean();
    const sidebarListItem = document.createElement("li");
    const name = document.createElement("div");
    const icon = document.createElement("div");
    const display = document.createElement("a");
    const actions = document.createElement("div");
    const editBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");

    icon.classList.add("project-list-icon");
    icon.innerHTML = projectIcon;

    editBtn.innerHTML = editIcon;
    editBtn.onclick = () => {
      new EditProjectModal(
        document.body,
        this.project,
        this.eventManager,
        this.projectManager
      );
    };

    deleteBtn.onclick = () => {
      new DeleteProjectModal(
        document.body,
        this.project,
        this.eventManager,
        this.projectManager
      );
    };

    deleteBtn.innerHTML = deleteIcon;

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    display.textContent = this.project.name;

    name.appendChild(icon);
    name.appendChild(display);
    sidebarListItem.appendChild(name);
    sidebarListItem.appendChild(actions);
    this.htmlElem = sidebarListItem;
    this.parent.prepend(sidebarListItem);
  }
}

export default SidebarListItem;

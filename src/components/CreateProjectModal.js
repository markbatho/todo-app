import BaseModal from "../../BaseModal";
import Form from "./form/Form";
import { Project } from "../Project";

class CreateProjectModal extends BaseModal {
  constructor(parent, eventManager, projectManager) {
    super(parent);
    this.eventManager = eventManager;
    this.projectManager = projectManager;
    this.render();
  }

  render() {
    super.clean();
    const modal = document.createElement("div");
    const cancel = document.createElement("button");

    cancel.textContent = "Cancel";

    const form = new Form(modal, "Create new project", [
      {
        title: "Project name",
        id: "projectName",
        name: "projectName",
        type: "text",
        value: null,
      },
    ]);

    form.htmlElem.onsubmit = (e) => {
      e.preventDefault();
      const project = new Project(form.data.projectName);
      this.projectManager.create(project);
      this.eventManager.emit("project", { activeProject: project });
      this.eventManager.emit("create-project", { projectName: project.name });
      super.close();
    };

    cancel.onclick = () => {
      super.close();
    };

    modal.appendChild(cancel);
    modal.classList.add("modal");
    this.htmlElem = modal;
    this.parent.appendChild(modal);
  }
}

export default CreateProjectModal;

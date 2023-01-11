import BaseModal from "../../BaseModal";
import { Project } from "../Project";
import Form from "./form/Form";

class EditProjectModal extends BaseModal {
  constructor(parent, project, eventManager, projectManager) {
    super(parent);
    this.project = project;
    this.eventManager = eventManager;
    this.projectManager = projectManager;
    this.render();
  }

  render() {
    super.clean();
    const modal = document.createElement("div");
    const form = new Form(modal, this, "Edit project", [
      {
        title: "Project name",
        id: "projectName",
        name: "projectName",
        type: "text",
        value: this.project.name,
      },
    ]);

    form.htmlElem.onsubmit = (e) => {
      e.preventDefault();
      const project = new Project(form.data.projectName);
      this.projectManager.update(
        { property: "name", value: this.project.name },
        project
      );

      super.close();
      this.eventManager.emit("project", { activeProject: project });
      this.eventManager.emit("create-project", { projectName: project.name });
    };

    modal.classList.add("modal");
    this.htmlElem = modal;
    this.parent.appendChild(modal);
  }
}

export default EditProjectModal;

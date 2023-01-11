import BaseModal from "../../BaseModal";
import Form from "./form/Form";

class DeleteProjectModal extends BaseModal {
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
    const form = new Form(modal, this, "Are you sure to delete project?", []);

    form.htmlElem.onsubmit = (e) => {
      e.preventDefault();
      this.projectManager.remove({
        property: "name",
        value: this.project.name,
      });
      super.close();
      this.eventManager.emit("delete-project", null);
    };

    modal.classList.add("modal");
    this.htmlElem = modal;
    this.parent.appendChild(modal);
  }
}

export default DeleteProjectModal;

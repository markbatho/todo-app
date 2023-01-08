import BaseComponent from "./BaseComponent";

class DeleteProjectModal extends BaseComponent {
  constructor(
    parent,
    project,
    eventManager,
    projectManager,
    closeModal,
    caller
  ) {
    super(parent);
    this.project = project;
    this.eventManager = eventManager;
    this.projectManager = projectManager;
    this.closeModal = closeModal;
    this.caller = caller;
    this.projectName = "";
    this.render();
  }

  submitForm(e) {
    e.preventDefault();
    // Delete
    this.projectManager.remove({ property: "name", value: this.project.name });
    this.closeModal.call(this.caller, this.htmlElem);
    // this.eventManager.emit("project", { activeProject: project });
    // this.eventManager.emit("create-project", { projectName: project.name });
    this.eventManager.emit("delete-project", null);
  }

  update() {}

  render() {
    super.clean();
    const editProjectModal = document.createElement("div");
    const editProjectForm = document.createElement("form");
    const submit = document.createElement("button");
    const cancel = document.createElement("button");

    submit.textContent = "Confirm";
    cancel.textContent = "Cancel";
    cancel.type = "button";
    cancel.onclick = () => {
      this.closeModal.call(this.caller, editProjectModal);
    };

    editProjectForm.appendChild(submit);
    editProjectForm.appendChild(cancel);
    editProjectForm.onsubmit = (e) => this.submitForm(e);

    editProjectModal.classList.add("modal");
    editProjectModal.appendChild(editProjectForm);
    this.htmlElem = editProjectModal;
    this.parent.appendChild(editProjectModal);
  }
}

export default DeleteProjectModal;

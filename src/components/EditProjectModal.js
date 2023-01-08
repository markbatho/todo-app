import { Project } from "../Project";
import BaseComponent from "./BaseComponent";

class EditProjectModal extends BaseComponent {
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
    const project = new Project(this.projectName);
    this.projectManager.update(
      { property: "name", value: this.project.name },
      project
    );
    this.closeModal.call(this.caller, this.htmlElem);
    this.eventManager.emit("project", { activeProject: project });
    this.eventManager.emit("create-project", { projectName: project.name });
  }

  update() {}

  render() {
    super.clean();
    const editProjectModal = document.createElement("div");
    const editProjectForm = document.createElement("form");
    const projectNameLabel = document.createElement("label");
    const projectNameInput = document.createElement("input");
    const submit = document.createElement("button");
    const cancel = document.createElement("button");

    projectNameLabel.textContent = "Project name";
    projectNameLabel.htmlFor = "project-name-input";

    projectNameInput.value = this.project.name;
    projectNameInput.id = "project-name-input";
    projectNameInput.name = "project-name-input";
    projectNameInput.onchange = () => {
      this.projectName = projectNameInput.value;
    };

    submit.textContent = "Confirm";
    cancel.textContent = "Cancel";
    cancel.type = "button";
    cancel.onclick = () => {
      this.closeModal.call(this.caller, editProjectModal);
    };

    editProjectForm.appendChild(projectNameLabel);
    editProjectForm.appendChild(projectNameInput);
    editProjectForm.appendChild(submit);
    editProjectForm.appendChild(cancel);
    editProjectForm.onsubmit = (e) => this.submitForm(e);

    editProjectModal.classList.add("modal");
    editProjectModal.appendChild(editProjectForm);
    this.htmlElem = editProjectModal;
    this.parent.appendChild(editProjectModal);
  }
}

export default EditProjectModal;

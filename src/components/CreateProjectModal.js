import { Project } from "../Project";
import BaseComponent from "./BaseComponent";

class CreateProjectModal extends BaseComponent {
  constructor(parent, eventManager, projectManager, closeModal, caller) {
    super(parent);
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
    this.projectManager.create(project);
    this.closeModal.call(this.caller, this.htmlElem);
    this.eventManager.emit("project", { activeProject: project });
    this.eventManager.emit("create-project", { projectName: project.name });
  }

  update() {}

  render() {
    super.clean();
    const createProjectModal = document.createElement("div");
    const createProjectForm = document.createElement("form");
    const projectNameLabel = document.createElement("label");
    const projectNameInput = document.createElement("input");
    const submit = document.createElement("button");
    const cancel = document.createElement("button");

    projectNameLabel.textContent = "Project name";
    projectNameLabel.htmlFor = "project-name-input";

    projectNameInput.id = "project-name-input";
    projectNameInput.name = "project-name-input";
    projectNameInput.onchange = () => {
      this.projectName = projectNameInput.value;
    };

    submit.textContent = "Create Project";
    cancel.textContent = "Cancel";
    cancel.type = "button";
    cancel.onclick = () => {
      this.closeModal.call(this.caller, createProjectModal);
    };

    createProjectForm.appendChild(projectNameLabel);
    createProjectForm.appendChild(projectNameInput);
    createProjectForm.appendChild(submit);
    createProjectForm.appendChild(cancel);
    createProjectForm.onsubmit = (e) => this.submitForm(e);

    createProjectModal.classList.add("modal");
    createProjectModal.appendChild(createProjectForm);
    this.htmlElem = createProjectModal;
    this.parent.appendChild(createProjectModal);
  }
}

export default CreateProjectModal;

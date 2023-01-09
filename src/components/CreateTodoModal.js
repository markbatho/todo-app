import { Todo, todoPriorities } from "../Todo";
import BaseComponent from "./BaseComponent";

class CreateTodoModal extends BaseComponent {
  constructor(parent, project, eventManager, todoManager, closeModal, caller) {
    super(parent);
    this.project = project;
    this.eventManager = eventManager;
    this.todoManager = todoManager;
    this.closeModal = closeModal;
    this.caller = caller;
    this.title = "";
    this.desc = "";
    this.dueDate = null;
    this.priority = null;
    this.render();
  }

  submitForm(e) {
    e.preventDefault();
    const todo = new Todo(
      this.title,
      this.desc,
      new Date(this.dueDate),
      this.priority,
      this.project
    );
    this.todoManager.create(todo);
    this.closeModal.call(this.caller, this.htmlElem);
    this.eventManager.emit("project", null);
  }

  update() {}

  render() {
    super.clean();
    const createTodoModal = document.createElement("div");
    const createTodoForm = document.createElement("form");
    createTodoForm.onsubmit = (e) => this.submitForm(e);

    const submit = document.createElement("button");
    const cancel = document.createElement("button");

    const titleGroup = document.createElement("div");
    const titleLabel = document.createElement("label");
    const titleInput = document.createElement("input");
    titleInput.onchange = () => {
      this.title = titleInput.value;
    };
    titleLabel.textContent = "Title";
    titleGroup.appendChild(titleLabel);
    titleGroup.appendChild(titleInput);

    const descGroup = document.createElement("div");
    const descLabel = document.createElement("label");
    const descInput = document.createElement("input");
    descInput.onchange = () => {
      this.desc = descInput.value;
    };
    descLabel.textContent = "Description";
    descGroup.appendChild(descLabel);
    descGroup.appendChild(descInput);

    const dueDateGroup = document.createElement("div");
    const dueDateLabel = document.createElement("label");
    const dueDateInput = document.createElement("input");
    dueDateInput.onchange = () => {
      console.log(dueDateInput.value);
      this.dueDate = dueDateInput.value;
    };
    dueDateLabel.textContent = "Due Date";
    dueDateInput.type = "date";
    dueDateGroup.appendChild(dueDateLabel);
    dueDateGroup.appendChild(dueDateInput);

    const priorityGroup = document.createElement("div");
    const priorityLabel = document.createElement("label");
    const prioritySelect = document.createElement("select");
    this.priority = todoPriorities.low;
    prioritySelect.onchange = () => {
      this.priority = todoPriorities[prioritySelect.value];
    };
    Object.keys(todoPriorities).map((priority) => {
      const option = document.createElement("option");
      option.value = priority;
      option.label = priority;
      prioritySelect.appendChild(option);
    });
    priorityLabel.textContent = "Select Priority";
    priorityGroup.appendChild(priorityLabel);
    priorityGroup.appendChild(prioritySelect);

    titleGroup.classList.add("form-group");
    descGroup.classList.add("form-group");
    dueDateGroup.classList.add("form-group");
    priorityGroup.classList.add("form-group");

    createTodoForm.appendChild(titleGroup);
    createTodoForm.appendChild(descGroup);
    createTodoForm.appendChild(dueDateGroup);
    createTodoForm.appendChild(priorityGroup);
    createTodoForm.appendChild(submit);
    createTodoForm.appendChild(cancel);

    submit.textContent = "Create Todo";
    cancel.textContent = "Cancel";
    cancel.type = "button";
    cancel.onclick = () => {
      this.closeModal.call(this.caller, createTodoModal);
    };

    createTodoModal.classList.add("modal");
    createTodoModal.appendChild(createTodoForm);
    this.htmlElem = createTodoModal;
    this.parent.appendChild(createTodoModal);
  }
}

export default CreateTodoModal;

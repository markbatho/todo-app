import BaseModal from "../../BaseModal";
import Form from "./form/Form";
import { Todo, todoPriorities } from "../Todo";

class CreateTodoModal extends BaseModal {
  constructor(parent, project, eventManager, todoManager) {
    super(parent);
    this.project = project;
    this.eventManager = eventManager;
    this.todoManager = todoManager;
    this.render();
  }

  submitForm(e) {}

  render() {
    super.clean();
    const modal = document.createElement("div");
    const cancel = document.createElement("button");
    cancel.textContent = "Cancel";

    const form = new Form(modal, "Create todo item", [
      {
        title: "Todo Title",
        id: "title",
        name: "title",
        type: "text",
        value: null,
      },
      {
        title: "Todo Description",
        id: "desc",
        name: "desc",
        type: "text",
        value: null,
      },
      {
        title: "Todo Due Date",
        id: "dueData",
        name: "dueDate",
        type: "date",
        value: null,
      },
      {
        title: "Todo Priority",
        id: "priority",
        name: "priority",
        type: "selection",
        value: null,
        options: todoPriorities,
      },
    ]);

    form.htmlElem.onsubmit = (e) => {
      e.preventDefault();
      const todo = new Todo(
        form.data.title,
        form.data.desc,
        new Date(form.data.dueDate),
        form.data.priority,
        this.project
      );
      this.todoManager.create(todo);
      this.eventManager.emit("project", null);
      super.close();
    };

    cancel.onclick = () => {
      super.close();
    };

    modal.classList.add("modal");
    modal.appendChild(cancel);
    this.htmlElem = modal;
    this.parent.appendChild(modal);
  }
}

export default CreateTodoModal;

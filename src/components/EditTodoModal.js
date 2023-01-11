import BaseModal from "../../BaseModal";
import { todoPriorities } from "../Todo";
import Form from "./form/Form";

class EditTodoModal extends BaseModal {
  constructor(parent, todo, eventManager, todoManager) {
    super(parent);
    this.todo = todo;
    this.eventManager = eventManager;
    this.todoManager = todoManager;
    this.render();

    // this.eventManager.emit("modal", null);
  }

  render() {
    super.clean();
    const modal = document.createElement("div");

    const cancel = document.createElement("button");
    cancel.textContent = "Cancel";

    const form = new Form(modal, "Edit todo item", [
      {
        title: "Todo Title",
        id: "title",
        name: "title",
        type: "text",
        value: this.todo.title,
      },
      {
        title: "Todo Description",
        id: "desc",
        name: "desc",
        type: "text",
        value: this.todo.desc,
      },
      {
        title: "Todo Due Date",
        id: "dueData",
        name: "dueDate",
        type: "date",
        value: this.todo.dueDate,
      },
      {
        title: "Todo Priority",
        id: "priority",
        name: "priotity",
        type: "selection",
        value: this.todo.priority,
        options: todoPriorities,
      },
    ]);

    form.htmlElem.onsubmit = (e) => {
      // TODO
      e.preventDefault();
      console.log(form.data);
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

export default EditTodoModal;

import BaseModal from "../../BaseModal";
import { todoPriorities, Todo } from "../Todo";
import Form from "./form/Form";

class EditTodoModal extends BaseModal {
  constructor(parent, todo, eventManager, todoManager) {
    super(parent);
    this.todo = todo;
    this.eventManager = eventManager;
    this.todoManager = todoManager;
    this.render();
  }

  render() {
    super.clean();
    const modal = document.createElement("div");
    const form = new Form(modal, this, "Edit todo item", [
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
        name: "priority",
        type: "selection",
        value: this.todo.priority,
        options: todoPriorities,
      },
    ]);

    form.htmlElem.onsubmit = (e) => {
      e.preventDefault();

      const updatedTodo = new Todo(
        form.data.title,
        form.data.desc,
        form.data.dueDate,
        form.data.priority,
        this.todo.project
      );

      this.todoManager.update(
        { property: "title", value: this.todo.title },
        updatedTodo
      );

      this.eventManager.emit("update", null);
      super.close();
    };

    modal.classList.add("modal");
    this.htmlElem = modal;
    this.parent.appendChild(modal);
  }
}

export default EditTodoModal;

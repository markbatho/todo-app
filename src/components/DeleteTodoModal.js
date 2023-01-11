import BaseModal from "../../BaseModal";
import Form from "./form/Form";

class DeleteTodoModal extends BaseModal {
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
    const form = new Form(modal, this, "Are you sure to delete todo item?", []);

    form.htmlElem.onsubmit = (e) => {
      e.preventDefault();
      this.todoManager.remove({
        property: "title",
        value: this.todo.title,
      });

      super.close();
      this.eventManager.emit("project", this.todo.project);
    };

    modal.classList.add("modal");
    this.htmlElem = modal;
    this.parent.appendChild(modal);
  }
}

export default DeleteTodoModal;

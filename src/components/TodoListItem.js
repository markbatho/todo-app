import editIcon from "../icons/edit-project.svg";
import deleteIcon from "../icons/delete.svg";
import BaseComponent from "./BaseComponent";
import EditTodoModal from "./EditTodoModal";
import DeleteTodoModal from "./DeleteTodoModal";
import { Todo } from "../Todo";

class TodoListItem extends BaseComponent {
  constructor(parent, todo, eventManager, todoManager) {
    super(parent);
    this.todo = todo;
    this.eventManager = eventManager;
    this.todoManager = todoManager;
    this.render();
  }

  render() {
    super.clean();
    const todoListItem = document.createElement("li");
    const header = document.createElement("div");
    const checkbox = document.createElement("input");
    const h3 = document.createElement("h3");
    const editBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");

    checkbox.type = "checkbox";
    checkbox.checked = this.todo.isDone;
    h3.textContent = this.todo.title;
    editBtn.innerHTML = editIcon;
    deleteBtn.innerHTML = deleteIcon;

    checkbox.onchange = () => {
      console.log(checkbox.checked);
      this.todoManager.update(
        { property: "title", value: this.todo.title },
        new Todo(
          this.todo.title,
          this.todo.desc,
          this.todo.dueDate,
          this.todo.priority,
          this.todo.project,
          !this.todo.isDone
        )
      );
      this.eventManager.emit("update", null);
    };

    editBtn.onclick = () => {
      new EditTodoModal(
        document.body,
        this.todo,
        this.eventManager,
        this.todoManager
      );
    };

    deleteBtn.onclick = () => {
      new DeleteTodoModal(
        document.body,
        this.todo,
        this.eventManager,
        this.todoManager
      );
    };

    header.classList.add("todo-header");
    todoListItem.classList.add("todo-list-item");

    todoListItem.appendChild(checkbox);
    todoListItem.appendChild(h3);
    todoListItem.appendChild(editBtn);
    todoListItem.appendChild(deleteBtn);
    this.htmlElem = todoListItem;
    this.parent.appendChild(todoListItem);
  }
}

export default TodoListItem;

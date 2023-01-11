import editIcon from "../icons/edit-project.svg";
import deleteIcon from "../icons/delete.svg";
import openIcon from "../icons/down.svg";
import closeIcon from "../icons/up.svg";
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
    const todoTitle = document.createElement("div");
    const todoActions = document.createElement("div");
    const editBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");
    const toggleBtn = document.createElement("button");
    const todoListHeader = document.createElement("div");
    const todoListItemExt = document.createElement("div");
    const todoListFooter = document.createElement("div");
    const desc = document.createElement("p");
    const dueDate = document.createElement("p");
    const priority = document.createElement("p");

    desc.textContent = this.todo.desc;
    dueDate.textContent = this.todo.dueDate;
    priority.textContent = this.todo.priority.value;
    priority.style.backgroundColor = this.todo.priority.color;

    todoListFooter.appendChild(dueDate);
    todoListFooter.appendChild(priority);
    todoListFooter.classList.add("todo-footer");

    todoListItemExt.appendChild(desc);
    todoListItemExt.appendChild(todoListFooter);
    todoListItemExt.classList.add("todo-list-extended");

    checkbox.type = "checkbox";
    checkbox.checked = this.todo.isDone;
    h3.textContent = this.todo.title;
    editBtn.innerHTML = editIcon;
    deleteBtn.innerHTML = deleteIcon;
    toggleBtn.innerHTML = openIcon;

    todoTitle.appendChild(checkbox);
    todoTitle.appendChild(h3);
    todoTitle.classList.add("todo-title");

    todoActions.appendChild(editBtn);
    todoActions.appendChild(deleteBtn);
    todoActions.appendChild(toggleBtn);
    todoActions.classList.add("todo-actions");

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

    let isOpen = false;
    toggleBtn.onclick = () => {
      if (isOpen) {
        todoListItemExt.classList.remove("open");
        toggleBtn.innerHTML = openIcon;
        isOpen = false;
      } else {
        todoListItemExt.classList.add("open");
        toggleBtn.innerHTML = closeIcon;
        isOpen = true;
      }
    };

    header.classList.add("todo-header");

    todoListHeader.appendChild(todoTitle);
    todoListHeader.appendChild(todoActions);
    todoListHeader.classList.add("todo-list-item-header");

    todoListItem.appendChild(todoListHeader);
    todoListItem.appendChild(todoListItemExt);
    todoListItem.classList.add("todo-list-item");
    this.htmlElem = todoListItem;
    this.parent.appendChild(todoListItem);
  }
}

export default TodoListItem;

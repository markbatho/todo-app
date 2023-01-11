import BaseComponent from "./BaseComponent";
import EditTodoModal from "./EditTodoModal";

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
    const h3 = document.createElement("h3");
    const editBtn = document.createElement("button");
    h3.textContent = this.todo.title;

    editBtn.onclick = () => {
      new EditTodoModal(
        document.body,
        this.todo,
        this.eventManager,
        this.todoManager
      );
    };

    header.classList.add("todo-header");
    todoListItem.classList.add("todo-list-item");

    todoListItem.appendChild(h3);
    todoListItem.appendChild(editBtn);
    this.htmlElem = todoListItem;
    this.parent.appendChild(todoListItem);
  }
}

export default TodoListItem;

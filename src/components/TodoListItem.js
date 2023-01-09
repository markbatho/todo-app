import BaseComponent from "./BaseComponent";

class TodoListItem extends BaseComponent {
  constructor(parent, todo) {
    super(parent);
    this.todo = todo;
    this.render();
  }

  render() {
    super.clean();
    const todoListItem = document.createElement("li");
    const header = document.createElement("div");
    const h3 = document.createElement("h3");
    h3.textContent = this.todo.title;

    header.classList.add("todo-header");
    todoListItem.classList.add("todo-list-item");

    todoListItem.appendChild(h3);
    this.htmlElem = todoListItem;
    this.parent.appendChild(todoListItem);
  }
}

export default TodoListItem;

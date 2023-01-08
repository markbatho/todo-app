import BaseComponent from "./BaseComponent";
import TodoListItem from "./TodoListItem";

class ProjectUI extends BaseComponent {
  constructor(parent, todoManager, collectionManager) {
    super(parent);
    this.todoManager = todoManager;
    this.activeProject = null;
    this.activeCollection = null;
    this.collectionManager = collectionManager;
    this.render();
  }

  update(data) {
    if (data.activeProject) {
      this.activeProject = data.activeProject;
    }
    if (data.activeCollection) {
      this.activeCollection = data.activeCollection;
    }
    this.render();
  }

  render() {
    super.clean();
    const projectUI = document.createElement("div");
    projectUI.classList.add("project");

    const todoList = document.createElement("ul");

    if (this.activeProject) {
      const todos = this.todoManager.findAll({
        property: "project",
        value: this.activeProject,
      });

      todos.forEach((todo) => {
        new TodoListItem(todoList, todo);
      });
    }

    if (this.activeCollection) {
      let todos;

      switch (this.activeCollection) {
        case "All":
          todos = this.collectionManager.getAll();
          break;
        case "Today":
          todos = this.collectionManager.getToday();
          break;
        case "Week":
          todos = this.collectionManager.getWeek();
          break;
        case "Important":
          todos = this.collectionManager.getImportant();
          break;
      }

      todos.forEach((todo) => {
        new TodoListItem(todoList, todo);
      });
    }

    projectUI.appendChild(todoList);

    this.htmlElem = projectUI;
    this.parent.appendChild(projectUI);
  }
}

export default ProjectUI;

import BaseComponent from "./BaseComponent";
import TodoListItem from "./TodoListItem";

class ProjectUI extends BaseComponent {
  constructor(parent, todoManager) {
    super(parent);
    this.todoManager = todoManager;
    this.activeProject = null;

    this.render();
  }

  update(data) {
    if (data.activeProject) {
      this.activeProject = data.activeProject;
      this.render();
    }
  }

  render() {
    super.clean();

    console.log("Render triggered...");

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

    projectUI.appendChild(todoList);

    this.htmlElem = projectUI;
    this.parent.appendChild(projectUI);
  }
}

export default ProjectUI;

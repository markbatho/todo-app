import createIcon from "../icons/plus.svg";
import BaseComponent from "./BaseComponent";
import CreateTodoModal from "./CreateTodoModal";
import TodoListItem from "./TodoListItem";

class ProjectUI extends BaseComponent {
  constructor(
    parent,
    eventManager,
    todoManager,
    collectionManager,
    defaultCollectionItemName
  ) {
    super(parent);
    this.eventManager = eventManager;
    this.todoManager = todoManager;
    this.activeProject = null;
    this.activeCollection = defaultCollectionItemName;
    this.defaultCollectionItemName = defaultCollectionItemName;
    this.collectionManager = collectionManager;
    this.render();
  }

  update(data) {
    if (data && data.activeProject) {
      this.activeCollection = null;
      this.activeProject = data.activeProject;
    }
    if (data && data.activeCollection) {
      this.activeProject = null;
      this.activeCollection = data.activeCollection;
    }
    this.render();
  }

  reset() {
    this.activeCollection = this.defaultCollectionItemName;
    this.render();
  }

  render() {
    super.clean();
    const projectUI = document.createElement("div");
    const projectHeader = document.createElement("div");
    const projectName = document.createElement("h2");

    projectHeader.appendChild(projectName);

    const todoList = document.createElement("ul");

    if (this.activeProject) {
      const createTodo = document.createElement("button");
      createTodo.innerHTML = createIcon;
      createTodo.onclick = () => {
        new CreateTodoModal(
          document.body,
          this.activeProject,
          this.eventManager,
          this.todoManager
        );
      };

      projectHeader.appendChild(createTodo);
      projectName.textContent = this.activeProject.name;

      const todos = this.todoManager.findAll({
        property: "project",
        value: Object.assign({}, this.activeProject),
      });

      todos.map((todo) => {
        new TodoListItem(todoList, todo, this.eventManager, this.todoManager);
      });
    }

    if (this.activeCollection) {
      projectName.textContent = this.activeCollection;

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
        new TodoListItem(todoList, todo, this.eventManager, this.todoManager);
      });
    }

    projectHeader.classList.add("project-header");
    projectUI.classList.add("project");
    projectUI.appendChild(projectHeader);
    projectUI.appendChild(todoList);

    this.htmlElem = projectUI;
    this.parent.appendChild(projectUI);
  }
}

export default ProjectUI;

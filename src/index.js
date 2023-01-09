import "./styles/app.css";
import ProjectUI from "./components/Project";
import Sidebar from "./components/Sidebar";
import EventManager from "./EventManager";
import { CollectionManager, ProjectManager } from "./Project";
import { TodoManager } from "./Todo";

const content = document.getElementById("app");

function app(content) {
  const eventManager = new EventManager();
  const todoManager = new TodoManager("todos");
  const projectManager = new ProjectManager("projects", todoManager);
  const collectionManager = new CollectionManager(todoManager);

  const sidebar = new Sidebar(content, eventManager, projectManager);
  const projectUI = new ProjectUI(
    content,
    eventManager,
    todoManager,
    collectionManager,
    "All"
  );

  eventManager.on("project", projectUI.update.bind(projectUI));
  eventManager.on("collection", projectUI.update.bind(projectUI));
  eventManager.on("create-project", sidebar.update.bind(sidebar));
  eventManager.on("delete-project", sidebar.update.bind(sidebar));
  eventManager.on("delete-project", projectUI.reset.bind(projectUI));
}

app(content);

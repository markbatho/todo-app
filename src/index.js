import ProjectUI from "./components/Project";
import Sidebar from "./components/Sidebar";
import EventManager from "./EventManager";
import { Project, ProjectManager } from "./Project";
import { Todo, TodoManager } from "./Todo";

const content = document.getElementById("app");
function app(content) {
  const eventManager = new EventManager();
  const todoManager = new TodoManager("todos");
  const projectManager = new ProjectManager("projects", todoManager);

  const sidebar = new Sidebar(content, eventManager, projectManager);
  const projectUI = new ProjectUI(content, todoManager);

  const p1 = new Project("Test 1");
  const p2 = new Project("Test 2");
  const p3 = new Project("Test 3");

  eventManager.on("project", projectUI.update.bind(projectUI));

  projectManager.create(p1);
  projectManager.create(p2);
  projectManager.create(p3);

  const t0 = new Todo(
    "Todo 0",
    "Lorem ipsum...",
    new Date("2023-01-08"),
    "medium",
    p1
  );

  const t1 = new Todo(
    "Todo 1",
    "Lorem ipsum...",
    new Date("2023-01-08"),
    "medium",
    p1
  );

  const t2 = new Todo(
    "Todo 2",
    "Lorem ipsum...",
    new Date("2023-01-08"),
    "medium",
    p1
  );

  const t3 = new Todo(
    "Todo 3",
    "Lorem ipsum...",
    new Date("2023-01-08"),
    "medium",
    p2
  );

  const t4 = new Todo(
    "Todo 4",
    "Lorem ipsum...",
    new Date("2023-01-08"),
    "medium",
    p3
  );

  todoManager.create(t0);
  todoManager.create(t1);
  todoManager.create(t2);
  todoManager.create(t3);
  todoManager.create(t4);
}
app(content);

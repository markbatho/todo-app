import { todoPriorities } from "./Todo";
import { isToday, isThisWeek } from "date-fns";

class Project {
  constructor(name) {
    this.name = name;
  }
}

class ProjectManager {
  constructor(store, todoManager) {
    this.store = store;
    this.todoManager = todoManager;
    this.storage = window.localStorage;

    if (!this.storage.getItem(this.store))
      this.storage.setItem(this.store, JSON.stringify(new Array()));
  }

  findAll(query) {
    if (query) {
      return JSON.parse(this.storage.getItem(this.store)).filter((element) => {
        if (_.isEqual(element[query.property], query.value)) {
          return true;
        }
        return false;
      });
    }
    return JSON.parse(this.storage.getItem(this.store));
  }

  findOne(query) {
    return JSON.parse(this.storage.getItem(this.store)).reduce(
      (prev, current) => {
        if (_.isEqual(current[query.property], query.value)) {
          prev = current;
          return prev;
        }
        return prev;
      },
      null
    );
  }

  create(project) {
    if (this.findOne({ property: "name", value: project.name })) {
      console.log("Project already exists!");
      return;
    }
    const items = JSON.parse(this.storage.getItem(this.store));
    items.push(project);
    this.storage.setItem(this.store, JSON.stringify(items));
  }

  update(query, project) {
    if (this.findOne({ property: "name", value: project.name })) {
      console.log("Project already exists!");
      return;
    }
    const items = JSON.parse(this.storage.getItem(this.store));
    const updated = items.map((element) => {
      if (_.isEqual(element[query.property], query.value)) {
        // Update every individual todo items associated with this project
        const todos = this.todoManager.findAll({
          property: "project",
          value: element,
        });

        todos.forEach((todo) => {
          todo.project = project;
          this.todoManager.update(
            { property: "title", value: todo.title },
            todo
          );
        });

        element = project;
        return element;
      }
      return element;
    });

    this.storage.setItem(this.store, JSON.stringify(updated));
  }

  remove(query) {
    const items = JSON.parse(this.storage.getItem(this.store));
    const index = items.findIndex((element) => {
      if (_.isEqual(element[query.property], query.value)) {
        // Delete every individual todo items associated with this project
        const todos = this.todoManager.findAll({
          property: "project",
          value: element,
        });

        todos.forEach((todo) => {
          this.todoManager.remove({ property: "title", value: todo.title });
        });

        return true;
      }
      return false;
    });
    items.splice(index, 1);
    this.storage.setItem(this.store, JSON.stringify(items));
  }
}

class CollectionManager {
  constructor(todoManager) {
    this.todoManager = todoManager;
  }

  getAll() {
    return this.todoManager.findAll();
  }

  getToday() {
    let todos = this.todoManager.findAll();
    todos = todos.filter((todo) => {
      return isToday(new Date(todo.dueDate)) ? true : false;
    });
    return todos;
  }

  getWeek() {
    let todos = this.todoManager.findAll();
    todos = todos.filter((todo) => {
      return isThisWeek(new Date(todo.dueDate)) ? true : false;
    });
    return todos;
  }

  getImportant() {
    console.log("Are we here");
    let todos = this.todoManager.findAll({
      property: "priority",
      value: todoPriorities.high,
    });
    console.log(todos);
    return todos;
  }
}

export { Project, ProjectManager, CollectionManager };

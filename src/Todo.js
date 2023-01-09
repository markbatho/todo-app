import _ from "lodash";

const todoPriorities = {
  low: { value: "low", color: "#1976d2" },
  medium: { value: "medium", color: "#fbc02d" },
  high: { value: "high", color: "#d32f2f" },
};

class Todo {
  constructor(title, desc, dueDate, priority, project) {
    this.title = title;
    this.desc = desc;
    this.dueDate = dueDate;
    this.priority = priority;
    this.project = project;
    this.createdAt = new Date();
    this.isDone = false;
  }
}

class TodoManager {
  constructor(store) {
    this.store = store;
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

  create(todo) {
    if (this.findOne({ property: "title", value: todo.title })) {
      return;
    }
    const items = JSON.parse(this.storage.getItem(this.store));
    items.push(todo);
    this.storage.setItem(this.store, JSON.stringify(items));
  }

  update(query, todo) {
    // if (this.findOne({ property: "title", value: todo.title })) {
    //   console.log("Todo already exists!");
    //   return;
    // }
    const items = JSON.parse(this.storage.getItem(this.store));
    const updated = items.map((element) => {
      if (_.isEqual(element[query.property], query.value)) {
        element = todo;
        return todo;
      }
      return element;
    });
    this.storage.setItem(this.store, JSON.stringify(updated));
  }

  remove(query) {
    const items = JSON.parse(this.storage.getItem(this.store));
    const index = items.findIndex((element) => {
      if (_.isEqual(element[query.property], query.value)) {
        return true;
      }
      return false;
    });
    items.splice(index, 1);
    this.storage.setItem(this.store, JSON.stringify(items));
  }
}

export { todoPriorities, Todo, TodoManager };

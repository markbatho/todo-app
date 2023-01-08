class EventManager {
  constructor() {
    this.events = {};
  }

  on(event, handler) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(handler);
  }

  off(event, handler) {
    const index = this.events[event].indexOf(handler);
    if (index > -1) {
      this.events[event].splice(index, 1);
    }
  }

  emit(event, data) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].forEach((handler) => handler(data));
  }
}

export default EventManager;

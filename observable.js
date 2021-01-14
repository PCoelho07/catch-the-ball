
class Observable {
  constructor() {
    this.observers = []
  }

  subscribe(key, f) {
    this.observers[key] = f
  }

  notify(key, data) {
    this.observers[key](data)
  }
}

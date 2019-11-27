let instance;
class EventBus {
  static getInstance() {
    if (!instance) {
      instance = new this();
    }

    return instance;
  }

  constructor() {
    this._listeners = {};
    this._qeuryHandlers = new Map();
  }

  addCommandHandler(eventName, listener) {
    if (!this._listeners[eventName]) {
      this._listeners[eventName] = [];
    }

    this._listeners[eventName].push(listener);
  }

  addQueryHandler(queryName, handler) {
    this._qeuryHandlers.set(queryName, handler);
  }

  async emitBatch(eventName, ...data) {
    const listeners = this._listeners[eventName];

    await Promise.all(
      listeners.map(listener => listener(...data))
    );
  }

  async emitSequence(eventName, ...data) {
    const listeners = this._listeners[eventName];

    async function runListener(index, middlewares) {
      if (!middlewares[index]) {
        return;
      }

      const middleware = middlewares[index];
      await middleware(eventName, ...data);
      return runListener(++index, middlewares);
    }

    return runListener(0, listeners || []);
  }

  async runQuery(name, data) {
    const handler = this._qeuryHandlers.get(name);
    if (!handler) {
      return;
    }

    return handler(data);
  }
}

module.exports = EventBus;

const EventEmitter = require('events');

class SimpleEventBus extends EventEmitter {
  constructor() {
    super();
    this._middlewares = [];
  }

  async emit(eventName, ...data) {
    async function runMiddleware(index, middlewares) {
      if (!middlewares[index]) {
        return;
      }

      const middleware = middlewares[index];
      await middleware(eventName, ...data);
      return runMiddleware(++index, middlewares);
    }

    await runMiddleware(0, this._middlewares);

    super.emit(eventName, ...data);
  }

  applyMiddleware(middleware) {
    this._middlewares.push(middleware);
  }
}

module.exports = SimpleEventBus;

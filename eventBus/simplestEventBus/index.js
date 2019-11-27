const SimpleEventBus = require('./implementation');

const eventBus = new SimpleEventBus();

/**
 * Here via middlewares could be performed various asynchronous action
 * middlewares could throw actions between each other.
 *
 * But there are several disadvantages and one of them is that such solution is hard to debug
 *
 * Also such model allows us to implement different types of events
 * - Simple event or broadcast event also could be names as data event just bear some data
 * and intended to notify other part of a system about changing of the state of some entity
 * - Command runs some code and usually we want to track when such event will be finished. It could be achieved
 * via middlewares. It's like the method of other entity but it doesn't know who is an owner.
 * - Query fetches data and return it to the caller. Also there are implementation when query updates the state
 * of the caller, it is possible but could lead to difficulties so you should be careful with that.
 * Best practice is just return data.
 *
 * Middlewares also could be splited in several types:
 * - performing simple operations like filtering/splitting/mapping of events
 * - performing operations with the data of event object(dangerous)
 */

eventBus.applyMiddleware((eventName) => {
  return new Promise(resolve => {
    console.log(`Apply the first asynchronous middleware to ${eventName} event`);
    setTimeout(resolve, 1000);
  });
});

eventBus.applyMiddleware((eventName) => {
  return new Promise(resolve => {
    console.log(`Apply the first asynchronous middleware to ${eventName} event`);
    setTimeout(resolve, 1000);
  });
});

eventBus.applyMiddleware((eventName) => {
  return new Promise(resolve => {
    console.log(`Apply the first asynchronous middleware to ${eventName} event`);
    setTimeout(resolve, 1000);
  });
});

const main = async () => {
  console.log('Start code execution');

  await eventBus.emit('item:remove');

  console.log('finished code execution');
};

main();

const EventBus = require('./implementation');

const eventBus = EventBus.getInstance();

eventBus.addQueryHandler('get:data', _ => {
  return new Promise(resolve => {
    setTimeout(() => resolve('data from query handler'), 500);
  });
});

eventBus.addCommandHandler('insert:data', _ => {
  return new Promise(resolve => {
    console.log('data was inserted by the first handler');
    setTimeout(resolve, 1000);
  });
});

eventBus.addCommandHandler('insert:data', _ => {
  return new Promise(resolve => {
    console.log('data was inserted by the second handler');
    setTimeout(resolve, 1000);
  });
});


async function main() {
  try {
    console.log(
      await eventBus.runQuery('get:data')
    );

    // await eventBus.emitBatch('insert:data')
    await eventBus.emitSequence('insert:data')
  } catch (e) {
    console.log(e);
  }
}

main();

const EventBus = require('./implementation');

const eventBus = EventBus.getInstance();

eventBus.addQueryHandler('get:data', _ => {
  return new Promise(resolve => {
    setTimeout(() => resolve('data from query handler'), 500);
  });
});

eventBus.addCommandHandler('insert:data', _ => {
  return new Promise(resolve => {
    console.log('data was inserted');
    // setTimeout(resolve, 1000);
  });
});


async function main() {
  console.log(
    await eventBus.runQuery('get:data')
  );

  await eventBus.emitBatch('insert:data');
}

main();

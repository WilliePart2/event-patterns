const sumCounter = require('./implementation');

sumCounter.calculateSum(1, 1, (result) => {
  console.log(`one plus one will be: ${result}`);
  sumCounter.saveSumToDB(result, 'testDB', () => {
    console.log('Sum was saved');
  });
});

sumCounter.on(sumCounter.events.SUM_IS_CALCULATED, () => {
  console.log('Sum was calculated. - save it to the log file');
});
sumCounter.on(sumCounter.events.SUM_IS_SAVED, (data) => {
  console.log(JSON.stringify(data));
});

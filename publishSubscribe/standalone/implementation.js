const EventEmitter = require('events');

const events = {
  SUM_IS_CALCULATED: 'SUM_IS_CALCULATED',
  SUM_IS_SAVED: 'SUM_IS_SAVED',
};

const createSumIsSavedEvent = dbName => ({ dbName });

// Event emitter could be implemented as standalone entity
const eventStream = new EventEmitter();

/**
 * Here could be any implementation of the entity that wraps event emitter
 *
 */
const calculateSum = (a, b, callback) => {
  process.nextTick(() => callback(a + b));
  process.nextTick(() => eventStream.emit(events.SUM_IS_CALCULATED));
};

const saveSumToDB = (sum, dbName, callback) => {
  process.nextTick(() => callback('DONE'));
  process.nextTick(() => eventStream.emit(events.SUM_IS_SAVED, createSumIsSavedEvent(dbName)));
};

module.exports = exports = eventStream;
// expose under eventStream namespace
exports.events = events;
exports.calculateSum = calculateSum;
exports.saveSumToDB = saveSumToDB;


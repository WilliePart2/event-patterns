const EventEmitter = require('events');

const events = {
  USER_WAS_REGISTERED: 'USER_WAS_REGISTERED',
  USER_PERFORMED_ACTION: 'USER_PERFORMED_ACTION'
};

class UserWasRegisteredEvent {
  constructor(userId, username) {
    this.userId = userId;
    this.username = username;
  }
}

class UserActionEvent {
  constructor(actor, action) {
    this.actor = actor;
    this.action = action;
  }
}

/**
 * Here is another type of implementing events as child class
 * Here encapsulation is performed but it brings additional complexity
 *
 */
let userEventsInst;
class UserEventsStream extends EventEmitter {
  static getInstance() {
    if (!userEventsInst) {
      userEventsInst = new this();
    }

    return userEventsInst;
  }

  constructor() {
    super();
    if (userEventsInst) {
      throw new Error('UserEventsStream already instantiated');
    }
  }

  userWasRegistered(username) {
    process.nextTick(() => {
      this.emit(events.USER_WAS_REGISTERED, new UserWasRegisteredEvent(Math.random(), username));
    });
  }

  userPerformedAction(username, actionDescription) {
    process.nextTick(() => {
      this.emit(events.USER_PERFORMED_ACTION, new UserActionEvent(username, actionDescription));
    });
  }
}

class User {
  constructor() {
    this.eventsStream = UserEventsStream.getInstance();
  }

  registerUser(username) {
    // perform some operations to save user
    console.log(JSON.stringify({ username }));

    this.eventsStream.userWasRegistered(username);
  }

  saveUserAction(username, action) {
    // write the action that was performed to a tracking system
    console.log(JSON.stringify({ username, action }));

    this.eventsStream.userPerformedAction(username, action);
  }
}

exports.User = User;
exports.UserEventsStream = UserEventsStream;
exports.userEvents = events;

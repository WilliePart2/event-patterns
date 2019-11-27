const EventEmitter = require('events');

const userEvents = {
  ACTION_PERFORMED: 'ACTION_PERFORMED',
  USER_IS_UPDATED: 'USER_IS_UPDATED',
};

class PerformedActionEvent {
  constructor(actionName) {
    this.actionName = actionName;
  }
}

class UserProfileUpdatedEvent {
  constructor(updatedProfile) {
    this.updatedProfile = updatedProfile;
  }
}

/**
 * It is simple and convenient implementation
 * Drawbacks of such approach are that it needs to directly subscribe to UserService updates
 */
class UserService extends EventEmitter {
  getUsers() {
    console.log('Fetching the list of users');

    process.nextTick(() => {
      this.emit(userEvents.ACTION_PERFORMED, new PerformedActionEvent('LIST_FETCHING'));
    });
  }

  updateUserProfile(userUpdatedProfile) {
    console.log('Updating user\'s profile');

    process.nextTick(() => {
      this.emit(userEvents.USER_IS_UPDATED, new UserProfileUpdatedEvent(userUpdatedProfile));
    });
  }
}

exports.UserService = UserService;
exports.events = userEvents;

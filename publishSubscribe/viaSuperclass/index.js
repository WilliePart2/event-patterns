const { UserService, events } = require('./implementation');

const userService = new UserService();

/**
 * usually subscription happens in the wrapper of UserService
 * due to peculiarities of implementation
 */
userService.on(events.USER_IS_UPDATED, userUpdatedEvent => {
  console.log(`updated user data`, userUpdatedEvent);
});

userService.on(events.ACTION_PERFORMED, performedActionEvent => {
  console.log(`Action performed by user`, performedActionEvent);
});


// in the same wrapper of UserService
userService.getUsers();

userService.updateUserProfile({
  username: 'new username',
});

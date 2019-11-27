const { UserEventsStream, User, userEvents } = require('./implementation');

const userEventsStream = UserEventsStream.getInstance();
const newUser = new User();

// in someUserService.js
const username = 'Willie';
newUser.registerUser(username);

// in any other module of the application
userEventsStream.on(userEvents.USER_WAS_REGISTERED, (dataAboutUser) => {
  console.log('new user was added ' + dataAboutUser);
  newUser.saveUserAction(username,'REGISTRATION');
});

userEventsStream.on(userEvents.USER_PERFORMED_ACTION, (dataAboutAction) => {
  console.log(dataAboutAction);
});

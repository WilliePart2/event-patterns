/**
 * While publish-subscribe gives us loosely coupling this pattern also introduce multiple sources of events
 * it could be inconvenient and painful in apps that are developed by multiple teams or that are often refactored.
 *
 * Event bus introduces mediator pattern and pass all the events though it.
 * It gives us possibility easily user different types of events and such patterns like decorator or middleware
 *
 * Decorator and middleware both modify behavior of a class or its member
 * and could be implemented event with publish subscribe pattern
 */

/**
 * Concepts
 *
 * EventEmitter is a separate chanel for events. It is the mental model of it.
 * Basically event emitter emitter works synchronously but could also works asynchronously
 * and even support async/await and tracking of performing of asynchronous tasks
 *
 * Behavioral patterns that could be employed:
 * - Observer(event emitter is Observer out of the box)
 * - Mediator(could be implemented by event bus)
 *
 * Supporting patterns:
 * - Multiton
 * - Command
 * - Gateway(delegator) + Facade(recipient)
 * - Decorator(allows us benefit from wel defined interface of command handlers)
 *
 * Types of events by implementation in code:
 * - Broadcast(Simple event/Document event)
 * - Command
 * - Query(bidirectional work)
 *
 * Types of events by their work:
 * - unidirectional(fire and forget)
 * - bidirectional(fire and track completion)
 *
 * Patterns with separating by complexity:
 * - one chanel for whole application
 * - chanel per entity
 *
 * The source of evil:
 * - break of single responsibility principle and ambiguous behavior
 * - many to many relation between event-source-listeners
 *
 * Tips:
 * While event is unidirectional event sending takes the first place.
 * But as we have bidirectional events which could knows when they are completed or even they should bear some data within it
 * event sending goes at the second part and control of event lifecycle becomes most important task
 */

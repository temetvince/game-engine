import { Component } from "../Component";

/**
 * This type is used so functions like the ComponentContainer's get(...) will
 * automatically tell TypeScript the type of the Component returned.
 * In other words, we can say get(Position) and TypeScript will know that an
 * instance of Position was returned. This is amazingly helpful for type safety
 * and code completion.
 *
 * @template T - The type of the Component.
 */
type ComponentClass<T extends Component> = new (...args: any[]) => T;

export default ComponentClass;

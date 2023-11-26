import { Component } from "./Component.mjs";

/**
 * This type is so functions like the ComponentContainer's get(...) will
 * automatically tell TypeScript the type of the Component returned. In
 * other words, we can say get(Position) and TypeScript will know that an
 * instance of Position was returned. This is amazingly helpful.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ComponentClass<T extends Component> = new (...args: any[]) => T;
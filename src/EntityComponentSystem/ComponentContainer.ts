import { Component } from "./Component.js";

/**
 * This custom container is so that calling code can provide the
 * Component *instance* when adding (e.g., add(new Position(...))), and
 * provide the Component *class* otherwise (e.g., get(Position),
 * has(Position), delete(Position)).
 *
 * We also use two different types to refer to the Component's class:
 * `Function` and `ComponentClass<T>`. We use `Function` in most cases
 * because it is simpler to write. We use `ComponentClass<T>` in the
 * `get()` method, when we want TypeScript to know the type of the
 * instance that is returned. Just think of these both as referring to
 * the same thing: the underlying class of the Component.
 *
 * You might notice a footgun here: code that gets this object can
 * directly modify the Components inside (with add(...) and delete(...)).
 * This would screw up our ECS bookkeeping of mapping Systems to
 * Entities! We'll fix this later by only returning callers a view onto
 * the Components that can't change them.
 */
export class ComponentContainer {
   private map = new Map<Function, Component>();

   /**
    * Adds a component to the container.
    * @param component - The component to add.
    */
   public add(component: Component): void {
      this.map.set(component.constructor, component);
   }

   /**
    * Retrieves a component of the specified type from the container.
    * @param componentClass - The class of the component to retrieve.
    * @returns The component of the specified type, or undefined if not found.
    */
   public get<T extends Component>(componentClass: ComponentClass<T>): T {
      return this.map.get(componentClass) as T;
   }

   /**
    * Checks if the container has a component of the specified type.
    * @param componentClass - The class of the component to check.
    * @returns True if the container has the component, false otherwise.
    */
   public has(componentClass: Function): boolean {
      return this.map.has(componentClass);
   }

   /**
    * Checks if the container has all the specified components.
    * @param componentClasses - An iterable of component classes to check.
    * @returns True if the container has all the components, false otherwise.
    */
   public hasAll(componentClasses: Iterable<Function>): boolean {
      for (const cls of componentClasses) {
         if (!this.map.has(cls)) {
            return false;
         }
      }
      return true;
   }

   /**
    * Deletes a component from the container.
    * @param componentClass - The class of the component to delete.
    */
   public delete(componentClass: Function): void {
      this.map.delete(componentClass);
   }
}

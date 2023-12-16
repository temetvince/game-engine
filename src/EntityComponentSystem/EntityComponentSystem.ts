import { Component } from "./Component.js";
import { ComponentContainer } from "./ComponentContainer.js";
import { System } from "./System.js";

/**
 * The ECS is the main driver; it's the backbone of the engine that
 * coordinates Entities, Components, and Systems. You could have a single
 * one for your game, or make a different one for every level, or have
 * multiple for different purposes.
 */
export class EntityComponentSystem {
   getSystems() {
      throw new Error("Method not implemented.");
   }
   // Main state
   private entities = new Map<Entity, ComponentContainer>();
   private systems = new Map<System, Set<Entity>>();

   // Bookkeeping for entities.
   private nextEntityID = this.createUUID();
   private entitiesToDestroy = new Array<Entity>();

   /**
    * Generates a UUID (Universally Unique Identifier) using a combination of timestamp and random numbers.
    * @returns A string representing the generated UUID.
    */
   private createUUID(): string {
      let d = new Date().getTime();
      //Time in microseconds since page-load or 0 if unsupported
      let d2 =
         (typeof performance !== "undefined" &&
            performance.now &&
            performance.now() * 1000) ||
         0;
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
         /[xy]/g,
         function (c) {
            //random number between 0 and 16
            let r = Math.random() * 16;
            if (d > 0) {
               //Use timestamp until depleted
               r = (d + r) % 16 | 0;
               d = Math.floor(d / 16);
            } else {
               //Use microseconds since page-load if supported
               r = (d2 + r) % 16 | 0;
               d2 = Math.floor(d2 / 16);
            }
            return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
         },
      );
   }

   // API: Entities

   /**
    * Adds a new entity to the entity component system.
    * @returns The newly created entity.
    */
   public addEntity(): Entity {
      const entity = this.nextEntityID;
      this.nextEntityID = this.createUUID();
      this.entities.set(entity, new ComponentContainer());
      return entity;
   }

   /**
    * Marks `entity` for removal. The actual removal happens at the end
    * of the next `update()`. This way we avoid subtle bugs where an
    * Entity is removed mid-`update()`, with some Systems seeing it and
    * others not.
    */
   public removeEntity(entity: Entity): void {
      this.entitiesToDestroy.push(entity);
   }

   // API: Components

   /**
    * Adds a component to an entity.
    *
    * @param entity - The entity to add the component to.
    * @param component - The component to add.
    */
   public addComponent(entity: Entity, component: Component): void {
      this.entities.get(entity)?.add(component);
      this.checkEntity(entity);
   }

   /**
    * Retrieves the components associated with the specified entity.
    *
    * @param entity - The entity for which to retrieve the components.
    * @returns The component container associated with the entity, or undefined if the entity has no components.
    */
   public getComponents(entity: Entity): ComponentContainer | undefined {
      return this.entities.get(entity);
   }

   /**
    * Removes a component from an entity.
    *
    * @param entity - The entity from which to remove the component.
    * @param componentClass - The class of the component to remove.
    */
   public removeComponent(entity: Entity, componentClass: Function): void {
      this.entities.get(entity)?.delete(componentClass);
      this.checkEntity(entity);
   }

   // API: Systems

   /**
    * Adds a system to the Entity Component System.
    *
    * @param system - The system to be added.
    */
   public addSystem(system: System): void {
      // Checking invariant: systems should not have an empty
      // Components list, or they'll run on every entity. Simply remove
      // or special case this check if you do want a System that runs
      // on everything.
      if (system.componentsRequired.size == 0) {
         console.warn("System not added: empty Components list.");
         console.warn(system);
         return;
      }

      // Give system a reference to the ECS so it can actually do
      // anything.
      system.ecs = this;

      // Save system and set who it should track immediately.
      this.systems.set(system, new Set());
      for (const entity of this.entities.keys()) {
         this.checkEntitySystem(entity, system);
      }
   }

   /**
    * Removes a system from the entity component system.
    * @param system - The system to be removed.
    */
   public removeSystem(system: System): void {
      this.systems.delete(system);
   }

   /**
    * This is ordinarily called once per tick (e.g., every frame). It
    * updates all Systems, then destroys any Entities that were marked
    * for removal.
    */
   public update(): void {
      // Update all systems. (Later, we'll add a way to specify the
      // update order.)
      for (const [system, entities] of this.systems.entries()) {
         system.update(entities);
      }

      // Remove any entities that were marked for deletion during the
      // update.
      while (this.entitiesToDestroy.length > 0) {
         this.destroyEntity(this.entitiesToDestroy.pop());
      }
   }

   private destroyEntity(entity: Entity | undefined): void {
      if (entity === undefined) {
         return;
      }

      this.entities.delete(entity);
      for (const entities of this.systems.values()) {
         entities.delete(entity); // no-op if doesn't have it
      }
   }

   private checkEntity(entity: Entity): void {
      for (const system of this.systems.keys()) {
         this.checkEntitySystem(entity, system);
      }
   }

   private checkEntitySystem(entity: Entity, system: System): void {
      const have = this.entities.get(entity);
      const need = system.componentsRequired;
      if (have?.hasAll(need)) {
         // should be in system
         this.systems.get(system)?.add(entity); // no-op if in
      } else {
         // should not be in system
         this.systems.get(system)?.delete(entity); // no-op if out
      }
   }
}

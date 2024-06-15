import { System } from "../EntityComponentSystem/System";
import { Position } from "../Components/Position";
import { Velocity } from "../Components/Velocity";
import { Boid } from "../Components/Boid";

/**
 * The Movement system is responsible for updating the position of entities
 * based on their velocity.
 */
export class Movement extends System {
   componentsRequired = new Set<Function>([Position, Velocity, Boid]);
   public dirtyComponents = new Set<Function>([Position]);

   /**
    * Updates the Movement system, adjusting the position of each entity
    * based on its velocity.
    *
    * @param entities - The set of entities to be updated.
    */
   update(entities: Set<Entity>): void {
      for (const entity of entities) {
         const components = this.ecs.getComponents(entity);
         if (!components) continue;

         const position = components.get(Position);
         const velocity = components.get(Velocity);

         if (position && velocity) {
            this.updateEntityPosition(position, velocity);
         }
      }
   }

   /**
    * Updates the position of a single entity based on its velocity.
    *
    * @param position - The Position component of the entity.
    * @param velocity - The Velocity component of the entity.
    */
   private updateEntityPosition(position: Position, velocity: Velocity): void {
      position.setX(position.getX() + velocity.getX());
      position.setY(position.getY() + velocity.getY());
   }
}

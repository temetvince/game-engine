import { System } from "../EntityComponentSystem/System";
import { Position } from "../Components/Position";
import { Velocity } from "../Components/Velocity";

/**
 * Represents a system responsible for moving entities in the game.
 */
export class Mover extends System {
   componentsRequired = new Set<Function>([Velocity, Position]);
   public dirtyComponents = new Set<Function>([Position]);

   /**
    * Updates the position of entities based on their velocity.
    * @param entities - The set of entities to update.
    */
   update(entities: Set<Entity>): void {
      for (const entity of entities) {
         const components = this.ecs.getComponents(entity);
         if (!components) continue;

         const position = components.get(Position);
         const velocity = components.get(Velocity);

         if (position && velocity) {
            position.setX(position.getX() + velocity.getX());
            position.setY(position.getY() + velocity.getY());
         }
      }
   }
}

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
    * Updates the position of entities by incrementing their x and y coordinates by 1.
    * @param entities - The set of entities to update.
    */
   update(entities: Set<Entity>): void {
      for (const entity of entities) {
         const position = this.ecs.getComponents(entity)?.get(Position);
         const velocity = this.ecs.getComponents(entity)?.get(Velocity);

         position?.setX(position!.getX() + velocity!.getX());
         position?.setY(position!.getY() + velocity!.getY());
      }
   }
}

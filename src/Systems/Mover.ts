import { System } from "../EntityComponentSystem/System.js";
import { Position } from "../Components/Position.js";

/**
 * Represents a system responsible for moving entities in the game.
 */
export class Mover extends System {
   componentsRequired = new Set<Function>([Position]);

   /**
    * Updates the position of entities by incrementing their x and y coordinates by 1.
    * @param entities - The set of entities to update.
    */
   update(entities: Set<Entity>): void {
      for (const entity of entities) {
         const position = this.ecs.getComponents(entity)?.get(Position);
         position!.x += 1;
         position!.y += 1;
      }
   }
}

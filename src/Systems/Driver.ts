import { System } from "../EntityComponentSystem/System.js";
import { Position } from "../Components/Position.js";
import { Velocity } from "../Components/Velocity.js";
import r from "raylib";

/**
 * Represents a system responsible for moving entities in the game.
 */
export class Driver extends System {
   componentsRequired = new Set<Function>([Position, Velocity]);

   /**
    * Updates the position of entities by incrementing their x and y coordinates by 1.
    * @param entities - The set of entities to update.
    */
   update(entities: Set<Entity>): void {
      for (const entity of entities) {
         const position = this.ecs.getComponents(entity)?.get(Position);
         const velocity = this.ecs.getComponents(entity)?.get(Velocity);

         if (position?.lessThanX(new Position(0, 0))) {
            // Left wall collision
            velocity!.x = 1;
         } else if (
            // Right wall collision
            position?.greaterThanX(new Position(r.GetScreenWidth() - 1, 0))
         ) {
            velocity!.x = -1;
         } else if (position?.lessThanY(new Position(0, 0))) {
            // Top wall collision
            velocity!.y = 1;
         } else if (
            position?.greaterThanY(new Position(0, r.GetScreenHeight() - 1))
         ) {
            // Bottom wall collision
            velocity!.y = -1;
         }
      }
   }
}

import { P5CanvasInstance, SketchProps } from "@p5-wrapper/react";
import { Position } from "../Components/Position";
import { Velocity } from "../Components/Velocity";
import { System } from "../EntityComponentSystem/System";

/**
 * Represents a system responsible for moving entities in the game.
 */
export class Driver extends System {
   componentsRequired = new Set<Function>([Position, Velocity]);

   public dirtyComponents = new Set<Function>([Velocity]);

   /**
    * Updates the position of entities by incrementing their x and y coordinates by 1.
    * @param entities - The set of entities to update.
    * @param p5 - The p5 instance to use for drawing.
    */
   update(entities: Set<Entity>, p5?: P5CanvasInstance<SketchProps>): void {
      if (!p5) {
         return;
      }

      for (const entity of entities) {
         const position = this.ecs.getComponents(entity)?.get(Position);
         const velocity = this.ecs.getComponents(entity)?.get(Velocity);

         if (position?.lessThanX(new Position(0, 0))) {
            // Left wall collision
            velocity?.setX(1);
         } else if (
            // Right wall collision
            position?.greaterThanX(new Position(p5.width! - 1, 0))
         ) {
            velocity?.setX(-1);
         } else if (position?.lessThanY(new Position(0, 0))) {
            // Top wall collision
            velocity?.setY(1);
         } else if (position?.greaterThanY(new Position(0, p5.height! - 1))) {
            // Bottom wall collision
            velocity?.setY(-1);
         }
      }
   }
}

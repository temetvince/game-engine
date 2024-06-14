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
    * Updates the position of entities based on their velocity and handles wall collisions.
    * @param entities - The set of entities to update.
    * @param p5 - The p5 instance to use for drawing.
    */
   update(entities: Set<Entity>, p5?: P5CanvasInstance<SketchProps>): void {
      if (!p5) {
         return;
      }

      for (const entity of entities) {
         const components = this.ecs.getComponents(entity);
         if (!components) continue;

         const position = components.get(Position);
         const velocity = components.get(Velocity);

         if (position && velocity) {
            // Update position based on velocity
            position.setX(position.getX() + velocity.getX());
            position.setY(position.getY() + velocity.getY());

            // Handle wall collisions
            if (position.getX() < 0) {
               // Left wall collision
               position.setX(0);
               velocity.setX(velocity.getX() * -1);
            } else if (position.getX() > p5.width - 1) {
               // Right wall collision
               position.setX(p5.width - 1);
               velocity.setX(velocity.getX() * -1);
            }

            if (position.getY() < 0) {
               // Top wall collision
               position.setY(0);
               velocity.setY(velocity.getY() * -1);
            } else if (position.getY() > p5.height - 1) {
               // Bottom wall collision
               position.setY(p5.height - 1);
               velocity.setY(velocity.getY() * -1);
            }
         }
      }
   }
}

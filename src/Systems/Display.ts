import { P5CanvasInstance, SketchProps } from "@p5-wrapper/react";
import { Position } from "../Components/Position";
import { Color } from "../Components/Color";
import { System } from "../EntityComponentSystem/System";

/**
 * The Display system is responsible for rendering entities with a Position and Color component.
 * It uses p5.js to draw points representing the entities on the canvas.
 */
export class Display extends System {
   componentsRequired = new Set<Function>([Position, Color]);

   /**
    * Updates the Display system, rendering all entities with a Position and Color component.
    *
    * @param entities - The set of entities to be updated and rendered.
    * @param p5 - The p5.js instance used for rendering.
    */
   update(entities: Set<Entity>, p5: P5CanvasInstance<SketchProps>): void {
      if (!p5) return;

      for (const entity of entities) {
         const position = this.ecs.getComponents(entity)!.get(Position)!;
         const color = this.ecs.getComponents(entity)!.get(Color)!;

         p5.stroke(color.getColor());
         p5.strokeWeight(10);
         p5.point(position.getX(), position.getY());
      }
   }
}

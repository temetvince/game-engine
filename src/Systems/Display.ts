import { P5CanvasInstance, SketchProps } from "@p5-wrapper/react";
import { Position } from "../Components/Position";
import { Sprite } from "../Components/Sprite";
import { System } from "../EntityComponentSystem/System";

/**
 * Represents a system responsible for displaying entities in the game.
 */
export class Display extends System {
   componentsRequired = new Set<Function>([Position, Sprite]);

   /**
    * Renders the entities by drawing points at their positions.
    * @param entities - The set of entities to update.
    * @param p5 - The p5 instance to use for drawing.
    */
   update(entities: Set<Entity>, p5?: P5CanvasInstance<SketchProps>) {
      if (!p5) {
         return;
      }

      for (const entity of entities) {
         const components = this.ecs.getComponents(entity);
         if (!components) continue;

         const position = components.get(Position);
         // const sprite = components.get(Sprite);

         if (position) {
            p5.stroke("orange");
            p5.strokeWeight(10);
            p5.point(position.getX(), position.getY());
         }
      }
   }
}

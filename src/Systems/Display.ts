import { P5CanvasInstance, SketchProps } from "@p5-wrapper/react";
import { Position } from "../Components/Position";
import { Sprite } from "../Components/Sprite";
import { System } from "../EntityComponentSystem/System";

/**
 * Represents a system responsible for moving entities in the game.
 */
export class Display extends System {
   componentsRequired = new Set<Function>([Position, Sprite]);

   /**
    * Updates the position of entities by incrementing their x and y coordinates by 1.
    * @param entities - The set of entities to update.
    * @param p5 - The p5 instance to use for drawing.
    */
   update(entities: Set<Entity>, p5?: P5CanvasInstance<SketchProps>) {
      for (const entity of entities) {
         const position = this.ecs.getComponents(entity)?.get(Position);
         //const sprite = this.ecs.getComponents(entity)?.get(Sprite);
         if (p5) {
            p5.stroke("orange");
            p5.strokeWeight(10);
            p5.point(position!.getX(), position!.getY());
         }
      }
   }
}

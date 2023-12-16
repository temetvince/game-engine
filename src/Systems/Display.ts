import { System } from "../EntityComponentSystem/System.js";
import { Position } from "../Components/Position.js";
import { Sprite } from "../Components/Sprite.js";
import r from "raylib"; // Add import statement for 'r' module

export class Display extends System {
   componentsRequired = new Set<Function>([Position, Sprite]);

   update(entities: Set<Entity>) {
      for (const entity of entities) {
         const position = this.ecs.getComponents(entity)?.get(Position);
         r.BeginDrawing();
         r.DrawPixel(position!.x, position!.y, r.RED);
         r.EndDrawing();
      }
   }
}

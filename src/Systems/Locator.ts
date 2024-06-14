import { System } from "../EntityComponentSystem/System";
import { Position } from "../Components/Position";

/**
 * The Locator class is a system that tracks the position of entities in the game.
 * It extends the System class and implements the update method.
 */
export class Locator extends System {
   componentsRequired = new Set<Function>([Position]);

   /**
    * Updates the position of entities and logs their coordinates.
    * @param entities - The set of entities to update.
    */
   update(entities: Set<Entity>): void {
      for (const entity of entities) {
         const components = this.ecs.getComponents(entity);
         if (!components) continue;

         const position = components.get(Position);
         if (position) {
            console.log(
               `Entity ${entity} is at ${position.getX()}, ${position.getY()}`,
            );
         }
      }
   }
}

import { System } from "../EntityComponentSystem/System";
import { Position } from "../Components/Position";
import { Velocity } from "../Components/Velocity";
import { Boid } from "../Components/Boid";

/**
 * The Movement system is responsible for updating the position of entities
 * based on their velocity.
 */
export class Movement extends System {
  componentsRequired = new Set<Function>([Position, Velocity, Boid]);
  public dirtyComponents = new Set<Function>([Position]);

  /**
   * Updates the Movement system, adjusting the position of each entity
   * based on its velocity.
   *
   * @param entities - The set of entities to be updated.
   */
  update(entities: Set<Entity>): void {
    for (const entity of entities) {
      const position = this.ecs.getComponents(entity)!.get(Position)!;
      const velocity = this.ecs.getComponents(entity)!.get(Velocity)!;

      position.setX(position.getX() + velocity.getX());
      position.setY(position.getY() + velocity.getY());
    }
  }
}

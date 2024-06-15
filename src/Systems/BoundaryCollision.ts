import { System } from "../EntityComponentSystem/System";
import { Position } from "../Components/Position";
import { Velocity } from "../Components/Velocity";
import { Boid } from "../Components/Boid";
import { P5CanvasInstance, SketchProps } from "@p5-wrapper/react";

/**
 * The BoundaryCollision system handles collisions of boids with the canvas boundaries,
 * reversing their velocity upon collision.
 */
export class BoundaryCollision extends System {
  componentsRequired = new Set<Function>([Position, Velocity, Boid]);
  public dirtyComponents = new Set<Function>([Velocity]);

  /**
   * Updates the system by handling boundary collisions for all entities.
   *
   * @param entities - The set of entities to be updated.
   * @param p5 - The p5.js instance used for boundary detection.
   */
  update(entities: Set<Entity>, p5: P5CanvasInstance<SketchProps>): void {
    for (const entity of entities) {
      const position = this.ecs.getComponents(entity)!.get(Position)!;
      const velocity = this.ecs.getComponents(entity)!.get(Velocity)!;

      if (position.getX() <= 0 || position.getX() >= p5.width) {
        velocity.setX(-velocity.getX());
      }
      if (position.getY() <= 0 || position.getY() >= p5.height) {
        velocity.setY(-velocity.getY());
      }
    }
  }
}

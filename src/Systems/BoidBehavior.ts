import { System } from "../EntityComponentSystem/System";
import { Position } from "../Components/Position";
import { Velocity } from "../Components/Velocity";
import { Boid } from "../Components/Boid";
import { P5CanvasInstance, SketchProps } from "@p5-wrapper/react";
import { getNeighbors } from "../Utils";

/**
 * The BoidBehavior system is responsible for applying boid behaviors (alignment, cohesion, separation),
 * and handling boundary collisions.
 */
export class BoidBehavior extends System {
  componentsRequired = new Set<Function>([Position, Velocity, Boid]);
  public dirtyComponents = new Set<Function>([Velocity]);

  /**
   * Updates the BoidBehavior system, applying behaviors to all boids.
   *
   * @param entities - The set of entities to be updated.
   * @param p5 - The p5.js instance used for rendering and vector calculations.
   */
  update(entities: Set<Entity>, p5: P5CanvasInstance<SketchProps>): void {
    const perceptionRadius = 50;
    const maxForce = 0.05;
    const maxSpeed = 2;

    for (const entity of entities) {
      const position = this.ecs.getComponents(entity)!.get(Position)!;
      const velocity = this.ecs.getComponents(entity)!.get(Velocity)!;

      const neighbors = getNeighbors(entity, entities, position, perceptionRadius);

      if (neighbors.length === 0) continue;

      this.applyBoidBehaviors(p5, position, velocity, neighbors, maxForce, maxSpeed);
    }
  }

  /**
   * Applies the Boids rules (separation, alignment, cohesion) to the boid's velocity.
   *
   * @param p5 - Instance of p5.js for vector calculations.
   * @param position - The position of the current boid.
   * @param velocity - The velocity of the current boid.
   * @param neighbors - Array of neighboring boid entities.
   * @param maxForce - The maximum steering force.
   * @param maxSpeed - The maximum speed.
   */
  private applyBoidBehaviors(
    p5: P5CanvasInstance<SketchProps>,
    position: Position,
    velocity: Velocity,
    neighbors: Entity[],
    maxForce: number,
    maxSpeed: number
  ) {
    const alignment = p5.createVector(0, 0);
    const cohesion = p5.createVector(0, 0);
    const separation = p5.createVector(0, 0);

    for (const neighbor of neighbors) {
      const neighborPosition = this.ecs.getComponents(neighbor)!.get(Position)!;
      const neighborVelocity = this.ecs.getComponents(neighbor)!.get(Velocity)!;

      alignment.add(p5.createVector(neighborVelocity.getX(), neighborVelocity.getY()));
      cohesion.add(p5.createVector(neighborPosition.getX(), neighborPosition.getY()));

      const diff = p5
        .createVector(position.getX(), position.getY())
        .sub(p5.createVector(neighborPosition.getX(), neighborPosition.getY()));
      diff.div(position.distanceTo(neighborPosition));
      separation.add(diff);
    }

    alignment.div(neighbors.length).limit(maxForce);
    cohesion.div(neighbors.length).sub(p5.createVector(position.getX(), position.getY())).limit(maxForce);
    separation.div(neighbors.length).limit(maxForce);

    velocity.set(
      velocity.getX() + alignment.x + cohesion.x + separation.x,
      velocity.getY() + alignment.y + cohesion.y + separation.y
    );

    const speed = p5.createVector(velocity.getX(), velocity.getY()).limit(maxSpeed);
    velocity.set(speed.x, speed.y);
  }
}

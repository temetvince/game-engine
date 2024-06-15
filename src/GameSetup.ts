import { Position } from "./Components/Position";
import { Velocity } from "./Components/Velocity";
import { Boid } from "./Components/Boid";
import { ECS } from "./ECS";
import { EntityComponentSystem } from "./EntityComponentSystem/EntityComponentSystem";
import { Display } from "./Systems/Display";
import { Movement } from "./Systems/Movement";
import { BoidBehavior } from "./Systems/BoidBehavior";
import { BoundaryCollision } from "./Systems/BoundaryCollision";
import { GroupColor } from "./Systems/GroupColor";

/**
 * The number of boids to initialize.
 */
const numberOfBoids = 100;

/**
 * Initializes the Entity Component System (ECS) and sets up the game entities and systems.
 *
 * @returns The initialized entity component system.
 */
export const GameSetup = (): EntityComponentSystem => {
  const ecs = ECS.get();

  // Initialize entities with Position, Velocity, and Boid components
  initializeEntities(ecs, numberOfBoids);

  // Add systems to the ECS in the correct order
  ecs.addSystem(new GroupColor());
  ecs.addSystem(new BoidBehavior());
  ecs.addSystem(new BoundaryCollision());
  ecs.addSystem(new Movement());
  ecs.addSystem(new Display());

  return ecs;
};

/**
 * Initializes a specified number of entities with random Position and Velocity components,
 * and a Boid component to mark them as boids.
 *
 * @param ecs - The Entity Component System to which the entities are added.
 * @param count - The number of entities to initialize.
 */
const initializeEntities = (
  ecs: EntityComponentSystem,
  count: number,
): void => {
  for (let i = 0; i < count; i++) {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const vx = Math.random() * 2 - 1;
    const vy = Math.random() * 2 - 1;

    const entity = ecs.addEntity();
    ecs.addComponent(entity, new Position(x, y));
    ecs.addComponent(entity, new Velocity(vx, vy));
    ecs.addComponent(entity, new Boid());
  }
};

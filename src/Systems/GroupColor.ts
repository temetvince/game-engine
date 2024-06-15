import { Color } from "../Components/Color";
import { Boid } from "../Components/Boid";
import { Group } from "../Components/Group";
import { Position } from "../Components/Position";
import { System } from "../EntityComponentSystem/System";
import { createUUID, getNeighbors } from "../Utils";

/**
 * The GroupColor system manages the assignment of group identifiers and colors
 * to boids and their neighbors, ensuring that all boids in the same group share the same color.
 */
export class GroupColor extends System {
  componentsRequired = new Set<Function>([Position, Boid]);
  public dirtyComponents = new Set<Function>([Color, Group]);

  /**
   * A map storing colors for each group.
   */
  private static groupColors: Map<string, string> = new Map();

  /**
   * Generates a random color in hexadecimal format.
   * @returns A random color string.
   */
  private static getRandomColor(): string {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  /**
   * Updates the system by managing group colors for all entities.
   *
   * @param entities - The set of entities to be updated.
   */
  update(entities: Set<Entity>): void {
    for (const entity of entities) {
      let group = this.ecs.getComponents(entity)!.get(Group);
      if (!group) {
        group = new Group(createUUID());
        this.ecs.addComponent(entity, group);
        GroupColor.groupColors.set(group.getId(), GroupColor.getRandomColor());
      }

      const groupId = group.getId();
      const color = GroupColor.groupColors.get(groupId)!;

      const neighbors = getNeighbors(
        entity,
        entities,
        this.ecs.getComponents(entity)!.get(Position)!,
        100
      );
      neighbors.forEach((neighbor) => {
        let neighborGroup = this.ecs.getComponents(neighbor)!.get(Group);
        if (!neighborGroup) {
          neighborGroup = new Group(groupId);
          this.ecs.addComponent(neighbor, neighborGroup);
        }
        let neighborColor = this.ecs.getComponents(neighbor)!.get(Color);
        if (!neighborColor) {
          neighborColor = new Color(color);
          this.ecs.addComponent(neighbor, neighborColor);
        } else {
          neighborColor.setColor(color);
        }
      });

      let colorComponent = this.ecs.getComponents(entity)!.get(Color);
      if (!colorComponent) {
        colorComponent = new Color(color);
        this.ecs.addComponent(entity, colorComponent);
      } else {
        colorComponent.setColor(color);
      }
    }
  }
}

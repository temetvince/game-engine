import { Entity } from "./Entity.js";
import { Position } from "./Position.js";
import { System } from "./System.js";

export class Locator extends System {
   componentsRequired = new Set<Function>([Position]);

   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   update(entities: Set<Entity>): void {}
}

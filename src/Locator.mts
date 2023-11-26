import { Entity } from "./Entity.mjs";
import { Position } from "./Position.mjs";
import { System } from "./System.mjs";

export class Locator extends System {
   componentsRequired = new Set<Function>([Position]);

   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   update(entities: Set<Entity>): void {}
}

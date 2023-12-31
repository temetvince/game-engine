import { ReactP5Wrapper, Sketch } from "@p5-wrapper/react";
import React from "react";
import { Position } from "./Components/Position";
import { Velocity } from "./Components/Velocity";
import { GetECS } from "./GetECS";
import { EntityComponentSystem } from "./EntityComponentSystem/EntityComponentSystem";
import { Sprite } from "./Components/Sprite";

/**
 * The sketch that renders the game.
 * @param p5 The p5 instance.
 */
const sketch: Sketch = (p5) => {
   let ecs: EntityComponentSystem | null = null;

   p5.setup = () => {
      p5.createCanvas(600, 400);
      ecs = setupGame();
   };

   p5.draw = () => {
      p5.background(250);
      ecs?.update(p5);
   };
};

/**
 * Sets up the game.
 * @returns The entity component system.
 */
const setupGame = () => {
   const ecs = GetECS.getInstance();

   const entity = ecs.addEntity();
   ecs.addComponent(entity, new Position(0, 0));
   ecs.addComponent(entity, new Velocity(1, 1));
   ecs.addComponent(entity, new Sprite());

   return ecs;
};

/**
 * Renders the main application component.
 * @returns The rendered React component.
 */
export function App() {
   return <ReactP5Wrapper sketch={sketch} />;
}

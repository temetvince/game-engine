import {
   P5CanvasInstance,
   ReactP5Wrapper,
   Sketch,
   SketchProps,
} from "@p5-wrapper/react";
import React, { useEffect } from "react";
import { Position } from "./Components/Position";
import { Velocity } from "./Components/Velocity";
import { ECS } from "./ECS";
import { EntityComponentSystem } from "./EntityComponentSystem/EntityComponentSystem";
import { Sprite } from "./Components/Sprite";

/**
 * The sketch that renders the game.
 * @param p5 The p5 instance.
 */
const sketch: Sketch = (p5) => {
   let ecs: EntityComponentSystem | null = null;

   p5.setup = () => {
      setupCanvas(p5);
      ecs = setupGame();
   };

   p5.windowResized = () => {
      p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
   };

   p5.draw = () => {
      p5.background(0);
      ecs?.update(p5);
   };
};

/**
 * Sets up the canvas with the desired styles.
 * @param p5 The p5 instance.
 */
const setupCanvas = (p5: P5CanvasInstance<SketchProps>) => {
   const canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight);
   canvas.style("display", "block");
   canvas.style("margin", "0");
   canvas.style("padding", "0");
   canvas.style("overflow", "hidden");
};

/**
 * Sets up the game by initializing the ECS and adding components to entities.
 * @returns {EntityComponentSystem} The initialized entity component system.
 */
const setupGame = (): EntityComponentSystem => {
   const ecs = ECS.get();
   const entity = ecs.addEntity();
   ecs.addComponent(entity, new Position(0, 0));
   ecs.addComponent(entity, new Velocity(2, 3));
   ecs.addComponent(entity, new Sprite());
   return ecs;
};

/**
 * Renders the main application component.
 * @returns {JSX.Element} The React component rendering the p5 sketch.
 */
export function App(): JSX.Element {
   useGlobalStyles();

   return <ReactP5Wrapper sketch={sketch} />;
}

/**
 * Injects global styles for the body and html elements.
 */
const useGlobalStyles = () => {
   useEffect(() => {
      const style = document.createElement("style");
      style.innerHTML = `
         body, html {
            margin: 0;
            padding: 0;
            overflow: hidden;
            width: 100%;
            height: 100%;
         }
      `;
      document.head.appendChild(style);
      return () => {
         document.head.removeChild(style);
      };
   }, []);
};

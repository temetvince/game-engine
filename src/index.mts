import r from "raylib";
import { ECS } from "./EntityComponentSystem.mjs";
import { Position } from "./Position.mjs";
import { Locator } from "./Locator.mjs";

const screenWidth = 800;
const screenHeight = 450;

const ecs = new ECS();

setupRaylib();

while (!r.WindowShouldClose()) {
   drawWelcomeScreen();

   testEC();
   testECS();
}

r.CloseWindow();

function setupRaylib() {
   r.InitWindow(
      screenWidth,
      screenHeight,
      "raylib [core] example - basic window",
   );
   r.SetTargetFPS(60);
}

function drawWelcomeScreen() {
   r.BeginDrawing();
   r.ClearBackground(r.RAYWHITE);
   r.DrawText(
      "Congrats! You created your first node-raylib window!",
      120,
      200,
      20,
      r.LIGHTGRAY,
   );
   r.EndDrawing();
}

function testEC() {
   const entity = ecs.addEntity();
   const position = new Position(5, 5);
   ecs.addComponent(entity, position);

   const comps = ecs.getComponents(entity);
   console.log(comps?.has(Position));

   const p = comps?.get(Position);
   console.log(p?.x + " " + p?.y);

   ecs.removeComponent(entity, Position);
}

function testECS() {
   const locator = new Locator();
   ecs.addSystem(locator);

   const entity = ecs.addEntity();
   const position = new Position(10, 10);
   ecs.addComponent(entity, position);

   ecs.removeSystem(locator);
}

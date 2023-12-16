import { GetECS } from "../EntityComponentSystem/GetECS";
import { WindowParams } from "./WindowParams";
import * as r from "raylib";

/**
 * Represents the parameters for the main window of the game engine.
 */
export class MainWindowParams implements WindowParams {
   /**
    * Initializes the main window with the specified dimensions and title.
    */
   public getInit() {
      r.InitWindow(800, 600, "Game Engine");
      r.SetTargetFPS(60);
   }

   /**
    * Draws the content of the main window.
    */
   public getDraw() {
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

   /**
    * Executes the game logic.
    */
   public getExecute() {
      const ecs = GetECS.getInstance();
      ecs.update();
   }
}

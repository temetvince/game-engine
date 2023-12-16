import { GetECS } from "../EntityComponentSystem/GetECS";
import { WindowParams } from "./WindowParams";
import r from "raylib";

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
    * Executes the game logic.
    */
   public getDraw() {
      const ecs = GetECS.getInstance();
      ecs.update();
   }
}

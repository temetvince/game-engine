import r from "raylib";
import { WindowParams } from "./WindowParams";

/**
 * Represents a window in the game engine.
 */
export class Window {
   /**
    * Creates a new instance of the Window class.
    * @param params - The parameters for initializing the window.
    */
   constructor(params: WindowParams) {
      params.getInit();

      while (!r.WindowShouldClose()) {
         params.getDraw?.();
      }

      r.CloseWindow();
   }
}

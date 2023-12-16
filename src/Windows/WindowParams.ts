/**
 * Represents the parameters for a window in the game engine.
 */
export interface WindowParams {
   /**
    * Gets the initialization function for the window.
    */
   getInit: () => void;

   /**
    * Gets the draw function for the window.
    */
   getDraw?: () => void;

   /**
    * Gets the execution function for the window.
    */
   getExecute?: () => void;
}

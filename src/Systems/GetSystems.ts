import { Locator } from "./Locator";
import { Mover } from "./Mover"; // Import the 'Mover' class

/**
 * Retrieves an array of systems.
 * @returns {Array<System>} An array of systems.
 */
export const GetSystems = () => {
   return [new Locator(), new Mover()];
};

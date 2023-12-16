import { Locator } from "./Locator";
import { Driver } from "./Driver";
import { Display } from "./Display";
import { Mover } from "./Mover";

/**
 * Retrieves an array of systems.
 * @returns {Array<System>} An array of systems.
 */
export const GetSystems = () => {
   return [new Locator(), new Driver(), new Display(), new Mover()];
};

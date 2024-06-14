import { EntityComponentSystem } from "./EntityComponentSystem/EntityComponentSystem";
import { System } from "./EntityComponentSystem/System";
import { Locator } from "./Systems/Locator";
import { Display } from "./Systems/Display";
import { Driver } from "./Systems/Driver";
import { Mover } from "./Systems/Mover";

/**
 * The ECS class provides a singleton instance of the EntityComponentSystem.
 * It initializes with a set of predefined systems.
 */
export class ECS {
   /**
    * The static field that holds the singleton instance of EntityComponentSystem.
    */
   private static instance: EntityComponentSystem;

   /**
    * The array of systems used in the ECS. This is a static array used to
    * initialize the singleton instance.
    */
   private static systems: Array<System> = [
      new Display(),
      new Locator(),
      new Driver(),
      new Mover(),
   ];

   /**
    * Private constructor to prevent direct instantiation.
    */
   private constructor() {}

   /**
    * Provides access to the singleton instance of EntityComponentSystem.
    * Initializes the instance and adds systems if it doesn't exist.
    *
    * @returns {EntityComponentSystem} The singleton instance.
    */
   public static get(): EntityComponentSystem {
      if (!ECS.instance) {
         ECS.instance = new EntityComponentSystem();
         ECS.systems.forEach((system: System) =>
            ECS.instance.addSystem(system),
         );
      }
      return ECS.instance;
   }
}

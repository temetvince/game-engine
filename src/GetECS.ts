import { EntityComponentSystem } from "./EntityComponentSystem/EntityComponentSystem";
import { System } from "./EntityComponentSystem/System";
import { Locator } from "./Systems/Locator";
import { Display } from "./Systems/Display";
import { Driver } from "./Systems/Driver";
import { Mover } from "./Systems/Mover";

/**
 * The Singleton class defines the `getInstance` method that lets clients access
 * the unique singleton instance.
 */
export class GetECS {
   /**
    * The static field that controls the access to the singleton instance.
    *
    * This implementation let you extend the Singleton class while keeping
    * just one instance of each subclass around.
    */
   private static instance: EntityComponentSystem;

   /**
    * The array of systems used in the ECS. This is a static array because
    * it is used to initialize the singleton instance,
    * but it is not used anywhere else.
    * @type {Array<System>}
    */
   private static systems: Array<System> = [
      new Display(),
      new Locator(),
      new Driver(),
      new Mover(),
   ];

   /**
    * The Singleton's constructor should always be private to prevent direct
    * construction calls with the `new` operator.
    */
   private constructor() {}

   /**
    * The static method that controls the access to the singleton instance.
    *
    * This implementation let you subclass the Singleton class while keeping
    * just one instance of each subclass around.
    */
   public static getInstance(): EntityComponentSystem {
      if (!GetECS.instance) {
         GetECS.instance = new EntityComponentSystem();

         GetECS.systems.forEach((system: System) => {
            GetECS.instance.addSystem(system);
         });
      }

      return GetECS.instance;
   }
}

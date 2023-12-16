import { EntityComponentSystem } from "./EntityComponentSystem/EntityComponentSystem";
import { System } from "./EntityComponentSystem/System";
import { GetSystems } from "./Systems/GetSystems";

/**
 * The Singleton class defines the `getInstance` method that lets clients access
 * the unique singleton instance.
 */
export class GetECS {
   private static instance: EntityComponentSystem;

   /**
    * The Singleton's constructor should always be private to prevent direct
    * construction calls with the `new` operator.
    */
   private constructor() {}

   /**
    * The static method that controls the access to the singleton instance.
    *
    * This implementation lets you subclass the Singleton class while keeping
    * just one instance of each subclass around.
    */
   public static getInstance(): EntityComponentSystem {
      if (!GetECS.instance) {
         GetECS.instance = new EntityComponentSystem();

         GetSystems().forEach((system: System) => {
            GetECS.instance.addSystem(system);
         });
      }

      return GetECS.instance;
   }
}

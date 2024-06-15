import { EntityComponentSystem } from "./EntityComponentSystem/EntityComponentSystem";

/**
 * The ECS class provides a singleton instance of the EntityComponentSystem.
 * It initializes with a set of predefined systems.
 */
export class ECS {
   /**
    * The static field that holds the singleton instance of EntityComponentSystem.
    */
   private static instance: EntityComponentSystem | null = null;

   /**
    * Private constructor to prevent direct instantiation.
    */
   private constructor() {}

   /**
    * Provides access to the singleton instance of EntityComponentSystem.
    * Initializes the instance if it doesn't exist.
    *
    * @returns The singleton instance of EntityComponentSystem.
    */
   public static get(): EntityComponentSystem {
      if (!ECS.instance) {
         ECS.instance = new EntityComponentSystem();
      }
      return ECS.instance;
   }
}

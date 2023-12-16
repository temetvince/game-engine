import { Component } from "../EntityComponentSystem/Component.js";

/**
 * Represents the velocity of an object in a 2D space.
 */
export class Velocity extends Component {
   /**
    * Creates a new instance of the Velocity class.
    * @param x The velocity along the x-axis.
    * @param y The velocity along the y-axis.
    */
   constructor(
      public x: number,
      public y: number,
   ) {
      super();
   }

   /**
    * Checks if this velocity is equal to another velocity.
    * @param other The other velocity to compare with.
    * @returns True if the velocities are equal, false otherwise.
    */
   equals(other: Velocity) {
      return this.x === other.x && this.y === other.y;
   }
}

import { Component } from "../EntityComponentSystem/Component";

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
      private x: number,
      private y: number,
   ) {
      super();
   }

   /**
    * Sets the velocity along the x-axis.
    * @param x The velocity along the x-axis.
    */
   setX(x: number) {
      this.x = x;
      this.isDirty = true;

      return this;
   }

   getX() {
      return this.x;
   }

   /**
    * Sets the velocity along the y-axis.
    * @param y The velocity along the y-axis.
    */
   setY(y: number) {
      this.y = y;
      this.isDirty = true;

      return this;
   }

   getY() {
      return this.y;
   }

   /**
    * Sets the velocity along the x and y axes.
    * @param x The velocity along the x-axis.
    * @param y The velocity along the y-axis.
    */
   set(x: number, y: number) {
      this.x = x;
      this.y = y;
      this.isDirty = true;

      return this;
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

import { Component } from "../EntityComponentSystem/Component";

/**
 * Represents the position of an entity in the game.
 */
export class Position extends Component {
   constructor(
      private x: number,
      private y: number,
   ) {
      super();
   }

   set(x: number, y: number) {
      this.x = x;
      this.y = y;
      this.isDirty = true;

      return this;
   }

   setX(x: number) {
      this.x = x;
      this.isDirty = true;

      return this;
   }

   getX() {
      return this.x;
   }

   setY(y: number) {
      this.y = y;
      this.isDirty = true;

      return this;
   }

   getY() {
      return this.y;
   }

   /**
    * Checks if the current position is equal to another position.
    * @param other The other position to compare with.
    * @returns True if the positions are equal, false otherwise.
    */
   equals(other: Position) {
      return this.x === other.x && this.y === other.y;
   }

   /**
    * Checks if the x-coordinate of this position is greater than the x-coordinate of another position.
    * @param other The other position to compare against.
    * @returns True if the x-coordinate of this position is greater than the x-coordinate of the other position, false otherwise.
    */
   greaterThanX(other: Position) {
      return this.x > other.x;
   }

   /**
    * Checks if the x-coordinate of this position is less than the x-coordinate of another position.
    * @param other - The other position to compare against.
    * @returns True if the x-coordinate of this position is less than the x-coordinate of the other position, false otherwise.
    */
   lessThanX(other: Position) {
      return this.x < other.x;
   }

   /**
    * Checks if the y-coordinate of this position is greater than the y-coordinate of another position.
    * @param other The other position to compare against.
    * @returns True if the y-coordinate of this position is greater than the y-coordinate of the other position, false otherwise.
    */
   greaterThanY(other: Position) {
      return this.y > other.y;
   }

   /**
    * Checks if the y-coordinate of this position is less than the y-coordinate of another position.
    * @param other The other position to compare against.
    * @returns True if the y-coordinate of this position is less than the y-coordinate of the other position, false otherwise.
    */
   lessThanY(other: Position) {
      return this.y < other.y;
   }
}

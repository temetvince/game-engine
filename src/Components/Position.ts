import { Component } from "../EntityComponentSystem/Component.js";

/**
 * Represents the position of an entity in the game.
 */
export class Position extends Component {
   constructor(
      public x: number,
      public y: number,
   ) {
      super();
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

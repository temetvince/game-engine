import { Component } from "../EntityComponentSystem/Component";

/**
 * Represents the position of an entity in the game.
 */
export class Position extends Component {
   private x: number;
   private y: number;

   constructor(x: number, y: number) {
      super();
      this.x = x;
      this.y = y;
   }

   /**
    * Sets both x and y coordinates.
    * @param x - The x-coordinate.
    * @param y - The y-coordinate.
    * @returns The current Position instance.
    */
   set(x: number, y: number): this {
      this.x = x;
      this.y = y;
      this.isDirty = true;
      return this;
   }

   /**
    * Sets the x-coordinate.
    * @param x - The x-coordinate.
    * @returns The current Position instance.
    */
   setX(x: number): this {
      this.x = x;
      this.isDirty = true;
      return this;
   }

   /**
    * Gets the x-coordinate.
    * @returns The x-coordinate.
    */
   getX(): number {
      return this.x;
   }

   /**
    * Sets the y-coordinate.
    * @param y - The y-coordinate.
    * @returns The current Position instance.
    */
   setY(y: number): this {
      this.y = y;
      this.isDirty = true;
      return this;
   }

   /**
    * Gets the y-coordinate.
    * @returns The y-coordinate.
    */
   getY(): number {
      return this.y;
   }

   /**
    * Checks if the current position is equal to another position.
    * @param other - The other position to compare with.
    * @returns True if the positions are equal, false otherwise.
    */
   equals(other: Position): boolean {
      return this.x === other.x && this.y === other.y;
   }

   /**
    * Checks if the x-coordinate of this position is greater than the x-coordinate of another position.
    * @param other - The other position to compare against.
    * @returns True if the x-coordinate of this position is greater than the x-coordinate of the other position, false otherwise.
    */
   greaterThanX(other: Position): boolean {
      return this.x > other.x;
   }

   /**
    * Checks if the x-coordinate of this position is less than the x-coordinate of another position.
    * @param other - The other position to compare against.
    * @returns True if the x-coordinate of this position is less than the x-coordinate of the other position, false otherwise.
    */
   lessThanX(other: Position): boolean {
      return this.x < other.x;
   }

   /**
    * Checks if the y-coordinate of this position is greater than the y-coordinate of another position.
    * @param other - The other position to compare against.
    * @returns True if the y-coordinate of this position is greater than the y-coordinate of the other position, false otherwise.
    */
   greaterThanY(other: Position): boolean {
      return this.y > other.y;
   }

   /**
    * Checks if the y-coordinate of this position is less than the y-coordinate of another position.
    * @param other - The other position to compare against.
    * @returns True if the y-coordinate of this position is less than the y-coordinate of the other position, false otherwise.
    */
   lessThanY(other: Position): boolean {
      return this.y < other.y;
   }
}

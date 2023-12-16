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
}

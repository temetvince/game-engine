import { Component } from "./Component.js";

export class Position extends Component {
   constructor(
      public x: number,
      public y: number,
   ) {
      super();
   }
}

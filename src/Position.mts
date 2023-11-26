import { Component } from "./Component.mjs";

export class Position extends Component {
   constructor(
      public x: number,
      public y: number,
   ) {
      super();
   }
}

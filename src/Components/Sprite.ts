import { Component } from "../EntityComponentSystem/Component";

/**
 * Represents a sprite component.
 * This component is used to attach visual representation to an entity.
 */
export class Sprite extends Component {
   // Add any sprite-specific properties here in the future, e.g., image, size, etc.

   constructor() {
      super();
      // Initialize sprite-specific properties if needed
   }

   /**
    * Example method to set a sprite image.
    * @param image - The image to be set for the sprite.
    */
   // setImage(image: string): void {
   //    this.image = image;
   //    this.isDirty = true;
   // }

   // Add more sprite-related methods as needed
}

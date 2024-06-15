# A React ECS Game Engine Written in TypeScript

This project is a React application that utilizes an Entity Component System (ECS) architecture to manage and render entities in a 2D space using p5.js. The ECS pattern is commonly used in game development for its flexibility and efficiency in managing game entities and their behaviors.

## Entity Component System (ECS)

### Entities
Entities are unique identifiers (strings) that are used to look up associated components.

### Components
Components are data containers that hold specific attributes of entities. Examples include:
- **Position**: Represents the position of an entity.
- **Velocity**: Represents the velocity of an entity.
- **Sprite**: Represents a visual representation of an entity.

#### isDirty Flag
Each component has an `isDirty` flag that indicates whether the component has been modified and needs to be updated. This flag is used to optimize the system updates by only processing entities with components that have changed. Components should set this flag to `true` whenever their state changes, and it can be reset using the `resetDirty` method.

### Systems
Systems contain the logic that operates on entities with specific components. Examples include:
- **Driver**: Updates entity positions based on velocity and handles boundary collisions.
- **Display**: Renders entities to the canvas.
- **Locator**: Logs the position of entities for debugging purposes.
- **Mover**: Moves entities based on their velocity.

## React Integration
The React application is structured to integrate with p5.js using the `ReactP5Wrapper`. The main application component, `App`, is responsible for initializing and rendering the p5.js sketch.

## p5.js Integration
The p5.js library is used for rendering and animation. The `sketch` function sets up the canvas and updates the ECS each frame.

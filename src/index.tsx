import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";

/**
 * Initializes the React application by rendering the App component.
 */
function initializeReactApp() {
   const container = document.getElementById("root");

   if (container) {
      const root = createRoot(container);
      root.render(<App />);
   }
}

// Initialize the React application
initializeReactApp();

import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

/**
 * Initializes and renders the React application.
 */
function initializeReactApp() {
   const container = document.getElementById("root");

   if (container) {
      const root = createRoot(container);
      root.render(<App />);
   } else {
      console.error(
         "Root container not found. Unable to initialize the React app.",
      );
   }
}

// Call the function to initialize the React application
initializeReactApp();

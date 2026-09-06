import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createMemoryHistory } from "history"; // Not imported from react-router-dom because React Router uses this library.

// Mount function to start up the app. Renders JSX in given element.
const mount = (element) => {
  const history = createMemoryHistory(); // Routing for subapps will rely on memory history, while routing for container app will rely on browser history.

  ReactDOM.render(<App history={history} />, element);
};

// If in development and in isolation, call mount immediately
if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_marketing-dev-root");

  if (devRoot) {
    mount(devRoot);
  }
}

// If running through container, export the mount function
export { mount };

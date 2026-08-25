import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// Mount function to start up the app. Renders JSX in given element.
const mount = (element) => {
  ReactDOM.render(<App />, element);
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

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createMemoryHistory } from "history"; // Not imported from react-router-dom because React Router uses this library.

// Mount function to start up the app. Renders JSX in given element.
const mount = (element, { onNavigate }) => {
  const history = createMemoryHistory(); // Routing for subapps will rely on memory history, while routing for container app will rely on browser history.

  // Make sure onNavigate is only invoked if it has been passed down from container app
  if (onNavigate) {
    // "listen" event listener exists on history object and will call any function provided as argument.
    // onNavigate is invoked whenever memory history's URL (path) changes and communicates up to the container app.
    history.listen(onNavigate);
  }

  ReactDOM.render(<App history={history} />, element);

  // mount now returns a function. facilitates container to subapp (child) communication
  return {
    onParentNavigate(location) {
      console.log(location); // location object derives from history.listen(onParentNavigate) function in MarketingApp.js
    },
  };
};

// If in development and in isolation, call mount immediately
if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_marketing-dev-root");

  if (devRoot) {
    mount(devRoot, {}); // Empty options object provided as second argument to prevent error when running Marketing subapp in isolation
  }
}

// If running through container, export the mount function
export { mount };

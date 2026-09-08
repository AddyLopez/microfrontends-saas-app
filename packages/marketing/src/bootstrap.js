import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createMemoryHistory, createBrowserHistory } from "history"; // Not imported from react-router-dom because React Router uses this library.

// Mount function to start up the app. Renders JSX in given element.
const mount = (element, { onNavigate, defaultHistory }) => {
  const history = defaultHistory || createMemoryHistory(); // defaultHistory is used when running Marketing app in isolation in development. Otherwise, routing for subapps will rely on memory history, while routing for container app will rely on browser history.

  // Make sure onNavigate is only invoked if it has been passed down from container app
  if (onNavigate) {
    // "listen" event listener exists on history object and will call any function provided as argument.
    // onNavigate is invoked whenever memory history's URL (path) changes and communicates up to the container app.
    history.listen(onNavigate);
  }

  ReactDOM.render(<App history={history} />, element);

  // mount now returns a function. facilitates container to subapp (child) communication
  return {
    onParentNavigate({ pathname: nextPathname }) {
      const { pathname } = history.location; // destructures pathname from memory history's location object

      // prevents circular logic between browser history and memory history: if the two paths are not the same, then the navigation paths need to be synced.
      if (pathname !== nextPathname) {
        history.push(nextPathname); // syncs browser history detected in container with memory history in subapp
      }
    },
  };
};

// If in development and in isolation, call mount immediately
if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_marketing-dev-root");

  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory() }); // Option provided of defaultHistory. Its value is an instance of Browser History. Its goal is to improve development experience when running this subapp in isolation by providing routing paths via browser history in the URL, not just in memory history.
  }
}

// If running through container, export the mount function
export { mount };

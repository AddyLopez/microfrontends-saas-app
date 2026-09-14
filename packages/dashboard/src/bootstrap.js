import { createApp } from "vue";
import Dashboard from "./components/Dashboard.vue";

// Mount function to start up the app.
const mount = (element) => {
  const app = createApp(Dashboard);
  app.mount(element); // This mount function on app is specific to Vue and unrelated to the other mount function. It tells Vue to show a component inside the DOM.
};

// If in development and in isolation, call mount immediately
if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_dashboard-dev-root");

  if (devRoot) {
    mount(devRoot);
  }
}

// If running through container, export the mount function
export { mount };

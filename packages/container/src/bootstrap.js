import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const root = createRoot(document.querySelector("#root"));
root.render(<App />);

// Container does not need a mount function. Only sub-apps need conditional rendering based on development mode

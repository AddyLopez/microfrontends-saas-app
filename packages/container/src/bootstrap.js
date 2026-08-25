import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(<App />, document.querySelector("#root"));

// Container does not need a mount function. Only sub-apps need conditional rendering based on development mode

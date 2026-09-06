import React from "react";
import { Switch, Route, Router } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";

import Landing from "./components/Landing";
import Pricing from "./components/Pricing";

// productionPrefix is provided to prevent CSS class name collisions in production between microfrontends
const generateClassName = createGenerateClassName({
  productionPrefix: "ma",
});

// Using Router rather than BrowserRouter enables use of Memory History for subapps while Browser History is used for the container app
const App = ({ history }) => {
  return (
    <div>
      <StylesProvider generateClassName={generateClassName}>
        <Router history={history}>
          <Switch>
            <Route exact path="/pricing" component={Pricing} />
            <Route path="/" component={Landing} />
          </Switch>
        </Router>
      </StylesProvider>
    </div>
  );
};

export default App;

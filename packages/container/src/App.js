import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MarketingApp from "./components/MarketingApp";
import AuthApp from "./components/AuthApp";
import Header from "./components/Header";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
// It's no longer necessary to import the mount function here in App.js
// This solution meets inflexible design requirement of near-zero coupling between container and child apps.
// Container shouldn't assume child uses a particular framework. Any necessary communication should be done with callbacks or simple events

// productionPrefix is provided to future-proof application from CSS class name collisions in production.
const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

const App = () => {
  return (
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header />
          <Switch>
            <Route path="/auth" component={AuthApp} />
            <Route path="/" component={MarketingApp} />
          </Switch>
        </div>
      </StylesProvider>
    </BrowserRouter>
  );
};

export default App;

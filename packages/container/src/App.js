import React, { lazy, Suspense } from "react"; // lazy is a function. Suspense is a component.
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
// It's no longer necessary to import the mount function here in App.js
// This solution meets inflexible design requirement of near-zero coupling between container and child apps.
// Container shouldn't assume child uses a particular framework. Any necessary communication should be done with callbacks or simple events

// To enhance performance, only load or import code from subapp components when needed
const MarketingLazy = lazy(() => import("./components/MarketingApp"));
const AuthLazy = lazy(() => import("./components/AuthApp"));

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
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route path="/auth" component={AuthLazy} />
              <Route path="/" component={MarketingLazy} />
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </BrowserRouter>
  );
};

export default App;

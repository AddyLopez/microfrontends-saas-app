import React, { lazy, Suspense, useState, useEffect } from "react"; // lazy is a function. Suspense is a component.
import { Router, Route, Switch, Redirect } from "react-router-dom"; // Redirect is a routing component, conditionally rendered below if isSignedIn is falsy
import { createBrowserHistory } from "history";
import Header from "./components/Header";
import ProgressBar from "./components/ProgressBar";
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
const DashboardLazy = lazy(() => import("./components/DashboardApp"));

// productionPrefix is provided to future-proof application from CSS class name collisions in production.
const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

const history = createBrowserHistory(); // Gives access to browser history instance in order to programmatically redirect user (e.g. when value of isSignedIn changes). Easier to use Router than using BrowserRouter.

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      history.push("/dashboard"); // if isSignedIn changes and isSignedIn is true, then redirect route to dashboard.
    }
  }, [isSignedIn]); // Runs whenever value of isSignedIn changes

  return (
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header
            onSignOut={() => setIsSignedIn(false)}
            isSignedIn={isSignedIn}
          />
          <Suspense fallback={<ProgressBar />}>
            <Switch>
              <Route path="/auth">
                <AuthLazy onSignIn={() => setIsSignedIn(true)} />
              </Route>
              <Route path="/dashboard">
                {!isSignedIn && <Redirect to="/" />}
                <DashboardLazy />
              </Route>
              <Route path="/" component={MarketingLazy} />
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </Router>
  );
};

export default App;

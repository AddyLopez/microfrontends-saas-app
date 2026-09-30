import React, { lazy, Suspense, useState } from "react"; // lazy is a function. Suspense is a component.
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { StyledEngineProvider } from "@mui/material/styles";

import Header from "./components/Header";
import ProgressBar from "./components/ProgressBar";

// It's no longer necessary to import the mount function here in App.js
// This solution meets inflexible design requirement of near-zero coupling between container and child apps.
// Container shouldn't assume child uses a particular framework. Any necessary communication should be done with callbacks or simple events

// To enhance performance, only load or import code from subapp components when needed
const MarketingLazy = lazy(() => import("./components/MarketingApp"));
const AuthLazy = lazy(() => import("./components/AuthApp"));
const DashboardLazy = lazy(() => import("./components/DashboardApp"));

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = () => {
    setIsSignedIn(true);
    navigate("/dashboard"); // If isSignedIn is true then redirect user to dashboard
  };

  // With React Router v6, a history object is no longer exposed directly. Instead, navigation state is built into the Router component itself. Explicit state management enables communication between the microfrontends while keeping Module Federation architecture intact.
  // injectFirst attribute causes MUI to be added to beginning of html head tag so as not to override global CSS styles
  return (
    <StyledEngineProvider injectFirst>
      <div>
        <Header
          onSignOut={() => setIsSignedIn(false)}
          isSignedIn={isSignedIn}
        />
        <Suspense fallback={<ProgressBar />}>
          <Routes>
            <Route
              path="/auth/*"
              element={<AuthLazy onSignIn={handleSignIn} />}
            />
            <Route
              path="/dashboard"
              element={!isSignedIn ? <Navigate to="/" /> : <DashboardLazy />}
            />
            <Route path="/*" element={<MarketingLazy />} />
          </Routes>
        </Suspense>
      </div>
    </StyledEngineProvider>
  );
};

export default () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

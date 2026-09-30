import React, { useState, useEffect } from "react";
import { Routes, Route, Router } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material/styles";

import Signin from "./components/Signin";
import Signup from "./components/Signup";

const App = ({ history, onSignIn }) => {
  const [location, setLocation] = useState(history.location); // With React Router v6, a history object is no longer exposed directly. Instead, navigation state is built into the Router component itself. Explicit state management enables communication between the microfrontends while keeping Module Federation architecture intact.

  useEffect(() => {
    // Listen to history changes and update location state
    const unlisten = history.listen((update) => {
      setLocation(update.location);
    });

    return unlisten; // clean up the listener on unmount
  }, [history]);

  // injectFirst attribute causes MUI to be added to beginning of html head tag so as not to override global CSS styles
  return (
    <div>
      <StyledEngineProvider injectFirst>
        <Router location={location} navigator={history}>
          <Routes>
            <Route
              path="/auth/signin"
              element={<Signin onSignIn={onSignIn} />}
            />
            <Route
              path="/auth/signup"
              element={<Signup onSignIn={onSignIn} />}
            />
          </Routes>
        </Router>
      </StyledEngineProvider>
    </div>
  );
};

export default App;

import React, { useState, useEffect } from "react";
import { Routes, Route, Router } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material/styles";

import Landing from "./components/Landing";
import Pricing from "./components/Pricing";

const App = ({ history }) => {
  const [location, setLocation] = useState(history.location); // With React Router v6, a history object is no longer exposed directly. Instead, navigation state is built into the Router component itself. Explicit state management enables communication between the microfrontends while keeping Module Federation architecture intact.

  useEffect(() => {
    // listen to history changes and update location state
    const unlisten = history.listen((update) => {
      setLocation(update.location);
    });

    return unlisten; // clean up the listener on unmount
  }, [history]);

  // Using Router rather than BrowserRouter enables use of Memory History for subapps while Browser History is used for the container app
  // injectFirst attribute causes MUI to be added to beginning of html head tag so as not to override global CSS styles
  return (
    <div>
      <StyledEngineProvider injectFirst>
        <Router location={location} navigator={history}>
          <Routes>
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/" element={<Landing />} />
          </Routes>
        </Router>
      </StyledEngineProvider>
    </div>
  );
};

export default App;

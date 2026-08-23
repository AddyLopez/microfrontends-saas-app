import React from "react";
import MarketingApp from "./components/MarketingApp"; // It's no longer necessary to import the mount function here in App.js

const App = () => {
  return (
    <div>
      <h1>Hello, from Container!</h1>
      <hr />
      <MarketingApp />
    </div>
  );
};

export default App;

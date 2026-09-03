import React from "react";
import MarketingApp from "./components/MarketingApp";
// It's no longer necessary to import the mount function here in App.js
// This solution meets inflexible design requirement of near-zero coupling between container and child apps.
// Container shouldn't assume child uses a particular framework. Any necessary communication should be done with callbacks or simple events

const App = () => {
  return (
    <div>
      <h1>Hello, from Container!!</h1>
      <hr />
      <MarketingApp />
    </div>
  );
};

export default App;

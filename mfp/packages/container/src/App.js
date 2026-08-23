import React from "react";
import { mount } from "marketing/MarketingApp";
// Why import mount funtion (rather than, say, a React Marketing component)? Its purpose is to meet inflexible design requirement of near-zero coupling between container and child apps.
// Container shouldn't assume chile uses a particular framework. Any necessary communication should be done with callbacks or simple events

console.log(mount);

const App = () => {
  return <h1>Hello, from Container!</h1>;
};

export default App;

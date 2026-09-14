// This pattern is reusable with any other framework (e.g. Angular, Vue, etc.) in child app, as long as child app can be rendered into some HTML element
import { mount } from "dashboard/DashboardApp";
import React, { useRef, useEffect } from "react";

const DashboardApp = () => {
  const ref = useRef(null); // useRef React hook creates a reference to an HTML element. Starting value of null

  // useEffect hook makes sure mount function is run only once when component is first displayed. ref.current is reference to HTML element
  useEffect(() => {
    mount(ref.current);
  }, []); // empty dependency array provided so that useEffect runs only once when DashboardApp is first rendered on the screen

  return <div ref={ref} />; // assign the reference to div. mount function will create instance of DashboardApp and render it into this div
};

export default DashboardApp;

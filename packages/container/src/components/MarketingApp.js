// This pattern is reusable with any other framework (e.g. Angular, Vue, etc.) in child app, as long as child app can be rendered into some HTML element
import { mount } from "marketing/MarketingApp";
import React, { useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const MarketingApp = () => {
  const ref = useRef(null); // useRef React hook creates a reference to an HTML element. Starting value of null
  const location = useLocation();
  const navigate = useNavigate();
  const onParentNaviagteRef = useRef(null);

  // useEffect hook makes sure mount function is run only once when component is first displayed. ref.current is reference to HTML element
  // pass in onNavigate function to mount function to pass down to Marketing subapp. Eventual purpose is to sync subapp's memory history with container app's browser history
  // pathname gets destructured from location object and renamed to nextPathname
  // because onParentNavigate function is returned by mount, it is destructured from mount for use
  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: location.pathname, // the option initialPath is set to Browser History's current path
      onNavigate: ({ pathname: nextPathname }) => {
        navigate(nextPathname);
      },
    });

    onParentNavigateRef.current = onParentNavigate;
  }, []); // empty dependency array provided so that useEffect runs only once when MarketingApp is first rendered on the screen

  // Sync navigation from container to child
  useEffect(() => {
    if (onParentNavigateRef.current) {
      onParentNavigateRef.current({ pathname: location.pathname });
    }
  }, [location]); // Only runs when location changes

  return <div ref={ref} />; // assign the reference to div. mount function will create instance of MarketingApp and render it into this div
};

export default MarketingApp;

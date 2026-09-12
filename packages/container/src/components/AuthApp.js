// This pattern is reusable with any other framework (e.g. Angular, Vue, etc.) in child app, as long as child app can be rendered into some HTML element
import { mount } from "auth/AuthApp";
import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

const AuthApp = () => {
  const ref = useRef(null); // useRef React hook creates a reference to an HTML element. Starting value of null
  const history = useHistory(); // history object represents Browser History currently used in container app (not memory history in subapps)

  // useEffect hook makes sure mount function is run only once when component is first displayed. ref.current is reference to HTML element
  // pass in onNavigate function to mount function to pass down to Auth subapp. Eventual purpose is to sync subapp's memory history with container app's browser history
  // pathname gets destructured from location object and renamed to nextPathname
  // because onParentNavigate function is returned by mount, it is destructured from mount for use
  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      onNavigate: ({ pathname: nextPathname }) => {
        const { pathname } = history.location; // pathname from current browser history in container

        // prevents circular logic between browser history and memory history: if the two paths are not the same, then the navigation paths need to be synced.
        if (pathname !== nextPathname) {
          history.push(nextPathname); // syncs memory history in subapp with browser history in container
        }
      },
    });

    history.listen(onParentNavigate); // listens for any change to Browser History and invokes onParentNavigate
  }, []); // empty dependency array provided so that useEffect runs only once when AuthApp is first rendered on the screen

  return <div ref={ref} />; // assign the reference to div. mount function will create instance of AuthApp and render it into this div
};

export default AuthApp;

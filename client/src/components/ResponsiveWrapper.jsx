import { Box } from "@material-ui/core";
import React, { useEffect, useState } from "react";

const ResponsiveWrapper = (props) => {
  const breakpoint = 600;
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);

    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);
  const isDesktopView = width > breakpoint;
  const newProps = {
    ...props,
    isDesktopView,
  };
  return <Box>{React.cloneElement(props.children, { ...newProps })}</Box>;
};

export default ResponsiveWrapper;

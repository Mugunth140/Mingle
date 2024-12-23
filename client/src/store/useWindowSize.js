import { useState, useEffect } from 'react';

// Define the breakpoints
const breakpoints = {
  mobile: 480,
  small: 600,
  medium: 900,
  large: 1200,
};

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    breakpoint: getBreakpoint(window.innerWidth),
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        breakpoint: getBreakpoint(window.innerWidth),
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowSize;
};

const getBreakpoint = (width) => {
  if (width < breakpoints.mobile) {
    return 'mobile';
  } else if (width < breakpoints.small) {
    return 'small';
  } else if (width < breakpoints.medium) {
    return 'medium';
  } else if (width < breakpoints.large) {
    return 'large';
  } else {
    return 'large';
  }
};

export default useWindowSize;
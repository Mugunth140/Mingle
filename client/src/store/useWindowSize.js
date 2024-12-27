import { useState, useEffect } from "react";

const getDeviceType = (width) => {
  if (width < 768) return "mobile";
  if (width >= 768 && width < 1024) return "tablet";
  return "desktop";
};

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState(() => ({
    width: window.innerWidth,
    height: window.innerHeight,
    device: getDeviceType(window.innerWidth),
  }));

  useEffect(() => {
    const handleResize = () => {
      setWindowSize((prev) => {
        const newWidth = window.innerWidth;
        const newDevice = getDeviceType(newWidth);
        if (prev.width === newWidth && prev.device === newDevice) return prev;

        return {
          width: newWidth,
          height: window.innerHeight,
          device: newDevice,
        };
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial size

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

export default useWindowSize;

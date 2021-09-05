import { useState, useEffect } from "react";

const useWindowsWidth = (width = 600) => {
  const [isScreenSmall, setIsScreenSmall] = useState(window.innerWidth < width);

  let checkScreenSize = () => {
    setIsScreenSmall(window.innerWidth < width);
  };
  useEffect(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isScreenSmall;
};

export default useWindowsWidth;

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScrollRestore = () => {
      // Retrieve saved scroll positions from sessionStorage
      const savedScrollPositions = JSON.parse(sessionStorage.getItem("scrollPositions")) || {};
      const savedPosition = savedScrollPositions[pathname];
      
      // Smooth and precise scroll restoration
      if (savedPosition) {
        setTimeout(() => {
          window.scrollTo({
            top: savedPosition.y,
            left: savedPosition.x,
            behavior: "smooth", // Instant restoration without smooth scrolling
          });
        }, 0); // Timeout ensures it executes after layout rendering
      } else {
        window.scrollTo(0, 0); // Scroll to top if no saved position
      }
    };

    handleScrollRestore();

    return () => {
      // Save the current scroll position before navigating away
      const currentScrollPositions = JSON.parse(sessionStorage.getItem("scrollPositions")) || {};
      currentScrollPositions[pathname] = {
        x: window.scrollX,
        y: window.scrollY,
      };
      sessionStorage.setItem("scrollPositions", JSON.stringify(currentScrollPositions));
    };
  }, [pathname]);

  return null;
};

export default ScrollToTop;

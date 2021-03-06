import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();
//every pathname changed will run it
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
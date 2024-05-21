import { useEffect, useCallback } from "react";
import wishlist from '../../assets/wishlist.svg';
import Cart from '../../assets/cart.svg';
import Furrl from '../../assets/furrl.svg';
import "./index.css";

const Navbar = () => {
  let lastScrollPosition = 0;

  const handleScroll = useCallback(() => {
    const navbarElement = document.getElementById("navbar");
    const currentScrollPosition = window.scrollY;

    if (currentScrollPosition > lastScrollPosition && currentScrollPosition > 100) {
      navbarElement.style.top = "-100px";
    } else {
      navbarElement.style.top = "0";
    }
    lastScrollPosition = currentScrollPosition;
  }, [lastScrollPosition]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <nav className="navbar" id="navbar">
      <img src={Furrl} alt="Furrl Logo" />
      <div className="navbar-icons-container">
        <a className="navbar-icon" href="https://furrl.in/wishlist">
          <img src={wishlist} alt="Wishlist" />
        </a>
        <a className="navbar-icon" href="https://furrl.in/cart">
          <img src={Cart} alt="Cart" />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;

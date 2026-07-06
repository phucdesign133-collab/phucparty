import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Header.css";
import Logo from "../assets/images/v1.png";
import { FaTimes, FaBars } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = (path) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(path);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (isMenuOpen) document.body.classList.add("menu-open");
    else document.body.classList.remove("menu-open");
    return () => document.body.classList.remove("menu-open");
  }, [isMenuOpen]);

  return (
    <header className="main-header">
      <div className="header-container">
        <div className="header-logo-wrapper" onClick={() => handleMenuClick("/")}>
          <img src={Logo} alt="PHUC DESIGN" className="logo-img" />
        </div>
        <button className="hamburger-btn" onClick={() => setIsMenuOpen(true)}>
          <FaBars size={24} />
        </button>
      </div>

      <nav className={`header-nav ${isMenuOpen ? "nav-open" : ""}`}>
        <div className="menu-header-mobile">
          <div className="menu-logo-mobile">
            <img src={Logo} alt="Logo" />
          </div>
          <button className="close-btn" onClick={() => setIsMenuOpen(false)}>
            <FaTimes size={24} />
          </button>
        </div>
        <div className="nav-link" onClick={() => handleMenuClick("/")}>
          Trang chủ
        </div>
        <div className="nav-link" onClick={() => handleMenuClick("/all-post")}>
          Thư viện
        </div>
        <div className="nav-link" onClick={() => handleMenuClick("/lucky-spin")}>
          Vòng quay may mắn
        </div>
      </nav>
    </header>
  );
};
export default Header;

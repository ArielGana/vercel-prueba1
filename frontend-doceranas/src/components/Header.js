import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <h1 className="logo">Piscina Doce Ranas</h1>
      <span className="menu-toggle" onClick={toggleMenu}>
        &#9776;
      </span>
      <nav>
        <ul className={`nav-links ${isMenuOpen ? "show" : ""}`}>
          <li>
            <Link to="/" onClick={toggleMenu}>
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/services" onClick={toggleMenu}>
              Servicios
            </Link>
          </li>
          <li>
            <Link to="/gallery" onClick={toggleMenu}>
              Galería
            </Link>
          </li>
          <li>
            <Link to="/pricing" onClick={toggleMenu}>
              Tarifas
            </Link>
          </li>
          <li>
            <Link to="/booking" onClick={toggleMenu}>
              Reserva
            </Link>
          </li>
          <li>
            <Link to="/faq" onClick={toggleMenu}>
              FAQ
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

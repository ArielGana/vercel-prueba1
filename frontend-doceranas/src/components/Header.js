import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <h1 className="logo">Piscina Doce Ranas</h1>
      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/services">Servicios</Link>
          </li>
          <li>
            <Link to="/gallery">Galería</Link>
          </li>
          <li>
            <Link to="/pricing">Tarifas</Link>
          </li>
          <li>
            <Link to="/booking">Reserva</Link>
          </li>
          <li>
            <Link to="/faq">FAQ</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

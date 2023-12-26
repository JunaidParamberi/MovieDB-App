import React from "react";
import Logo from "../assets/Logo.svg";
import { NavLink, Link } from "react-router-dom";

function Header() {
  const activeStyle = {
    color: "white",
  };

  return (
    <div className="header-container">
      <Link to="/">
        <img src={Logo} alt="Movie db logo" />
      </Link>

      <div className="nav-link">
        <NavLink
          to="/"
          style={({ isActive }) => (isActive ? activeStyle : null)}
        >
          Movies
        </NavLink>
        <NavLink
          to="tvshow"
          style={({ isActive }) => (isActive ? activeStyle : null)}
        >
          TV Show
        </NavLink>
        <NavLink
          to="aboutus"
          style={({ isActive }) => (isActive ? activeStyle : null)}
        >
          About Us
        </NavLink>
      </div>
    </div>
  );
}

export default Header;

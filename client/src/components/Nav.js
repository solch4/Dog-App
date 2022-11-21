import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import "../styles/Nav.css";

const Nav = () => {
  return (
    <nav className="nav">
      <div className="nav-container">
        <h1 className="nav-title">
          <Link to="/home">Dog App</Link>
        </h1>
        <SearchBar />
      </div>
    </nav>
  );
};

export default Nav;

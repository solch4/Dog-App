import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import "../styles/Nav.css";

const Nav = ({ setActualPage }) => {
  return (
    <nav className="nav">
      <div className="nav-container">
        <h1 className="nav-title">
          <Link to="/home">Dog App</Link>
        </h1>
        <SearchBar setActualPage={setActualPage} />
      </div>
    </nav>
  );
};

export default Nav;

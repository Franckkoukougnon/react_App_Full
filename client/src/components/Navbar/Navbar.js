import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Vous pouvez ajouter un fichier CSS pour le style

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/classelist">Classe List</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

import React from "react";
import { Link } from "react-router-dom";

function NavigationBar() {
  return (
    <div className="navbar">
      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/">HOME</Link>
          </li>
          <li>
            <Link to="/Articles">BROWSE ALL ARTICLES</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavigationBar;

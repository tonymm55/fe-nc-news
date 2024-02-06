import React from "react";
import { Link } from "react-router-dom";

function NavigationBar() {
  return (
    <div className="navbar">
      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/articles">Articles</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavigationBar;

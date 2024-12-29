import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import "../sass/components/navbar.scss";

const HamMenu = () => {

  const { logout, authUser } = useAuthStore();

  const handleHam = () => {
    const hamMenu = document.querySelector(".ham-menu");
    const hamToggle = document.getElementById("ham-toggle");
    hamMenu.classList.toggle("ham-active");
    hamToggle.classList.toggle("show-menu");
  };
  


  return (
    <>
      <div className="ham-menu" onClick={handleHam}>
        <span className="menu-line"></span>
        <span className="menu-line"></span>
      </div>

      <div id="ham-toggle" className="ham-menu-links">
        <ul >
          <li><h1>MENU</h1></li>
          <li><Link to="/" onClick={handleHam}>
              <h1>home</h1>
            </Link></li>
          <li onClick={handleHam}>
            <Link to="/settings">
              <h1>settings</h1>
            </Link>
          </li>
          {authUser && (
            <>
              <li onClick={handleHam}>
                <Link to="/profile">
                  <h1>profile</h1>
                </Link>
              </li>

              <li id="ham-logout" onClick={handleHam}>
                <Link onClick={logout}>
                  <h1>logout</h1>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default HamMenu;

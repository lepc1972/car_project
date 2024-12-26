import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("user");
    navigate(window.location.pathname);
  }


  function handleMenuClick(event) {
    event.preventDefault();
    setIsMenuOpen(!isMenuOpen);
  }
  function handleCloseMenu(event){
    event.preventDefault();
    setIsMenuOpen(false)
  }


  return (
    <>
      <header id="header" className="alt">
        <div className="logo">
          <NavLink to="/Home">
            <img src="/assets/images/Group 1.png"></img>
          </NavLink>
        </div>

        <nav>
          {localStorage.getItem("user") !== null ? (
            <>
              <NavLink id="logout" onClick={handleLogout}>
                logout
              </NavLink>
              {JSON.parse(localStorage.getItem("user")).foundedUser.role ===
              "Admin" ? (
                <NavLink id="admin" to="/Admin">
                  Admin Panel
                </NavLink>
              ) : (
                <></>
              )}
            </>
          ) : (
            <></>
          )}
          <a href="#menu" onClick={handleMenuClick}>
            Menu
          </a>
        </nav>
      </header>
      <nav id="menu" onClick={handleCloseMenu} className={isMenuOpen ? "open" : "close"}>
        <ul  className="links text-center">
          <li key={"navLinks"}>
            <NavLink to="/Home">Home</NavLink>
            <NavLink to="/Signup">Signup</NavLink>
            <NavLink to="/Login">Login</NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};
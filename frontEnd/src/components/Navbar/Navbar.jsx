/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./navbar.css";
import { assets } from "../../assets/frontend_assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";
import { useContext } from "react";
// eslint-disable-next-line react/prop-types
const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const navigate = useNavigate()

  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/")
  }

  return (
    <div className="navbar">
      <Link to={"/"}>  <h2 className="logo"> Delli-Food </h2></Link>
      <ul className="navbar-menu">
        <li>
          <Link
            to="/"
            onClick={() => setMenu("home")}
            className={menu === "home" ? "active" : ""}
          >
            Home
          </Link>
        </li>

        <li>
          <a
            aria-label="explore-menu"
            href="#explore-menu"
            onClick={() => setMenu("menu")}
            className={menu === "menu" ? "active" : ""}
          ></a>
        </li>

        <li>
          <a
            href="#app-download"
            onClick={() => setMenu("mobile-app")}
            className={menu === "mobile-app" ? "active" : ""}
          >
            mobile
          </a>
        </li>

        <li>
          <a
            href="#footer"
            onClick={() => setMenu("contact-us")}
            className={menu === "contact-us" ? "active" : ""}
          >
            contact us
          </a>
        </li>
      </ul>
      <div className="navbar-right">

        <div className="navbar-search-icon">
          <Link to="/cart" aria-label="Go to Cart">
            {" "}
            <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 24 24">
              <path fill="#403b3b" d="M21.947 10.941a2.8 2.8 0 0 0-.52-1.09a2.8 2.8 0 0 0-.94-.76a2.5 2.5 0 0 0-.92-.25a7.46 7.46 0 0 0-2.19-4.62a7.6 7.6 0 0 0-10.74 0a7.46 7.46 0 0 0-2.19 4.62a2.5 2.5 0 0 0-.92.25a2.7 2.7 0 0 0-.94.76a2.74 2.74 0 0 0-.52 2.3l1.57 6.43a4.65 4.65 0 0 0 4.5 3.42h7.71a4.67 4.67 0 0 0 4.51-3.44l1.56-6.41c.1-.396.11-.81.03-1.21m-13.1 6.42a.75.75 0 0 1-1.5 0v-3.94a.75.75 0 1 1 1.5 0zm3.91 0a.75.75 0 1 1-1.5 0v-3.94a.75.75 0 0 1 1.5 0zm3.91 0a.75.75 0 1 1-1.5 0v-3.94a.75.75 0 0 1 1.5 0zm-10.71-8.54a6 6 0 0 1 1.74-3.54a6.11 6.11 0 0 1 8.62 0a6 6 0 0 1 1.74 3.54z"></path>
            </svg>
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? <button onClick={() => setShowLogin(true)}>sign in</button>
          : <div className="navbar-profile">
            <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 24 24">
              <path fill="#403b3b" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4m0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4"></path>
            </svg>
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate('/MyOrders')}><img src={assets.bag_icon} alt="" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
            </ul>
          </div>
        }

      </div>
    </div>
  );
};

export default Navbar;

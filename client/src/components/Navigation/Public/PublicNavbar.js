import React from "react";
import { Link } from "react-router-dom";
import icon from "../../../img/nav_logo.png";
import './PublicNavBar.scss';
const PublicNavbar = () => {
  return (
    <>
      <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
        <div class="container-fluid">
          <div
            class="collapse navbar-collapse nav_main"
            id="navbarSupportedContent"
          >
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="hoverable">
                <Link to="/" className="navbar-brand">
                  <img src={icon} className="icon" />{" "}
                </Link>
                <button
                  class="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span class="navbar-toggler-icon"></span>
                </button>
              </li>
              <li class="nav-item hoverable">
                <Link
                  to="/"
                  class="btn hoverable btn-outline-info mt-1 home"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>

              {/* <li class="nav-item mb-2">
                <Link
                  to="/add-expense"
                  className="btn  btn-outline-warning me-2"
                >
                  New Expense
                </Link>
              </li>
              <li class="nav-item">
                <Link
                  to="/add-income"
                  className="btn  btn-outline-primary me-2"
                >
                  New Income
                </Link>
              </li> */}
            </ul>
            <li className="hoverable">
              <Link to="/login" className="btn btn-outline-light me-2">
                Sign In
              </Link>
            </li>
            <li className="hoverable">
              <Link to="/register" className="btn btn-primary">
                Sign Up
              </Link>
            </li>
          </div>
        </div>
      </nav>
    </>
  );
};

export default PublicNavbar;

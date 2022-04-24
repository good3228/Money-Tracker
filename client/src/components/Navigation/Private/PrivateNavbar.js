import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {useHistory} from "react-router-dom";
import icon from "../../../img/nav_logo.png";
import './PrivateNavbar.scss';

const PrivateNavbar = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <>
      <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
        <div class="container-fluid">
          <Link to="/" className="navbar-brand">
            <img src={icon} className="icon hoverable" />{" "}
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
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link to="/profile" className="btn hoverable btn-outline-light me-2">
                  Profile
                </Link>
              </li>
            </ul>
            <form class="d-flex">
              <Link
                to="/add-expense"
                className="btn btn-danger newExpense me-2 hoverable"
              >
                New Expense
              </Link>
              <Link
                to="/add-income"
                className="btn btn-primary newIncome me-2 hoverable"
              >
                New Income
              </Link>
              <button
                onClick={() => history.push("/")}
                className="btn btn-outline-warning me-2 hoverable"
              >
                Logout
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default PrivateNavbar;

import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import { isAuthenticated, logout } from "../helper/auth";
import withRouter from "./withRouter";
import logo from "./logo.png";
import localname from "../helper/localname";


const Header = ({ navigate }) => {
  const handleLogout = (evt) => {
    logout(() => {
      navigate("/signin");
    });
  };

  const showNavigation = () => (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary">
      <Link to="/" className="navbar-brand">
        <img
          src={logo}
          className="img-circle"
          alt="logo"
          height={50}
          width={50}
        />
        <br></br>
        <h6>
          <b>CRMS</b>
        </h6>
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo02"
        aria-controls="navbarTogglerDemo02"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          {!isAuthenticated() && (
            <Fragment>
              <li className="nav-item active">
                <Link to="/" className="nav-link active text-light">
                  <i className="fas fa-home"></i> <b>Home</b>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="./SignIn" className="nav-link active text-light">
                  <i className="fas fa-edit"></i> <b>Login</b>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="./SignUp" className="nav-link active text-light">
                  <i className="fas fa-sign-in-alt"></i> <b>Register</b>
                </Link>
              </li>
            </Fragment>
          )}

          {isAuthenticated() && isAuthenticated().role === 0 && (
            <Fragment>
              <li className="nav-item active text-light">
                <Link to="/products/add" className="nav-link active text-light">
                  <p className="text-light mt-3 p-0">
                    <i className="fas fa-home"></i>
                    <b> {localname()} </b>
                  </p>
                </Link>
              </li>
            </Fragment>
          )}

          {isAuthenticated() && isAuthenticated().role === 1 && (
            <Fragment>
              <li className="nav-item active">
                <Link
                  to="admin/dashboard/Pending"
                  className="nav-link active text-light"
                >
                  <i className="fas fa-home"></i> <b>Hello Admin</b>
                </Link>
              </li>
            </Fragment>
          )}

          {isAuthenticated() && isAuthenticated().role === 2 && (
            <Fragment>
              <li className="nav-item active">
                <Link
                  to="/waterdepartment/dashboard/Pending"
                  className="nav-link active text-light"
                >
                  <i className="fas fa-home"></i>
                  <b> Water Department</b>
                </Link>
              </li>
            </Fragment>
          )}
          {isAuthenticated() && isAuthenticated().role === 3 && (
            <Fragment>
              <li className="nav-item active">
                <Link
                  to="/powerdepartment/dashboard/Pending"
                  className="nav-link active text-light"
                >
                  <i className="fas fa-home"></i>
                  <b> Power Department </b>
                </Link>
              </li>
            </Fragment>
          )}
          {isAuthenticated() && isAuthenticated().role === 4 && (
            <Fragment>
              <li className="nav-item active">
                <Link
                  to="/sewagedepartment/dashboard/Pending"
                  className="nav-link active text-light"
                >
                  <i className="fas fa-home"></i> <b>Sewage Department</b>
                </Link>
              </li>
            </Fragment>
          )}
        </ul>

        {isAuthenticated() && (
          <ul class="nav navbar-nav navbar-right ml-auto">
            <Fragment>
              <li class="nav navbar-nav navbar-right ">
                <Link
                  to="/signin"
                  className="nav-link ml-auto"
                  onClick={handleLogout}
                >
                  <button className="btn btn-warning ml-auto">
                    <i className="fas fa-sign-out-alt"></i>
                    Logout
                  </button>
                </Link>
              </li>
            </Fragment>
          </ul>
        )}
      </div>
    </nav>
  );

  return <header id="header">{showNavigation()}</header>;
};

export default withRouter(Header);

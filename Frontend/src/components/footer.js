import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../helper/auth";
import withRouter from "./withRouter";

function Footer() {
  return (
    <footer class="bg-primary mt-auto py-3 ">
      <div class="container ">
        <ul class="nav justify-content-center border-bottom pb-3 mb-3">
          <li class="nav-item   text-light ">
            <Link to="/" class="nav-link px-2 text-light">
              Home
            </Link>
          </li>
          {!isAuthenticated() && (
            <Fragment>
              <li class="nav-item">
                <Link to="/signin" class="nav-link px-2 text-light">
                  Login
                </Link>
              </li>

              <li class="nav-item">
                <Link to="/signup" class="nav-link px-2 text-light">
                  Register
                </Link>
              </li>
            </Fragment>
          )}

          <li class="nav-item">
            <Link to="/" class="nav-link px-2 text-light">
              About
            </Link>
          </li>
          <li class="nav-item">
            <Link
              target="_blank"
              to={"//https://www.google.com"}
              class="nav-link px-2 text-light"
            >
              Contact Us: sikkimcms@gmail.com
            </Link>
          </li>
        </ul>
        <p class="text-center text-light">
          © 2022 Complaint Registration and Management System (CRMS)
        </p>
      </div>
    </footer>
  );
}

export default withRouter(Footer);

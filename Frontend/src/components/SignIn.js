import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setAuthentication, isAuthenticated } from "../helper/auth";
import { showErrorMsg } from "../helper/message";
import { showLoading } from "../helper/loading";
import Footer from "./footer";
// import isEmail from "validator/lib/isEmail";

import isEmpty from "validator/lib/isEmpty";
import { signin } from "../api/auth";
import "./signin.css";

const Signin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated() && isAuthenticated().role === 1) {
      navigate("/admin/dashboard");
    } else if (isAuthenticated() && isAuthenticated().role === 2) {
      navigate("/department/dashboard");
    } else if (isAuthenticated() && isAuthenticated().role === 0) {
      navigate("/products");
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    errormsg: false,
    loading: false,
  });

  const { email, password, errormsg, loading } = formData;

  const handleChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
      errormsg: "",
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (isEmpty(email) || isEmpty(password)) {
      setFormData({
        ...formData,
        errormsg: "All fields are required !",
      });
    } else {
      const { email, password } = formData;
      const data = { email, password };

      setFormData({
        ...formData,
        loading: true,
      });

      signin(data)
        .then((response) => {
          setAuthentication(response.data.token, response.data.user);

          if (isAuthenticated() && isAuthenticated().role === 1) {
            console.log("Redirecting to admin dashboard");
            navigate("/admin/dashboard/Pending");
          } else if (isAuthenticated() && isAuthenticated().role === 2) {
            console.log("Redirecting to Department dashboard");
            navigate("/waterdepartment/dashboard/Pending");
          } else if (isAuthenticated() && isAuthenticated().role === 3) {
            console.log("Redirecting to Department dashboard");
            navigate("/powerdepartment/dashboard/Pending");
          } else if (isAuthenticated() && isAuthenticated().role === 4) {
            console.log("Redirecting to Department dashboard");
            navigate("/sewagedepartment/dashboard/Pending");
          } else {
            console.log("Redirecting to user dashboard");
            navigate("/products/add");
          }
        })
        .catch((err) => {
          console.log("signin api function error", err);
          setFormData({
            ...formData,
            loading: false,
            errormsg: err.response.data.errorMessage,
          });
        });
    }
  };

  const ShowSignInForm = () => (
    <form
      className="form form--hidden"
      id="createAccount"
      onSubmit={handleSubmit}
      noValidate
    >
      <h1 className="form__title hellolog">LogIn</h1>
      <div className="form__input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className="fa fa-envelope"></i>
            <input
              name="email"
              value={email}
              type="text"
              className="form__input"
              placeholder="Email"
              onChange={handleChange}
            />
          </span>
        </div>

        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className="fa fa-lock"></i>
            <input
              name="password"
              value={password}
              type="password"
              className="form__input"
              placeholder="Password"
              onChange={handleChange}
            />
          </span>
        </div>

        <br></br>
      </div>
      <button className="form__button" type="submit">
        Log-In
      </button>
      <p className="form__text">
        Don't have an account? <Link to="/SignUp">Register here</Link>
      </p>
    </form>
  );

  return (
    <div >
      
      <div className="container3">
      <div className="SignInLeft">
        <div className="CMStext"><span className="textcms">COMPLAINT</span><span className="textcms"> MANAGEMENT</span> <span className="textcms">SYSTEM</span></div>
        
      </div>
        <div className="container4">
          {loading && <div className="text-center pb=4">{showLoading()}</div>}
          {errormsg && showErrorMsg(errormsg)}
          {ShowSignInForm()}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signin;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import equals from "validator/lib/equals";
import isEmpty from "validator/lib/isEmpty";
import { isAuthenticated } from "../helper/auth";
import { showErrorMsg, showSuccessMsg } from "../helper/message";
import "./signup.css";
import { showLoading } from "../helper/loading";
import { signup } from "../api/auth";
import Footer from "./footer";

const SignUp = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated() && isAuthenticated().role === 1) {
      navigate("/admin/dashboard");
    } else if (isAuthenticated() && isAuthenticated().role === 2) {
      navigate("/department/dashboard");
    } else if (isAuthenticated() && isAuthenticated().role === 0) {
      navigate("/user/dashboard");
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phoneNo: "",
    password: "",
    password2: "",
    successmsg: false,
    errormsg: false,
    loading: false,
  });
  const {
    username,
    email,
    phoneNo,
    password,
    password2,
    successmsg,
    errormsg,
    loading,
  } = formData;

  const handleChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
      errormsg: "",
      successmsg: "",
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(formData);

    if (
      isEmpty(username) ||
      isEmpty(email) ||
      isEmpty(phoneNo) ||
      isEmpty(password) ||
      isEmpty(password2) ||
      isEmpty(phoneNo)
    ) {
      setFormData({
        ...formData,
        errormsg: "All fields are required !",
      });
    } else if (!isEmail(email)) {
      setFormData({
        ...formData,
        errormsg: "Invalid mail !",
      });
    } else if (!equals(password, password2)) {
      setFormData({
        ...formData,
        errormsg: "Password do not match !",
      });
    } else {
      const { username, email, phoneNo, password } = formData;
      const data = { username, email, phoneNo, password };

      setFormData({
        ...formData,
        loading: true,
      });

      signup(data)
        .then((response) => {
          console.log("Axios signup success", response);
          setFormData({
            ...formData,
            username: "",
            email: "",
            phoneNo: "",
            password: "",
            password2: "",
            loading: false,
            successmsg: response.data.successMessage,
          });
        })
        .catch((error) => {
          console.log("Axios signup error", error);
          setFormData({
            ...formData,
            loading: false,
            errormsg: error.response.data.errorMessage,
          });
        });
    }
  };

  const ShowSignUpForm = () => (
    <form
      className="form form--hidden"
      id="createAccount"
      onSubmit={handleSubmit}
      noValidate
    >
      <h1 className="form__title">Create Account</h1>
      <div className="form__input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className="fa fa-user"></i>
            <input
              name="username"
              value={username}
              type="text"
              className="form__input"
              autoFocus
              placeholder="Enter full name"
              onChange={handleChange}
            />
          </span>
        </div>

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
            <i className="fa fa-phone"></i>
            <input
              name="phoneNo"
              value={phoneNo}
              type="tel"
              className="form__input"
              pattern="[0-9]{10}"
              placeholder="Enter 10 digit Phone No."
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
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className="fa fa-lock"></i>
            <input
              name="password2"
              value={password2}
              type="password"
              className="form__input"
              placeholder="Confirm Password"
              onChange={handleChange}
            />
          </span>
        </div>
        <br></br>
      </div>
      <button className="form__button" type="submit">
        Register
      </button>
      <p className="form__text">
        Have an account? <Link to="/SignIn">Log-in</Link>
      </p>
    </form>
  );
  return (
    <div>
      {/* {JSON.stringify(formData)} */}

      <div className="container1">
        <div className="containe">
          {successmsg && showSuccessMsg(successmsg)}
          {loading && <div className="text-center pb=4">{showLoading()}</div>}
          {errormsg && showErrorMsg(errormsg)}
          {ShowSignUpForm()}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;

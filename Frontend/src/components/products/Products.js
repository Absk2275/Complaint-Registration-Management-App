import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "../App.css";

function Products() {
  return (
    <div className="products">
      <div className="productsNav">
        <NavLink to="/products/search">
          {" "}
          <b>My Profile</b>{" "}
        </NavLink>
        <NavLink to="/products/add">
          {" "}
          <b>Post Complaint</b>{" "}
        </NavLink>
        <NavLink to="/products/list">
          {" "}
          <b>My Complaint</b>{" "}
        </NavLink>
      </div>

      <Outlet />
    </div>
  );
}

export default Products;

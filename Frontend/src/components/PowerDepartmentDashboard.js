import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./AdminComponents/AdminComponents.css";

const PowerDepartmentDashboard = () => {
  return (
    <div className="Admin">
      <div className="AdminNav">
        <Link to="Pending">Pending</Link>

        <Link to="InProgress">In-Progress</Link>

        <Link to="Resolved">Resolved</Link>
      </div>

      <Outlet />
    </div>
  );
};
export default PowerDepartmentDashboard;

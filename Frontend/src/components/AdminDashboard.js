import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./AdminComponents/AdminComponents.css";

const AdminDashboard = () => {
  return (
    <div className="Admin">
      <div className="AdminNav">
        <Link to="Pending">Pending</Link>

        <Link to="InProgress">Forwarded</Link>

        <Link to="Resolved">Rejected</Link>
      </div>

      <Outlet />
    </div>
  );
};
export default AdminDashboard;

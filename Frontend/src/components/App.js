import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";

import Home from "./Home";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

import WaterDepartmentDashboard from "./WaterDepartmentDashboard";
import PowerDepartmentDashboard from "./PowerDepartmentDashboard";
import SewageDepartmentDashboard from "./SewageDepartmentDashboard";

import Inprogress1 from "./WaterDepartmentComponents/Inprogress";
import Pending1 from "./WaterDepartmentComponents/Pending";
import Resolved1 from "./WaterDepartmentComponents/Resolved";

import Resolved2 from "./PowerDepartmentComponents/Resolved";
import Inprogress2 from "./PowerDepartmentComponents/Inprogress";
import Pending2 from "./PowerDepartmentComponents/Pending";

import Resolved3 from "./SewageDepartmentComponents/Resolved";
import Inprogress3 from "./SewageDepartmentComponents/Inprogress";
import Pending3 from "./SewageDepartmentComponents/Pending";

import Products from "./products/Products";
import Form from "./products/AddProduct";
import ProductDisplay from "./products/ProductDisplay";
import ListProducts from "./products/ListProducts";
import Search from "./products/Search";

import AdminDashboard from "./AdminDashboard";
import Inprogress from "./AdminComponents/Inprogress";
import Pending from "./AdminComponents/Pending";
import DataDisplay from "./AdminComponents/DataDisplay";
import Resolved from "./AdminComponents/Resolved";

const App = () => (
  <BrowserRouter>
    <Header />
    <main>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/SignIn" element={<SignIn />} />
        <Route exact path="/SignUp" element={<SignUp />} />

        {/* <Route exact path="/user/dashboard" element={<UserDashboard />}> */}

        <Route path="/Products" element={<Products />}>
          <Route path="search" element={<Search />} />
          <Route path="list" element={<ListProducts />} />
          <Route path="add" element={<Form />} />
          <Route path=":id" element={<ProductDisplay />} />
        </Route>

        <Route path="/admin/dashboard" element={<AdminDashboard />}>
          <Route path="Pending" element={<Pending />} />
          <Route path="Inprogress" element={<Inprogress />} />
          <Route path="Resolved" element={<Resolved />} />
          <Route path=":uid" element={<DataDisplay />} />
        </Route>

        <Route
          path="/waterdepartment/dashboard"
          element={<WaterDepartmentDashboard />}
        >
          <Route path="Pending" element={<Pending1 />} />
          <Route path="Inprogress" element={<Inprogress1 />} />
          <Route path="Resolved" element={<Resolved1 />} />
        </Route>

        <Route
          path="/powerdepartment/dashboard"
          element={<PowerDepartmentDashboard />}
        >
          <Route path="Pending" element={<Pending2 />} />
          <Route path="Inprogress" element={<Inprogress2 />} />
          <Route path="Resolved" element={<Resolved2 />} />
        </Route>

        <Route
          path="/sewagedepartment/dashboard"
          element={<SewageDepartmentDashboard />}
        >
          <Route path="Pending" element={<Pending3 />} />
          <Route path="Inprogress" element={<Inprogress3 />} />
          <Route path="Resolved" element={<Resolved3 />} />
        </Route>
      </Routes>
    </main>
  </BrowserRouter>
);

export default App;

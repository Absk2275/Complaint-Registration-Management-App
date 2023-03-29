import React, { useState, useEffect } from "react";
import axios from "axios";
import localid from "../../helper/localid";
import Footer from "../footer";
import "../App.css";

const Search = () => {
  const [contacts, setContacts] = useState([]);
  const getAllContacts = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.get("https://cms-backend-wwk3.onrender.com/user", config);
      setContacts(res.data);
    } catch (err) {
      console.error("error", err);
    }
  };

  const id = localid();

  useEffect(() => {
    getAllContacts();
  }, []);

  const mycomp = contacts.filter((obj) => {
    return obj._id === localid();
  });

  console.log(mycomp);

  function getDate(isoDate) {
    var date = isoDate.substring(0, 10);

    return date;
  }

  return (
    <div>
      <div class="row align-content-start  mt-2 vh-100">
        <div className="colu">
          {mycomp.length > 0 ? (
            mycomp.map((pro) => {
              return (
                <div class="card m-3 p-0 justify-content-evenly ">
                  <div class="card-body ml-6 ">
                    <h5 class="card-title">
                      <i class="fa-solid fa-file-signature"></i> Name :{" "}
                      {pro.username}
                    </h5>

                    <p>
                      {" "}
                      <i class="fa-solid fa-envelope"></i> Email : {pro.email}
                    </p>
                    <p>
                      <i class="fa-solid fa-calendar"></i> Profile Created At :{" "}
                      {getDate(pro.createdAt)}
                    </p>
                    <p>
                      <i class="fa-solid fa-phone"></i> Phone No : {pro.phoneNo}
                    </p>
                  </div>
                </div>
              );
            }) //map & pro
          ) : (
            <div class="d-flex align-items-center justify-content-center vh-90">
              <div class="text-center">
                <h1 class="display-1 fw-bold text-primary">Opps!</h1>
                <p class="fs-3">You are not Logged In.</p>
                <p class="lead"></p>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Search;

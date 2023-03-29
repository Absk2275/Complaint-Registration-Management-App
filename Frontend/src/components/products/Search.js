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

  // const id = localid();

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
      <div class="userprofile row align-content-start  mt-2 vh-100">
        <div className="colu">
          {mycomp.length > 0 ? (
            mycomp.map((pro) => {
              return (
                <section class="vh-100">
                  <div class="profilemain container py-5 h-100">
                    <div class="row d-flex justify-content-center align-items-center vh-100">
                      <div class="col col-lg-6 mb-4 mb-lg-0 vh-100">
                        <div class="card mb-3 mt-0">
                          <div class="row g-0">
                            <div class="col-md-4 gradient-custom text-center text-white">
                              <img
                                src="https://www.seekpng.com/png/detail/202-2024774_my-profile-comments-my-profile-icon-png.png"
                                alt="Avatar"
                                class="img-thumbnail my-5"
                              />
                              <h4>Name: {pro.username} </h4>
                            </div>
                            <div class="col-md-8">
                              <div class="userpro card-body p-4">
                                <h6>Information</h6>
                                <hr class="mt-0 mb-4" />
                                <div class="row pt-1">
                                  <div class="col-6 mb-3">
                                    <h6>Email</h6>
                                    <p class="text-muted">{pro.email}</p>
                                  </div>
                                  <div class="col-6 mb-3">
                                    <h6>Phone</h6>
                                    <p class="text-muted">{pro.phoneNo}</p>
                                  </div>
                                </div>
                                <h6>Profile created on</h6>
                                <hr class="mt-0 mb-4" />
                                <div class="row pt-1">
                                  <div class="col-6 mb-3">
                                    <h6>Date</h6>
                                    <p class="text-muted">
                                      {getDate(pro.createdAt)}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              );
            })
          ) : (
            <div class="d-flex align-items-center justify-content-center vh-100">
              <div class="text-center">
                <h1 class="display-1 fw-bold text-primary">Loading...</h1>

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
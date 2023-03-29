import React, { useState, useEffect } from "react";
// import { ProductsData } from "../../ProductsData";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";
import axios from "axios";
import loaclemail from "../../helper/localemail";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

const Pending = () => {
  // const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const getAllContacts = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.get("https://cms-backend-wwk3.onrender.com/postcomp", config);
      setContacts(res.data);
    } catch (err) {
      console.error("error", err);
    }
  };

  useEffect(() => {
    getAllContacts();
  }, []);
  console.log(contacts);
  const mycomp = contacts.filter((obj) => {
    return obj.adminstatus === 0;
  });
  mycomp.sort(function (a, b) {
    return a.uid - b.uid;
  });

  // sort by name
  mycomp.sort(function (a, b) {
    const nameA = a.uid; // ignore upper and lowercase
    const nameB = b.uid; // ignore upper and lowercase
    if (nameA > nameB) {
      return -1;
    }
    if (nameA < nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  });
  // console.log(mycomp);

  // const [currentContact, setCurrentContact] = useState({});
  const [id, setId] = useState("");

  // const getContactById = async (id) => {
  // 	const config = {
  // 		headers: {
  // 			"Content-Type": "application/json",
  // 		},
  // 	};
  // 	try {
  // 		const res = await axios.get(`http://localhost:5000/postcomp/${id}`, config);
  // 		setCurrentContact(res.data);
  // 	} catch (err) {
  // 		console.error("error", err);
  // 	}
  // };

  // useEffect(() => {
  // 	getContactById(id);
  // }, [id]);
  const [value, setvalue] = useState("All");
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  function notupdate() {
    setOpen1(false);
    setId((id) => ({ ...id, adminstatus: 0 }));
  }
  const update = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      console.log(id);
      await axios.put(`https://cms-backend-wwk3.onrender.com/postcomp/${id.uid}`, id, config);
    } catch (err) {
      console.error("error", err);
    }
    setOpen1(false);
  };

  const handleClose = async (pro) => {
    setOpen(false);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      console.log(id);
      await axios.put(`https://cms-backend-wwk3.onrender.com/postcomp/${pro.uid}`, id, config);

      setId({ id });
    } catch (err) {
      console.error("error", err);
    }
    window.location.reload();
  };

  const handleEdit = async (pro) => {
    setOpen(true);
    setId((id) => ({ ...id, adminread: 1 }));
  };
  const confirm = async (value) => {
    setOpen1(true);
    setId((id) => ({ ...id, adminstatus: value }));
    console.log(id.adminstatus);
    
  };
  function selected() {
    var subjectIdNode = document.getElementById("department");

    setvalue(subjectIdNode.options[subjectIdNode.selectedIndex].text);
    console.log("The selected value=" + value);
  }
  const mycomp1 = mycomp.filter((obj) => {
    if (value === "All") {
      return obj;
    } else {
      return obj.department === value;
    }
  });

  return (
    <div class="row justify-content-evenly mt-2">
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <Dialog open={open1} aria-labelledby="form-dialog-title">
          <DialogContent>
            <DialogContentText
              component={"div"}
              style={{ textAlign: "center" }}
            >
              <p>Do you want to confirm ?</p>
              <Button onClick={() => update()}>Confirm</Button>
              <Button onClick={notupdate}> Close</Button>
            </DialogContentText>
          </DialogContent>
        </Dialog>

        <DialogContent>
          <DialogContentText component={"div"} style={{ textAlign: "center" }}>
            <form className="contact-form ">
              <nav class="navbar card-header  ">
                <Button
                  class="btn-close ms-auto "
                  aria-label="Close"
                  onClick={() => handleClose(id)}
                ></Button>
              </nav>
              <div className="card">
                <h4>
                  <b>Complianer Details</b>
                </h4>
                <p class="m-0">
                  <i class="fa-solid fa-user"></i>{" "}
                  <h>
                    {" "}
                    {id.firstName} {id.lastName}
                  </h>
                </p>
                <p class="m-0">
                  <i class="fa-solid fa-location-dot"></i> {id.address}
                </p>
                <p class="m-0">
                  <b>District: </b> {id.district}
                </p>
                <p class="m-0">
                  <b>Block: </b> {id.block}
                </p>
                <p class="m-0">
                  <b>Pincode: </b> {id.pincode}
                </p>
                <container>
                  <Button class="btn btn-primary  btn-sm" disabled>
                    <i class="fa-solid fa-envelope"></i> {id.email}
                  </Button>
                  <Button class="btn btn-primary  btn-sm m-1" disabled>
                    {" "}
                    <i class="fa-solid fa-phone"></i> {id.phoneNo}
                  </Button>
                </container>
              </div>

              <br></br>
              <div className="card">
                <h4>
                  <b>Complaint Details</b>
                </h4>
                <p class="m-0">
                  <Button class="btn btn-primary  btn-sm m-1" disabled>
                    {" "}
                    Complaint ID: {id.uid}
                  </Button>
                  <p>
                    <b>Department: </b> {id.department}
                  </p>
                  <p class="m-0">
                    <i class="fa-solid fa-comment-dots"></i>
                    <b> Description :</b> {id.description}
                  </p>
                </p>
              </div>
              <br></br>
              <div className="card">
                <h4>
                  <b>Assigned Employee</b>
                </h4>
                {id.empname ==="" ? (<p>Not yet assisgned</p>):(<p class="m-0">
                  <Button class="btn btn-primary  btn-sm m-1" disabled>
                    {" "}
                    <b>Employee ID: </b> {id.empID}
                  </Button>
                  <p>
                    <b>Employee Name: </b> {id.empname}
                     
                  </p>
                  <p class="m-0">
                  <i class="fa-solid fa-phone"></i>
                    <b> Employee Phone Number :</b> {id.empNo}
                  </p>
                </p>)}
              </div>
              <div></div>
              <Button class="btn btn-success m-2" onClick={() => confirm(1)}>
                Forward
              </Button>
              <Button class="btn btn-danger m-2" onClick={() => confirm(2)}>
                Reject
              </Button>
            </form>
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <div className="colu">
        <div className="input-box">
          <span className="details">Department </span>
          <select name="department" id="department" onChange={selected}>
            <option value="All ">All</option>
            <option value="Power Department">Power Department</option>
            <option value="Public Health and Engineering Department -Water">
              Public Health and Engineering Department -Water
            </option>
            <option value="Public Health and Engineering Department - Sewage">
              Public Health and Engineering Department - Sewage
            </option>
          </select>
        </div>

        {mycomp1.length > 0 ? (
          mycomp1.map((pro) => {
            return (
              <div onClick={() => handleEdit(pro)}>
                <div class="card m-3 p-0" onClick={() => setId(pro)}>
                  <nav className="navbar card-header ">
                    <h5>{pro.department}</h5>
                    <button className="btn btn-primary my-2 my-sm-0 ms-auto p-1 disabled">
                      Complaint ID: {pro.uid}
                    </button>
                    {pro.adminread === 0 ? (
                      <button className="btn btn-warning   ms-auto p-1 m-0 disabled">
                        <i class="fa-solid fa-bell fa-shake"></i>
                      </button>
                    ) : (
                      <button className="btn    ms-auto p-1 m-0 disabled">
                        <i class="fa-solid fa-bell "></i>
                      </button>
                    )}
                  </nav>

                  <div class="card-body">
                    <h5 class="card-title">
                      {pro.firstName} {pro.lastName}
                    </h5>

                    <p>{pro.address}</p>
                    <p>{pro.phoneNo}</p>

                    <button class="btn btn-primary">view</button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>No Compalint posted yet</p>
        )}
      </div>
    </div>
  );
};

export default Pending;

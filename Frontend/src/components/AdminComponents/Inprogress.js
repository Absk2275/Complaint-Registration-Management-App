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

const Inprogress = () => {
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
    return obj.adminstatus === 1;
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

  const [open, setOpen] = useState(false);
  const [value, setvalue] = useState("All");
  const handleClose= async(pro)=> {
    setOpen(false);
    const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
    
		try {
      console.log(id);
			await axios.put(
				`https://cms-backend-wwk3.onrender.com/postcomp/${pro.uid}`,
				id,
				config
			);
      
      setId({id});
		
		} 
    catch (err) {
			console.error("error", err);
		}
  }

  const handleEdit = async (pro) =>{
		setOpen(true);
    setId((id) => ({ ...id, adminread:1 }));

	};
    
  function selected() {
    var subjectIdNode = document.getElementById('department');
    
    setvalue(subjectIdNode.options[subjectIdNode.selectedIndex].text);
    console.log("The selected value=" + value);
    
  }
  const mycomp1 = mycomp.filter((obj) => {
    if(value==="All")
    {
      return obj;
    }
    else{
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
            </form>
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <div className="colu">
      <div className="input-box">
            <span className="details">Department </span>
            <select
              name="department"
              id="department"
              onChange={selected}
            
            >
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
              <div>
                <div class="card m-3 p-0" onClick={() => setId(pro)}>
                  <nav className="navbar card-header ">
                  
                    <h5>{pro.department}</h5>
                    <button className="btn btn-primary my-2 my-sm-0 ms-auto p-1 disabled">
                      Complaint ID: {pro.uid} 
                    </button>
                    {
                      pro.adminread === 0 ?(<button className="btn btn-warning   ms-auto p-1 m-0 disabled">
                      <i class="fa-solid fa-bell fa-shake"></i>
                        </button>) : <button className="btn    ms-auto p-1 m-0 disabled">
                  <i class="fa-solid fa-bell "></i>
                  
                    </button>
                    }
                    
                  </nav> 

                  <div class="card-body">
                    <h5 class="card-title">
                      {pro.firstName} {pro.lastName}
                    </h5>

                    <p>{pro.address}</p>
                    <p>{pro.phoneNo}</p>

                    <button class="btn btn-primary" onClick={() => handleEdit(pro)}>view</button>
                  </div>
                  {
                    pro.deptstatus===2?(<i class="fa-solid fa-circle-check bg-success p-2 ms-auto text-light"><b> Resolved</b></i>):( <i class="fa-solid fa-warning bg-warning  p-2 ms-auto text-light"><b> In-progress</b></i>)
                  }
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
        }

export default Inprogress;


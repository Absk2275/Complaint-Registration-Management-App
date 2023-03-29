import "./PostComplaint.css";
import React, { useState } from "react";
import isEmpty from "validator/lib/isEmpty";
import isEmail from "validator/lib/isEmail";
import { showErrorMsg, showSuccessMsg } from "../../helper/message";
import { showLoading } from "../../helper/loading";
import loaclemail from "../../helper/localemail";
import Footer from "../footer";

import { postcomp } from "../../api/auth";

const stateData = [
  { name: ["Select District"], blocks: "Select block" },
  {
    name: "Gangtok",
    blocks: [
      "Gangtok(Nandok)",
      "Khamdong",
      "Martam",
      "Parakha",
      "Rakdong_Tintek",
      "Ranka",
      "Reghu",
      "Rhenock",
    ],
  },
  {
    name: "Gyalshing",
    blocks: [
      "Chongrang",
      "Chumdung",
      "Daramdin",
      "Dentam",
      " Gyalshing",
      "Hee_Martam",
      "Kaluk",
      "Mangalbarey",
      "Soreng",
      " Yuksom",
    ],
  },
  {
    name: "Mangan",
    blocks: ["Chungthang", " Kabi", " Mangan", "Passingdang"],
  },
  {
    name: "Namchi",
    blocks: [
      "Jorthang",
      " Namchi",
      " Namthang",
      "Ravangla",
      " Sikkip",
      "Sumbuk",
      " Timi_Tarku",
      "Yangang",
    ],
  },
  {
    name: "Pakyong",
    blocks: ["Duga", "Pakyong"],
  },
  {
    name: "Soreng",
    blocks: ["", "Soreng"],
  },
];

const Form = () => {
  //to get district and block in the dropdown
  // const [{ country, state }, setData] = useState({
  //   country: "Select District",
  //   state: "",
  // });

  //useState to form
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNo: "",
    email: "",
    address: "",
    district: "",
    block: "",
    pincode: "",
    department: "",
    description: "",
    errormsg: false,
    successmsg: false,
    loading: false,
  });

  const {
    firstName,
    lastName,
    phoneNo,
    email,
    address,
    district,
    block,
    pincode,
    department,
    description,
    errormsg,
    successmsg,
    loading,
  } = formData;

  const districts = stateData.map((district) => (
    <option key={district.name} value={district.name}>
      {district.name}
    </option>
  ));

  const blocks = stateData
    .find((item) => item.name === district)
    ?.blocks.map((block) => (
      <option key={block} value={block}>
        {block}
      </option>
    ));

  const handleDistrictChange = (event) => {
    setFormData((fromData) => ({ ...fromData, district: event.target.value }));
  };

  const handleBlockChange = (event) => {
    setFormData((fromData) => ({ ...fromData, block: event.target.value }));
  };

  const handleChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
      errormsg: "",
      successmsg: "",
      email: loaclemail(),
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(formData);

    if (
      isEmpty(firstName) ||
      isEmpty(lastName) ||
      isEmpty(phoneNo) ||
      isEmpty(email) ||
      isEmpty(address) ||
      isEmpty(district) ||
      isEmpty(department) ||
      isEmpty(pincode) ||
      isEmpty(description)
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
    } else if (isEmpty(block)) {
      setFormData({
        ...formData,
        errormsg: "Reselect Block",
      });
    } else {
      const {
        firstName,
        lastName,
        phoneNo,
        email,
        address,
        district,
        block,
        pincode,
        department,
        description,
      } = formData;
      const data = {
        firstName,
        lastName,
        phoneNo,
        email,
        address,
        district,
        block,
        pincode,
        department,
        description,
      };

      setFormData({
        ...formData,
        loading: true,
        errormsg: "",
      });

      postcomp(data)
        .then((response) => {
          console.log("Axios Post Compalint success", response);
          setFormData({
            ...formData,

            successmsg: response.data.successMessage,
            firstName: "",
            lastName: "",
            phoneNo: "",
            email: "",
            address: "",
            district: "",
            block: "",
            pincode: "",
            description: "",
            loading: false,
            errormsg: "",
            status: "0",
          });
        })
        .catch((error) => {
          console.log("Axios Post Complaint error", error);
          setFormData({
            ...formData,
            loading: false,
            errormsg: error.response.data.errorMessage,
          });
        });
    }
  };

  const postComp = () => (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="user-details">
          <div className="input-box">
            <span className="details">First Name</span>
            <input
              type="text"
              name="firstName"
              value={firstName}
              placeholder="Enter your first name"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <span className="details">Last Name</span>
            <input
              type="text"
              name="lastName"
              value={lastName}
              placeholder="Enter your last name"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <span className="details">Email</span>
            <input
              type="text"
              name="email"
              value={email}
              placeholder={loaclemail()}
              disabled="disable"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <span className="details">Phone Number</span>
            <input
              type="text"
              name="phoneNo"
              value={phoneNo}
              placeholder="Enter your number"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <span className="details">Address</span>
            <input
              type="text"
              name="address"
              value={address}
              placeholder="Enter your address"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <span className="details">Pincode</span>
            <input
              type="text"
              name="pincode"
              value={pincode}
              placeholder="Enter pincode"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <span className="details">District</span>

            <select onChange={handleDistrictChange} required>
              {districts}
            </select>
          </div>
          <div className="input-box">
            <span className="details">Block</span>

            <select value={block} onChange={handleBlockChange} required>
              {blocks}
            </select>
          </div>

          <div className="input-box">
            <span className="details">Department</span>
            <select
              name="department"
              value={department}
              onChange={handleChange}
            >
              <option value="Power Department">Power Department</option>
              <option value="Public Health and Engineering Department -Water">
                Public Health and Engineering Department -Water{" "}
              </option>
              <option value="Public Health and Engineering Department - Sewage">
                Public Health and Engineering Department - Sewage
              </option>
            </select>
          </div>

          <br></br>
          <div class="col-lg-75">
            <div class="form-group">
              <label>
                <span className="details">Complaint Description</span>
                <textarea
                  class="form-control"
                  rows="3"
                  cols="100"
                  name="description"
                  value={description}
                  placeholder="Enter Complaint Descrpition"
                  onChange={handleChange}
                  required
                ></textarea>
              </label>
            </div>
          </div>
        </div>
        <div class="button">
          <input type="submit" value="Post" />
        </div>
      </form>
    </div>
  );
  return (
    <div>
      <div className="Postmain">
        <div className="post">
          {errormsg && showErrorMsg(errormsg)}
          {loading && <div className="text-center pb=4">{showLoading()}</div>}
          {successmsg && showSuccessMsg(successmsg)}
          <div className="title">Post Complaint</div>
          <div className="content">{postComp()}</div>
        </div>
      </div>
      {/* {JSON.stringify(formData)} */}
      <Footer />
    </div>
  );
};

export default Form;

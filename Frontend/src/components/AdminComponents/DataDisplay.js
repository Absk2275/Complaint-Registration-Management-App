import React from "react";
import { useParams } from "react-router-dom";
import { UserData } from "./UserData";

function DataDisplay() {
  const { uid } = useParams();
  return (
    <div className="listOfProducts">
      <div className="productDisplay">
        <nav class="navbar navbar-expand-lg navbar-light bg-warning ">
          {UserData[uid - 1].complaint_id}{" "}
        </nav>
        <p>{UserData[uid - 1].name}</p>
        <p>{UserData[uid - 1].description}</p>{" "}
        <p>{UserData[uid - 1].Complaint_details}</p>{" "}
        <p>{UserData[uid - 1].Phone_No}</p> <p>{UserData[uid - 1].image}</p>{" "}
      </div>
    </div>
  );
}

export default DataDisplay;

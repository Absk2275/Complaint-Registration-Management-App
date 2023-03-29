
import { useParams } from "react-router-dom";
import axios from "axios";
import "./PostComplaint.css";
import React, { useState, useEffect} from "react";


function ProductDisplay() {
  const [contacts, setContacts] = useState([]);
  const getAllContacts = async () => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		try {
			const res = await axios.get("http://localhost:5000/postcomp", config);
			setContacts(res.data);
		} catch (err) {
			console.error("error", err);
		}
	};

	useEffect(() => {
		getAllContacts();
	}, []);

 
  return (
    
    <div className="listOfProducts">
      <div className="productDisplay">
  
        
       
      </div>
    </div>
  );
}

export default ProductDisplay;

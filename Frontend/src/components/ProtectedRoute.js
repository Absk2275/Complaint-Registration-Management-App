import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../helper/auth";

function ProtectedRoute(props){
    const { Component } = props;
    //const navigate = useNavigate();
    useEffect(()=>{
        if(!isAuthenticated() && !isAuthenticated().role === 1 ){
            //return (navigate('/SignIn'));
            return <Navigate to='/SignIn'/>
        }
    }
    
    );
    return(
        <div><Component/></div>
    )
}
export default ProtectedRoute;
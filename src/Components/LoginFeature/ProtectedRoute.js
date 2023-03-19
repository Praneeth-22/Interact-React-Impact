import React from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserContextApi";
const ProtectedRoute=({children})=>{
    let {user}=useUserAuth();
     if(!user){
       return <Navigate to="/" />;
     }
     return children;
    };

    export default ProtectedRoute;
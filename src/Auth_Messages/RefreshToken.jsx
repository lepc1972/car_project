import React from "react";
import { useNavigate } from "react-router-dom";


export const RefreshToken = () => {
    const navigate = useNavigate();
    let logBTN = () => {
        navigate('/Home')
    }
    return(<>
        <div className="container text-center d-flex flex-column align-items-center">
          <h2>Confirmation Email Sent, Please Check Your Email</h2>
         <p> <span className="logBTN" onClick={logBTN}>Click here</span> to go to Home Page</p>
        </div>
    </>)
}
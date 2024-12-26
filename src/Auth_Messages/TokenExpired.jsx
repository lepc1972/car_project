import React from "react";
import { useNavigate } from "react-router-dom";


export const TokenExpired = () => {
    const navigate = useNavigate();
    let logBTN = () => {
        navigate('/login')
    }
    let homeBTN = () => {
        navigate('/home')
    }
    return(<>
        <div className="container text-center d-flex flex-column align-items-center">
          <h2>Error: Token Expired</h2>
          <p><span className="logBTN" onClick={logBTN}>Click here</span> to go to login page
          <br/>  <br/>
          <span className="logBTN" onClick={homeBTN}>Go to Homepage</span>
          </p>
        </div>
    </>)
}
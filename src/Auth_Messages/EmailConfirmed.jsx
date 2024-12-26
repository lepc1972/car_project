
import React from "react";
import { useNavigate } from "react-router-dom";

export const EmailConfirmed = () => {
  const navigate = useNavigate();

  let logIn = () => {
    navigate('/login');
  };

  return (
    <div className="container text-center d-flex flex-column align-items-center">
      <h2>Thank you For Confirming your Email</h2>
      <p>
        <span className="logBTN" onClick={logIn}>
          Click here
        </span>{" "}
        to go to the login page
      </p>
    </div>
  );
};


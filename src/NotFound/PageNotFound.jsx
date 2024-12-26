import React from "react";
import { useNavigate } from 'react-router-dom';




export const PageNotFound = () => {
  

    const navigate = useNavigate();

let homeBTN = () => {
    navigate('/home')
}


    return(
       
        <>
        <div className="notFound d-flex justify-content-center align-items-center">
                <div className="position-relative h-100 w-100">
                <button className="goToHome position-absolute" onClick={homeBTN}>return to home</button>
                </div>
        </div>
        </>
    )
}
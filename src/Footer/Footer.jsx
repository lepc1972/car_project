import React from "react";

export const  Footer = () => {
    return (
      <div class="f-distributed">

        <div class="f-left">
            <img src="assets/images/Group 1.png"></img>

            

            <p class="f-company-name">Copyright © 2021 <strong>CarHorizonX</strong> All rights reserved</p>
        </div>

        <div class="f-center">
            <div>
                <i class="fa fa-map-marker"></i>
                <p><span>Panaji (HEAD OFFICE)</span> GOA
                </p>
            </div>

            <div>
                <i class="fa fa-phone"></i>
                <p>+91 7429425812</p>
            </div>
            <div>
                <i class="fa fa-envelope"></i>
                <p><a href="mailto:sujithsai.sirimalla33@gmail.com">CarHorizonX@gmail.com</a></p>
            </div>
        </div>
        <div class="f-right">
            <p class="f-company-about">
                <span>About the company</span>
                <strong>CarHorizonX</strong>  where passion for automobiles meets unparalleled service. Since 2010, we've been a trusted destination in Goa, offering a diverse range of vehicles to suit every lifestyle. Our commitment to quality is unwavering, ensuring that each car in our showroom meets the highest standards of performance and reliability.
            </p>
            <div class="f-icons">
                <a href="#"><i class="fa fa-facebook"></i></a>
                <a href="#"><i class="fa fa-instagram"></i></a>
                <a href="#"><i class="fa fa-linkedin"></i></a>
                <a href="#"><i class="fa fa-twitter"></i></a>
                <a href="#"><i class="fa fa-youtube"></i></a>
            </div>
        </div>
    </div>
    );
};
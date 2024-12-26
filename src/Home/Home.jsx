import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Header } from "../Header/Header";
import { Footer } from '../Footer/Footer';
import { NavLink } from "react-router-dom";
import { CarDetail } from "../Cars/CarDetail";

const API_URL = 'https://carshowroom-backend.onrender.com/api/v1/car/';

export const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(API_URL)
      .then(response => {
        console.log(response.data); // Log the response data for inspection
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Header />
      <section id="banner" className="major">
        <div className="inner container">
         
            <h1 className="san">Your Car Your Story</h1>
         
          <div className="content">
            <ul className="actions">
              <li key={"searchCars"}><NavLink to="/search/car" className="abc next scrolly">Search Cars</NavLink></li>
            </ul>
          </div>
        </div>
      </section>

      <div id="main">
        <section className="tiles">
          {loading ? (
            <h3>Loading data...</h3>
          ) : (
            data.allCars && Array.isArray(data.allCars) && data.allCars.length > 0 ? (
              data.allCars.map(item => (
                <article key={item._id} style={{ backgroundImage: `url(${item.image && item.image.length > 0 ? item.image[0] : ''})` }}>
                  <span className="image">
                    <img src={item.image && item.image.length > 0 ? item.image[0] : ''} alt="" />
                  </span>
                  <header className="major">
                    <p>
                      <i className="fa fa-cube"></i>{item.engineSize}&nbsp;&nbsp;
                      <i className="fa fa-cog"></i> {item.transmission}
                    </p>
                    <h3>{item.brand} {item.name}</h3>
                    <p><strong>{item.price}</strong></p>
                    <p>{item.horsePower}HP</p>
                    <div className="major-actions">
                      <NavLink to={`/cars/${item._id}`} className="button small">View Car</NavLink>
                    </div>
                  </header>
                </article>
              ))
            ) : (
              <h3>No car data available.</h3>
            )
          )}
        </section>

        <section>
          <div className="inner">
            <header className="major">
              <h2>About us</h2>
            </header>
            <p>
              {/* Your about us content */}

              
Welcome to CarHorizonX, where passion for automobiles meets unparalleled service. Since 2010, we've been a trusted destination in Goa, offering a diverse range of vehicles to suit every lifestyle. Our commitment to quality is unwavering, ensuring that each car in our showroom meets the highest standards of performance and reliability. At CarHorizonX, integrity is at the core of what we do — transparent transactions and honest advice define our customer interactions. We take pride in our role as a local institution, contributing to the automotive landscape of Goa. Our knowledgeable team is dedicated to providing expert guidance, making your car-buying experience seamless. Discover the joy of driving with us; our passion goes beyond selling cars to delivering exceptional automotive experiences. Your satisfaction is our priority, and we look forward to serving you at CarHorizonX. Visit us today at Goa,Calangute and embark on a journey towards your dream car.      
            </p>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};

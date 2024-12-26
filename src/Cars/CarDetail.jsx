import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import { Header } from "../Header/Header";
import { Footer } from '../Footer/Footer';

export const CarDetail = () => {
  const location = useLocation();
  const idReturned = location.pathname.slice(6);

  let API_URL = `https://carshowroom-backend.onrender.com/api/v1/car/${idReturned}`;
  let delete_API = `https://carshowroom-backend.onrender.com/api/v1/car/delete/${idReturned}`;
  let AddToCart_API = `https://carshowroom-backend.onrender.com/api/v1/cart`;

  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(API_URL)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const navigate = useNavigate();

  function purchaseBTN() {
    if (localStorage.getItem('user') == null) {
      navigate('/Login');
    } else {
      let userDetails = JSON.parse(localStorage.getItem('user'));
      let userID = userDetails.foundedUser._id;
      let cartData = {
        createdBy: userID,
        cars: [{
          carId: idReturned,
          quantity: 1
        }],
      };

      if (localStorage.getItem('cart') == null) {
        localStorage.setItem('cart', JSON.stringify(cartData));
        fetch(AddToCart_API, {
          method: 'POST',
          body: JSON.stringify(cartData),
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(response => response.json())
          .then(data => {
            console.log(data);
            navigate('/cart');
          })
          .catch(error => { console.log(error) });
      } else if (userID == JSON.parse(localStorage.getItem('cart')).createdBy) {
        let foundedCart = JSON.parse(localStorage.getItem('cart'));
        console.log(foundedCart);
        for (let i = 0; i < foundedCart.cars.length; i++) {
          if (foundedCart.cars[i].carId !== idReturned) {
            cartData.cars.push({
              carId: foundedCart.cars[i].carId,
              quantity: foundedCart.cars[i].quantity
            });
          }
        }
        localStorage.setItem('cart', JSON.stringify(cartData));

        fetch(AddToCart_API, {
          method: 'POST',
          body: JSON.stringify(cartData),
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(response => response.json())
          .then(data => {
            console.log(data);
            navigate('/cart');
          })
          .catch(error => { console.log(error) });
      }
    }
  }

  function deleteBTN() {
    axios.delete(delete_API)
      .then(response => {
        console.log(response.data);
      })
      .then(localStorage.removeItem('cart'))
      .catch(error => {
        console.error(error);
      });
    navigate('/Home');
  }

  function updateBTN() {
    navigate(`/Updatecar/${idReturned}`);
  }

  function addCarPicsBTN() {
    navigate(`/AddCarPics/${idReturned}`);
  }

  return (
    <>
      <Header />
      <div id="main" className="alt">
        {data.car ? (
          <>
            <section id="one">
              <div className="inner">
                <header className="major">
                  <h1>{`${data.car.brand} ${data.car.name}`}</h1>
                </header>

                <div className="row">
  <div className="col-md-6">
    <a href={data.car.image[0]} target="_blank">
      <img src={`${data.car.image[0]}`} className="img-responsive" alt="" />
    </a>
  </div>

  <div className="col-md-6">
    <div className="row">
      {data.car.image &&
        data.car.image.length > 0 &&
        data.car.image.map((item, index) => (
          <div key={index} className="col-md-4 col-xs-6">
            <a href={item} target="_blank">
              <img src={`${item}`} className="img-responsive" alt={`Image ${index}`} />
            </a>
          </div>
        ))}
      {(!data.car.image || data.car.image.length === 0) && (
        <p>No images available. Data: {JSON.stringify(data)}</p>
      )}
    </div>
    <h2>price: {data.car.price}</h2>
                    <br />
                    HorsePower: {data.car.horsePower} HP
                    <br />
                    Engine Size: {data.car.engineSize}
                    <br />
                    Color: {data.car.color}
                    <br />
                    Number of Seats: {data.car.seats}
                    <br />
                    Max Speed: {data.car.maxSpeed}
                    <br />
                    Acceleration 0-100 (km/h): {data.car.acceleration}
                    <br />
                    Number of Airbags: {data.car.airBags}
                    <br />
                    Vehicle Type: {data.car.type}
                  </div>
                </div>

                <br />
                {localStorage.getItem('user') !== null ? (
                  JSON.parse(localStorage.getItem('user')).foundedUser.role == "User" ? (
                    <>
                      <button id="purchase" onClick={purchaseBTN}>Purchase</button>
                    </>
                  ) : (<></>)
                ) : (<></>)}
                {localStorage.getItem('user') !== null ? (
                  JSON.parse(localStorage.getItem('user')).foundedUser.role == "Admin" ? (
                    <>
                      <button id="delete" className="mx-3 bg-danger" onClick={deleteBTN}>delete</button>
                      <button id="update" className="mx-3 bg-warning" onClick={updateBTN}>update</button>
                      <button id="Add More Photos" className="mx-3" onClick={addCarPicsBTN}>add more photos</button>
                    </>
                  ) : (<></>)
                ) : (<></>)}
              </div>
            </section>
          </>
        ) : (<h3>loading data...</h3>)}
      </div>
      <Footer />
    </>
  );
};

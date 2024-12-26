import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import {  useNavigate  } from 'react-router-dom';


const stripePromise = loadStripe('X');

let API_URL = 'https://carshowroom-backend.onrender.com/api/v1/order'


const PaymentForm = () => {
let navigate = useNavigate()
    const cardElementStyle = {
        base: {
          color: '#32325d',
          backgroundColor: '#fff',
          fontSize: '26px',
        },
      };

  const stripe = useStripe();
  
  const elements = useElements();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
  }
  let submitPayment = () => {
    let userId = JSON.parse(localStorage.getItem('order')).createdBy
    let cart = JSON.parse(localStorage.getItem('order')).cart
    let totalPrice = JSON.parse(localStorage.getItem('order')).totalPrice
    let email = JSON.parse(localStorage.getItem('user')).foundedUser.email
    alert("Purchased Successfully!!");
    let myData = {
      createdBy:userId,
      cart,
      totalPrice,
      email
    }
    fetch(API_URL, {
      method:'POST',
     body:JSON.stringify(myData),
     headers: {
      'Content-Type': 'application/json'
       }
      
    })
    .then(response => response.json())
    .then(data => {console.log(data)})
    .catch(error => {console.log(error)})
   
    localStorage.removeItem('order')
    localStorage.removeItem('cart')
    navigate('/home')
    
  }

  return (
    <div>
      {isSubmitted ? (
        <p>Redirecting to your bank's page...</p>
      ) : (
        <form className='paymentForm mt-5' onSubmit={handleSubmit}>
          <label>
            Credit card number:
            <CardElement options={{ style: cardElementStyle }} />
          </label>
          <div className='text-center'>
          <button onClick={submitPayment}>Submit Payment</button>
          </div>
        </form>
      )}
    </div>
  );
};

export const Payment = () => {
  return (
    <>
   

  
        <Header/>
      
        <div id="main" className="alt">
            <section id="one">
            <div className="inner my-5">
      <Elements stripe={stripePromise}>
        <PaymentForm />
      </Elements>
      </div>
      </section>
      </div>
      <Footer/>
    </>
  );
};
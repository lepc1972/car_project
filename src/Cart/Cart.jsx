import React, { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Header } from "../Header/Header";
import { Footer } from '../Footer/Footer';


export const Cart = () => {

    

    const navigate  = useNavigate();
    const [data, setData] = useState([]);
    const [cartId, setCartId] = useState('')
    const [totalPrice, setTotalPrice] = useState(0);
   


    let AddToCart_API = `https://carshowroom-backend.onrender.com/api/v1/cart`;
    
    useEffect(() => {
        let userDetails = JSON.parse(localStorage.getItem('user'));
        if (!userDetails || !userDetails.foundedUser || !userDetails.foundedUser._id) {
            console.error("User details or _id is undefined.");
            navigate('/login');
        } else {
            let userID = userDetails.foundedUser._id;
            let getCart_API = `https://carshowroom-backend.onrender.com/api/v1/cart/${userID}`;
    
            axios.get(getCart_API)
                .then(response => {
                    console.log("Response data:", response.data);
    
                    // Check if the response is successful and contains the expected data
                    if (response.data && response.data.foundedCart && response.data.foundedCart._id) {
                        setData(response.data);
                        setCartId(response.data.foundedCart._id);
                    } else {
                        console.error("Invalid response structure or Cart ID is undefined.");
                    }
                })
                .catch(error => {
                    console.error("Error fetching cart data:", error);
                    setData({ error: error.message || "An error occurred while fetching cart data." });
                });
        }
    }, []);
    
       
        useEffect(() => {
            // Calculate the total price
            let total = data.carsDetails
              ? data.carsDetails.reduce(
                  (acc, item) =>
                    acc + parseInt(item.carPrice.replace(/,/g, "")) * item.carQuantity,
                  0
                )
              : 0;
            setTotalPrice(total);
          }, [data]);

       
         



    
    let addBtn =  event => {
        let CarQuantity = parseInt(event.target.parentNode.querySelector('#cartQuantity').innerText);
        let q = event.target.parentNode.querySelector('#cartQuantity').innerText = parseInt(CarQuantity) + 1
        let p = event.target.parentNode.querySelector('#cartPrice').innerText
       event.target.parentNode.querySelector('#totalPrice').innerText = `Total price = ${parseInt(p.replace(/,/g, "")) * parseInt(q)} L.E`
        
        let carID = event.target.parentNode.parentNode.id
        let savedCars = JSON.parse(localStorage.getItem('cart'));
        let updatedCart = savedCars.cars.map(obj =>{
            if(obj.carId == carID){
                return{...obj,quantity:parseInt(CarQuantity) + 1 }
            } else {
                return obj;
            }
        })
        savedCars.cars = updatedCart
        localStorage.setItem('cart',JSON.stringify(savedCars))
        let cartData = {
            createdBy: savedCars.createdBy,
            cars:savedCars.cars
        }
        fetch(AddToCart_API, {
            method:'POST',
           body:JSON.stringify(cartData),
           headers: {
            'Content-Type': 'application/json'
             }
            
          })
          
          setTotalPrice(parseInt(totalPrice) + parseInt(p.replace(/,/g, "")));
          
      };
        

   
            
        
       
    
    let deleteBtn = event => {
        let CarQuantity = parseInt(event.target.parentNode.querySelector('#cartQuantity').innerText);
        let q = event.target.parentNode.querySelector('#cartQuantity').innerText = parseInt(CarQuantity) - 1
        let p = event.target.parentNode.querySelector('#cartPrice').innerText
       event.target.parentNode.querySelector('#totalPrice').innerText = `Total price = ${parseInt(p.replace(/,/g, "")) * parseInt(q)} L.E`
        let carID = event.target.parentNode.parentNode.id
        let savedCars = JSON.parse(localStorage.getItem('cart'));
        let updatedCart = savedCars.cars.map(obj =>{
            if(obj.carId == carID){
                return{...obj,quantity:parseInt(CarQuantity) - 1 }
            } else {
                return obj;
            }
        })
        savedCars.cars = updatedCart
        localStorage.setItem('cart',JSON.stringify(savedCars))
        let cartData = {
            createdBy: savedCars.createdBy,
            cars:savedCars.cars
        }
        fetch(AddToCart_API, {
            method:'POST',
           body:JSON.stringify(cartData),
           headers: {
            'Content-Type': 'application/json'
             }
            
          })
          .then(response => response.json())
          .then(data => {console.log(data)})
          .catch(error => {console.log(error)})
          setTotalPrice(parseInt(totalPrice) - parseInt(p.replace(/,/g, "")));
      };

      let removeItem = event => {
        event.target.parentNode.parentNode.remove()
        let savedCars = JSON.parse(localStorage.getItem('cart'))
        let itemID = event.target.parentNode.parentNode.id
        let carsArray = []
        for(let i=0; i < savedCars.cars.length;i++){
            if(itemID !== savedCars.cars[i].carId){
                carsArray.push(savedCars.cars[i])
            }
        }
        savedCars.cars = carsArray
        localStorage.setItem('cart',JSON.stringify(savedCars))

        let cartData = {
            createdBy: savedCars.createdBy,
            cars:carsArray
        }
        fetch(AddToCart_API, {
            method:'POST',
           body:JSON.stringify(cartData),
           headers: {
            'Content-Type': 'application/json'
             }
            
          })
          .then(response => response.json())
          .then(data => {console.log(data)})
          .catch(error => {console.log(error)})
          window.location.reload()
      }

    let addMoreCars = () => {
        navigate('/home');
    };
    let go_To_Payment_BTN = () => {
        let data = {
        createdBy:JSON.parse(localStorage.getItem('user')).foundedUser._id,
        cart:cartId,
        totalPrice:totalPrice
        }
        localStorage.setItem('order',JSON.stringify(data))
        navigate('/payment')
    }

    return(
        <>
        <Header/>
            <div id="main" className="alt">
            <section id='one'>
            <div className="inner row">
            <header className="major col-12">
                     <h1>Cart Items</h1>
                </header>
                {data.carsDetails ? ( 
								data.carsDetails.map((item,index
                                    ) => (
                <div className="cart mx-3" id={item.carID} key={index}>
                    
                    <div className="cart-img position-relative">
                        <img src={`${item.carImg}`} width='200' height='200'/>
                        <span className="rmv_item position-absolute top-0 start-0" onClick={removeItem}>x</span>
                    </div>
                    <div className="cart-action" id={`div`}>
                        <h3>{item.carBrand} {item.carName}</h3>                        
                        <p id={`cartPrice`}>{item.carPrice}</p>
                        
                        <button className="btn btn-danger" onClick={deleteBtn}>-</button>
                        <span id={`cartQuantity`} className="px-3">{item.carQuantity}</span>
                        <button className="btn btn-info" onClick={addBtn}>+</button>
                        <p id={`totalPrice`}>Total price = {parseInt(item.carPrice.replace(/,/g, "")) * parseInt(item.carQuantity)} L.E</p>
                    </div>
                    <hr />
                </div>
                                ))
                               
                                )
                                : (<h3>loading data...</h3>)}
                               
                </div>
                <div className="text-center">
                    <p>Total Payment: {totalPrice} L.E</p>
                                <button className="btn-danger" onClick={go_To_Payment_BTN}>Proceed to Payment</button>
                                <button className="btn-warning" onClick={addMoreCars}>Add More Cars</button>
                                </div>
                </section>
            </div>
            <Footer/>
        </>
    )
}
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../Home/Home";
import { CarDetail } from '../Cars/CarDetail'
import { Signup } from "../Auth/Signup";
import { Login } from "../Auth/Login";
import { Admin } from "../Admin/Admin";
import { UpdateCar } from "../Admin/UpdateCar";
import { AddCarPics } from "../Admin/AddCarPics";
import { Cart } from "../Cart/Cart";
import { PageNotFound } from "../NotFound/PageNotFound";
import { SearchCars } from "../Cars/SearchCars";
import { Payment } from "../Order/Payment";
import { Order } from "../Admin/Order";
// AnotherFile.jsx


// Rest of the code


export const Routers = () => {
  
  return (
    <Routes>
      <Route exact path='/' element={<Navigate to='/Home' />}/>  
      <Route path='/cars/:id' element={<CarDetail/>} />
      <Route path='/Search/car/' element={<SearchCars/>}/>
      <Route path="/Signup" element={<Signup />} />
      <Route path="/Login" element={<Login />} />
      <Route path='/Home' element={<Home />} />
      <Route path='/Admin' element={<Admin/>}></Route>
      <Route path='/UpdateCar/:id' element={<UpdateCar/>}></Route>
      <Route path='/AddCarPics/:id' element={<AddCarPics/>}></Route>
      <Route path='/Cart' element={<Cart/>}></Route>
      <Route path='/Payment' element={<Payment/>}></Route>
      <Route path='/Order' element={<Order/>}></Route>
      <Route element={<PageNotFound/>}/>
      <Route path='*' element={<Navigate to="/404" />}></Route>
      <Route path='404' element={<PageNotFound/>}></Route>
    </Routes>
    
  );
};

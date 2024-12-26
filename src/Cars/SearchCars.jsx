import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Header } from "../Header/Header";
import { Footer } from '../Footer/Footer';

export const SearchCars = () => {
    const API_URL = 'https://carshowroom-backend.onrender.com/api/v1/car/search';
    const [data, setData] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState('default');
    const [selectedModel, setSelectedModel] = useState('default');

    useEffect(() => {
        axios.get(API_URL)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [API_URL]);

    const handleBrandChange = (event) => {
        setSelectedBrand(event.target.value);
        setSelectedModel('default');
    };

    const handleModelChange = (event) => {
        setSelectedModel(event.target.value);
    };

    const uniqueBrands = data.allCars
        ? data.allCars
            .map((item) => item.brand)
            .filter((value, index, self) => self.indexOf(value) === index)
        : [];

    return (
        <>
            <Header />
            <div id="main" className="back">
                <section id="alt">
                    <div className="inner">
                        <div className=" search d-flex justify-content-center">
                            <div className="Brand">
                                <select id="carBrand" onChange={handleBrandChange} name="brand" className="searchSelect" value={selectedBrand}>
                                    <option disabled value='default'>Select Brand</option>
                                    {data.allCars ? (
                                        uniqueBrands.map((brand, index) => (
                                            <option className="brandopt" value={brand} key={`${brand}-${index}`}>{brand}</option>
                                        ))
                                    ) : (<></>)}
                                </select>
                            </div>
                            <div className="carName col-3">
                                <select id="carName" onChange={handleModelChange} name="model" className="searchSelect" value={selectedModel}>
                                    <option disabled value='default'>Select Model</option>
                                    {data.allCars && selectedBrand ? (
                                        data.allCars.map(item => (
                                            item.brand === selectedBrand ? (
                                                <option className="nameopt" value={item.name} key={`${item._id}-${item.name}`}>{item.name}</option>
                                            ) : (<></>)
                                        ))
                                    ) : (<></>)}
                                </select>
                            </div>
                        </div>
                        <div id="main" className="my-5 text-center">
                            <section className="tiles d-flex justify-content-center searchedCar">
                                {data.allCars && selectedBrand ? (
                                    data.allCars.map(item => (
                                        item.brand === selectedBrand ? (
                                            selectedModel ? (
                                                item.name === selectedModel ? (
                                                    <article className="carCard" key={item._id} style={{ backgroundImage: `url(${item.image && item.image[0]})` }}>
                                                        <span className="image">
                                                            {item.image && item.image[0] && (
                                                                <img src={item.image[0]} alt="" />
                                                            )}
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
                                                ) : (<></>)
                                            ) : (
                                                <article className="carCard" key={item._id} style={{ backgroundImage: `url(${item.image && item.image[0]})` }}>
                                                    <span className="image">
                                                        {item.image && item.image[0] && (
                                                            <img src={item.image[0]} alt="" />
                                                        )}
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
                                            )
                                        ) : (<></>)
                                    ))
                                ) : (<></>)}
                            </section>
                        </div>
                    </div>
                   
                </section>
               

             
        
            </div>
            <Footer />
          
        </>
    );
};

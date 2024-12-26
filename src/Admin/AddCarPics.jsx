import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";

export const AddCarPics = () => {
  const location = useLocation();
  const idReturned = location.pathname.slice(12);
  const API_URL = `https://carshowroom-backend.onrender.com/api/v1/car/images/${idReturned}`;

  const navigate = useNavigate();

  useEffect(() => {
    let userRole = JSON.parse(localStorage.getItem("user"));
    if (userRole == null || userRole.foundedUser.role !== "Admin") {
      navigate("/home");
    }
  }, [navigate]);

  const [inputs, setInputs] = useState([{ key: 0 }]);

  const handleAddInput = () => {
    const newKey = inputs[inputs.length - 1].key + 1;
    setInputs([...inputs, { key: newKey }]);
  };

  const handleImageUpload = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    inputs.forEach((input) => {
      const fileInput = event.target.querySelector(`input[name="image-${input.key}"]`);
      if (fileInput && fileInput.type === "file") {
        formData.append(`image`, fileInput.files[0]); // Change this line
      }
    });

    fetch(API_URL, {
      method: "PATCH",
      body: formData,
    })
      .then((response) => {
        if (response.status === 202) {
          response
            .json()
            .then((data) => {
              console.log(data);
              navigate(`/cars/${idReturned}`);
            })
            .catch((error) => console.error(error));
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <Header />

      <div id="main" className="alt">
        <section id="one">
          <div className="inner row">
            <header className="major col-12">
              <h1>Add Car Photos</h1>
            </header>
            <form onSubmit={handleImageUpload}>
              {inputs.map((input) => (
                <div key={input.key}>
                  <input type="file" name={`image-${input.key}`} />
                </div>
              ))}
              <button type="button" onClick={handleAddInput}>
                Add Image
              </button>
              <button type="submit">
                Upload Images
              </button>
            </form>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

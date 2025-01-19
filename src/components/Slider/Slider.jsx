import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel"; // Bootstrap Carousel
import axios from "axios";
import "./Slider.css";
import { API_BASE_URL } from "../../services/apiService";
import api from "../../services/api";

const Slider = () => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await api.get(`/api/slider/get/all`);
        setSlides(response.data);
      } catch (error) {
        console.error("Error fetching tribine data:", error);
      }
    };

    fetchSlides();
  }, []);

  return (
    <div className="d-flex width-90">
      <div className="tribine-slider rounded">
        {slides.length > 0 ? (
          <Carousel>
            {slides.map((slide, index) => (
              <Carousel.Item key={index}>
                <div className="slider-image-wrapper">
                  <img
                    src={`${API_BASE_URL}/images/${slide.acImage}`}
                    alt={slide.acTitle}
                    className="d-block w-100 slider-image shadow"
                  />
                  <div className="gradient-overlay"></div>
                  <Carousel.Caption>
                    <h3 className="text-center">{slide.acTitle}</h3>
                  </Carousel.Caption>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Slider;

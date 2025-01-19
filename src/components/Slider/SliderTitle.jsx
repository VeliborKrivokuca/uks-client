import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel"; // Bootstrap Carousel
import axios from "axios";
import "./Slider.css";
import { useLanguage } from "../../context/LanguageContext";
import { API_BASE_URL } from "../../services/api";
import api from "../../services/api";

const SliderTitle = () => {
  const [slides, setSlides] = useState([]);
  const { language } = useLanguage();

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
    <div className="width-90 row">
      {language === 1 && (
        <section className="support-section d-flex align-items-center col-lg-5 col-12 p-0">
          <div className="support-content">
            <h1 className="support-title mb-4 title-color">
              Podrška kompozitorskoj umetnosti Srbije
            </h1>
            <p className="support-description mt-5 title-color pe-5 me-3">
              Posvećeni smo očuvanju, promociji i razvoju kompozitorske
              umetnosti u Srbiji, pružajući podršku našim stvaraocima i čuvajući
              muzičku tradiciju.
            </p>
          </div>
        </section>
      )}

      {language === 2 && (
        <section className="support-section d-flex align-items-center col-lg-5 col-12">
          <div className="support-content px-3">
            <h1 className="support-title mb-4 title-color">
              Support for the Compositional Art of Serbia
            </h1>
            <p className="support-description mt-5 title-color pe-5 me-3">
              We are dedicated to preserving, promoting, and developing the
              compositional art in Serbia, providing support to our creators and
              safeguarding musical traditions.
            </p>
          </div>
        </section>
      )}
      <div className="slider-title rounded col-lg-7 col-12 align-self-center p-0">
        {slides.length > 0 ? (
          <Carousel>
            {slides.map((slide, index) => (
              <Carousel.Item key={index}>
                <div className="slider-image-wrapper shadow rounded">
                  <img
                    src={`${API_BASE_URL}/images/${slide.acImage}`}
                    alt={slide.acTitle}
                    className="d-block w-100 slider-image rounded"
                  />
                  <div className="gradient-overlay rounded"></div>
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

export default SliderTitle;

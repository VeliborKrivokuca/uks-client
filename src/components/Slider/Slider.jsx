import React, { useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import { useSelector, useDispatch } from "react-redux";
import { fetchSlider } from "../../store/actions/sliderActions";
import "./Slider.css";
import { API_BASE_URL } from "../../services/api";
import { Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const Slider = () => {
  const dispatch = useDispatch();
  const { slides, loading, error } = useSelector((state) => state.slider);
  const {t} = useTranslation;

  useEffect(() => {
    dispatch(fetchSlider());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Container>
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
        <p>No slides available</p>
      )}
    </Container>
  );
};

export default Slider;

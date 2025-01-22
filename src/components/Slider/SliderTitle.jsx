import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import { useSelector, useDispatch } from "react-redux";
import { fetchSlider } from "../../store/actions/sliderActions";
import "./Slider.css";
import { API_BASE_URL } from "../../services/api";
import { useTranslation } from "react-i18next";

const SliderTitle = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  // Access slider state from Redux
  const { slides, loading, error } = useSelector((state) => state.slider);

  useEffect(() => {
    dispatch(fetchSlider());
  }, [dispatch]);

  return (
    <Container fluid>
      <Container className="dynamic-width-container">
        <Row className="justify-content-between">
          <Col lg={5} md={12} xs="auto">
            <div>
              <h1 className="mb-4 title-color">{t("slider.supportTitle")}</h1>
              <p className="support-description mt-5 title-color pe-5 me-3">
                {t("slider.supportDescription")}
              </p>
            </div>
          </Col>

          <Col
            lg={7}
            md={12}
            xs="auto"
            className="slider-title rounded align-self-center"
          >
            {loading ? (
              <p>{t("loading.slider")}</p>
            ) : error ? (
              <p>{t("error.slider", { error })}</p>
            ) : slides.length > 0 ? (
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
                        <h3 className="text-center text-white">
                          {slide.acTitle}
                        </h3>
                      </Carousel.Caption>
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel>
            ) : (
              <p>{t("slider.noSlides")}</p>
            )}
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default SliderTitle;

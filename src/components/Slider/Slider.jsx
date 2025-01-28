import React, { useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import { useSelector, useDispatch } from "react-redux";
import { fetchSlider } from "../../store/actions/sliderActions";
import "./Slider.css";
import { API_BASE_URL } from "../../services/api";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const Slider = () => {
  const dispatch = useDispatch();
  const { slides, loading, error } = useSelector((state) => state.slider);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchSlider());
  }, [dispatch]);

  const activeSlides = slides.filter((slide) => slide.anStatus === "1");

  if (loading)
    return (
      <Container>
        <p>{t("info.loading")}</p>
      </Container>
    );
  if (error)
    return (
      <Container>
        <p>
          {t("info.error")} {error}
        </p>
      </Container>
    );

  return (
    <Container className="section-divider-small">
      {activeSlides.length > 0 ? (
        <Carousel>
          {activeSlides.map((slide, index) => (
            <Carousel.Item key={index}>
              <div className="slider-image-wrapper rounded">
                {/* Wrap the image with an anchor tag */}
                <a
                  href={
                    slide.acLink.startsWith("http://") ||
                    slide.acLink.startsWith("https://")
                      ? slide.acLink
                      : `https://${slide.acLink}` // Default to HTTPS if the protocol is missing
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={`${API_BASE_URL}/images/${slide.acImage}`}
                    alt={slide.acTitle}
                    className="d-block w-100 slider-image rounded shadow"
                  />
                  <div className="gradient-overlay rounded"></div>
                </a>
                <Carousel.Caption>
                  <h3 className="text-center">{slide.acTitle}</h3>
                </Carousel.Caption>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <p>{t("slider.noSlides")}</p>
      )}
    </Container>
  );
};

export default Slider;

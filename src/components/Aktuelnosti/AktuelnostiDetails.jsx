import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchBlogDetails,
  fetchBlogImages,
} from "../../store/actions/aktuelnostiActions";
import { Container, Row, Col } from "react-bootstrap";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import image from "../../assets/logo-image.png";
import noPhotoImage from "../../assets/no-photo.jpg";
import "./AktuelnostiDetails.css";
import { API_BASE_URL } from "../../services/api";
import { useTranslation } from "react-i18next";
import Clients from "../Clients/Clients";

const AktuelnostiDetails = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { blog, images, loading, error } = useSelector(
    (state) => state.aktuelnostiDetails
  );

  useEffect(() => {
    dispatch(fetchBlogDetails(id));
    dispatch(fetchBlogImages(id));
  }, [dispatch, id]);

  function formatDateToDDMMYYYY(dateInput) {
    const date = new Date(dateInput);

    const day = String(date.getDate()).padStart(2, "0"); // Ensures two digits
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  }

  const handleImageClick = (index) => {
    const formattedImages = images.map((img) => ({
      src: `${API_BASE_URL}/images/${img.image_path}`,
      alt: t("gallery.imageAlt"),
    }));
    setLightboxImages(formattedImages);
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  if (loading)
    return (
      <Container>
        <p>{t("info.loading")}</p>
      </Container>
    );

  return (
    <Container fluid>
      <Clients></Clients>
      <Container className="section-divider-small">
        {/* Header / Meta Info */}
        <Row className="align-items-center mb-4">
          <Col xs="auto">
            <div className="rounded-circle primary-border">
              <img src={image} alt="Logo" className="blog-logo-img" />
            </div>
          </Col>
          <Col className="ps-0">
            <p className="mb-0 primary-color text-subtitle">
              {t("news.metaAuthor")}
            </p>
            <p className="mb-0 primary-color text-subtitle">
              {formatDateToDDMMYYYY(blog?.adTimePublish)}
            </p>
          </Col>
        </Row>

        {/* Title */}
        <Row>
          <Col>
            <h1 className="secondary-color text-main-title fw-bold">{blog?.acTitle}</h1>
          </Col>
        </Row>

        {/* Main Image */}
        <Row className="my-3">
          <Col>
            <img
              src={
                blog?.acImage
                  ? `${API_BASE_URL}/images/${blog.acImage}`
                  : noPhotoImage
              }
              alt={blog?.acTitle}
              className="w-100 rounded shadow-sm"
            />
          </Col>
        </Row>

        {/* Description */}
        <Row className="mb-4">
          <Col>
            <div
              className="blog-description ck-editor-text"
              dangerouslySetInnerHTML={{ __html: blog?.acDescription }}
            />
          </Col>
        </Row>

        {/* Gallery Section */}
        {images.length > 0 && (
          <Row className="blog-gallery">
            <Col xs={12}>
              <h2 className="gallery-title">{t("gallery.title")}</h2>
            </Col>
            {images.map((img, index) => (
              <Col xs={6} md={4} lg={3} key={index} className="mb-3">
                <img
                  src={`${API_BASE_URL}/images/${img.image_path}`}
                  alt={t("gallery.imageAlt")}
                  className="w-100 rounded cursor-pointer"
                  onClick={() => handleImageClick(index)}
                />
              </Col>
            ))}
          </Row>
        )}

        {/* Error message display */}
        {error && (
          <Row className="mt-4">
            <Col>
              <div className="alert alert-primary" role="alert">
                {t("error.blogDetails", { error })}
              </div>
            </Col>
          </Row>
        )}
      </Container>

      {lightboxOpen && (
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={lightboxImages}
          index={currentIndex}
          onIndexChange={setCurrentIndex}
        />
      )}
    </Container>
  );
};

export default AktuelnostiDetails;

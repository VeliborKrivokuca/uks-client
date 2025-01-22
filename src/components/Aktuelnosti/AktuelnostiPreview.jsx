import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchBlogs } from "../../store/actions/aktuelnostiActions";
import { useTranslation } from "react-i18next";
import { API_BASE_URL } from "../../services/api";
import { Container, Row, Col } from "react-bootstrap";

import image from "../../assets/logo-image.png";
import noPhotoImage from "../../assets/no-photo.jpg";
import Clients from "../Clients/Clients";
import Slider from "../Slider/Slider";

import "./AktuelnostiPreview.css";

const Aktuelnosti = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { blogs, loading, error } = useSelector((state) => state.aktuelnosti);

  useEffect(() => {
    dispatch(fetchBlogs(i18n.language));
  }, [dispatch, i18n.language]);

  const handleViewDetails = (id) => {
    navigate(`/blog/${id}`);
  };

  return (
    <Container className="my-4">
      <Clients />
      <Slider />

      {/* Title & Subtitle */}
      <Row className="my-4">
        <Col className="px-4">
          <h2 className="text-start title-color">{t("news.title")}</h2>
          <p className="text-start border-bottom-primary pb-3 title-color font-weight-light">
            {t("news.subtitle")}
          </p>
        </Col>
      </Row>

      {/* Blog List */}
      <Row>
        <Col className="p-0">
          {loading && <p>{t("news.loading")}</p>}
          {error && <p>{t("news.error", { error })}</p>}

          {!loading && !error && blogs.length > 0
            ? blogs.map((blog) => (
                <Row
                  key={blog.anId}
                  className="mb-4 p-4 flex-column-reverse flex-lg-row align-items-stretch"
                >
                  {/* Image Column */}
                  <Col
                    xs={12}
                    lg={6}
                    className="d-flex justify-content-center align-items-center py-3 py-lg-0 blog-image-wrapper"
                  >
                    <img
                      src={
                        blog.image
                          ? `${API_BASE_URL}/images/${blog.image}`
                          : noPhotoImage
                      }
                      alt={blog.title}
                      className="shadow blog-img w-100 h-100"
                    />
                  </Col>

                  {/* Text Column */}
                  <Col
                    xs={12}
                    lg={6}
                    className="d-flex flex-column justify-content-between ps-0 ps-lg-4"
                  >
                    <div>
                      <div className="blog-header d-flex align-items-center mb-3">
                        <div className="blog-logo rounded-circle border me-3">
                          <img
                            src={image}
                            alt="Logo"
                            className="blog-logo-img"
                          />
                        </div>
                        <div className="blog-meta">
                          <p className="primary-color mb-0">
                            {t("news.metaAuthor")}
                          </p>
                          <p className="primary-color mb-0">
                            {new Date(blog.publish_time).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <h3 className="secondary-color">{blog.title}</h3>
                      <p className="primary-color">{blog.subtitle}</p>
                    </div>
                    <div>
                      <button
                        className="primary-bg rounded primary-bg shadow mt-3 text-white"
                        onClick={() => handleViewDetails(blog.translation_id)}
                      >
                        {t("news.details")}
                      </button>
                    </div>
                  </Col>
                </Row>
              ))
            : /* Show this if not loading/error but no blogs */
              !loading && !error && <p>{t("news.noBlogs")}</p>}
        </Col>
      </Row>
    </Container>
  );
};

export default Aktuelnosti;

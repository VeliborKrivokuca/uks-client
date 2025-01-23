import React, { useEffect, useState } from "react";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Aktuelnosti = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { blogs, loading, error } = useSelector((state) => state.aktuelnosti);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(fetchBlogs(i18n.language));
  }, [dispatch, i18n.language]);

  const handleViewDetails = (id) => {
    navigate(`/blog/${id}`);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(blogs.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
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

          {!loading && !error && currentBlogs.length > 0
            ? currentBlogs.map((blog) => (
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

      {/* Pagination */}
      {totalPages > 1 && (
        <Row>
          <Col>
            <nav aria-label="Page navigation">
              <ul className="pagination justify-content-center">
                {/* Previous Button */}
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                  >
                    <FontAwesomeIcon icon={faArrowLeft} />
                  </button>
                </li>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, index) => {
                  const pageNumber = index + 1;
                  const isActive = currentPage === pageNumber;
                  return (
                    <li
                      key={pageNumber}
                      className={`page-item ${isActive ? "active" : ""}`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(pageNumber)}
                      >
                        {pageNumber}
                      </button>
                    </li>
                  );
                })}

                {/* Next Button */}
                <li
                  className={`page-item ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                  >
                    <FontAwesomeIcon icon={faArrowRight} />
                  </button>
                </li>
              </ul>
            </nav>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Aktuelnosti;

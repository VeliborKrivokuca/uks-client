import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchBlogs } from "../../store/actions/aktuelnostiActions";
import "./Aktuelnosti.css";
import image from "../../assets/logo-image.png";
import { useTranslation } from "react-i18next";
import { Col, Container, Row } from "react-bootstrap";

const Aktuelnosti = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const { blogs, loading, error } = useSelector((state) => state.aktuelnosti);

  useEffect(() => {
    dispatch(fetchBlogs(i18n.language));
  }, [dispatch, i18n.language]);

  const handleViewDetails = (id) => {
    navigate(`/blog/${id}`);
  };

  function formatDateToDDMMYYYY(dateInput) {
    const date = new Date(dateInput);

    const day = String(date.getDate()).padStart(2, "0"); // Ensures two digits
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  }

  // Sort blogs by publish_time in descending order and take the latest 2
  const latestBlogs = blogs
    ? [...blogs]
        .sort((a, b) => new Date(b.publish_time) - new Date(a.publish_time))
        .slice(0, 2)
    : [];

  return (
    <Container>
      <Row>
        {loading && <p>{t("news.loading")}</p>}
        {error && <p>{t("news.error", { error })}</p>}
        {!loading && !error && latestBlogs.length > 0 ? (
          latestBlogs.map((blog) => (
            <Col key={blog.anId} xs={12} className="mb-4">
              <div>
                <Row className="g-0 flex-nowrap align-items-center mb-3">
                  <Col
                    xs="auto"
                    className="blog-logo-container me-3 primary-border rounded-circle"
                  >
                    <img src={image} alt="Logo" className="blog-logo-img" />
                  </Col>

                  <Col className="blog-meta text-subtitle primary-color">
                    <p>{t("news.composers")}</p>
                    <p>{formatDateToDDMMYYYY(blog.publish_time)}</p>
                  </Col>
                </Row>

                <h3
                  onClick={() => handleViewDetails(blog.translation_id)}
                  className="secondary-color cursor-pointer text-main-title"
                >
                  {blog.title}
                </h3>
                <p className="primary-color text-subtitle">{blog.subtitle}</p>
                <button
                  className="text-white rounded primary-bg py-1 shadow text-subtitle"
                  onClick={() => handleViewDetails(blog.translation_id)}
                >
                  {t("news.details")}
                </button>
              </div>
            </Col>
          ))
        ) : (
          <p>{t("news.noBlogs")}</p>
        )}
      </Row>
    </Container>
  );
};

export default Aktuelnosti;

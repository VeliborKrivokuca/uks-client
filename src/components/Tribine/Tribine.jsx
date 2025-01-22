import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchTribines } from "../../store/actions/tribineActions";
import { Container, Row, Col } from "react-bootstrap";

import image from "../../assets/tribina.jpg";
import noPhotoImage from "../../assets/no-photo.jpg";
import { useTranslation } from "react-i18next";
import { API_BASE_URL } from "../../services/api";

import "./Tribine.css";

const TribineList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const { tribines, loading, error } = useSelector((state) => state.tribine);

  useEffect(() => {
    dispatch(fetchTribines(i18n.language));
  }, [dispatch, i18n.language]);

  const handleTribineClick = (id) => {
    navigate(`/tribine/${id}`);
  };

  return (
    <Container className="my-5">
      {/* Header Image */}
      <Row>
        <Col className="text-center">
          <img
            src={image}
            alt="Tribine Header"
            className="img-fluid rounded shadow"
          />
        </Col>
      </Row>

      {/* Title */}
      <Row className="my-4">
        <Col>
          <h1 className="title-color border-bottom-primary pb-3">
            {t("tribine.title")}
          </h1>
          {loading && <p>{t("info.loading")}</p>}
          {error && <p>{t("info.error", { error })}</p>}
        </Col>
      </Row>

      {/* Tribine Cards */}
      <Row className="g-4">
        {/* If there are no tribines and not loading/error, show a message */}
        {!loading && !error && tribines.length === 0 && (
          <Col>
            <p>{t("info.noData")}</p>
          </Col>
        )}

        {tribines.map((tribine) => (
          <Col
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={tribine.id}
            onClick={() => handleTribineClick(tribine.tribine_id)}
          >
            <div className="tribine-card cursor-pointer position-relative shadow rounded overflow-hidden">
              <img
                src={
                  tribine.thumbnail
                    ? `${API_BASE_URL}/${tribine.thumbnail}`
                    : noPhotoImage
                }
                alt={tribine.title || t("tribine.noThumbnail")}
                className="thumbnail"
              />
              <div className="gradient-overlay" />
              <h3 className="tribine-title text-white">{tribine.title}</h3>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default TribineList;

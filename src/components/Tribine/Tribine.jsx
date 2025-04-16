import "./Tribine.css";

import { Col, Container, Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { API_BASE_URL } from "../../services/api";
import Clients from "../Clients/Clients";
import Pagination from "../Pagination/Pagination";
import { fetchTribines } from "../../store/actions/tribineActions";
import image from "../../assets/tribina.jpg";
import noPhotoImage from "../../assets/no-photo.jpg";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const TribineList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const { tribines, loading, error } = useSelector((state) => state.tribine);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12); // Default items per page

  useEffect(() => {
    dispatch(fetchTribines(i18n.language));
  }, [dispatch, i18n.language]);

  const handleTribineClick = (id) => {
    navigate(`/tribine/${id}`);
  };

  // Filter only active tribines
  const activeTribines = tribines.filter((tribine) => tribine.status === "1");

  // Pagination logic
  const indexOfLastTribine = currentPage * itemsPerPage;
  const indexOfFirstTribine = indexOfLastTribine - itemsPerPage;
  const currentTribines = activeTribines.slice(
    indexOfFirstTribine,
    indexOfLastTribine
  );

  return (
    <>
      <Clients></Clients>
      <Container className="my-5 section-divider-small">
        <img className="w-100 rounded" src={image}></img>
        {/* Title */}
        <Row className="my-4">
          <Col>
            <h1 className="title-color border-bottom-primary pb-3 fw-bold text-uppercase text-main-title">
              {t("tribine.title")}
            </h1>
            {loading && <p>{t("info.loading")}</p>}
            {error && <p>{t("info.error", { error })}</p>}
          </Col>
        </Row>

        {/* Tribine Cards */}
        <Row className="g-4">
          {/* If there are no tribines and not loading/error, show a message */}
          {!loading && !error && activeTribines.length === 0 && (
            <Col>
              <p>{t("info.noData")}</p>
            </Col>
          )}

          {currentTribines.map((tribine) => (
            <Col
              xs={12}
              sm={6}
              md={6}
              lg={6}
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
                  className="thumbnail-tribina"
                />
                <div className="gradient-overlay" />
                <h3 className="tribine-title text-white fw-bold">
                  {tribine.title}
                </h3>
              </div>
            </Col>
          ))}
        </Row>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalItems={activeTribines.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
        />
      </Container>
    </>
  );
};

export default TribineList;

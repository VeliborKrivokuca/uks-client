import "./Tribine.css";

import { Col, Container, Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { API_BASE_URL } from "../../services/api";
import Clients from "../Clients/Clients";
import Pagination from "../Pagination/Pagination";
import { fetchTribines } from "../../store/actions/tribineActions";
import image from "../../assets/tribina.jpg";
import noPhotoImage from "../../assets/no-photo.jpg";
import { useTranslation } from "react-i18next";

const TribinaKompozitora = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();

  const { tribines, loading, error } = useSelector((state) => state.tribine);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12); // Default items per page

  useEffect(() => {
    dispatch(fetchTribines(i18n.language, 1));
  }, [dispatch, i18n.language]);

  const handleTribineClick = (id) => {
    navigate(`/festivali/${id}`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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
        {/* <img className="w-100 rounded" src={image}></img> */}
        {/* Title */}
        <Row className="my-4">
          <Col>
            <h2 className="text-start title-color text-main-title fw-bold text-uppercase px-2">
              {t("tribine.title2")}
            </h2>
            <p
              className="text-start border-bottom-primary pb-3 title-color fw-normal text-subtitle px-2"
              dangerouslySetInnerHTML={{
                __html: t("tribine.desc", { returnObjects: true }),
              }}
            ></p>
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

export default TribinaKompozitora;

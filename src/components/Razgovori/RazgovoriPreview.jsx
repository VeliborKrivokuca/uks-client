import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "./RazgovoriPreview.css";
import noPhotoImage from "../../assets/no-photo.jpg";
import Slider from "../Slider/Slider";
import Clients from "../Clients/Clients";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { fetchRazgovori } from "../../store/actions/razgovoriActions";
import { mapLanguageCodeToId } from "../../services/languageUtils";
import { API_BASE_URL } from "../../services/api";
import Pagination from "../Pagination/Pagination";

const RazgovoriPreview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const { razgovori, loading, error } = useSelector((state) => state.razgovori);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  useEffect(() => {
    const languageId = mapLanguageCodeToId(i18n.language);
    dispatch(fetchRazgovori(languageId));
  }, [dispatch, i18n.language]);

  const handleRazgovoriClick = (id) => {
    navigate(`/razgovori/${id}`);
  };

  // Filter only active razgovori (status === 1)
  const activeRazgovori = razgovori.filter(
    (razgovor) => razgovor.status === "1"
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRazgovori = activeRazgovori.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <>
      <Clients />
      <Slider />
      {/* Title and Subtitle */}
      <Container>
        <Row className="my-4">
          <Col>
            <h1 className="px-1 title-color fw-bold text-main-title text-uppercase">
              {t("talks.title")}
            </h1>
            <p className="px-1 text-start border-bottom-primary pb-3 title-color text-subtitle">
              {t("talks.subtitle")}
            </p>
          </Col>
        </Row>

        {/* Talks Grid */}
        <Row>
          {loading && (
            <Col>
              <p>{t("info.loading")}</p>
            </Col>
          )}
          {error && (
            <Col>
              <p>{t("info.error", { error })}</p>
            </Col>
          )}
          {!loading && !error && currentRazgovori.length === 0 && (
            <Col>
              <p>{t("talks.noTalks")}</p>
            </Col>
          )}
          {!loading &&
            !error &&
            currentRazgovori.map((razgovor) => (
              <Col
                key={razgovor.id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                className="mb-4"
                onClick={() => handleRazgovoriClick(razgovor.razgovorId)}
              >
                <div className="position-relative cursor-pointer">
                  <img
                    src={
                      razgovor.image
                        ? `${API_BASE_URL}/images/${razgovor.image}`
                        : noPhotoImage
                    }
                    alt={razgovor.title || t("talks.noImage")}
                    className="thumbnail rounded w-100"
                  />
                  <div className="gradient-overlay rounded"></div>
                  <h3 className="text-xl ps-3 position-absolute bottom-0 start-0 pb-5 text-white">
                    {razgovor.translationTitle}
                  </h3>
                  <p className="text-sm ps-3 position-absolute bottom-0 p-0 text-white w-100 end-0 pe-3 text-decoration-underline">
                    {t("talks.viewText")}
                  </p>
                </div>
              </Col>
            ))}
        </Row>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalItems={activeRazgovori.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
        />
      </Container>
    </>
  );
};

export default RazgovoriPreview;

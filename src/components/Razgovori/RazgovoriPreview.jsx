import React, { useEffect } from "react";
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

const RazgovoriPreview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const { razgovori, loading, error } = useSelector((state) => state.razgovori);

  useEffect(() => {
    const languageId = mapLanguageCodeToId(i18n.language);
    dispatch(fetchRazgovori(languageId));
  }, [dispatch, i18n.language]);

  const handleRazgovoriClick = (id) => {
    navigate(`/razgovori/${id}`);
  };

  if (loading) {
    return (
      <Container>
        <p>{t("info.loading")}</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <p>{t("info.error", { error })}</p>
      </Container>
    );
  }

  return (
    <>
      <Clients />
      <Slider />
      {/* Title and Subtitle */}
      <Container>
        <Row className="my-4">
          <Col>
            <h1 className="title-color">{t("talks.title")}</h1>
            <p className="text-start border-bottom-primary pb-3 title-color font-weight-light">
              {t("talks.subtitle")}
            </p>
          </Col>
        </Row>

        {/* Talks Grid */}
        <Row>
          {razgovori.length === 0 ? (
            <Col>
              <p>{t("razgovori.noTalks")}</p>
            </Col>
          ) : (
            razgovori.map((razgovor) => (
              <Col
                key={razgovor.id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                className="mb-4"
                onClick={() => handleRazgovoriClick(razgovor.id)}
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
                    {razgovor.title}
                  </h3>
                  <p className="text-sm ps-3 position-absolute bottom-0 p-0 text-white w-100 end-0 pe-3 text-decoration-underline">
                    {t("talks.viewText")}
                  </p>
                </div>
              </Col>
            ))
          )}
        </Row>
      </Container>
    </>
  );
};

export default RazgovoriPreview;

import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchRazgovorDetail } from "../../store/actions/razgovoriActions";
import Clients from "../Clients/Clients";
import { Container, Row, Col } from "react-bootstrap";
import "./RazgovoriDetails.css";
import noPhotoImage from "../../assets/no-photo.jpg";
import { API_BASE_URL } from "../../services/api";
import { useTranslation } from "react-i18next";

const RazgovoriDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const { razgovor, loading, error } = useSelector((state) => state.razgovori);

  useEffect(() => {
    dispatch(fetchRazgovorDetail(id, i18n.language));
  }, [dispatch, id, i18n.language]);

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

  if (!razgovor) {
    return (
      <Container>
        <p>{t("info.noData")}</p>
      </Container>
    );
  }

  // Generate thumbnail URL
  const getThumbnailUrl = () =>
    razgovor.razgovor.image
      ? `${API_BASE_URL}/images/${razgovor.razgovor.image}`
      : noPhotoImage;

  return (
    <>
      <Clients />
      {/* Title and Subtitle */}
      <Container className="section-divider">
        <Row className="mb-4">
          <Col>
            <h1 className="text-start title-color">{t("talks.title")}</h1>
            <p className="text-start border-bottom-primary pb-3 title-color">
              {t("talks.subtitle")}
            </p>
          </Col>
        </Row>

        {/* Content Section */}
        <Row>
          <Col xs={12} lg={4} className="mb-4 mb-lg-0">
            <img
              src={getThumbnailUrl()}
              alt={razgovor.razgovor.title}
              className="w-100 rounded"
            />
          </Col>
          <Col xs={12} lg={8}>
            <h2 className="secondary-color">{razgovor.translation.user}</h2>
            <div
              className="ck-editor-text"
              dangerouslySetInnerHTML={{
                __html: razgovor.translation.description,
              }}
            ></div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RazgovoriDetail;

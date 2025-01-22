import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import noPhotoImage from "../../assets/no-photo.jpg";
import { API_BASE_URL } from "../../services/api";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { fetchRazgovori } from "../../store/actions/razgovoriActions";
import { mapLanguageCodeToId } from "../../services/languageUtils";
import { Container, Row, Col } from "react-bootstrap";
import "./RazgovoriPreview.css";

const RazgovoriList = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

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
    <Container className="my-5">
      {razgovori.length === 0 ? (
        <p>{t("razgovori.noTalks")}</p>
      ) : (
        <Row className="gy-4">
          {razgovori.map((razgovor) => (
            <Col
              key={razgovor.id}
              xs={12}
              sm={6}
              md={4}
              lg={3}
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
                  className="thumbnail w-100 rounded-lg"
                />
                <div className="gradient-overlay rounded-lg position-absolute" />
                <h3 className="ps-3 pb-3 position-absolute text-white bottom-0 pb-5">
                  {razgovor.title}
                </h3>
                <p className="text-sm ps-3 position-absolute bottom-0 p-0 text-white w-100 end-0 pe-3 text-decoration-underline">
                  {t("talks.viewText")}
                </p>
              </div>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default RazgovoriList;

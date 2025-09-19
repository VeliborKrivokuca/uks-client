import "./AboutAssociation.css";

import { Col, Container, Row } from "react-bootstrap";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { API_BASE_URL } from "../../services/api";
import Clients from "../Clients/Clients";
import Slider from "../Slider/Slider";
import { fetchDocuments } from "../../store/slices/pagesSlice";
import { useTranslation } from "react-i18next";

export default function Recommendations() {
  const { t } = useTranslation();
  const links = t("recommendations.links", { returnObjects: true });

  const dispatch = useDispatch();

  const { documents, loading, error } = useSelector((state) => state.pages);

  useEffect(() => {
    dispatch(fetchDocuments("Preporuke"));
  }, [dispatch]);

  return (
    <>
      {/* Top Section: Clients & Slider */}
      <Clients />
      <Slider />
      <Container>
        {/* Title & Subtitle */}
        <Row>
          <Col>
            <h1 className="text-start title-color mt-4 pb-2 border-bottom-primary text-main-title fw-bold">
              {t("recommendations.title")}
            </h1>
          </Col>
        </Row>

        {/* Description & Links */}
        <Row className="my-4 primary-color">
          <Col>
            <h2 className="primary-color mb-3">
              {t("recommendations.subtitle")}
            </h2>
            <p className="mb-3">{t("recommendations.description")}</p>

            {documents?.map((link, index) => (
              <a
                href={API_BASE_URL + "/uploads/" + link.acDocument}
                key={index}
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none primary-color text-decoration-underline d-block"
              >
                {link.acName}
              </a>
            ))}
          </Col>
        </Row>
      </Container>
    </>
  );
}

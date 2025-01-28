import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Clients from "../Clients/Clients";
import Slider from "../Slider/Slider";
import { useTranslation } from "react-i18next";
import about from "../../assets/about.png";
import "./AboutAssociation.css";

export default function AboutAssociation() {
  const { t } = useTranslation();

  return (
    <Container fluidclassName="my-4">
      {/* Top Section: Clients & Slider */}
      <Clients />
      <Slider />
      <Container>
        {/* Title */}
        <Row className="my-4">
          <Col>
            <h2 className="mb-4 title-color border-bottom-primary pb-3">
              {t("about.title")}
            </h2>
          </Col>
        </Row>

        {/* Image and Description */}
        <Row className="mb-4">
          <Col md={3}>
            <img
              src={about}
              alt={t("about.subtitle")}
              className="img-fluid rounded shadow pe-4 py-3"
            />
          </Col>
          <Col md={9} className="primary-color">
            <h2 className="secondary-color mb-3 text-main-title">
              {t("about.subtitle")}
            </h2>
            <p>{t("about.description1")}</p>
          </Col>
        </Row>

        {/* Additional Details */}
        <Row className="mb-4 primary-color">
          <Col>
            <p>{t("about.members")}</p>
            <ul className="list-style">
              <li className="fw-bold">
                {t("about.visible")}, {t("about.visibleDesc")}
              </li>
              <li className="fw-bold">
                {t("about.accessible")}, {t("about.accessibleDesc")}
              </li>
              <li className="fw-bold">
                {t("about.present")}, {t("about.presentDesc")}
              </li>
            </ul>

            <p>{t("about.conclusion")}</p>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

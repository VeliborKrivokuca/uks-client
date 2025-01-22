import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Clients from "../Clients/Clients";
import Slider from "../Slider/Slider";
import { useTranslation } from "react-i18next";
import "./AboutAssociation.css";

export default function AdmissionRegulations() {
  const { t } = useTranslation();

  return (
    <Container fluid className="my-4">
      {/* Top Section: Clients & Slider */}
      <Row className="mb-4">
        <Col>
          <Clients />
          <Slider />
        </Col>
      </Row>
      <Container>
        {/* Title & Subtitle */}
        <Row>
          <Col>
            <h1 className="text-start border-bottom-primary pb-3 title-color font-weight-light">
              {t("admission.title")}
            </h1>
          </Col>
        </Row>

        {/* Content */}
        <Row className="my-4">
          <h2 className="primary-color">{t("admission.subtitle")}</h2>
          <Col className="primary-color">
            <p>{t("admission.description")}</p>
            <ul className="ps-0 ms-0">
              {t("admission.links", { returnObjects: true }).map(
                (link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-decoration-none primary-color text-decoration-underline"
                    >
                      {link.text}
                    </a>
                  </li>
                )
              )}
            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

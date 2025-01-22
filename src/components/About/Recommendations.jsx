import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Clients from "../Clients/Clients";
import Slider from "../Slider/Slider";

import "./AboutAssociation.css";
import { useTranslation } from "react-i18next";

export default function Recommendations() {
  const { t } = useTranslation();
  const links = t("recommendations.links", { returnObjects: true });

  return (
    <>
      {/* Top Section: Clients & Slider */}
      <Clients />
      <Slider />
      <Container>
        {/* Title & Subtitle */}
        <Row>
          <Col>
            <h1 className="text-start title-color mt-4 pb-2 border-bottom-primary">
              {t("recommendations.title")}
            </h1>
          </Col>
        </Row>

        {/* Description & Links */}
        <Row className="my-4 primary-color">
          <Col>
            <p className="primary-color text-xl fw-bold">
              {t("recommendations.subtitle")}
            </p>
            {links.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none primary-color text-decoration-underline d-block"
              >
                {link.text}
              </a>
            ))}
            <p>{t("recommendations.description")}</p>
          </Col>
        </Row>
      </Container>
    </>
  );
}

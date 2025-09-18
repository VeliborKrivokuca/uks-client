import "./AboutAssociation.css";

import { Col, Container, Row } from "react-bootstrap";

import Clients from "../Clients/Clients";
import React from "react";
import Slider from "../Slider/Slider";
import { useTranslation } from "react-i18next";

export default function LegalDocuments() {
  const { t } = useTranslation();

  const links = t("legalDocuments.links", { returnObjects: true });
  const links2 = t("admission.links", { returnObjects: true });

  return (
    <>
      <Clients />
      <Slider />
      <Container>
        {/* Title & Subtitle */}
        <Row className="mt-4">
          <Col>
            <h1 className="text-start title-color border-bottom-primary pb-2 text-main-title fw-bold">
              {t("legalDocuments.title")}
            </h1>
          </Col>
        </Row>

        {/* Description & Links */}
        <Row className="my-4">
          <Col>
            <h2 className="primary-color mb-3">
              {t("legalDocuments.subtitle")}
            </h2>
            <p className="primary-color mb-0">
              {t("legalDocuments.description")}
            </p>
            {links.map((link, index) => (
              <a
                href={link.href}
                key={index}
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none primary-color text-decoration-underline d-block"
              >
                {link.text}
              </a>
            ))}
          </Col>
        </Row>

        {/* Description & Links */}
        <Row className="my-4">
          <Col>
            <h2 className="primary-color mb-3">{t("admission.subtitle")}</h2>
            <p className="primary-color mb-0">{t("admission.description")}</p>
            {links2.map((link, index) => (
              <a
                href={link.href}
                key={index}
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none primary-color text-decoration-underline d-block"
              >
                {link.text}
              </a>
            ))}
          </Col>
        </Row>
      </Container>
    </>
  );
}

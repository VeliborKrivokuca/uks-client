import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Slider from "../Slider/Slider";
import Clients from "../Clients/Clients";
import { useTranslation } from "react-i18next";
import "./AboutAssociation.css";

export default function LegalDocuments() {
  const { t } = useTranslation();

  const links = t("legalDocuments.links", { returnObjects: true });

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
      </Container>
    </>
  );
}

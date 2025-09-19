import "./AboutAssociation.css";

import { Col, Container, Row } from "react-bootstrap";

import Clients from "../Clients/Clients";
import React from "react";
import Slider from "../Slider/Slider";
import { useTranslation } from "react-i18next";

export default function AdmissionRegulations() {
  const { t } = useTranslation();

  return (
    <Container fluid>
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
            <h1 className="text-start border-bottom-primary pb-3 title-color font-weight-light text-main-title fw-bold">
              {t("admissionPage.title")}
            </h1>
          </Col>
        </Row>

        {/* Content */}
        <Row className="my-4">
          <Col className="primary-color">
            <p
              dangerouslySetInnerHTML={{
                __html: t("admissionPage.description"),
              }}
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

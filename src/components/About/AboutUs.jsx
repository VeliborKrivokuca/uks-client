import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Clients from "../Clients/Clients";
import Slider from "../Slider/Slider";
import { useTranslation } from "react-i18next";
import "./AboutAssociation.css";

export default function AboutUs() {
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
            <h1 className="text-start title-color fw-bold border-bottom-primary pb-3">{t("about.title")}</h1>
          </Col>
        </Row>

        {/* Board Section */}
        <Row className="my-4 primary-color">
          <Col>
            <h2 className="mb-4">{t("about.boardTitle")}</h2>

            <p className="mb-0">{t("about.president")}</p>
            <p className="mb-0">{t("about.vicePresident")}</p>
            <p className="mb-0">{t("about.executiveBoard")}</p>
            <p className="mb-0">
              {t("about.executiveMembers", { returnObjects: true }).map(
                (member, index) => (
                  <span key={index}>{member}</span>
                )
              )}
            </p>

            <p className="mb-0">{t("about.supervisoryBoard")}</p>
            <ul>
              {t("about.supervisoryMembers", { returnObjects: true }).map(
                (member, index) => (
                  <li key={index}>{member}</li>
                )
              )}
            </ul>

            <p className="mb-0">{t("about.statusCommittee")}</p>
            <ul>
              {t("about.statusMembers", { returnObjects: true }).map(
                (member, index) => (
                  <li key={index}>{member}</li>
                )
              )}
            </ul>

            <p className="mb-0">{t("about.coordinator")}</p>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

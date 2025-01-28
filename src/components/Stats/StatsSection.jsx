import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./StatsSection.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserFriends,
  faCalendarCheck,
  faHistory,
  faMedal,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

const StatsSection = () => {
  const { t } = useTranslation();

  const stats = [
    {
      icon: faUserFriends,
      number: "500+",
      label: t("stats.satisfiedMembers"),
    },
    {
      icon: faCalendarCheck,
      number: "100+",
      label: t("stats.eventsOrganized"),
    },
    {
      icon: faHistory,
      number: "80+",
      label: t("stats.yearsWithYou"),
    },
    {
      icon: faMedal,
      number: "50+",
      label: t("stats.awardsGiven"),
    },
  ];

  return (
    <Container className="section-divider-large">
      <Container className="primary-bg shadow text-white px-5 py-2">
        <Row className="justify-content-center py-3 gy-4">
          {stats.map((stat, index) => (
            <Col
              key={index}
              xs={12}
              sm={6}
              md={3}
              className="text-center d-flex flex-column align-items-center"
            >
              <div className="stat-item text-white py-4">
                <FontAwesomeIcon
                  icon={stat.icon}
                  className="stat-icon text-main-title pe-2"
                />
                <p className="text-main-title fw-bold mb-0">{stat.number}</p>
                <p className="fw-normal text-subtitle">{stat.label}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
};

export default StatsSection;

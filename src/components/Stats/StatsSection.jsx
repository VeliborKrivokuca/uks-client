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
    <Container>
      <Container className="primary-bg rounded-lg shadow my-5 text-white">
        <Row className="gy-4 justify-content-center py-3">
          {stats.map((stat, index) => (
            <Col
              key={index}
              xs={12}
              sm={6}
              md={3}
              className="text-center d-flex flex-column align-items-center"
            >
              <div className="stat-item">
                <FontAwesomeIcon icon={stat.icon} className="stat-icon" />
                <p className="stat-number">{stat.number}</p>
                <p className="stat-label">{stat.label}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
};

export default StatsSection;

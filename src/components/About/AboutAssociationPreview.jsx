import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Container, Row, Col } from "react-bootstrap";

const AboutAssociationPreview = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleNavigation = () => {
    navigate("/o-udruženju");
  };

  return (
    <Container className="my-4">
      <Row>
        <Col>
          <h3 className="secondary-color text-uppercase mb-3 text-main-title fw-bold">
            {t("aboutAssociation.title")}
          </h3>
          <p className="fw-bold mb-4 pb-3 secondary-color text-subtitle">
            {t("aboutAssociation.subtitle")}
          </p>
          <p className="mb-4 primary-color text-subtitle">
            {t("aboutAssociation.description")}
          </p>

          <button
            className="primary-bg text-white rounded mt-2 px-3 py-1 shadow text-subtitle"
            onClick={handleNavigation}
          >
            {t("aboutAssociation.viewDetails")}{" "}
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutAssociationPreview;

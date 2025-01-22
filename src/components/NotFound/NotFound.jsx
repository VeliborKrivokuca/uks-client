import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import notFoundImg from "../../assets/not-found.jpg";
import { useTranslation } from "react-i18next";

const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <Container className="text-center my-5">
      <Row className="justify-content-center">
        <Col md={6}>
          {/* 404 Image */}
          <img
            src={notFoundImg}
            alt="404 Not Found"
            className="img-fluid mb-4 w-50"
          />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={8}>
          {/* Title and Subtitle */}
          <h1 className="display-4 fw-bold primary-color">
            {t("notFound.title")}
          </h1>
          <p className="lead text-muted">{t("notFound.description")}</p>
        </Col>
      </Row>
      <Row className="justify-content-center mt-4">
        <Col md="auto">
          {/* Back to Home Button */}
          <Link to="/">
            <Button variant="primary" className="px-4 py-2 primary-bg border-0">
              {t("notFound.back")}
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFoundPage;

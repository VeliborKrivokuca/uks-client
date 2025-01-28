import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import logo from "../../assets/logo.png";
import { useTranslation } from "react-i18next";
import "./Footer.css";

const Footer = () => {
  const { t } = useTranslation();

  // Retrieve pages from translations
  const pages = t("footer.pages", { returnObjects: true });

  return (
    <footer className="light-blue pt-5 section-divider-large">
      <Container>
        <Row className="gy-4">
          {/* Contact Info Section */}
          <Col md={4}>
            <h3 className="text-md mb-4 pb-2 fw-bold text-subtitle">
              {t("footer.contactTitle")}
            </h3>
            <p className="mb-1">{t("footer.address")}</p>
            <p className="mb-1">{t("footer.city")}</p>
            <p className="mt-3 mb-1">
              {t("footer.mailLabel")}:{" "}
              <a
                href={`mailto:${t("header.mail")}`}
                className="text-decoration-none primary-color"
              >
                {t("header.mail")}
              </a>
            </p>
            <p className="mb-1">{t("footer.phone")}: +381 11 3340 894</p>
            <p className="mb-1">{t("footer.fax")}: +381 11 3340 894</p>
          </Col>

          {/* Pages Section */}
          <Col md={4}>
            <h3 className="text-md mb-4 pb-2 fw-bold text-subtitle">
              {t("footer.pagesTitle")}
            </h3>
            <ul className="list-unstyled ms-0">
              {pages.map((page, index) => (
                <li key={index} className="mb-2">
                  <a
                    href={`/${page.route}`}
                    className="text-decoration-none text-dark"
                  >
                    {page.name}
                  </a>
                </li>
              ))}
            </ul>
          </Col>

          {/* Social Media Section */}
          <Col md={4} className="text-center text-md-start">
            <h3 className="text-md mb-4 pb-2 fw-bold text-subtitle">
              {t("footer.socialMediaTitle")}
            </h3>
            <div className="d-flex justify-content-center justify-content-md-start gap-3 mt-3">
              <a
                href="#"
                className="footer-icon primary-color d-flex align-items-center justify-content-center rounded-circle bg-white"
              >
                <FontAwesomeIcon className="text-lg" icon={faFacebook} />
              </a>
              <a
                href="#"
                className="footer-icon primary-color d-flex align-items-center justify-content-center rounded-circle bg-white"
              >
                <FontAwesomeIcon className="text-lg" icon={faInstagram} />
              </a>
              <a
                href="#"
                className="footer-icon primary-color d-flex align-items-center justify-content-center rounded-circle bg-white"
              >
                <FontAwesomeIcon className="text-lg" icon={faTwitter} />
              </a>
              <a
                href="#"
                className="footer-icon primary-color d-flex align-items-center justify-content-center rounded-circle bg-white"
              >
                <FontAwesomeIcon className="text-lg" icon={faLinkedin} />
              </a>
            </div>

            {/* Logo */}
            <div className="mt-4">
              <img
                src={logo}
                alt="Logo"
                className="img-fluid footer-img-logo"
              />
            </div>
          </Col>
        </Row>
      </Container>

      {/* Footer Bottom */}
      <div className="footer-bg text-white text-center py-3 mt-4">
        <Container>
          <p className="mb-0 text-white">{t("footer.copyright")}</p>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;

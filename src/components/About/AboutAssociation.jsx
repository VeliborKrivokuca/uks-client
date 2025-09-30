import "./AboutAssociation.css";

import { Col, Container, Row } from "react-bootstrap";
import React, { useEffect } from "react";
import { fetchDocuments, fetchPageDetail } from "../../store/slices/pagesSlice";
import { useDispatch, useSelector } from "react-redux";

import { API_BASE_URL } from "../../services/api";
import Clients from "../Clients/Clients";
import Slider from "../Slider/Slider";
import about from "../../assets/about.png";
import { use } from "react";
import { useTranslation } from "react-i18next";

export default function AboutAssociation() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { documents, loading, error, pagesList } = useSelector(
    (state) => state.pages
  );

  useEffect(() => {
    // Uvek povuci dokumente (nezavisno od jezika)
    dispatch(fetchDocuments("oUdruzenju"));

    // ID zavisi od trenutnog jezika
    const pageId = i18n.language === "sr" ? 1 : 4;
    dispatch(fetchPageDetail(pageId));
  }, [dispatch, i18n.language]); // <-- prati promenu jezika

  return (
    <Container fluidclassName="my-4">
      {/* Top Section: Clients & Slider */}
      <Clients />
      {/* <Slider /> */}
      <Container>
        {/* Title */}
        <Row className="my-4">
          <Col>
            <h2 className="mb-4 title-color border-bottom-primary pb-3">
              {pagesList?.naslov}
            </h2>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col lg={2}>
            <img
              src={about}
              alt={t("about.subtitle")}
              className="img-fluid rounded shadow pe-4 py-3"
            />
          </Col>
          <Col>
            <p dangerouslySetInnerHTML={{ __html: pagesList?.opis }}></p>
          </Col>
        </Row>

        <Row className="mt-2">
          <Col>
            {documents?.map((link, index) => (
              <a
                href={API_BASE_URL + "/uploads/" + link.acDocument}
                key={index}
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none primary-color text-decoration-underline d-block"
              >
                {link.acName}
              </a>
            ))}
          </Col>
        </Row>

        {/* Image and Description */}
        {/* <Row className="mb-4">
          <Col md={3}>
            <img
              src={about}
              alt={t("about.subtitle")}
              className="img-fluid rounded shadow pe-4 py-3"
            />
          </Col>
          <Col md={9} className="primary-color">
            <h2 className="secondary-color mb-3 text-main-title">
              {t("about.subtitle")}
            </h2>
            <p>{t("about.description1")}</p>
          </Col>
        </Row> */}

        {/* Additional Details */}
        {/* <Row className="mb-4 primary-color">
          <Col>
            <p>{t("about.members")}</p>
            <ul className="list-style">
              <li className="fw-bold">
                {t("about.visible")}, {t("about.visibleDesc")}
              </li>
              <li className="fw-bold">
                {t("about.accessible")}, {t("about.accessibleDesc")}
              </li>
              <li className="fw-bold">
                {t("about.present")}, {t("about.presentDesc")}
              </li>
            </ul>

            <p>{t("about.conclusion")}</p>
          </Col>
        </Row> */}
      </Container>
    </Container>
  );
}

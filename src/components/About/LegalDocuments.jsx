import "./AboutAssociation.css";

import { Col, Container, Row } from "react-bootstrap";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { API_BASE_URL } from "../../services/api";
import Clients from "../Clients/Clients";
import Slider from "../Slider/Slider";
import { fetchDocuments } from "../../store/slices/pagesSlice";
import { useTranslation } from "react-i18next";

export default function LegalDocuments() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const links = t("legalDocuments.links", { returnObjects: true });
  const links2 = t("admission.links", { returnObjects: true });

  const { documents, loading, error } = useSelector((state) => state.pages);

  useEffect(() => {
    dispatch(fetchDocuments("documents"));
  }, [dispatch]);

  return (
    <>
      <Clients />
      {/* <Slider /> */}
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
            <p className="primary-color mb-2">
              {t("legalDocuments.description")}
            </p>
            {documents
              ?.filter((doc) => doc.anCategory === "6")
              .map((link, index) => (
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

        {/* Description & Links */}
        <Row className="my-4">
          <Col>
            <h2 className="primary-color mb-3">{t("admission.subtitle")}</h2>
            <p className="primary-color mb-2">{t("admission.description")}</p>
            {documents
              ?.filter((doc) => doc.anCategory === "7")
              .map((link, index) => (
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
      </Container>
    </>
  );
}

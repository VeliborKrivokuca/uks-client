import "./AboutAssociation.css";

import { Col, Container, Row } from "react-bootstrap";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Clients from "../Clients/Clients";
import Slider from "../Slider/Slider";
import { fetchPageDetail } from "../../store/slices/pagesSlice";
import { useTranslation } from "react-i18next";

export default function AdmissionRegulations() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { pagesList } = useSelector((state) => state.pages);

  useEffect(() => {
    // ID zavisi od trenutnog jezika
    const pageId = i18n.language === "sr" ? 3 : 6;
    dispatch(fetchPageDetail(pageId));
  }, [dispatch, i18n.language]); // <-- prati promenu jezika

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
              {pagesList?.naslov}
            </h1>
          </Col>
        </Row>

        {/* Content */}
        <Row className="my-4">
          <Col className="primary-color">
            <p
              dangerouslySetInnerHTML={{
                __html: pagesList?.opis,
              }}
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

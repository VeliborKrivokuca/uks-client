import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";

import Clients from "../Clients/Clients";
import { fetchMemberDetail } from "../../store/actions/membersActions";
import { API_BASE_URL } from "../../services/api";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faGlobe } from "@fortawesome/free-solid-svg-icons";

const MemberProfilePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { memberDetail, loading, error } = useSelector(
    (state) => state.members
  );

  useEffect(() => {
    dispatch(fetchMemberDetail(id));
  }, [dispatch, id]);

  if (loading) {
    return (
      <Container>
        <p>{t("members.loading")}</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <p>{error}</p>
      </Container>
    );
  }

  if (!memberDetail) {
    return (
      <Container>
        <p>{t("members.noDetails")}</p>
      </Container>
    );
  }

  const { acName, acImage, acPosition, acDescription, acMail, acWebsite } =
    memberDetail;

  return (
    <>
      <Clients />
      <Container className="section-divider">
        <Row>
          <Col className="mt-1">
            <h2 className="title-color fw-bold text-main-title">
              {t("members.sectionTitle")}
            </h2>
            <p className="mb-4 primary-color border-bottom-primary pb-3 text-subtitle">
              {t("members.sectionDescription")}
            </p>
          </Col>
        </Row>

        <Row>
          <Col md={3} className="mb-3">
            <img
              src={`${API_BASE_URL}/images/${acImage}`}
              alt={acName}
              className="rounded shadow profile-photo w-100"
            />
          </Col>
          <Col>
            <h2 className="secondary-color mb-3 text-main-title fw-bold">
              {acName}
            </h2>
            <p className="fw-bold secondary-color mb-3 text-hero-title">
              {acPosition}
            </p>
            <Row>
              <Col md="auto">
                <a
                  href={
                    acWebsite.startsWith("http://") ||
                    acWebsite.startsWith("https://")
                      ? acWebsite
                      : `https://${acWebsite}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fw-normal secondary-color mb-3 text-hero-title text-decoration-none"
                >
                  {acWebsite && (
                    <FontAwesomeIcon
                      icon={faGlobe}
                      className="pe-2 pt-2"
                    ></FontAwesomeIcon>
                  )}
                  {acWebsite}
                </a>
              </Col>
              <Col md="auto">
                <p className="fw-normal secondary-color mb-3 text-hero-title">
                  {acMail && (
                    <FontAwesomeIcon
                      icon={faAt}
                      className="pe-2 pt-2"
                    ></FontAwesomeIcon>
                  )}
                  {acMail}
                </p>
              </Col>
            </Row>
          </Col>
        </Row>

        <Col md={12}>
          <div
            className="ck-editor-text"
            dangerouslySetInnerHTML={{ __html: acDescription }}
          ></div>
        </Col>
      </Container>
    </>
  );
};

export default MemberProfilePage;

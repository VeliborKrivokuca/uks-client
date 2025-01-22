import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";

import Clients from "../Clients/Clients";
import { fetchMemberDetail } from "../../store/actions/membersActions";
import { API_BASE_URL } from "../../services/api";
import { useTranslation } from "react-i18next";

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

  const { acName, acImage, acPosition, acDescription } = memberDetail;

  return (
    <>
      <Clients />
      <Container>
        <Row>
          <Col className="mt-3">
            <h2 className="title-color fw-bold">{t("members.sectionTitle")}</h2>
            <p className="mb-4 primary-color border-bottom-primary pb-3">
              {t("members.sectionDescription")}
            </p>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col md={3} className="mb-3">
            <img
              src={`${API_BASE_URL}/images/${acImage}`}
              alt={acName}
              className="rounded-3 profile-photo w-100"
            />
          </Col>
          <Col>
            <h2 className="secondary-color mb-3">{acName}</h2>
            <p className="fw-bold secondary-color mb-3">{acPosition}</p>
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

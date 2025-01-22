import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchAwards } from "../../store/actions/awardsActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAward } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { API_BASE_URL } from "../../services/api";

import "./Awards.css";

const Awards = ({ isHomepage = false }) => {
  const [selectedAward, setSelectedAward] = useState(null);
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { awards, loading, error } = useSelector((state) => state.awards);

  useEffect(() => {
    dispatch(fetchAwards(i18n.language));

    // If navigating from the homepage to the awards page with state
    if (location.state?.selectedAward) {
      setSelectedAward(location.state.selectedAward);
    }
  }, [dispatch, i18n.language, location.state]);

  const handleViewMore = (award) => {
    if (isHomepage) {
      // Navigate to awards page with the selected award
      navigate("/nagrade", { state: { selectedAward: award } });
    } else {
      // Open the description directly on the awards page
      setSelectedAward(award);
    }
  };

  return (
    <Container className="my-4 pt-1">
      {loading && <p>{t("loading.general")}</p>}
      {error && (
        <p className="text-danger">
          {t("info.error")} {error}
        </p>
      )}
      {!loading && !error && (
        <Row className="gy-4">
          {awards.map((award) => (
            <Col key={award.title} sm={6} md={6} lg={6} xl={3}>
              <div className="award-card position-relative shadow rounded overflow-hidden">
                <img
                  src={`${API_BASE_URL}/images/${award.image}`}
                  alt={award.title}
                  className="award-image w-100 h-100"
                />
                <div className="award-details w-100 position-absolute d-flex flex-column justify-content-end">
                  <p className="text-light text-center mb-0 text-lg fw-light">
                    {t("awards.awardTitle")}
                  </p>
                  <p className="text-center m-0 text-light pb-3 text-lg">
                    "{award.title}"
                  </p>
                  <FontAwesomeIcon
                    className="h3 text-center w-100 text-light"
                    icon={faAward}
                  />
                  <p
                    className="text-light text-center w-100 pt-3 text-decoration-underline fw-light cursor-pointer"
                    onClick={() => handleViewMore(award)}
                  >
                    {t("awards.moreInfo")}
                  </p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      )}

      {selectedAward && (
        <Row className="mt-5">
          <Col>
            <div
              className="ck-editor-text"
              dangerouslySetInnerHTML={{ __html: selectedAward.description }}
            />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Awards;

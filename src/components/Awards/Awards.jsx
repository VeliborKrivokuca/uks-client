import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAwards, fetchAwardById } from "../../store/actions/awardsActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAward } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { API_BASE_URL } from "../../services/api";

import "./Awards.css";

const Awards = ({ isHomepage = false }) => {
  const [selectedAwardDetails, setSelectedAwardDetails] = useState(null);
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { awards, loading, error } = useSelector((state) => state.awards);
  function formatDateToDDMMYYYY(dateInput) {
    const date = new Date(dateInput);

    const day = String(date.getDate()).padStart(2, "0"); // Ensures two digits
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  }

  useEffect(() => {
    // Fetch all awards for the grid
    dispatch(fetchAwards(i18n.language));

    // If there's an ID in the URL, fetch that award's details
    console.log(id);
    if (id) {
      dispatch(fetchAwardById(id)).then((award) => {
        setSelectedAwardDetails(award);
      });
    } else {
      setSelectedAwardDetails(null);
    }
  }, [dispatch, i18n.language, id]);

  const handleViewMore = (award) => {
    console.log(award);
    navigate(`/nagrade/${award.id}`);
  };

  return (
    <Container className="pt-1 mt-0">
      {/* Awards Grid */}
      {loading && <p>{t("loading.general")}</p>}
      {error && (
        <p className="text-danger">
          {t("info.error")} {error}
        </p>
      )}
      {!loading && !error && (
        <div className="my-4">
          <Row className="gy-4">
            {Array.isArray(awards) &&
              awards.map((award) => (
                <Col
                  key={award.nagrada_id}
                  sm={6}
                  md={6}
                  lg={6}
                  xl={3}
                  className="m-0"
                >
                  <div className="award-card position-relative shadow rounded overflow-hidden my-2">
                    <img
                      src={`${API_BASE_URL}/images/${award.image}`}
                      alt={award.title}
                      className="award-image w-100 h-100"
                    />
                    <div className="award-details w-100 position-absolute d-flex flex-column justify-content-end">
                      <p className="text-light text-center mb-0 text-lg fw-light text-subtitle">
                        {t("awards.awardTitle")}
                      </p>
                      <p className="text-center m-0 text-light pb-3 text-lg text-subtitle fw-bold">
                        "{award.title}"
                      </p>
                      <FontAwesomeIcon
                        className="h3 text-center w-100 text-light"
                        icon={faAward}
                      />
                      <p className="text-center m-0 text-light text-sm">
                        {formatDateToDDMMYYYY(award.created_at)}
                      </p>
                      <p
                        className="text-light text-center w-100 text-decoration-underline fw-light cursor-pointer text-subtitle"
                        onClick={() => handleViewMore(award)}
                      >
                        {t("awards.moreInfo")}
                      </p>
                    </div>
                  </div>
                </Col>
              ))}
          </Row>
        </div>
      )}

      {/* Details Section Below */}
      {selectedAwardDetails && (
        <Container className="px-0 mt-5">
          <div
            className="ck-editor-text"
            dangerouslySetInnerHTML={{
              __html: selectedAwardDetails.description,
            }}
          />
        </Container>
      )}
    </Container>
  );
};

export default Awards;

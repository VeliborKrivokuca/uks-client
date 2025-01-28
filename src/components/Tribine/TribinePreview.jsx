import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchTribines } from "../../store/actions/tribineActions";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import "./Tribine.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faCalendarTimes,
  faLocation,
  faLocationArrow,
  faMap,
  faMapPin,
} from "@fortawesome/free-solid-svg-icons";

const TribinePreview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const { tribines, loading, error } = useSelector((state) => state.tribine);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Default items per page

  useEffect(() => {
    dispatch(fetchTribines(i18n.language));
  }, [dispatch, i18n.language]);

  // Filter only active tribines
  const activeTribines = tribines.filter((tribine) => tribine.status === "1");

  // Pagination logic
  const indexOfLastTribine = currentPage * itemsPerPage;
  const indexOfFirstTribine = indexOfLastTribine - itemsPerPage;
  const currentTribines = activeTribines.slice(
    indexOfFirstTribine,
    indexOfLastTribine
  );

  const handleTribineClick = (id) => {
    navigate(`/tribine/${id}`);
  };
  const formatDate = (dateString, language) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");

    // Define month translations
    const months = {
      en: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      sr: [
        "Jan",
        "Feb",
        "Mart",
        "April",
        "Maj",
        "Jun",
        "Jul",
        "Avg",
        "Sep",
        "Okt",
        "Nov",
        "Dec",
      ],
    };

    // Get the month in the appropriate language
    const month =
      months[language]?.[date.getMonth()] ||
      date.toLocaleString("default", { month: "short" });

    return { day, month };
  };

  function formatDateToDDMMYYYY(dateInput) {
    const date = new Date(dateInput);

    const day = String(date.getDate()).padStart(2, "0"); // Ensures two digits
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  }

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          {loading && <p>{t("info.loading")}</p>}
          {error && <p>{t("info.error", { error })}</p>}
        </Col>
      </Row>

      <Row className="g-4">
        {!loading && !error && activeTribines.length === 0 && (
          <Col>
            <p className="text-center">{t("info.noData")}</p>
          </Col>
        )}

        {currentTribines.map((tribine) => {
          const { day, month } = formatDate(tribine.date);
          return (
            <Col xs={12} lg={12} xl={4} key={tribine.id}>
              <div className="border-0 bg-transparent">
                <Row className="flex-column">
                  <Col xs={4} className="align-items-center text-white w-auto">
                    <div className="text-center">
                      <Row>
                        <Col md={3}>
                          <Col md={9} className="d-md-none d-block">
                            <div
                              className="primary-color text-md fw-bold text-start text-subtitle"
                              onClick={() =>
                                handleTribineClick(tribine.tribine_id)
                              }
                            >
                              {tribine.title}
                            </div>
                          </Col>
                          <h2 className="mb-0 light-blue primary-color py-4 fw-bold px-4 ps-3">
                            {day}
                          </h2>
                        </Col>
                        <Col md={9} className="d-md-block d-none px-0">
                          <div
                            className="primary-color text-md fw-bold text-start text-subtitle w-75 cursor-pointer"
                            onClick={() =>
                              handleTribineClick(tribine.tribine_id)
                            }
                          >
                            {tribine.title}
                          </div>
                        </Col>
                      </Row>
                      <Row className="align-items-start">
                        <Col md={3}>
                          <p className="mb-0 primary-bg py-3 text-uppercase fw-bold px-4">
                            {month}
                          </p>
                        </Col>
                        <Col md={9} className="px-0 align-self-end">
                          <div className="primary-background mb-1 ps-3 ps-md-0">
                            <div className="text-start">
                              <FontAwesomeIcon
                                className="primary-color text-sm"
                                icon={faCalendar}
                              ></FontAwesomeIcon>
                              <p className="d-inline ps-1 text-sm primary-color">
                                {formatDateToDDMMYYYY(tribine.date)}
                              </p>
                            </div>
                            <div className="text-start col-12">
                              <FontAwesomeIcon
                                className="primary-color text-sm"
                                icon={faMapPin}
                              ></FontAwesomeIcon>
                              <p className="d-inline ps-1 text-sm primary-color">
                                {tribine?.location}
                              </p>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
                <div
                  href="#"
                  className="text-decoration-none fw-bold text-decoration-underline primary-color cursor-pointer mt-2"
                  onClick={() => handleTribineClick(tribine.tribine_id)}
                >
                  {t("awards.moreInfo")}
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default TribinePreview;

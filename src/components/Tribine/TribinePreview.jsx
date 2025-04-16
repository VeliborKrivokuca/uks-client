import "./Tribine.css";

import { Card, Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  faCalendar,
  faCalendarTimes,
  faLocation,
  faLocationArrow,
  faMap,
  faMapPin,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";

import { API_BASE_URL } from "../../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchTribines } from "../../store/actions/tribineActions";
import { useTranslation } from "react-i18next";

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
      <Row className="mb-4 mt-0">
        <Col>
          {loading && <p>{t("info.loading")}</p>}
          {error && <p>{t("info.error", { error })}</p>}
        </Col>
      </Row>

      <div className="tribine-card-home-holder">
        {currentTribines.map((tribine) => {
          const { day, month } = formatDate(tribine.date);
          return (
            <div className="tribine-card-home-item">
              <Link to={`/tribine/${tribine?.tribine_id}`}>
                <h1>{tribine?.title}</h1>
                <img
                  src={`${API_BASE_URL}/${tribine?.thumbnail}`}
                  alt={tribine?.title || t("tribine.noThumbnail")}
                />
              </Link>
            </div>
          );
        })}
      </div>
    </Container>
  );
};

export default TribinePreview;

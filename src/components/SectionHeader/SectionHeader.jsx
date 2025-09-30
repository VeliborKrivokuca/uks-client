import React, { Fragment } from "react";

import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

const SectionHeader = ({
  title,
  buttonText,
  onButtonClick,
  moreButtons = false,
}) => {
  const { t } = useTranslation();
  return (
    <Container className="section-divider d-md-flex d-block justify-content-between align-items-center mb-4">
      <h2 className="mb-0 secondary-color text-uppercase fw-bold text-main-title">
        {title}
      </h2>
      {moreButtons && (
        <Fragment>
          <Link to={"/tribina-kompozitora"}>
            <button
              className="rounded px-3 text-light primary-bg py-1 shadow mt-md-0 mt-3 text-subtitle"
              onClick={onButtonClick}
              style={{ marginRight: "30px" }}
            >
              {t("header.tribinaKompozitora")}{" "}
              <FontAwesomeIcon className="text-light" icon={faArrowRight} />
            </button>
          </Link>
          <Link to={"/rimus"}>
            <button
              className="rounded px-3 text-light primary-bg py-1 shadow mt-md-0 mt-3 text-subtitle"
              onClick={onButtonClick}
              style={{ marginRight: "30px" }}
            >
              {t("header.rimus")}{" "}
              <FontAwesomeIcon className="text-light" icon={faArrowRight} />
            </button>
          </Link>
        </Fragment>
      )}
      <button
        className="rounded px-3 text-light primary-bg py-1 shadow mt-md-0 mt-3 text-subtitle"
        onClick={onButtonClick}
      >
        {buttonText}{" "}
        <FontAwesomeIcon className="text-light" icon={faArrowRight} />
      </button>
    </Container>
  );
};

export default SectionHeader;

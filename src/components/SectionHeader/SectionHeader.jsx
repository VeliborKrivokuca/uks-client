import React from "react";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const SectionHeader = ({ title, buttonText, onButtonClick }) => {
  return (
    <Container className="section-divider d-md-flex d-block justify-content-between align-items-center mb-4">
      <h2 className="mb-0 secondary-color text-uppercase fw-bold text-main-title">
        {title}
      </h2>
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

import React from "react";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const SectionHeader = ({ title, buttonText, onButtonClick }) => {
  return (
    <Container className="d-flex justify-content-between align-items-center my-4">
      <h2 className="mb-0 secondary-color text-uppercase">{title}</h2>
      <button
        className="rounded px-3 text-light primary-bg"
        onClick={onButtonClick}
      >
        {buttonText}{" "}
        <FontAwesomeIcon className="text-light" icon={faArrowRight} />
      </button>
    </Container>
  );
};

export default SectionHeader;

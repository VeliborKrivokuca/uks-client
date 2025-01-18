import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import "./AboutAssociation.css"; // Custom styles for this component

const AboutAssociationPreview = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const translations = {
    aboutTitle: {
      1: "O udruženju",
      2: "About the Association",
    },
    aboutSubtitle: {
      1: "Čuvamo tradiciju i inspirišemo budućnost srpske muzike",
      2: "Preserving tradition and inspiring the future of Serbian music",
    },
    aboutDescription: {
      1: "Udruženje kompozitora Srbije posvećeno je promociji, očuvanju i razvoju kompozitorske umetnosti, pružajući podršku našim stvaraocima i negujući bogatstvo muzičke tradicije.",
      2: "The Serbian Composers' Association is dedicated to promoting, preserving, and advancing the art of composition, supporting our creators, and nurturing the richness of musical tradition.",
    },
    viewDetails: {
      1: "Više detalja",
      2: "View Details",
    },
  };

  const handleNavigation = () => {
    navigate("/o-udruženju");
  };

  return (
    <div className="width-90">
      <div className="blog-card">
        <h3 className="blog-title">{translations.aboutTitle[language]}</h3>
        <p className="h5 mt-4 mb-2">{translations.aboutSubtitle[language]}</p>
        <p>{translations.aboutDescription[language]}</p>
        <button
          className="details-button rounded primary-bg"
          onClick={handleNavigation}
        >
          {translations.viewDetails[language]}{" "}
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
};

export default AboutAssociationPreview;

import React from "react";
import Clients from "../Clients/Clients";
import { useLanguage } from "../../context/LanguageContext";
import { API_BASE_URL } from "../../services/api";

const translations = {
  en: {
    sectionTitle: "OUR MEMBERS",
    sectionDescription:
      "The section for association members provides insight into the profiles of our composers, their biographies, works, and contributions to the Serbian music scene, highlighting the importance of their creativity and role in preserving our musical tradition.",
    backButton: "« Back",
  },
  sr: {
    sectionTitle: "NAŠI ČLANOVI",
    sectionDescription:
      "Sekcija za članove udruženja pruža uvid u profile naših kompozitora, njihove biografije, dela i doprinose srpskoj muzičkoj sceni, ističući značaj njihovog stvaralaštva i uloge u očuvanju naše muzičke tradicije.",
    backButton: "« Nazad",
  },
};

const MemberProfile = ({ member, onBackClick }) => {
  const { language } = useLanguage(); // Get current language from context
  const t = translations[language === 1 ? "sr" : "en"]; // Select translations based on language

  return (
    <div>
      <Clients></Clients>
      <div className="width-90 mt-4">
        <h1 className="mt-4 title-color fw-bold">{t.sectionTitle}</h1>
        <p className="mb-4 primary-color border-bottom pb-4">
          {t.sectionDescription}
        </p>

        <div>
          <div className="card-body">
            <div className="d-flex align-items-start mb-3">
              <img
                src={`${API_BASE_URL}/images/${member.acImage}`}
                alt={member.acName}
                className="rounded-3 me-3 profile-photo"
              />
              <div>
                <h2 className="h4 mb-1 primary-color mb-4">{member.acName}</h2>
                <p className="fw-semibold mb-1">{member.acPosition}</p>
              </div>
            </div>
            {/* Render HTML content from acDescription */}
            <div
              className="text-muted"
              dangerouslySetInnerHTML={{ __html: member.acDescription }}
            ></div>
          </div>
        </div>

        <button className="btn btn-secondary mt-3" onClick={onBackClick}>
          {t.backButton}
        </button>
      </div>
    </div>
  );
};

export default MemberProfile;

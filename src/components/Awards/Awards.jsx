import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Awards.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAward } from "@fortawesome/free-solid-svg-icons";
import { useLanguage } from "../../context/LanguageContext";
import { API_BASE_URL } from "../../services/api";
import api from "../../services/api";

const Awards = () => {
  const [awards, setAwards] = useState([]);
  const [selectedAward, setSelectedAward] = useState(null);
  const { language } = useLanguage();

  // Translations
  const translations = {
    1: {
      awardTitle: "Nagrada",
      moreInfo: "Više informacija",
    },
    2: {
      awardTitle: "Award",
      moreInfo: "More information",
    },
  };

  const t = translations[language];

  useEffect(() => {
    const fetchAwards = async () => {
      try {
        const response = await api.get(
          `/api/nagrade/language/${language}`
        );
        console.log(response.data);
        setAwards(response.data.data);
      } catch (error) {
        console.error("Error fetching awards data:", error);
      }
    };

    fetchAwards();
  }, [language]);

  const handleViewMore = (award) => {
    setSelectedAward(award);
  };

  return (
    <div className="awards-section">
      <div className="awards-grid mt-4 pt-1">
        {awards.map((award) => (
          <div className="award-card" key={award.title}>
            <img
              src={`${API_BASE_URL}/images/${award.image}`}
              alt={award.title}
              className="award-image"
            />
            <div className="award-details">
              <div className="award-bottom w-100">
                <p className="text-light text-center w-100 mb-0">{`${t.awardTitle}`}</p>
                <p className="text-center m-0 text-light pb-3">
                  "{`${award.title}`}"
                </p>
                <FontAwesomeIcon
                  className="h3 mx-auto text-center w-100 text-light"
                  icon={faAward}
                />
                <p className="award-date text-light text-center mb-0">
                  {award.acDate}
                </p>
                <p
                  className="text-light mx-auto text-center w-100 award-date pt-3 text-decoration-underline"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleViewMore(award)}
                >
                  {t.moreInfo}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedAward && (
        <div className="award-description text-start mt-5">
          <div
            className="award-description"
            dangerouslySetInnerHTML={{ __html: selectedAward.description }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default Awards;

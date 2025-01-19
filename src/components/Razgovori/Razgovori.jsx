import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./RazgovoriPreview.css"; // Update the CSS file name if needed
import noPhotoImage from "../../assets/no-photo.jpg";
import { useLanguage } from "../../context/LanguageContext";
import { API_BASE_URL } from "../../services/api";
import api from "../../services/api";

const RazgovoriList = () => {
  const [razgovori, setRazgovori] = useState([]);
  const navigate = useNavigate();
  const { language } = useLanguage();

  const translations = {
    1: {
      title: "Razgovori",
      subtitle:
        "Pratite najvažnije aktuelnosti, događaje, koncerte i dešavanja koji oblikuju svet srpske muzike i kompozitorske umetnosti.",
      noTalks: "Trenutno nema dostupnih razgovora.",
    },
    2: {
      title: "Talks",
      subtitle:
        "Stay updated with the most important news, events, concerts, and happenings shaping the world of Serbian music and compositional art.",
      noTalks: "No talks available at the moment.",
    },
  };

  const t = translations[language];

  useEffect(() => {
    let isMounted = true;

    const fetchRazgovori = async () => {
      try {
        const response = await api.get(
          `/api/razgovori/language/${language}`
        );
        if (isMounted) {
          setRazgovori(response.data.data || []);
        }
      } catch (error) {
        console.error("Error fetching razgovori:", error);
      }
    };
    console.log(razgovori);

    fetchRazgovori();

    return () => {
      isMounted = false; // Prevent updates after unmount
    };
  }, [language]);

  const handleRazgovoriClick = (id) => {
    navigate(`/razgovori/${id}`);
  };

  return (
    <div className="razgovori-list">
      <div className="width-90 my-5">
        <div className="grid">
          {razgovori.length === 0 ? (
            <p>{t.noTalks}</p>
          ) : (
            razgovori.map((razgovor) => (
              <div
                key={razgovor.id}
                className="razgovori-card"
                onClick={() => handleRazgovoriClick(razgovor.id)}
              >
                <div className="thumbnail-container">
                  <img
                    src={
                      razgovor.image
                        ? `${API_BASE_URL}/images/${razgovor.image}`
                        : noPhotoImage
                    }
                    alt={razgovor.title || "No Image Available"}
                    className="thumbnail rounded-lg"
                  />
                  <div className="gradient-overlay rounded-lg"></div>
                  <h3 className="razgovori-title">{razgovor.title}</h3>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RazgovoriList;

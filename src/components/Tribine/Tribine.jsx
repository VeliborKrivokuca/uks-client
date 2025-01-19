import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Tribine.css";
import image from "../../assets/tribina.jpg";
import noPhotoImage from "../../assets/no-photo.jpg";
import { useLanguage } from "../../context/LanguageContext";
import { API_BASE_URL } from "../../services/api";
import api from "../../services/api";

const TribineList = () => {
  const [tribines, setTribines] = useState([]);
  const navigate = useNavigate();
  const { language } = useLanguage();

  const translations = {
    1: {
      title: "Tribine",
      noTribines: "Nema dostupnih tribina za izabrani jezik.",
    },
    2: {
      title: "Panels",
      noTribines: "No panels available for the selected language.",
    },
  };

  const t = translations[language];

  useEffect(() => {
    let isMounted = true;

    const fetchTribines = async () => {
      try {
        const response = await api.get(`/api/tribine/language/${language}`);
        if (isMounted) {
          setTribines(response.data.data || []);
        }
      } catch (error) {
        console.error("Error fetching tribine:", error);
      }
    };

    fetchTribines();

    return () => {
      isMounted = false; // Prevent updates after unmount
    };
  }, [language]);

  const handleTribineClick = (id) => {
    navigate(`/tribine/${id}`);
  };

  return (
    <div className="">
      <div className="background-container"></div>
      <div className="tribine-list">
        <div className="mx-auto text-center mb-5 mt-3">
          <img src={image} alt="Tribine Header" className="tribina-img w-100" />
        </div>
        <h1 className="title-style">{t.title}</h1>
        <div className="grid">
          {tribines.length === 0 ? (
            <p>{t.noTribines}</p>
          ) : (
            tribines.map((tribine) => (
              <div
                key={tribine.id}
                className="tribine-card"
                onClick={() => handleTribineClick(tribine.tribine_id)}
              >
                <div className="thumbnail-container">
                  <img
                    src={
                      tribine.thumbnail
                        ? `${API_BASE_URL}/${tribine.thumbnail}`
                        : noPhotoImage
                    }
                    alt={tribine.title || "No Thumbnail Available"}
                    className="thumbnail"
                  />
                  <div className="gradient-overlay"></div>
                  <h3 className="tribine-title">{tribine.title}</h3>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TribineList;

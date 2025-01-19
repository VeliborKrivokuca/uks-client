import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./RazgovoriDetails.css";
import noPhotoImage from "../../assets/no-photo.jpg";
import Clients from "../Clients/Clients";
import { useLanguage } from "../../context/LanguageContext";
import { API_BASE_URL } from "../../services/apiService";
import api from "../../services/api";

const RazgovoriDetail = () => {
  const { id, lang } = useParams(); // Get the Razgovor ID and Language from the URL
  const [razgovor, setRazgovor] = useState(null);
  const { language } = useLanguage();

  // Translations
  const translations = {
    1: {
      title: "Razgovori",
      subtitle:
        "Pratite najvažnije aktuelnosti, događaje, koncerte i dešavanja koji oblikuju svet srpske muzike i kompozitorske umetnosti.",
    },
    2: {
      title: "Talks",
      subtitle:
        "Stay updated with the most important news, events, concerts, and happenings shaping the world of Serbian music and compositional art.",
    },
  };

  const t = translations[language];

  useEffect(() => {
    const fetchRazgovorDetails = async () => {
      try {
        const response = await api.get(
          `/api/razgovori/detail/${id}`
        );
        setRazgovor(response.data);
      } catch (error) {
        console.error("Error fetching razgovor details:", error);
      }
    };

    fetchRazgovorDetails();
  }, [id, lang]);

  if (!razgovor) {
    return <div>Loading...</div>;
  }

  // Generate thumbnail URL
  const getThumbnailUrl = () =>
    razgovor.razgovor.image
      ? `${API_BASE_URL}/images/${razgovor.razgovor.image}`
      : noPhotoImage;

  return (
    <div className="">
      <Clients></Clients>
      <div className="width-wrapper">
        <h1 className="text-start title-primary">{t.title}</h1>
        <p className="text-start border-bottom pb-3 title-primary font-weight-light">
          {t.subtitle}
        </p>
        <div className="razgovori-detail">
          <div className="d-lg-flex">
            <h2 className="d-block d-lg-none">{razgovor.translation.user}</h2>
            <img
              src={getThumbnailUrl()}
              alt={razgovor.razgovor.title}
              className="razgovori-thumbnail"
            />
            <div className="px-lg-4">
              <h2 className="d-none d-lg-block">{razgovor.translation.user}</h2>
              <div
                className="razgovori-description"
                dangerouslySetInnerHTML={{
                  __html: razgovor.translation.description,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RazgovoriDetail;

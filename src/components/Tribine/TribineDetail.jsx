import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Clients from "../Clients/Clients";
import "./TribineDetail.css";
import { useLanguage } from "../../context/LanguageContext";
import { API_BASE_URL } from "../../services/apiService";

const TribineDetail = () => {
  const { id } = useParams(); // Get the tribine ID from the route
  const [tribine, setTribine] = useState(null);
  const [activeTab, setActiveTab] = useState(""); // Default tab
  const [activeGalleryImages, setActiveGalleryImages] = useState([]); // Images for active gallery
  const { language } = useLanguage(); // Get language from context

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/tribine/detail/${id}/${language}`)
      .then((response) => {
        console.log("API Response Data:", response.data);
        const data = response.data;

        // Set the initial active tab
        if (data.contents?.length > 0) {
          setActiveTab(`section-0`); // First section
        } else if (data.galleries?.length > 0) {
          setActiveTab(`gallery-${data.galleries[0].id}`); // First gallery
          setActiveGalleryImages(data.galleries[0].images || []); // Set images for the first gallery
        }

        setTribine(data); // Update state with response data
      })
      .catch((error) => {
        console.error("Error fetching tribine details:", error);
      });
  }, [id, language]);

  const translations = {
    noThumbnail: {
      1: "Nema dostupne slike",
      2: "No Thumbnail Available",
    },
  };

  const handleGalleryClick = (gallery) => {
    setActiveTab(`gallery-${gallery.id}`);
    setActiveGalleryImages(gallery.images || []); // Update active gallery images
  };
  const formatDate = (dateString, language) => {
    // Parse the date
    const date = new Date(dateString);

    // Month names in Serbian and English
    const months = {
      1: {
        1: "Januar",
        2: "January",
      },
      2: {
        1: "Februar",
        2: "February",
      },
      3: {
        1: "Mart",
        2: "March",
      },
      4: {
        1: "April",
        2: "April",
      },
      5: {
        1: "Maj",
        2: "May",
      },
      6: {
        1: "Jun",
        2: "June",
      },
      7: {
        1: "Jul",
        2: "July",
      },
      8: {
        1: "Avgust",
        2: "August",
      },
      9: {
        1: "Septembar",
        2: "September",
      },
      10: {
        1: "Oktobar",
        2: "October",
      },
      11: {
        1: "Novembar",
        2: "November",
      },
      12: {
        1: "Decembar",
        2: "December",
      },
    };

    // Get the month and year
    const month = date.getMonth() + 1; // Months are 0-based
    const year = date.getFullYear();

    // Return the formatted month and year based on the language
    return `${months[month][language]} ${year}`;
  };

  if (!tribine) {
    return <div>Loading...</div>;
  }

  // Generate thumbnail URL
  const getThumbnailUrl = () =>
    tribine.tribine?.thumbnail
      ? `${API_BASE_URL}/${tribine.tribine.thumbnail}`
      : null;

  // Generate gallery image URLs
  const getGalleryImageUrl = (imagePath) => `${API_BASE_URL}/${imagePath}`;

  return (
    <div className="tribine-detail-wrapper-form">
      <Clients></Clients>
      <div className="width-90">
        {/* Thumbnail */}
        {getThumbnailUrl() ? (
          <img
            src={getThumbnailUrl()}
            alt={tribine.tribine.title}
            className="detail-thumbnail"
          />
        ) : (
          <p>{translations.noThumbnail[language]}</p>
        )}

        <div className="">
          <h1 className="text-start title-primary">{tribine.tribine.title}</h1>
          <p className="text-start border-bottom pb-3 title-primary font-weight-light">
            {formatDate(tribine.tribine.created_at, language)}
          </p>
        </div>

        {/* Description */}
        <h2>{tribine.tribine?.description}</h2>

        <div className="d-flex wrapper-form">
          {/* Tabs for Sections and Galleries */}
          <div className="tabs">
            {tribine.contents?.map((content, index) => (
              <button
                key={`section-${index}`}
                className={activeTab === `section-${index}` ? "active" : ""}
                onClick={() => setActiveTab(`section-${index}`)}
              >
                {content.name}
              </button>
            ))}
            {tribine.galleries?.map((gallery) => (
              <button
                key={`gallery-${gallery.id}`}
                className={
                  activeTab === `gallery-${gallery.id}` ? "active" : ""
                }
                onClick={() => handleGalleryClick(gallery)}
              >
                {gallery.name}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="tab-content w-100">
            {/* Render Section Content */}
            {tribine.contents?.map((content, index) =>
              activeTab === `section-${index}` ? (
                <div key={index}>
                  <h3>{content.name}</h3>
                  <div dangerouslySetInnerHTML={{ __html: content.content }} />
                </div>
              ) : null
            )}

            {/* Render Active Gallery Content */}
            {tribine.galleries?.map((gallery) =>
              activeTab === `gallery-${gallery.id}` ? (
                <div key={gallery.id}>
                  <h3>{gallery.name}</h3>
                  <div className="gallery">
                    {activeGalleryImages.length > 0 ? (
                      activeGalleryImages.map((image, imgIndex) => (
                        <img
                          key={imgIndex}
                          src={getGalleryImageUrl(image.image_path)}
                          alt={`Gallery ${gallery.id} Image ${imgIndex}`}
                          className="gallery-image"
                        />
                      ))
                    ) : (
                      <p>No images available for this gallery.</p>
                    )}
                  </div>
                </div>
              ) : null
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TribineDetail;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Aktuelnosti.css"; // Add the CSS styles for this component.
import image from "../../assets/logo-image.png";
import { useLanguage } from "../../context/LanguageContext";
import { API_BASE_URL } from "../../services/apiService";

const Aktuelnosti = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const { language } = useLanguage();

  const translations = {
    1: {
      details: "Više detalja →",
      composers: "Udruženje kompozitora Srbije",
      noBlogs: "Nema dostupnih aktuelnosti",
    },
    2: {
      details: "More details →",
      composers: "Composers Association of Serbia",
      noBlogs: "No available news",
    },
  };

  const t = translations[language];

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `/api/aktuelnosti/get/all/${language}`
        );
        const data = response.data; // Ensure data is an array

        // Sort blogs by publish_time (descending) and take only the latest 4
        const sortedBlogs = data
          .sort((a, b) => new Date(b.publish_time) - new Date(a.publish_time))
          .slice(0, 2);

        setBlogs(sortedBlogs);
        console.log(sortedBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setBlogs([]); // Fallback to empty array
      }
    };

    fetchBlogs();
  }, [language]);

  const handleViewDetails = (id) => {
    navigate(`/blog/${id}`); // Navigate to the detailed blog page
  };

  return (
    <div className="blog-list-container">
      {Array.isArray(blogs) && blogs.length > 0 ? (
        blogs.map((blog) => (
          <div key={blog.anId} className="blog-card">
            <div className="blog-header">
              <div className="blog-logo rounded-circle border">
                <img src={image} alt="Logo" className="blog-logo-img" />
              </div>
              <div className="blog-meta">
                <p className="blog-meta-item">{t.composers}</p>
                <p className="blog-meta-item">
                  {new Date(blog.publish_time).toLocaleDateString()}
                </p>
              </div>
            </div>
            <h3 className="blog-title">{blog.title}</h3>
            <p className="blog-description primary-color">{blog.subtitle}</p>
            <button
              className="details-button rounded primary-bg"
              onClick={() => handleViewDetails(blog.translation_id)}
            >
              {t.details}
            </button>
          </div>
        ))
      ) : (
        <p>{t.noBlogs}</p>
      )}
    </div>
  );
};

export default Aktuelnosti;

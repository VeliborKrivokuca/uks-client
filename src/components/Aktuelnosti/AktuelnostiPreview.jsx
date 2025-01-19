import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AktuelnostiPreview.css";
import image from "../../assets/logo-image.png";
import Clients from "../Clients/Clients";
import Slider from "../Slider/Slider";
import noPhotoImage from "../../assets/no-photo.jpg";
import { useLanguage } from "../../context/LanguageContext";
import { API_BASE_URL } from "../../services/api";
import api from "../../services/api";

const Aktuelnosti = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const { language } = useLanguage();

  // Translations
  const translations = {
    1: {
      title: "Aktuelnosti",
      subtitle:
        "Pratite najvažnije aktuelnosti, događaje, koncerte i dešavanja koji oblikuju svet srpske muzike i kompozitorske umetnosti.",
      noBlogs: "Trenutno nema dostupnih aktuelnosti.",
      detailsButton: "Više detalja →",
      metaAuthor: "Udruženje kompozitora Srbije",
    },
    2: {
      title: "News",
      subtitle:
        "Stay updated with the most important news, events, concerts, and happenings shaping the world of Serbian music and compositional art.",
      noBlogs: "No blogs available at the moment.",
      detailsButton: "More details →",
      metaAuthor: "Serbian Composers Association",
    },
  };

  const t = translations[language];

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await api.get(
          `/api/aktuelnosti/get/all/${language}`
        );
        const data = response.data;

        // Sort blogs by publish_time in descending order
        const sortedBlogs = data.sort(
          (a, b) => new Date(b.publish_time) - new Date(a.publish_time)
        );

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
    navigate(`/blog/${id}`);
  };

  return (
    <div>
      <Clients />
      <Slider />
      <div className="blog-list-container">
        <h1 className="text-start title-primary">{t.title}</h1>
        <p className="text-start border-bottom pb-3 title-primary font-weight-light">
          {t.subtitle}
        </p>
        {Array.isArray(blogs) && blogs.length > 0 ? (
          blogs.map((blog) => (
            <div key={blog.anId} className="blog-card">
              <div className="d-lg-flex">
                <img
                  src={
                    blog.image
                      ? `${API_BASE_URL}/images/${blog.image}`
                      : noPhotoImage
                  }
                  alt={blog.title}
                  className="blog-image"
                />
                <div className="mx-lg-4 mt-2">
                  <div className="blog-header">
                    <div className="blog-logo rounded-circle border">
                      <img src={image} alt="Logo" className="blog-logo-img" />
                    </div>
                    <div className="blog-meta">
                      <p className="blog-meta-item">{t.metaAuthor}</p>
                      <p className="blog-meta-item">
                        {new Date(blog.publish_time).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <h3 className="blog-title">{blog.title}</h3>
                  <p className="blog-description primary-color">
                    {blog.subtitle}
                  </p>
                  <button
                    className="details-button rounded primary-bg"
                    onClick={() => handleViewDetails(blog.translation_id)}
                  >
                    {t.detailsButton}
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>{t.noBlogs}</p>
        )}
      </div>
    </div>
  );
};

export default Aktuelnosti;

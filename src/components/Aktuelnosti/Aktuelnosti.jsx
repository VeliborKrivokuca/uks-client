import "./Aktuelnosti.css";

import { Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchBlogs } from "../../store/actions/aktuelnostiActions";
import image from "../../assets/logo-image.png";
import { useTranslation } from "react-i18next";

const Aktuelnosti = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const { blogs, loading, error } = useSelector((state) => state.aktuelnosti);

  useEffect(() => {
    dispatch(fetchBlogs(i18n.language));
  }, [dispatch, i18n.language]);

  const handleViewDetails = (id) => {
    navigate(`/blog/${id}`);
  };

  function formatDateToDDMMYYYY(dateInput) {
    const date = new Date(dateInput);

    const day = String(date.getDate()).padStart(2, "0"); // Ensures two digits
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  }

  // Sort blogs by publish_time in descending order and take the latest 2
  const latestBlogs = blogs
    ? [...blogs]
        .sort((a, b) => new Date(b.publish_time) - new Date(a.publish_time))
        .slice(0, 6)
    : [];

  return (
    <Container>
      <Row>
        <div className="main-blog-items-homepage">
          {latestBlogs.length > 0 &&
            latestBlogs.map((blog) => (
              <div className="main-blog-item-homepage">
                <div className="main-blog-item-top">
                  <div className="main-blog-item-date-homepage">
                    {/* {blog?.publish_time} */}
                    <div className="main-blog-item-date-day">12</div>
                    <div className="main-blog-item-date-month">Dec</div>
                  </div>
                  <div className="main-blog-item-content-homepage">
                    <Link to={`/blog/${blog?.translation_id}`}>
                      <h1>{blog?.title}</h1>
                    </Link>

                    <div className="main-blog-item-bottom">
                      <Link to={`/blog/${blog?.translation_id}`}>
                        <h3>Više informacija</h3>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </Row>
    </Container>
  );
};

export default Aktuelnosti;

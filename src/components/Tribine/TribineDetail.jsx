import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Button } from "react-bootstrap";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import { fetchTribineDetail } from "../../store/actions/tribineActions";
import Clients from "../Clients/Clients";
import { API_BASE_URL } from "../../services/api";
import { useTranslation } from "react-i18next";

import "./TribineDetail.css";

const TribineDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const {
    tribine = null,
    loading = false,
    error = null,
    activeTab,
  } = useSelector((state) => state.tribine?.tribineDetail || {});

  useEffect(() => {
    dispatch(fetchTribineDetail(id, i18n.language));
  }, [dispatch, id, i18n.language]);

  const getMonthAndYear = (dateString, language) => {
    if (!dateString) return "";
    const date = new Date(dateString);

    const months = {
      sr: [
        "Januar",
        "Februar",
        "Mart",
        "April",
        "Maj",
        "Jun",
        "Jul",
        "Avgust",
        "Septembar",
        "Oktobar",
        "Novembar",
        "Decembar",
      ],
      en: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    };

    const month = months[language] ? months[language][date.getMonth()] : "";
    const year = date.getFullYear();

    return `${month} ${year}`;
  };

  const monthAndYear = getMonthAndYear(
    tribine?.tribine?.created_at,
    i18n.language
  );

  const getThumbnailUrl = () =>
    tribine?.tribine?.thumbnail
      ? `${API_BASE_URL}/${tribine.tribine.thumbnail}`
      : null;

  const getGalleryImageUrl = (imagePath) => `${API_BASE_URL}/${imagePath}`;

  const handleGalleryImageClick = (images, index, event) => {
    event.stopPropagation();
    const formattedImages = images.map((img) => ({
      src: getGalleryImageUrl(img.image_path),
      alt: img.alt || t("tribine.noThumbnail"),
    }));
    setLightboxImages(formattedImages);
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const handleTabClick = (index) => {
    dispatch({
      type: "SET_ACTIVE_TAB",
      payload: `section-${index}`,
    });
  };

  if (loading) {
    return (
      <>
        <Clients></Clients>
        <Container>
          <p className="mt-5">{t("info.loading")}</p>
        </Container>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Clients></Clients>
        <Container>
          <p className="mt-5">{t("info.error", { error })}</p>
        </Container>
      </>
    );
  }

  if (!tribine) {
    return (
      <Container>
        <p>{t("info.noData")}</p>
      </Container>
    );
  }

  return (
    <Container fluid className="my-4">
      <Clients />
      <Container>
        <Row className="my-4">
          <Col xs={12}>
            {getThumbnailUrl() ? (
              <img
                src={getThumbnailUrl()}
                alt={tribine.tribine?.title}
                className="detail-thumbnail mb-3"
              />
            ) : (
              <p>{t("tribine.noThumbnail")}</p>
            )}
            <Row className="border-bottom-primary mx-0">
              <Col xs={12} lg="auto" className="px-0">
                <h1 className="secondary-color">{tribine.tribine?.title}</h1>
              </Col>
              <Col xs={12} lg="auto" className="ps-0 ps-lg-3">
                <h1 className="secondary-color">{monthAndYear}</h1>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row>
          <Col>
            <h2>{tribine.tribine?.description}</h2>
          </Col>
        </Row>

        <Row>
          <Col xs={12} md={3} className="mb-3">
            {tribine.contents?.map((content, index) => {
              const isActive = activeTab === `section-${index}`;
              return (
                <Button
                  key={`section-${index}`}
                  variant={isActive ? "primary" : ""}
                  className="w-100 text-start mb-2 primary-bg py-3 text-white"
                  onClick={() => handleTabClick(index)}
                >
                  {content.name}
                </Button>
              );
            })}

            {tribine.galleries?.map((gallery) => {
              const isActive = activeTab === `gallery-${gallery.id}`;
              return (
                <Button
                  key={`gallery-${gallery.id}`}
                  variant={isActive ? "primary" : ""}
                  className="w-100 text-start mb-2 primary-bg py-3 text-white"
                  onClick={() =>
                    dispatch({
                      type: "SET_ACTIVE_TAB",
                      payload: `gallery-${gallery.id}`,
                    })
                  }
                >
                  {gallery.name}
                </Button>
              );
            })}
          </Col>

          <Col xs={12} md={9}>
            {tribine.contents?.map((content, index) =>
              activeTab === `section-${index}` ? (
                <div
                  key={index}
                  className="tab-content p-3 rounded shadow-sm mb-4"
                >
                  <h3 className="secondary-color">{content.name}</h3>
                  <div
                    className="ck-editor-text"
                    dangerouslySetInnerHTML={{
                      __html: content.content || "<p>No content available</p>",
                    }}
                  />
                </div>
              ) : null
            )}

            {tribine.galleries?.map((gallery) =>
              activeTab === `gallery-${gallery.id}` ? (
                <div key={gallery.id} className="p-3 rounded shadow-sm">
                  <h3 className="secondary-color">{gallery.name}</h3>
                  {Array.isArray(gallery.images) &&
                  gallery.images.length > 0 ? (
                    <Row className="g-3 mt-3">
                      {gallery.images.map((imageItem, imgIndex) => (
                        <Col xs={12} sm={6} md={4} lg={3} key={imgIndex}>
                          <img
                            src={getGalleryImageUrl(imageItem.image_path)}
                            alt={`Gallery ${gallery.id} - ${imgIndex}`}
                            className="img-fluid rounded cursor-pointer"
                            onClick={(event) =>
                              handleGalleryImageClick(
                                gallery.images,
                                imgIndex,
                                event
                              )
                            }
                          />
                        </Col>
                      ))}
                    </Row>
                  ) : (
                    <p className="mt-3">{t("tribine.noGalleryImages")}</p>
                  )}
                </div>
              ) : null
            )}
          </Col>
        </Row>

        {lightboxOpen && (
          <Lightbox
            open={lightboxOpen}
            close={() => setLightboxOpen(false)}
            slides={lightboxImages}
            index={currentIndex}
            onIndexChange={setCurrentIndex}
          />
        )}
      </Container>
    </Container>
  );
};

export default TribineDetail;

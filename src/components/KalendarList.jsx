import "./KalendarList.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Col, Container, Row } from "react-bootstrap";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Slider from "react-slick";
import { fetchAllCalendar } from "../store/slices/pagesSlice";
import { useTranslation } from "react-i18next";

const KalendarList = () => {
  const dispatch = useDispatch();
  const { calendar, loading, error } = useSelector((state) => state.pages);

  useEffect(() => {
    dispatch(fetchAllCalendar());
  }, [dispatch]);

  const { t } = useTranslation();

  //   useEffect(() => {
  //     dispatch(fetchAllClients());
  //   }, [dispatch]);

  const parsedEvents = useMemo(() => {
    return calendar.map((event) => ({
      id: event.id,
      title: event.title || "Bez naziva",
      start: event.dateFrom,
      end: event.dateTo,
      extendedProps: {
        description: event.description,
        location: event.location,
        link: event.link,
        status: event.status,
        typeEvent: event.typeEvent,
      },
      color: (() => {
        switch (event.typeEvent) {
          case "1":
            return "#388e3c";
          case "2":
            return "#0288d1";
          case "3":
            return "#0097a7";
          case "4":
            return "#8bc34a";
          case "5":
            return "#673ab7";
          case "6":
            return "#e91e63";
          case "7":
            return "#9c27b0";
          case "8":
            return "#03a9f4";
          case "9":
            return "#ffc107";
          case "10":
            return "#ff9800";
          default:
            return "#d32f2f"; // neaktivan
        }
      })(),
    }));
  }, [calendar]);

  return (
    <Container className="calendar-list-content-compontent">
      <Slider
        dots={true}
        infinite={true}
        speed={500}
        slidesToShow={5}
        slidesToScroll={5}
        responsive={[
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ]}
      >
        {parsedEvents?.map((event, index) => (
          <div key={index}>
            <div className="calendar-list-content-compontent-item">
              <div className="calendar-list-content-compontent-item-location">
                {event?.extendedProps?.location}
              </div>
              <div className="calendar-list-content-compontent-item-title">
                {event?.title}
              </div>
              {event?.extendedProps?.description && (
                <div
                  className="calendar-list-content-compontent-item-description"
                  dangerouslySetInnerHTML={{
                    __html: event?.extendedProps?.description,
                  }}
                ></div>
              )}
              <div className="calendar-list-content-compontent-item-date calendar-list-content-compontent-item-start-date">
                <AccessTimeIcon /> Od: {event.start}
              </div>
              <div className="calendar-list-content-compontent-item-date calendar-list-content-compontent-item-start-end">
                <AccessTimeIcon /> Do: {event.end}
              </div>
              {event?.extendedProps?.link && (
                <div className="calendar-list-content-compontent-item-button">
                  <a href={`${event?.extendedProps?.link}`} target="_blank">
                    <button>{t("home.calendar_detail")}</button>
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </Slider>
    </Container>
  );
};

export default KalendarList;

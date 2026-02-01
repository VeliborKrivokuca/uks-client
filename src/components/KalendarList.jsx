import "./KalendarList.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Col, Container, Row } from "react-bootstrap";
import React, { useEffect, useMemo } from "react";
import {
  fetchAllCalendar,
  fetchAllCalendarHomepage,
} from "../store/slices/pagesSlice";
import { useDispatch, useSelector } from "react-redux";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Slider from "react-slick";
import { useTranslation } from "react-i18next";

const KalendarList = () => {
  const dispatch = useDispatch();
  const { calendar, loading, error } = useSelector((state) => state.pages);

  useEffect(() => {
    dispatch(fetchAllCalendarHomepage());
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
            return "#ff0000";
          case "2":
            return "#800080";
          case "3":
            return "#0000ff";
          case "4":
            return "#4d4d4d";
          case "5":
            return "#008000";
          case "6":
            return "#ff8c00";
          case "7":
            return "#000000";
          default:
            return "#d32f2f"; // neaktivan
        }
      })(),
    }));
  }, [calendar]);

  return (
    <Container className="calendar-list-content-compontent">
      {parsedEvents?.length === 0 && <div>{t("calendar.noEvents")}</div>}
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

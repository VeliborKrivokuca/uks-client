import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";

import FullCalendar from "@fullcalendar/react";
import Modal from "react-bootstrap/Modal";
import Typography from "@mui/material/Typography";
import dayGridPlugin from "@fullcalendar/daygrid";
import { fetchAllCalendar } from "../store/slices/pagesSlice";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import srLocale from "@fullcalendar/core/locales/sr";
import timeGridPlugin from "@fullcalendar/timegrid";

const srLatinLocale = {
  code: "sr-latin",
  week: {
    dow: 1, // ponedeljak prvi dan
    doy: 7,
  },
  buttonText: {
    prev: "Nazad",
    next: "Napred",
    today: "Danas",
    month: "Mesec",
    week: "Nedelja",
    day: "Dan",
    list: "Lista",
  },
  weekText: "Sed",
  allDayText: "Ceo dan",
  moreLinkText: (n) => `+${n} više`,
  noEventsText: "Nema događaja za prikaz",

  monthNames: [
    "januar",
    "februar",
    "mart",
    "april",
    "maj",
    "jun",
    "jul",
    "avgust",
    "septembar",
    "oktobar",
    "novembar",
    "decembar",
  ],
  monthNamesShort: [
    "jan",
    "feb",
    "mar",
    "apr",
    "maj",
    "jun",
    "jul",
    "avg",
    "sep",
    "okt",
    "nov",
    "dec",
  ],
  dayNames: [
    "nedelja",
    "ponedeljak",
    "utorak",
    "sreda",
    "četvrtak",
    "petak",
    "subota",
  ],
  dayNamesShort: ["ned", "pon", "uto", "sre", "čet", "pet", "sub"],
};

const Calendar = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const { calendar, loading, error } = useSelector((state) => state.pages);

  useEffect(() => {
    dispatch(fetchAllCalendar());
  }, [dispatch]);

  const handleEventClick = (info) => {
    setSelectedEvent(info.event);
    setShow(true);
  };

  const handleClose = () => setShow(false);

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
            return "#81c784";
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
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="calendar-full-custom">
            <FullCalendar
              locale={srLatinLocale}
              plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
                listPlugin,
              ]}
              eventTimeFormat={{
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              }}
              initialView={
                window.innerWidth < 768 ? "listWeek" : "dayGridMonth"
              }
              events={parsedEvents}
              height="auto"
              eventClick={handleEventClick}
            />
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        {selectedEvent && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedEvent.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Typography gutterBottom>
                <strong>Lokacija:</strong>{" "}
                {selectedEvent.extendedProps?.location || "N/A"}
              </Typography>

              <Typography gutterBottom>
                <strong>Početak:</strong>{" "}
                {new Date(selectedEvent.start).toLocaleString("sr-Latn-RS", {
                  dateStyle: "short",
                  timeStyle: "short",
                  hour12: false,
                })}
              </Typography>

              <Typography gutterBottom>
                <strong>Kraj:</strong>{" "}
                {selectedEvent.end
                  ? new Date(selectedEvent.end).toLocaleString("sr-Latn-RS", {
                      dateStyle: "short",
                      timeStyle: "short",
                      hour12: false,
                    })
                  : "N/A"}
              </Typography>

              <Typography gutterBottom>
                <strong>Opis:</strong>{" "}
                <span
                  dangerouslySetInnerHTML={{
                    __html: selectedEvent.extendedProps.description || "",
                  }}
                />
              </Typography>

              {selectedEvent.extendedProps.link && (
                <Typography gutterBottom>
                  <strong>Link:</strong>{" "}
                  <a
                    href={selectedEvent.extendedProps.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {selectedEvent.extendedProps.link}
                  </a>
                </Typography>
              )}
            </Modal.Body>
          </>
        )}
      </Modal>
    </div>
  );
};

export default Calendar;

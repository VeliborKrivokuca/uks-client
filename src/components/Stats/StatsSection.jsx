import React from "react";
import "./StatsSection.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserFriends,
  faCalendarCheck,
  faHistory,
  faMedal,
} from "@fortawesome/free-solid-svg-icons";
import { useLanguage } from "../../context/LanguageContext";

const StatsSection = () => {
  const { language } = useLanguage();

  const stats = [
    {
      icon: faUserFriends,
      number: "500+",
      labels: {
        1: "Zadovoljnih članova",
        2: "Satisfied members",
      },
    },
    {
      icon: faCalendarCheck,
      number: "100+",
      labels: {
        1: "Realizovanih događaja",
        2: "Events organized",
      },
    },
    {
      icon: faHistory,
      number: "80+",
      labels: {
        1: "Godina smo uz vas",
        2: "Years with you",
      },
    },
    {
      icon: faMedal,
      number: "50+",
      labels: {
        1: "Dodeljenih nagrada",
        2: "Awards given",
      },
    },
  ];

  return (
    <div className="stats-section width-wrapper shadow my-5">
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div className="stat-item" key={index}>
            <FontAwesomeIcon icon={stat.icon} className="stat-icon" />
            <p className="stat-number">{stat.number}</p>
            <p className="stat-label">{stat.labels[language]}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsSection;

import React from "react";
import Clients from "../components/Clients/Clients";
import Awards from "../components/Awards/Awards";
import { useLanguage } from "../context/LanguageContext";
import Slider from "../components/Slider/Slider";

const AwardsPage = () => {
  const { language } = useLanguage();

  const translations = {
    1: {
      pageTitle: "Nagrade",
      pageSubtitle:
        "Pratite najvažnije aktuelnosti, događaje, koncerte i dešavanja koji oblikuju svet srpske muzike i kompozitorske umetnosti.",
    },
    2: {
      pageTitle: "Awards",
      pageSubtitle:
        "Follow the most important news, events, concerts, and happenings shaping the world of Serbian music and compositional art.",
    },
  };

  const t = translations[language];

  return (
    <div className="page">
      <div className="background-container"></div>
      <Clients></Clients>
      <Slider></Slider>
      <div className="width-90 mx-auto mt-4">
        <h1 className="text-start title-color">{t.pageTitle}</h1>
        <p className="text-start primary-color">{t.pageSubtitle}</p>
        <hr />
      </div>
      <Awards></Awards>
    </div>
  );
};

export default AwardsPage;

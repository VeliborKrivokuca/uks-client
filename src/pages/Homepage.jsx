import React from "react";
import Clients from "../components/Clients/Clients";
import SliderTitle from "../components/Slider/SliderTitle";
import tabsBlue from "../assets/tabs/1.png";
import tabsOrange from "../assets/tabs/2.png";
import tabsDarkBlue from "../assets/tabs/3.png";
import tabsLightBlue from "../assets/tabs/4.png";
import Awards from "../components/Awards/Awards";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import StatsSection from "../components/Stats/StatsSection";
import Aktuelnosti from "../components/Aktuelnosti/Aktuelnosti";
import RazgovoriList from "../components/Razgovori/Razgovori";
import AboutAssociationPreview from "../components/About/AboutAssociationPreview";
import { useLanguage } from "../context/LanguageContext";

const HomePage = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const translations = {
    members: {
      1: "Naši članovi",
      2: "Our Members",
    },
    news: {
      1: "Aktuelnosti",
      2: "News",
    },
    tribunes: {
      1: "Tribine",
      2: "Tribunes",
    },
    talks: {
      1: "Razgovori",
      2: "Talks",
    },
    allTalks: {
      1: "Svi razgovori",
      2: "All Talks",
    },
    awards: {
      1: "Nagrade",
      2: "Awards",
    },
    allAwards: {
      1: "Sve nagrade",
      2: "All Awards",
    },
    allNews: {
      1: "Aktuelnosti",
      2: "All News",
    },
  };

  const handleNavigationNagrade = () => {
    navigate("/nagrade");
  };

  const handleNavigationRazgovori = () => {
    navigate("/razgovori");
  };

  const handleNavigationAktuelnosti = () => {
    navigate("/aktuelnosti");
  };

  return (
    <div className="page">
      <Clients></Clients>
      <SliderTitle></SliderTitle>
      <div className="d-flex flex-wrap my-5 width-wrapper">
        <div
          className="tabs tabs-blue col-12 col-lg-6 col-xl-3 mb-3"
          onClick={() => navigate("/clanovi")}
        >
          <p className="text-white h2 py-3 ps-3">
            {translations.members[language]}
          </p>
          <img src={tabsBlue} alt="Logo" className="tab-image" />
        </div>
        <div
          className="tabs tabs-lightblue col-12 col-lg-6 col-xl-3 mb-3"
          onClick={() => navigate("/aktuelnosti")}
        >
          <p className="h2 py-3 ps-3 color-primary">
            {translations.news[language]}
          </p>
          <img src={tabsOrange} alt="" className="tab-image" />
        </div>
        <div
          className="tabs tabs-darkblue col-12 col-lg-6 col-xl-3 mb-3"
          onClick={() => navigate("/tribine")}
        >
          <p className="text-white h2 py-3 ps-3">
            {translations.tribunes[language]}
          </p>
          <img src={tabsDarkBlue} alt="" className="tab-image" />
        </div>
        <div
          className="tabs tabs-orange col-12 col-lg-6 col-xl-3 mb-3"
          onClick={() => navigate("/razgovori")}
        >
          <p className="text-white h2 py-3 ps-3">
            {translations.talks[language]}
          </p>
          <img src={tabsLightBlue} alt="" className="tab-image" />
        </div>
      </div>

      <div>
        <div className="width-wrapper d-flex">
          <h2 className="d-inline">{translations.awards[language]}</h2>
          <button
            className="rounded px-3 text-light primary-bg ms-auto d-inline-block"
            onClick={handleNavigationNagrade}
          >
            {translations.allAwards[language]}{" "}
            <FontAwesomeIcon className="text-light" icon={faArrowRight} />
          </button>
        </div>
        <Awards></Awards>
        <div className="mt-5 mb-2">
          <div className="width-wrapper d-flex">
            <h2 className="d-inline">{translations.news[language]}</h2>
            <button
              className="rounded px-2 text-light primary-bg ms-auto d-inline-block"
              onClick={handleNavigationAktuelnosti}
            >
              {translations.allNews[language]}{" "}
              <FontAwesomeIcon className="text-light" icon={faArrowRight} />
            </button>
          </div>
        </div>
        <Aktuelnosti></Aktuelnosti>
        <div className="mt-5 mb-2">
          <div className="width-wrapper d-flex">
            <h2 className="d-inline">{translations.talks[language]}</h2>
            <button
              className="rounded px-2 text-light primary-bg ms-auto d-inline-block"
              onClick={handleNavigationRazgovori}
            >
              {translations.allTalks[language]}{" "}
              <FontAwesomeIcon className="text-light" icon={faArrowRight} />
            </button>
          </div>
        </div>
        <RazgovoriList></RazgovoriList>
        <AboutAssociationPreview></AboutAssociationPreview>
        <StatsSection></StatsSection>
      </div>
    </div>
  );
};

export default HomePage;

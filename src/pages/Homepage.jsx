import AboutAssociationPreview from "../components/About/AboutAssociationPreview";
import Aktuelnosti from "../components/Aktuelnosti/Aktuelnosti";
import Awards from "../components/Awards/Awards";
import Clients from "../components/Clients/Clients";
import { Container } from "react-bootstrap";
import KalendarList from "../components/KalendarList";
import Navigation from "../components/Navigation/Navigation";
import RazgovoriList from "../components/Razgovori/Razgovori";
import React from "react";
import SectionHeader from "../components/SectionHeader/SectionHeader";
import SliderTitle from "../components/Slider/SliderTitle";
import StatsSection from "../components/Stats/StatsSection";
import TribinePreview from "../components/Tribine/TribinePreview";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const HomePage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleNavigationNagrade = () => navigate("/nagrade");
  const handleNavigationTribine = () => navigate("/festivali");
  const handleNavigationRazgovori = () => navigate("/razgovori");
  const handleNavigationAktuelnosti = () => navigate("/aktuelnosti");
  const handleNavigationKalendar = () => navigate("/dogadjaji");

  return (
    <Container fluid className="px-0">
      <div className="wave-background">
        <Clients />
        <SliderTitle />
        <Navigation />

        <SectionHeader
          title={t("home.news")}
          buttonText={t("home.allNews")}
          onButtonClick={handleNavigationAktuelnosti}
        />
        <Aktuelnosti />

        <SectionHeader
          title={t("home.tribunes")}
          buttonText={t("home.allTribunes")}
          onButtonClick={handleNavigationTribine}
        />
        <TribinePreview />
        <AboutAssociationPreview />

        <SectionHeader
          title={t("home.awards")}
          buttonText={t("home.allAwards")}
          onButtonClick={handleNavigationNagrade}
        />
        <Awards isHomepage={true} />

        <StatsSection />
        <SectionHeader
          title={t("home.talks")}
          buttonText={t("home.allTalks")}
          onButtonClick={handleNavigationRazgovori}
        />
        <RazgovoriList />
        <SectionHeader
          title={t("home.calendar")}
          buttonText={t("home.calendar_all")}
          onButtonClick={handleNavigationKalendar}
        />
        <KalendarList />
      </div>
    </Container>
  );
};

export default HomePage;

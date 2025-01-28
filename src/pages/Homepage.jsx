import React from "react";
import { useNavigate } from "react-router-dom";
import Clients from "../components/Clients/Clients";
import SliderTitle from "../components/Slider/SliderTitle";
import Navigation from "../components/Navigation/Navigation";
import SectionHeader from "../components/SectionHeader/SectionHeader";
import Awards from "../components/Awards/Awards";
import Aktuelnosti from "../components/Aktuelnosti/Aktuelnosti";
import RazgovoriList from "../components/Razgovori/Razgovori";
import AboutAssociationPreview from "../components/About/AboutAssociationPreview";
import StatsSection from "../components/Stats/StatsSection";
import { useTranslation } from "react-i18next";
import { Container } from "react-bootstrap";
import TribinePreview from "../components/Tribine/TribinePreview";

const HomePage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleNavigationNagrade = () => navigate("/nagrade");
  const handleNavigationTribine = () => navigate("/tribine");
  const handleNavigationRazgovori = () => navigate("/razgovori");
  const handleNavigationAktuelnosti = () => navigate("/aktuelnosti");

  return (
    <Container fluid className="px-0">
      <div className="wave-background">
        <Clients />
        <SliderTitle />
        <Navigation />

        <SectionHeader
          title={t("home.tribunes")}
          buttonText={t("home.allTribunes")}
          onButtonClick={handleNavigationTribine}
        />
        <TribinePreview />

        <div className="section-divider-large">
          <SectionHeader
            title={t("home.awards")}
            buttonText={t("home.allAwards")}
            onButtonClick={handleNavigationNagrade}
          />
          <Awards isHomepage={true} />
        </div>

        <SectionHeader
          title={t("home.news")}
          buttonText={t("home.allNews")}
          onButtonClick={handleNavigationAktuelnosti}
        />
        <Aktuelnosti />

        <AboutAssociationPreview />
        <StatsSection />
        <SectionHeader
          title={t("home.talks")}
          buttonText={t("home.allTalks")}
          onButtonClick={handleNavigationRazgovori}
        />
        <RazgovoriList />
      </div>
    </Container>
  );
};

export default HomePage;

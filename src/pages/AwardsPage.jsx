import React from "react";
import Clients from "../components/Clients/Clients";
import Awards from "../components/Awards/Awards";
import Slider from "../components/Slider/Slider";
import { useTranslation } from "react-i18next";
import { Container } from "react-bootstrap";

const AwardsPage = () => {
  const { t } = useTranslation();

  return (
    <Container fluid>
      <Clients></Clients>
      <Slider></Slider>
      <Container className="my-4 ">
        <h1 className="text-start title-color">{t("awards.pageTitle")}</h1>
        <p className="text-start primary-color pb-3 border-bottom-primary">
          {t("awards.pageSubtitle")}
        </p>
      </Container>
      <Awards></Awards>
    </Container>
  );
};

export default AwardsPage;

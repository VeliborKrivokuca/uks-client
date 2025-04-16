import Awards from "../components/Awards/Awards";
import Clients from "../components/Clients/Clients";
import { Container } from "react-bootstrap";
import React from "react";
import Slider from "../components/Slider/Slider";
import { useTranslation } from "react-i18next";

const AwardsPage = () => {
  const { t } = useTranslation();

  return (
    <Container fluid>
      <Clients></Clients>
      {/* <Slider></Slider> */}
      <Container className="my-4 ">
        <h1 className="text-start title-color fw-bold text-main-title text-uppercase">
          {t("awards.pageTitle")}
        </h1>
        <p className="text-start primary-color pb-3 border-bottom-primary text-subtitle fw-normal">
          {t("awards.pageSubtitle")}
        </p>
      </Container>
      <Awards></Awards>
    </Container>
  );
};

export default AwardsPage;

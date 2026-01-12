import Awards from "../components/Awards/Awards";
import Clients from "../components/Clients/Clients";
import { Container } from "react-bootstrap";
import React from "react";
import Slider from "../components/Slider/Slider";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AwardsPage = () => {
  const { t } = useTranslation();
  const { id } = useParams();

  return (
    <Container fluid>
      <Clients />
      {/* <Slider></Slider> */}
      {!id && (
        <Container className="my-4 ">
          <h1 className="text-start title-color fw-bold text-main-title text-uppercase">
            {t("awards.pageTitle")}
          </h1>
          <p
            className="text-start primary-color pb-3 border-bottom-primary text-subtitle fw-normal"
            dangerouslySetInnerHTML={{ __html: t("awards.pageSubtitle") }}
          ></p>
        </Container>
      )}
      <Awards />
    </Container>
  );
};

export default AwardsPage;

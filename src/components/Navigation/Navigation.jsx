import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import "./Navigation.css";
import tabsBlue from "../../assets/tabs/1.png";
import tabsOrange from "../../assets/tabs/2.png";
import tabsDarkBlue from "../../assets/tabs/3.png";
import tabsLightBlue from "../../assets/tabs/4.png";

const Navigation = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Container className="section-divider">
      <Row className="mx-auto">
        <Col xs={12} lg={6} xl={3} className="px-2 px-sm-0 my-0 my-sm-0">
          <div
            className="tabs tabs-blue w-100"
            onClick={() => navigate("/clanovi")}
          >
            <h2 className="text-white py-3 ps-3 text-main-title fw-bold">
              {t("home.members")}
            </h2>
            <img src={tabsBlue} alt="Logo" className="tab-image" />
          </div>
        </Col>

        <Col xs={12} lg={6} xl={3} className="px-2 px-sm-0 my-0 my-sm-0">
          <div
            className="tabs tabs-lightblue w-100"
            onClick={() => navigate("/aktuelnosti")}
          >
            <h2 className="py-3 ps-3 primary-color text-main-title fw-bold">
              {t("home.news")}
            </h2>
            <img src={tabsOrange} className="tab-image" />
          </div>
        </Col>

        <Col xs={12} lg={6} xl={3} className="px-2 px-sm-0 my-0 my-sm-0">
          <div
            className="tabs tabs-darkblue w-100"
            onClick={() => navigate("/tribine")}
          >
            <h2 className="text-white py-3 ps-3 text-main-title fw-bold">
              {t("home.tribunes")}
            </h2>
            <img src={tabsDarkBlue} className="tab-image" />
          </div>
        </Col>
        <Col xs={12} lg={6} xl={3} className="px-2 px-sm-0 my-0 my-sm-0">
          <div
            className="tabs tabs-orange w-100"
            onClick={() => navigate("/razgovori")}
          >
            <h2 className="text-white py-3 ps-3 text-main-title fw-bold">
              {t("home.talks")}
            </h2>
            <img src={tabsLightBlue} className="tab-image" />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Navigation;

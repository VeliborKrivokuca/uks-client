import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { API_BASE_URL } from "../services/api";
import Clients from "../components/Clients/Clients";
import Slider from "../components/Slider/Slider";
import { fetchDocuments } from "../store/slices/pagesSlice";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const Biblioteka = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { documents, loading, error } = useSelector((state) => state.pages);

  useEffect(() => {
    dispatch(fetchDocuments("Biblioteka"));
  }, [dispatch]);
  return (
    <>
      <Clients />
      <Slider />
      <Container>
        <Row className="my-4">
          <Col>
            <h1 className="px-1 title-color fw-bold text-main-title text-uppercase">
              {t("biblioteka.title")}
            </h1>
            <p
              className="px-1 text-start border-bottom-primary pb-3 title-color text-subtitle"
              dangerouslySetInnerHTML={{ __html: t("biblioteka.subtitle") }}
            ></p>
          </Col>
        </Row>

        {/* <Row>
          <Col md={12}>
            <div className="content-library-main">
              <p>
                U Udruženju kompozitora Srbije nalazi se veliki broj partitura:
                od onih za solo instrumente do onih za simfonijski orkestar.
                <br />
                <br />
                Ove note i partiture možete pozajmiti ili fotokopirati, a neke
                od njih i kupiti, u zavisnosti od broja preostalih primeraka.
              </p>
            </div>
          </Col>
        </Row> */}
        <Row className="mt-2">
          <Col>
            {documents?.map((link, index) => (
              <a
                href={API_BASE_URL + "/uploads/" + link.acDocument}
                key={index}
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none primary-color text-decoration-underline d-block"
              >
                {link.acName}
              </a>
            ))}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Biblioteka;

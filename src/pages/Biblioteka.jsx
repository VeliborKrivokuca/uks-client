import { Col, Container, Row } from "react-bootstrap";

import Clients from "../components/Clients/Clients";
import Slider from "../components/Slider/Slider";

const Biblioteka = () => {
  return (
    <>
      <Clients />
      <Slider />
      <Container>
        <Row className="my-4">
          <Col>
            <h1 className="px-1 title-color fw-bold text-main-title text-uppercase">
              Biblioteka
            </h1>
            <p className="px-1 text-start border-bottom-primary pb-3 title-color text-subtitle"></p>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <div className="content-library-main">
              <p>
                U Udruženju kompozitora Srbije nalazi se veliki broj partitura:
                od onih za solo instrumente do onih za simfonijski orkestar.
                Kompletan spisak u PDF formatu možete preuzeti ovde.{" "}
                <a
                  href="https://uks-server.developers.rs/uploads/fa569472-ef3d-4846-8cad-88a613bed69a.pdf"
                  target="_blank"
                  rel="noreferrer"
                >
                  LINK
                </a>{" "}
                <br />
                <br />
                Ove note i partiture možete pozajmiti ili fotokopirati, a neke
                od njih i kupiti, u zavisnosti od broja preostalih primeraka.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Biblioteka;

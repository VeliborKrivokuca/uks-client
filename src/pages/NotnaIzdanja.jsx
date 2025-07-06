import { Col, Container, Row } from "react-bootstrap";

import Clients from "../components/Clients/Clients";
import Slider from "../components/Slider/Slider";

const NotnaIzdanja = () => {
  return (
    <>
      <Clients />
      <Slider />
      <Container>
        <Row className="my-4">
          <Col>
            <h1 className="px-1 title-color fw-bold text-main-title text-uppercase">
              Notna izdanja
            </h1>
            <p className="px-1 text-start border-bottom-primary pb-3 title-color text-subtitle"></p>
          </Col>
        </Row>

        <Row>
          <Col md={12}></Col>
        </Row>
      </Container>
    </>
  );
};

export default NotnaIzdanja;

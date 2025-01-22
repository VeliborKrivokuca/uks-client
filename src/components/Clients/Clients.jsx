import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllClients } from "../../store/slices/pagesSlice";
import { API_BASE_URL } from "../../services/api";
import "./Clients.css";

const Clients = () => {
  const dispatch = useDispatch();
  const { clients, loading, error } = useSelector((state) => state.pages);

  useEffect(() => {
    dispatch(fetchAllClients());
  }, [dispatch]);

  if (loading) {
    return <p>Loading clients...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Container className="my-4">
      <Row className="gx-0 justify-content-between">
        {clients.map((client, index) => (
          <Col key={index} xs="auto" className="my-2">
            <img
              src={`${API_BASE_URL}/images/${client.acImage}`}
              alt={client.name || "Client"}
              className="client-image d-block"
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Clients;

import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { getAllClients } from "../../services/apiService";
import { API_BASE_URL } from "../../services/api";
import "./Clients.css";

const Clients = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await getAllClients();
        setClients(data);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    fetchClients();
  }, []);

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

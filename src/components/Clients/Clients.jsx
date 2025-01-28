import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllClients } from "../../store/slices/pagesSlice";
import { API_BASE_URL } from "../../services/api";
import "./Clients.css";
import { useTranslation } from "react-i18next";

const Clients = () => {
  const dispatch = useDispatch();
  const { clients, loading, error } = useSelector((state) => state.pages);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchAllClients());
  }, [dispatch]);

  if (loading) {
    return (
      <Container>
        <p>{t("info.loading")}</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <p>
          {t("info.error")} {error}
        </p>
      </Container>
    );
  }

  return (
    <Container className="section-divider-xs">
      <Row className="gx-0 justify-content-between">
        {clients
          .filter((client) => client.anStatus === "1") // Filter clients with anStatus = "1"
          .map((client, index) => (
            <Col key={index} xs="auto" className="gy-3">
              <a
                href={
                  client.acLink.startsWith("http://") ||
                  client.acLink.startsWith("https://")
                    ? client.acLink
                    : `https://${client.acLink}` // Default to HTTPS if the protocol is missing
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={`${API_BASE_URL}/images/${client.acImage}`}
                  alt={client.name || "Client"}
                  className="client-image d-block"
                />
              </a>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default Clients;

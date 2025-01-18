import React, { useEffect, useState } from "react";
import "./Clients.css";
import { getAllClients } from "../../services/apiService";
import { API_BASE_URL } from "../../services/apiService";

const Clients = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await getAllClients();
        setClients(data); // Assuming API returns an array of clients
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    fetchClients();
  }, []);

  return (
    <div className="banners-container mb-3 mt-2">
      {clients.map((client, index) => (
        <div key={index} className="banner-item">
          <img
            src={`${API_BASE_URL}/images/${client.acImage}`} // Construct image URL
            alt={client.name || "Client"}
            className="banner-image"
          />
        </div>
      ))}
    </div>
  );
};

export default Clients;

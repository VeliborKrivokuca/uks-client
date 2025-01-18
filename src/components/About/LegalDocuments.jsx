import React from "react";
import "./AboutAssociation.css"; // your custom CSS file
import { useLanguage } from "../../context/LanguageContext";
import about from "../../assets/about.png";
import Slider from "../Slider/Slider";
import Clients from "../Clients/Clients";

export default function LegalDocuments() {
  const { language } = useLanguage();

  const translations = {
    1: {
      title: "Pravni dokumenti",
      subtitle: "Udruženje kompozitora Srbije",
      description:
        "Klikom na željeni link ispod možete preuzeti aktuelne verzije pravnih dokumenata Udruženja kompozitora Srbije:",
      links: [
        {
          text: "Udruženje kompozitora Srbije – Statut 25.10.2022. (PDF)",
          href: "statut-25-10-2022.pdf",
        },
        {
          text: "Udruženje kompozitora Srbije – Poslovnik o radu Skupštine 16.10.2022. (PDF)",
          href: "poslovnik-16-10-2022.pdf",
        },
      ],
    },
    2: {
      title: "Legal Documents",
      subtitle: "Association of Composers of Serbia",
      description:
        "Click the desired link below to download the latest versions of legal documents of the Association of Composers of Serbia:",
      links: [
        {
          text: "Association of Composers of Serbia – Statute 25.10.2022. (PDF)",
          href: "statut-25-10-2022.pdf",
        },
        {
          text: "Association of Composers of Serbia – Rules of Procedure 16.10.2022. (PDF)",
          href: "poslovnik-16-10-2022.pdf",
        },
      ],
    },
  };

  const t = translations[language];

  return (
    <div>
      <Clients />
      <Slider />
      <div className="width-90 my-5">
        <div className="">
          <h1 className="text-start title-primary">{t.title}</h1>
          <p className="text-start border-bottom pb-3 title-primary font-weight-light">
            {t.subtitle}
          </p>
        </div>
        <div class="my-5 primary-color">
          <p>
            <p>{t.description}</p>
          </p>
          <ul>
            {t.links.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none primary-color text-decoration-underline"
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import "./AboutAssociation.css"; // your custom CSS file
import { useLanguage } from "../../context/LanguageContext";
import about from "../../assets/about.png";
import Slider from "../Slider/Slider";
import Clients from "../Clients/Clients";

export default function AdmissionRegulations() {
  const { language } = useLanguage();

  const translations = {
    1: {
      title: "Pravilnik o prijemu",
      subtitle: "Udruženje kompozitora Srbije",
      description:
        "Klikom na link ispod možete preuzeti pravilnik u članstvo Udruženja kompozitora Srbije.",
      links: [
        {
          text: "Pravilnik prijema u članstvo - UKS",
          href: "#",
        },
      ],
    },
    2: {
      title: "Admission Regulations",
      subtitle: "Association of Composers of Serbia",
      description:
        "By clicking on the link below, you can download the rules for membership of the Association of Composers of Serbia.",
      links: [
        {
          text: "Rules of admission to membership - UKS",
          href: "#",
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

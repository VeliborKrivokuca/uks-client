import React, { useState, useEffect } from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import logo from "../../assets/logo.png";
import { useLanguage } from "../../context/LanguageContext";

const translations = {
  1: {
    contactTitle: "Kontakt podaci",
    address: "Mišarska 12-14,",
    city: "11000 Beograd, Srbija",
    mailLabel: "Mail",
    phone: "Telefon",
    fax: "Fax",
    pagesTitle: "Stranice",
    socialMediaTitle: "Socijalne mreže",
    copyright:
      "Copyright © 2024. Udruženje kompozitora Srbije. Sva prava zadržava UKS",
    pages: [
      { name: "Aktuelnosti", route: "aktuelnosti" },
      { name: "O udruženju", route: "o-udruženju" },
      { name: "Članovi", route: "clanovi" },
      { name: "Razgovori", route: "razgovori" },
      { name: "Tribine", route: "tribine" },
      { name: "Nagrade", route: "nagrade" },
      { name: "Kontakt", route: "kontakt" },
    ],
  },
  2: {
    contactTitle: "Contact Information",
    address: "Mišarska 12-14,",
    city: "11000 Belgrade, Serbia",
    mailLabel: "Email",
    phone: "Phone",
    fax: "Fax",
    pagesTitle: "Pages",
    socialMediaTitle: "Social Media",
    copyright:
      "Copyright © 2024. Association of Composers of Serbia. All rights reserved by UKS",
    pages: [
      { name: "News", route: "aktuelnosti" },
      { name: "About the Association", route: "o-udruženju" },
      { name: "Members", route: "clanovi" },
      { name: "Conversations", route: "razgovori" },
      { name: "Talks", route: "tribine" },
      { name: "Awards", route: "nagrade" },
      { name: "Contact", route: "kontakt" },
    ],
  },
};

const Footer = () => {
  const { language } = useLanguage();
  const t = translations[language] || translations[1];

  return (
    <footer className="footer pt-5">
      <div className="footer-content">
        {/* Contact Info Section */}
        <div className="footer-section">
          <h3>{t.contactTitle}</h3>
          <p>{t.address}</p>
          <p>{t.city}</p>
          <p className="mt-3">
            {t.mailLabel}:{" "}
            <a href="mailto:composas@gmail.com" className="footer-link">
              composas@gmail.com
            </a>
          </p>
          <p>
            {t.phone}: +381 11 3340 894
          </p>
          <p>
            {t.fax}: +381 11 3340 894
          </p>
        </div>

        {/* Pages Section */}
        <div className="footer-section">
          <h3>{t.pagesTitle}</h3>
          <div className="footer-grid">
            {t.pages.map((page, index) => (
              <div key={index} className="footer-grid-item">
                <a href={`/${page.route}`} className="footer-link">
                  {page.name}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Social Media Section */}
        <div className="footer-section">
          <h3>{t.socialMediaTitle}</h3>
          <div className="social-icons">
            <a
              href="#"
              className="social-icon bg-white px-2 pt-1 pb-1 d-flex rounded-circle"
            >
              <FontAwesomeIcon
                className="h4 px-1 align-self-center mt-1"
                icon={faFacebook}
              />
            </a>
            <a
              href="#"
              className="social-icon bg-white px-2 pt-1 pb-1 d-flex rounded-circle"
            >
              <FontAwesomeIcon
                className="h4 px-1 align-self-center mt-1"
                icon={faInstagram}
              />
            </a>
            <a
              href="#"
              className="social-icon bg-white px-2 pt-1 pb-1 d-flex rounded-circle"
            >
              <FontAwesomeIcon
                className="h4 px-1 align-self-center mt-1"
                icon={faTwitter}
              />
            </a>
            <a
              href="#"
              className="social-icon bg-white px-2 pt-1 pb-1 d-flex rounded-circle"
            >
              <FontAwesomeIcon
                className="h4 px-1 align-self-center mt-1"
                icon={faLinkedin}
              />
            </a>
          </div>

          {/* Logo Section */}
          <div className="footer-section logo-section">
            <img src={logo} alt="Logo" className="footer-logo" />
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom w-100 py-3 justify-content-center align-items-center d-flex">
        <p className="mb-0">{t.copyright}</p>
      </div>
    </footer>
  );
};

export default Footer;

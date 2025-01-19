import React, { useState } from "react";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faSearch,
  faBars,
  faGripLinesVertical,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/logo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import LanguageSwitcher from "../LanguageSwitcher/LanuageSwitcher";
import { useLanguage } from "../../context/LanguageContext";

const translations = {
  1: {
    emailLabel: "Pošaljite nam email",
    callUsLabel: "Pozovite nas",
    language: "English",
    searchPlaceholder: "Pretraga...",
    menuItems: [
      {
        anId: "1",
        acName: "Aktuelnosti",
        ParentId: null,
        route: "aktuelnosti",
      },
      {
        anId: "2",
        acName: "O udruženju",
        ParentId: null,
        route: "o-udruženju",
      },
      { anId: "3", acName: "Članovi", ParentId: null, route: "clanovi" },
      { anId: "4", acName: "Razgovori", ParentId: null, route: "razgovori" },
      { anId: "5", acName: "Tribine", ParentId: null, route: "tribine" },
      { anId: "17", acName: "Nagrade", ParentId: null, route: "nagrade" },
      { anId: "18", acName: "Kontakt", ParentId: null, route: "kontakt" },
      { anId: "18", acName: "O nama", ParentId: 2, route: "o-nama" },
      { anId: "19", acName: "Pravni dokumenti", ParentId: 2, route: "pravni-dokumenti" },
      { anId: "20", acName: "Pravilnik o prijemu", ParentId: 2, route: "pravilnik-o-prijemu" },
      { anId: "21", acName: "O udruženju", ParentId: 2, route: "o-udruženju" },
      { anId: "22", acName: "Preporuke", ParentId: 2, route: "preporuke" },
    ],
  },
  2: {
    emailLabel: "Send us an email",
    callUsLabel: "Call us Now",
    language: "Srpski",
    searchPlaceholder: "Search...",
    menuItems: [
      { anId: "1", acName: "News", ParentId: null, route: "aktuelnosti" },
      {
        anId: "2",
        acName: "About the Association",
        ParentId: null,
        route: "o-udruženju",
      },
      { anId: "3", acName: "Members", ParentId: null, route: "clanovi" },
      {
        anId: "4",
        acName: "Conversations",
        ParentId: null,
        route: "razgovori",
      },
      { anId: "5", acName: "Talks", ParentId: null, route: "tribine" },
      { anId: "17", acName: "Awards", ParentId: null, route: "nagrade" },
      { anId: "18", acName: "Contact", ParentId: null, route: "kontakt" },
      { anId: "18", acName: "About us", ParentId: 2, route: "o-nama" },
      { anId: "19", acName: "Legal documents", ParentId: 2, route: "pravni-dokumenti" },
      { anId: "20", acName: "Rules of admission", ParentId: 2, route: "pravilnik-o-prijemu" },
      { anId: "21", acName: "About association", ParentId: 2, route: "o-udruženju" },
      { anId: "22", acName: "Recommendations", ParentId: 2, route: "preporuke" },
    ],
  },
};

const Header = () => {
  const { language } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState({});

  const t = translations[language];

  const buildHierarchy = (items) => {
    const map = {};
    const tree = [];

    items.forEach((item) => {
      map[item.anId] = { ...item, children: [] };
    });

    items.forEach((item) => {
      if (item.ParentId) {
        map[item.ParentId].children.push(map[item.anId]);
      } else {
        tree.push(map[item.anId]);
      }
    });

    return tree;
  };

  const menuItems = buildHierarchy(t.menuItems);

  const toggleDropdown = (id) => {
    setOpenMenus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderMenu = (items) => {
    return items.map((item) => {
      const isOpen = openMenus[item.anId];

      return (
        <li key={item.anId} className={`nav-item mb-1 ${isOpen ? "open" : ""}`}>
          {item.children && item.children.length > 0 ? (
            <>
              <span
                onClick={(e) => {
                  e.preventDefault();
                  toggleDropdown(item.anId);
                }}
                className="nav-link dropdown-toggle fs-14"
              >
                {item.acName}
              </span>
              {isOpen && (
                <ul className="dropdown-menu primary-bg px-3 pb-1 pt-2">
                  {renderMenu(item.children)}
                </ul>
              )}
            </>
          ) : (
            <Link to={`/${item.route}`} className="nav-link">
              {item.acName}
            </Link>
          )}
        </li>
      );
    });
  };

  return (
    <header cla>
      <div className="header-top py-2 width-90 ps-0">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Logo" className="logo-img" />
          </Link>
        </div>

        <div className="contact-info ms-auto">
          <div className="email">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="h4 mt-2 primary-color me-2"
            />
            <div className="me-3">
              <p className="label-small text-uppercase mb-0 text-danger fs-8">{t.emailLabel}</p>
              <a
                href="mailto:composas@gmail.com"
                className="primary-color text-decoration-none text-uppercase mail fs-12"
              >
                composas@gmail.com
              </a>
            </div>
          </div>
          <span className="primary-color">|</span>
          <div className="phone ms-3">
            <FontAwesomeIcon
              icon={faPhone}
              className="h4 mt-2 primary-color me-2"
            />
            <div className="">
              <p className="label-small text-uppercase mb-0 fs-8 text-danger">{t.callUsLabel}</p>
              <a
                href="tel:800-123-4567"
                className="primary-color text-decoration-none text-uppercase mail fs-12"
              >
                800-123-4567
              </a>
            </div>

          </div>
        </div>
        <LanguageSwitcher></LanguageSwitcher>
        <button
          className="hamburger"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>

      <div
        className={`header-nav-wrapper py-2 ${
          isMobileMenuOpen ? "active" : ""
        }`}
      >
        <nav className="header-nav width-90 d-flex align-items-end">
          <ul className={`mb-0 ps-0 ms-0 nav-menu ${isMobileMenuOpen ? "active" : ""}`}>
            {renderMenu(menuItems)}
          </ul>
          <div className="search-bar ms-0 ms-md-auto pe-3">
            <div className="search-input-wrapper">
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                className="form-control"
              />
              <button className="btn-icon">
                <FontAwesomeIcon icon={faSearch} className="icon" />
              </button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;

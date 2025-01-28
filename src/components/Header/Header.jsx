import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faSearch,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import LanguageSwitcher from "../LanguageSwitcher/LanuageSwitcher";
import { useTranslation } from "react-i18next";

import logo from "../../assets/logo.png";
import "./Header.css";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState({});
  const { t } = useTranslation();
  const dropdownRef = useRef(null);
  const menuItemsSearch = t("header.menuItems", { returnObjects: true });
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() === "") {
      setFilteredItems([]);
      return;
    }

    const results = menuItemsSearch.filter((item) =>
      item.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredItems(results);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    if (filteredItems.length === 1) {
      navigate(`/${filteredItems[0].route}`);
    }
  };

  const handleResultClick = (route) => {
    navigate(`/${route}`);
    setSearchTerm("");
    setFilteredItems([]);
    setIsMobileMenuOpen(false);
    setOpenMenus({});
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenMenus({});
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const buildHierarchy = (items) => {
    const map = {};
    const tree = [];

    items.forEach((item) => {
      map[item.id] = { ...item, children: [] };
    });

    items.forEach((item) => {
      if (item.parentId) {
        map[item.parentId].children.push(map[item.id]);
      } else {
        tree.push(map[item.id]);
      }
    });

    return tree;
  };

  const menuItems = buildHierarchy(
    t("header.menuItems", { returnObjects: true })
  );

  const toggleDropdown = (id) => {
    setOpenMenus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderMenu = (items) =>
    items.map((item) => {
      const isOpen = openMenus[item.id] || false;

      return (
        <li
          key={item.id}
          className={`text-white mb-0 py-1 text-start position-relative ${
            isOpen ? "open navigation-divider" : ""
          }`}
        >
          {item.children && item.children.length > 0 ? (
            <>
              <span
                onClick={(e) => {
                  e.preventDefault();
                  toggleDropdown(item.id);
                }}
                className="cursor-pointer text-decoration-none fw-normal"
              >
                {item.name}
              </span>
              {isOpen && (
                <ul
                  ref={dropdownRef}
                  className="position-absolute start-0 primary-bg px-3 py-2 dropdown z-3 shadow ms-0"
                >
                  {renderMenu(item.children)}
                </ul>
              )}
            </>
          ) : (
            <Link
              to={`/${item.route}`}
              className="text-white text-md text-decoration-none fw-normal"
              onClick={() => {
                setOpenMenus({});
                setIsMobileMenuOpen(false);
              }}
            >
              {item.name}
            </Link>
          )}
        </li>
      );
    });

  return (
    <header className="shadow-sm bg-white">
      <Container className="py-3">
        <Row className="align-items-center">
          <Col lg={3} md={6} sm={8} xs={8}>
            <Link to="/">
              <img src={logo} alt="Logo" className="logo-img" />
            </Link>
          </Col>

          <Col className="d-none d-xl-flex justify-content-end contact-info">
            <div className="d-flex align-items-center">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="text-xl primary-color me-2"
              />
              <div>
                <p className="text-uppercase mb-0 text-danger text-info-xs">
                  {t("header.emailLabel")}
                </p>
                <a
                  href={`mailto:${t("header.mail")}`}
                  className="secondary-color text-decoration-none text-uppercase mail text-xs"
                >
                  {t("header.mail")}
                </a>
              </div>
            </div>

            <span className="primary-color mx-2">|</span>

            <div className="d-flex align-items-center">
              <FontAwesomeIcon
                icon={faPhone}
                className="text-xl primary-color me-2"
              />
              <div>
                <p className="text-uppercase mb-0 text-info-xs text-danger">
                  {t("header.callUsLabel")}
                </p>
                <a
                  href={`tel:${t("header.phone")}`}
                  className="secondary-color text-decoration-none text-uppercase mail text-xs"
                >
                  {t("header.phone")}
                </a>
              </div>
            </div>
          </Col>

          <Col xs="auto" className="d-none d-xl-flex">
            <LanguageSwitcher />
          </Col>

          <Col xs="auto" className="ms-auto d-xl-none">
            <button
              className="d-block d-xxl-none bg-transparent p-0 text-xl"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
          </Col>
        </Row>
      </Container>

      <Container
        fluid
        className={`custom-navbar d-xl-block primary-bg py-2 ${
          isMobileMenuOpen ? "d-block h-100" : "d-none"
        }`}
      >
        <Container>
          <Row>
            <Col>
              <nav className="d-flex align-items-center">
                <ul
                  className={`text-md d-flex flex-column flex-xl-row mb-0 ps-0 ms-0 ${
                    isMobileMenuOpen ? "d-flex" : ""
                  }`}
                >
                  {renderMenu(menuItems)}
                </ul>

                <div className="d-xxl-block d-none ms-auto">
                  <form
                    onSubmit={handleSearchSubmit}
                    className="input-group search-input-wrapper"
                  >
                    <input
                      type="text"
                      placeholder={t("header.searchPlaceholder")}
                      value={searchTerm}
                      onChange={handleSearchChange}
                      className="search-input form-control border-0"
                    />
                    <button
                      type="submit"
                      className="btn bg-white border-0 py-1 pe-3"
                    >
                      <FontAwesomeIcon className="icon" icon={faSearch} />
                    </button>
                  </form>

                  {filteredItems.length > 0 && (
                    <ul className="search-results position-absolute bg-white border rounded shadow mt-2 p-2 z-3">
                      {filteredItems.map((item) => (
                        <li
                          key={item.id}
                          className="py-1 navigation-divider cursor-pointer"
                          onClick={() => handleResultClick(item.route)}
                        >
                          {item.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </nav>
            </Col>
          </Row>
        </Container>
      </Container>
    </header>
  );
};

export default Header;

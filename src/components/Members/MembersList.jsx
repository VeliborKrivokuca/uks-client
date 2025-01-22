import React, { useState } from "react";
import { Container, Row, Col, Table, Form, Button } from "react-bootstrap";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Clients from "../Clients/Clients";
import { useTranslation } from "react-i18next";
import { API_BASE_URL } from "../../services/api";
import "./Members.css";

function MembersList({ members, roles, onProfileClick }) {
  const [searchName, setSearchName] = useState("");
  const [selectedSection, setSelectedSection] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const { t } = useTranslation();
  const membersPerPage = 5;

  // ----- Filtering -----
  const filteredMembers = members.filter((m) => {
    const nameMatch = m.acName
      ?.toLowerCase()
      .includes(searchName.trim().toLowerCase());
    if (selectedSection === "all") return nameMatch;
    return nameMatch && m.acPosition === selectedSection;
  });

  // ----- Pagination -----
  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = filteredMembers.slice(
    indexOfFirstMember,
    indexOfLastMember
  );
  const totalPages = Math.ceil(filteredMembers.length / membersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <>
      {/* Clients */}
      <Clients />

      {/* Header Section */}
      <Container className="mt-5">
        <Row>
          <Col>
            <h2 className="title-color">{t("members.sectionTitle")}</h2>
            <p className="mb-4 primary-color">
              {t("members.sectionDescription")}
            </p>
          </Col>
        </Row>

        {/* Filters */}
        <Row className="g-3 mb-4">
          <Col xs={12} md={6}>
            <Form.Label className="fw-semibold secondary-color text-md">
              {t("members.chooseSection")}
            </Form.Label>
            <Form.Select
              className="light-blue p-3"
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
            >
              <option value="all">{t("members.allRoles")}</option>
              {roles.map((role, index) => (
                <option key={index} value={role}>
                  {role}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col xs={12} md={6}>
            <Form.Label className="fw-semibold text-md secondary-color text-md">
              {t("members.chooseName")}
            </Form.Label>
            <Form.Control
              type="text"
              className="light-blue p-3"
              placeholder={t("members.chooseNamePlaceholder")}
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
          </Col>
        </Row>

        {/* Members Table */}
        <Row>
          <Col>
            <div className="table-responsive">
              <Table hover className="align-middle mb-4">
                <thead className="table-light text-center">
                  <tr className="py-3">
                    <th className="light-blue py-3 fw-normal secondary-color border-0">
                      {t("members.picture")}
                    </th>
                    <th className="light-blue py-3 fw-normal secondary-color border-0">
                      {t("members.name")}
                    </th>
                    <th className="light-blue py-3 fw-normal secondary-color border-0">
                      {t("members.role")}
                    </th>
                    <th className="light-blue py-3 fw-normal secondary-color border-0">
                      {t("members.profile")}
                    </th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {currentMembers.map((member) => (
                    <tr key={member.anId}>
                      <td className="secondary-color">
                        <img
                          src={`${API_BASE_URL}/images/${member.acImage}`}
                          alt={member.acName}
                          className="rounded-circle member-photo shadow"
                        />
                      </td>
                      <td className="secondary-color fw-bold">
                        {member.acName}
                      </td>
                      <td className="secondary-color fw-light">
                        {member.acPosition}
                      </td>
                      <td className="secondary-color">
                        <Button
                          variant="primary"
                          className="primary-bg px-4 text-white border-0"
                          onClick={() => onProfileClick(member)}
                        >
                          {t("members.profileButton")}{" "}
                          <FontAwesomeIcon
                            icon={faArrowRight}
                            className="text-xs"
                          />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>

        {/* Pagination */}
        {totalPages > 1 && (
          <Row>
            <Col>
              <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                  {/* Previous Button */}
                  <li
                    className={`page-item ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
                  >
                    <Button
                      variant="light"
                      className="page-link"
                      onClick={handlePrevPage}
                    >
                      <FontAwesomeIcon icon={faArrowLeft} />
                    </Button>
                  </li>
                  {/* Page Numbers */}
                  {Array.from({ length: totalPages }, (_, index) => {
                    const pageNumber = index + 1;
                    const isActive = currentPage === pageNumber;
                    return (
                      <li
                        key={pageNumber}
                        className={`page-item ${isActive ? "active" : ""}`}
                      >
                        <Button
                          variant="light"
                          className="page-link"
                          onClick={() => handlePageChange(pageNumber)}
                        >
                          {pageNumber}
                        </Button>
                      </li>
                    );
                  })}
                  {/* Next Button */}
                  <li
                    className={`page-item ${
                      currentPage === totalPages ? "disabled" : ""
                    }`}
                  >
                    <Button
                      variant="light"
                      className="page-link"
                      onClick={handleNextPage}
                    >
                      <FontAwesomeIcon icon={faArrowRight} />
                    </Button>
                  </li>
                </ul>
              </nav>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
}

export default MembersList;

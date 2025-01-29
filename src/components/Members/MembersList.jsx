import React, { useState } from "react";
import { Container, Row, Col, Table, Form, Button } from "react-bootstrap";
import Clients from "../Clients/Clients";
import Pagination from "../Pagination/Pagination";
import { useTranslation } from "react-i18next";
import { API_BASE_URL } from "../../services/api";
import "./Members.css";

function MembersList({ members, roles, onProfileClick }) {
  const [searchName, setSearchName] = useState("");
  const [selectedSection, setSelectedSection] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(30);

  const { t } = useTranslation();

  // ----- Filtering -----
  const filteredMembers = members.filter((m) => {
    const nameMatch = m.acName
      ?.toLowerCase()
      .includes(searchName.trim().toLowerCase());

    const statusMatch = m.anStatus === "1"; // Ensure only active members are shown

    if (selectedSection === "all") return nameMatch && statusMatch;
    return nameMatch && statusMatch && m.acPosition === selectedSection;
  });

  // ----- Pagination -----
  const indexOfLastMember = currentPage * itemsPerPage;
  const indexOfFirstMember = indexOfLastMember - itemsPerPage;
  const currentMembers = filteredMembers.slice(
    indexOfFirstMember,
    indexOfLastMember
  );

  return (
    <>
      {/* Clients */}
      <Clients />

      {/* Header Section */}
      <Container className="mt-5">
        <Row>
          <Col>
            <h2 className="title-color fw-bold text-main-title">
              {t("members.sectionTitle")}
            </h2>
            <p className="mb-4 primary-color text-subtitle">
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
                          {t("members.profileButton")}
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
        <Pagination
          currentPage={currentPage}
          totalItems={filteredMembers.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
        />
      </Container>
    </>
  );
}

export default MembersList;

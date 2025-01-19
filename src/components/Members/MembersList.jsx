import React, { useState, useEffect } from "react";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Clients from "../Clients/Clients";
import { useLanguage } from "../../context/LanguageContext";
import { API_BASE_URL } from "../../services/api";

const translations = {
  en: {
    sectionTitle: "OUR MEMBERS",
    sectionDescription:
      "The section for association members provides insight into the profiles of our composers, their biographies, works, and contributions to the Serbian music scene, highlighting the importance of their creativity and role in preserving our musical tradition.",
    backButton: "« Back",
    chooseSection: "Choose section",
    chooseName: "Enter name and last name",
    all: "All",
    picture: "Picture",
    name: "Name",
    role: "Role",
    profile: "Profile",
  },
  sr: {
    sectionTitle: "NAŠI ČLANOVI",
    sectionDescription:
      "Sekcija za članove udruženja pruža uvid u profile naših kompozitora, njihove biografije, dela i doprinose srpskoj muzičkoj sceni, ističući značaj njihovog stvaralaštva i uloge u očuvanju naše muzičke tradicije.",
    backButton: "« Nazad",
    chooseSection: "Odaberite sekciju",
    chooseName: "Upišite ime i prezime",
    all: "Svi",
    picture: "Slika",
    name: "Ima i prezime",
    role: "Uloga",
    profile: "Profil",
  },
};

function MembersList({ members, onProfileClick }) {
  const [searchName, setSearchName] = useState("");
  const [roles, setRoles] = useState([]); // State for roles
  const [selectedSection, setSelectedSection] = useState("Svi");
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const membersPerPage = 5; // Number of members per page
  const { language } = useLanguage(); // Get current language from context
  const t = translations[language === 1 ? "sr" : "en"]; // Select translations based on language

  useEffect(() => {
    // Fetch roles from the backend
    const fetchRoles = async () => {
      try {
        const response = await api.get(`/api/team/roles/${language}`);
        const fetchedRoles = response.data.map((role) => role.role); // Assuming the backend returns [{ role: '...' }]
        setRoles(fetchedRoles);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchRoles();
  }, [language]);

  // Filter members by name and role
  const filteredMembers = members.filter((m) => {
    const nameMatch = m.acName.toLowerCase().includes(searchName.toLowerCase());
    if (selectedSection === "Svi") return nameMatch;
    return nameMatch && m.acPosition === selectedSection;
  });

  // Pagination calculations
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

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="">
      <Clients></Clients>
      <div className="width-90">
        <h1 className="mt-4 title-color fw-bold">{t.sectionTitle}</h1>
        <p className="text-muted mb-4">{t.sectionDescription}</p>

        {/* Filters */}
        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <label className="form-label fw-semibold">{t.chooseSection}</label>
            <select
              className="form-select"
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
            >
              <option value="Svi">{t.all}</option>
              {roles.map((role, index) => (
                <option key={index} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label fw-semibold">{t.chooseName}</label>
            <input
              type="text"
              className="form-control select"
              placeholder={t.all}
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
          </div>
        </div>

        {/* Members Table */}
        <div className="table-responsive">
          <table className="table align-middle mb-4">
            <thead className="table-light bg-none">
              <tr className="tr">
                <th scope="col" className="bg-none">
                  {t.picture}
                </th>
                <th scope="col" className="bg-none">
                  {t.name}
                </th>
                <th scope="col" className="bg-none">
                  {t.role}
                </th>
                <th scope="col" className="bg-none text-end">
                  {t.profile}
                </th>
              </tr>
            </thead>
            <tbody>
              {currentMembers.map((member) => (
                <tr key={member.anId} className="custom-row">
                  <td style={{ width: "80px" }}>
                    <img
                      src={`${API_BASE_URL}/images/${member.acImage}`}
                      alt={member.acName}
                      className="rounded-circle member-photo"
                    />
                  </td>
                  <td className="fw-semibold">{member.acName}</td>
                  <td className="text-muted">{member.acPosition}</td>
                  <td className="text-end">
                    <button
                      className="btn primary-bg text-white"
                      onClick={() => onProfileClick(member)}
                    >
                      Profil &raquo;
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <nav aria-label="Page navigation">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={handlePreviousPage}>
                <FontAwesomeIcon className="title-color" icon={faArrowLeft} />
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li
                key={index + 1}
                className={`page-item ${
                  currentPage === index + 1 ? "active custom-active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button className="page-link" onClick={handleNextPage}>
                <FontAwesomeIcon className="title-color" icon={faArrowRight} />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default MembersList;

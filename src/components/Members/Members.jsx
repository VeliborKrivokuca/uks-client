import React, { useEffect, useState } from "react";
import MembersList from "./MembersList";
import MemberProfile from "./MemberProfile";
import axios from "axios";
import "./Members.css";
import { API_BASE_URL } from "../../services/api";
import { useLanguage } from "../../context/LanguageContext";
import api from "../../services/api";

const MembersPage = () => {
  const [members, setMembers] = useState([]); // State to store members
  const [roles, setRoles] = useState([]); // State to store roles (uloge)
  const [selectedRole, setSelectedRole] = useState("Svi"); // Selected role filter
  const [selectedMember, setSelectedMember] = useState(null); // State for selected member
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const { language } = useLanguage();

  useEffect(() => {
    const fetchMembersAndRoles = async () => {
      try {
        setLoading(true);
        // Fetch members
        const membersResponse = await api.get(
          `/api/team/get/allTranslation/${language}`
        );
        console.log(membersResponse.data);
        setMembers(membersResponse.data.data || []);

        // Fetch roles
        const rolesResponse = await api.get(
          `/api/team/roles/${language}`
        );
        const fetchedRoles = rolesResponse.data.map((role) => role.role);
        setRoles(["Svi", ...fetchedRoles]); // Add "Svi" as a default option

        setLoading(false);
      } catch (err) {
        console.error("Error fetching members or roles:", err);
        setError("Failed to load data. Please try again.");
        setLoading(false);
      }
    };

    fetchMembersAndRoles();
  }, [language]);

  const handleProfileClick = (member) => {
    setSelectedMember(member);
  };

  const handleBackClick = () => {
    setSelectedMember(null);
  };

  const filteredMembers = members.filter(
    (member) => selectedRole === "Svi" || member.acPosition === selectedRole
  );

  if (loading) {
    return <p>Loading members...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="bg-light min-vh-100">
      {selectedMember ? (
        <MemberProfile member={selectedMember} onBackClick={handleBackClick} />
      ) : (
        <MembersList
          members={filteredMembers}
          roles={roles}
          selectedRole={selectedRole}
          onRoleChange={setSelectedRole}
          onProfileClick={handleProfileClick}
        />
      )}
    </div>
  );
};

export default MembersPage;

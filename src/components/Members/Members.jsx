import "./Members.css";

import React, { useEffect } from "react";
import { fetchMembers, fetchRoles } from "../../store/actions/membersActions";
import { useDispatch, useSelector } from "react-redux";

import { Container } from "react-bootstrap";
import MembersList from "./MembersList";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const MembersPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const { members, roles, loading, error } = useSelector(
    (state) => state.members,
  );

  useEffect(() => {
    dispatch(fetchMembers("sr"));
    dispatch(fetchRoles("sr"));
  }, [dispatch, i18n.language]);

  const handleProfileClick = (member) => {
    navigate(`/clanovi/${member.anId}`);
  };

  if (loading) {
    return (
      <Container>
        <p>{t("members.loading")}</p>
      </Container>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Container>
      <MembersList
        members={members}
        roles={roles}
        onProfileClick={handleProfileClick}
      />
    </Container>
  );
};

export default MembersPage;

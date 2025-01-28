import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import MembersList from "./MembersList";
import { fetchMembers, fetchRoles } from "../../store/actions/membersActions";
import "./Members.css";
import { useTranslation } from "react-i18next";
import { Container } from "react-bootstrap";

const MembersPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const { members, roles, loading, error } = useSelector(
    (state) => state.members
  );

  useEffect(() => {
    dispatch(fetchMembers(i18n.language));
    dispatch(fetchRoles(i18n.language));
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

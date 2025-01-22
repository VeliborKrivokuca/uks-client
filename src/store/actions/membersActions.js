import api from "../../services/api";
import { mapLanguageCodeToId } from "../../services/languageUtils";

export const FETCH_MEMBERS_REQUEST = "FETCH_MEMBERS_REQUEST";
export const FETCH_MEMBERS_SUCCESS = "FETCH_MEMBERS_SUCCESS";
export const FETCH_MEMBERS_FAILURE = "FETCH_MEMBERS_FAILURE";

export const FETCH_ROLES_REQUEST = "FETCH_ROLES_REQUEST";
export const FETCH_ROLES_SUCCESS = "FETCH_ROLES_SUCCESS";
export const FETCH_ROLES_FAILURE = "FETCH_ROLES_FAILURE";

export const SET_SELECTED_MEMBER = "SET_SELECTED_MEMBER";

export const FETCH_MEMBER_DETAIL_REQUEST = "FETCH_MEMBER_DETAIL_REQUEST";
export const FETCH_MEMBER_DETAIL_SUCCESS = "FETCH_MEMBER_DETAIL_SUCCESS";
export const FETCH_MEMBER_DETAIL_FAILURE = "FETCH_MEMBER_DETAIL_FAILURE";

// Fetch members
export const fetchMembers = (language) => async (dispatch) => {
  dispatch({ type: FETCH_MEMBERS_REQUEST });
  try {
    const languageId = mapLanguageCodeToId(language);
    const response = await api.get(
      `/api/team/get/allTranslation/${languageId}`
    );
    dispatch({
      type: FETCH_MEMBERS_SUCCESS,
      payload: response.data?.data || [],
    });
  } catch (error) {
    dispatch({
      type: FETCH_MEMBERS_FAILURE,
      payload: error.message,
    });
  }
};

// Fetch roles
export const fetchRoles = (language) => async (dispatch) => {
  dispatch({ type: FETCH_ROLES_REQUEST });
  try {
    const languageId = mapLanguageCodeToId(language);
    const response = await api.get(`/api/team/roles/${languageId}`);
    const roles = response.data?.map((role) => role.role) || [];
    dispatch({
      type: FETCH_ROLES_SUCCESS,
      payload: roles,
    });
  } catch (error) {
    dispatch({
      type: FETCH_ROLES_FAILURE,
      payload: error.message,
    });
  }
};

// Set selected member
export const setSelectedMember = (member) => ({
  type: SET_SELECTED_MEMBER,
  payload: member,
});

// Fetch member details by ID
export const fetchMemberDetail = (id) => async (dispatch) => {
  dispatch({ type: FETCH_MEMBER_DETAIL_REQUEST });
  try {
    const response = await api.get(`/api/team/member/${id}`);
    dispatch({ type: FETCH_MEMBER_DETAIL_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_MEMBER_DETAIL_FAILURE, payload: error.message });
  }
};

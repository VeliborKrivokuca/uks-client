import api from "../../services/api";
import { mapLanguageCodeToId } from "../../services/languageUtils";

export const FETCH_AWARDS_REQUEST = "FETCH_AWARDS_REQUEST";
export const FETCH_AWARDS_SUCCESS = "FETCH_AWARDS_SUCCESS";
export const FETCH_AWARDS_FAILURE = "FETCH_AWARDS_FAILURE";

export const fetchAwards = (language) => async (dispatch) => {
  dispatch({ type: FETCH_AWARDS_REQUEST });
  try {
    const languageId = mapLanguageCodeToId(language);
    const response = await api.get(`/api/nagrade/language/${languageId}`);
    dispatch({ type: FETCH_AWARDS_SUCCESS, payload: response.data.data });
  } catch (error) {
    dispatch({ type: FETCH_AWARDS_FAILURE, payload: error.message });
  }
};

export const fetchAwardById = (id) => async (dispatch) => {
  try {
    const response = await api.get(`/api/nagrade/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching award by ID:", error);
    return null;
  }
};

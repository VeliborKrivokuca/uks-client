import api from "../../services/api";
import { mapLanguageCodeToId } from "../../services/languageUtils";

export const FETCH_RAZGOVORI_REQUEST = "FETCH_RAZGOVORI_REQUEST";
export const FETCH_RAZGOVORI_SUCCESS = "FETCH_RAZGOVORI_SUCCESS";
export const FETCH_RAZGOVORI_FAILURE = "FETCH_RAZGOVORI_FAILURE";
export const FETCH_RAZGOVOR_DETAIL_REQUEST = "FETCH_RAZGOVOR_DETAIL_REQUEST";
export const FETCH_RAZGOVOR_DETAIL_SUCCESS = "FETCH_RAZGOVOR_DETAIL_SUCCESS";
export const FETCH_RAZGOVOR_DETAIL_FAILURE = "FETCH_RAZGOVOR_DETAIL_FAILURE";

export const fetchRazgovorDetail = (id, language) => async (dispatch) => {
  dispatch({ type: FETCH_RAZGOVOR_DETAIL_REQUEST });
  try {
    const languageId = mapLanguageCodeToId(language);
    const response = await api.get(
      `/api/razgovori/detail/${id}`
    );
    dispatch({ type: FETCH_RAZGOVOR_DETAIL_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_RAZGOVOR_DETAIL_FAILURE, payload: error.message });
  }
};

export const fetchRazgovori = (languageId) => async (dispatch) => {
  dispatch({ type: FETCH_RAZGOVORI_REQUEST });
  try {
    const response = await api.get(`/api/razgovori/language/${languageId}`);
    dispatch({
      type: FETCH_RAZGOVORI_SUCCESS,
      payload: response.data.data || [],
    });
  } catch (error) {
    dispatch({
      type: FETCH_RAZGOVORI_FAILURE,
      payload: error.message,
    });
  }
};

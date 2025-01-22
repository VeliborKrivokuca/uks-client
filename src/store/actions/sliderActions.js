import api from "../../services/api";

export const FETCH_SLIDER_REQUEST = "FETCH_SLIDER_REQUEST";
export const FETCH_SLIDER_SUCCESS = "FETCH_SLIDER_SUCCESS";
export const FETCH_SLIDER_FAILURE = "FETCH_SLIDER_FAILURE";

export const fetchSlider = () => async (dispatch) => {
  dispatch({ type: FETCH_SLIDER_REQUEST });
  try {
    const response = await api.get(`/api/slider/get/all`);
    dispatch({
      type: FETCH_SLIDER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_SLIDER_FAILURE,
      payload: error.message,
    });
  }
};

// tribineActions.js
import api from "../../services/api";
import { mapLanguageCodeToId } from "../../services/languageUtils";

// Action Types
export const FETCH_TRIBINES_REQUEST = "FETCH_TRIBINES_REQUEST";
export const FETCH_TRIBINES_SUCCESS = "FETCH_TRIBINES_SUCCESS";
export const FETCH_TRIBINES_FAILURE = "FETCH_TRIBINES_FAILURE";

export const FETCH_TRIBINE_DETAIL_REQUEST = "FETCH_TRIBINE_DETAIL_REQUEST";
export const FETCH_TRIBINE_DETAIL_SUCCESS = "FETCH_TRIBINE_DETAIL_SUCCESS";
export const FETCH_TRIBINE_DETAIL_FAILURE = "FETCH_TRIBINE_DETAIL_FAILURE";

export const SET_ACTIVE_TAB = "SET_ACTIVE_TAB";
export const SET_ACTIVE_GALLERY_IMAGES = "SET_ACTIVE_GALLERY_IMAGES";

/**
 * Initiates the request to fetch all tribines based on the selected language.
 * @param {string} language - Language code (e.g., 'en', 'fr', 'de').
 */
export const fetchTribines = (language) => async (dispatch) => {
  dispatch({ type: FETCH_TRIBINES_REQUEST });

  try {
    const languageId = mapLanguageCodeToId(language);
    const response = await api.get(`/api/tribine/language/${languageId}`);

    dispatch({
      type: FETCH_TRIBINES_SUCCESS,
      payload: response?.data?.data || [],
    });
  } catch (error) {
    // In a more robust application, you might inspect error.response, etc.
    dispatch({
      type: FETCH_TRIBINES_FAILURE,
      payload: error.message || "Unable to fetch tribines.",
    });
  }
};

/**
 * Initiates the request to fetch detailed information about a specific tribine.
 * @param {number|string} id - The tribine identifier.
 * @param {string} language - Language code (e.g., 'en', 'fr', 'de').
 */
export const fetchTribineDetail = (id, language) => async (dispatch) => {
  dispatch({ type: FETCH_TRIBINE_DETAIL_REQUEST });

  try {
    const languageId = mapLanguageCodeToId(language);
    const response = await api.get(`/api/tribine/detail/${id}/${languageId}`);

    dispatch({
      type: FETCH_TRIBINE_DETAIL_SUCCESS,
      payload: response?.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_TRIBINE_DETAIL_FAILURE,
      payload: error.message || "Unable to fetch tribine detail.",
    });
  }
};

/**
 * Sets the currently active tab in the tribine detail.
 * @param {string} tabId - The tab identifier (e.g., "section-0", "gallery-10").
 */
export const setActiveTab = (tabId) => ({
  type: SET_ACTIVE_TAB,
  payload: tabId,
});

/**
 * Sets the currently active gallery images in the tribine detail.
 * @param {Array} images - An array of image objects.
 */
export const setActiveGalleryImages = (images) => ({
  type: SET_ACTIVE_GALLERY_IMAGES,
  payload: images,
});

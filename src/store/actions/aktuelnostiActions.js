import api from "../../services/api";
import { mapLanguageCodeToId } from "../../services/languageUtils";

export const FETCH_BLOGS_REQUEST = "FETCH_BLOGS_REQUEST";
export const FETCH_BLOGS_SUCCESS = "FETCH_BLOGS_SUCCESS";
export const FETCH_BLOGS_FAILURE = "FETCH_BLOGS_FAILURE";
export const FETCH_BLOG_DETAILS_REQUEST = "FETCH_BLOG_DETAILS_REQUEST";
export const FETCH_BLOG_DETAILS_SUCCESS = "FETCH_BLOG_DETAILS_SUCCESS";
export const FETCH_BLOG_DETAILS_FAILURE = "FETCH_BLOG_DETAILS_FAILURE";
export const FETCH_BLOG_IMAGES_REQUEST = "FETCH_BLOG_IMAGES_REQUEST";
export const FETCH_BLOG_IMAGES_SUCCESS = "FETCH_BLOG_IMAGES_SUCCESS";
export const FETCH_BLOG_IMAGES_FAILURE = "FETCH_BLOG_IMAGES_FAILURE";

export const fetchBlogDetails = (id) => async (dispatch) => {
  dispatch({ type: FETCH_BLOG_DETAILS_REQUEST });
  try {
    const response = await api.get(`/api/blogs/${id}`);
    dispatch({ type: FETCH_BLOG_DETAILS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_BLOG_DETAILS_FAILURE, payload: error.message });
  }
};

export const fetchBlogImages = (id) => async (dispatch) => {
  dispatch({ type: FETCH_BLOG_IMAGES_REQUEST });
  try {
    const response = await api.get(`/api/blogs/${id}/images`);
    dispatch({ type: FETCH_BLOG_IMAGES_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_BLOG_IMAGES_FAILURE, payload: error.message });
  }
};

export const fetchBlogs = (language) => async (dispatch) => {
  dispatch({ type: FETCH_BLOGS_REQUEST });
  try {
    const languageId = mapLanguageCodeToId(language);
    const response = await api.get(`/api/aktuelnosti/get/all/${languageId}`);
    const sortedBlogs = response.data
      .sort((a, b) => new Date(b.publish_time) - new Date(a.publish_time))
      .slice(0, 2); // Fetch the latest 2 blogs
    dispatch({ type: FETCH_BLOGS_SUCCESS, payload: sortedBlogs });
  } catch (error) {
    dispatch({ type: FETCH_BLOGS_FAILURE, payload: error.message });
  }
};

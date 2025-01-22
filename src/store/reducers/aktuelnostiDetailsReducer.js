import {
  FETCH_BLOG_DETAILS_REQUEST,
  FETCH_BLOG_DETAILS_SUCCESS,
  FETCH_BLOG_DETAILS_FAILURE,
  FETCH_BLOG_IMAGES_REQUEST,
  FETCH_BLOG_IMAGES_SUCCESS,
  FETCH_BLOG_IMAGES_FAILURE,
} from "../actions/aktuelnostiActions";

const initialState = {
  loading: false,
  blog: null,
  images: [],
  error: null,
};

const aktuelnostiDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BLOG_DETAILS_REQUEST:
    case FETCH_BLOG_IMAGES_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_BLOG_DETAILS_SUCCESS:
      return { ...state, loading: false, blog: action.payload };
    case FETCH_BLOG_IMAGES_SUCCESS:
      return { ...state, loading: false, images: action.payload };
    case FETCH_BLOG_DETAILS_FAILURE:
    case FETCH_BLOG_IMAGES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default aktuelnostiDetailsReducer;

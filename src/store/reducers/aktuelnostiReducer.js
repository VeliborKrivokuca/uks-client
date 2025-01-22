import {
  FETCH_BLOGS_REQUEST,
  FETCH_BLOGS_SUCCESS,
  FETCH_BLOGS_FAILURE,
} from "../actions/aktuelnostiActions";

const initialState = {
  loading: false,
  blogs: [],
  error: null,
};

const aktuelnostiReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BLOGS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_BLOGS_SUCCESS:
      return { ...state, loading: false, blogs: action.payload };
    case FETCH_BLOGS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default aktuelnostiReducer;

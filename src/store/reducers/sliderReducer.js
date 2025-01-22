import {
  FETCH_SLIDER_REQUEST,
  FETCH_SLIDER_SUCCESS,
  FETCH_SLIDER_FAILURE,
} from "../actions/sliderActions";

const initialState = {
  loading: false,
  slides: [],
  error: null,
};

const sliderReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SLIDER_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_SLIDER_SUCCESS:
      return { ...state, loading: false, slides: action.payload };
    case FETCH_SLIDER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default sliderReducer;

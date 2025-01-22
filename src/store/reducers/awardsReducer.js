import {
  FETCH_AWARDS_REQUEST,
  FETCH_AWARDS_SUCCESS,
  FETCH_AWARDS_FAILURE,
} from "../actions/awardsActions";

const initialState = {
  loading: false,
  awards: [],
  error: null,
};

const awardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_AWARDS_REQUEST:
      return { ...state, loading: true };
    case FETCH_AWARDS_SUCCESS:
      return { ...state, loading: false, awards: action.payload };
    case FETCH_AWARDS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default awardsReducer;

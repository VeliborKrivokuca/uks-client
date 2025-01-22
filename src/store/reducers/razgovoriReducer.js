import {
  FETCH_RAZGOVORI_REQUEST,
  FETCH_RAZGOVORI_SUCCESS,
  FETCH_RAZGOVORI_FAILURE,
  FETCH_RAZGOVOR_DETAIL_REQUEST,
  FETCH_RAZGOVOR_DETAIL_SUCCESS,
  FETCH_RAZGOVOR_DETAIL_FAILURE,
} from "../actions/razgovoriActions";

const initialState = {
  razgovori: [],
  loading: false,
  error: null,
};

const razgovoriReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RAZGOVORI_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_RAZGOVORI_SUCCESS:
      return { ...state, loading: false, razgovori: action.payload };
    case FETCH_RAZGOVORI_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case FETCH_RAZGOVOR_DETAIL_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_RAZGOVOR_DETAIL_SUCCESS:
      return { ...state, loading: false, razgovor: action.payload };
    case FETCH_RAZGOVOR_DETAIL_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default razgovoriReducer;

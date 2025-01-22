import {
  FETCH_MEMBERS_REQUEST,
  FETCH_MEMBERS_SUCCESS,
  FETCH_MEMBERS_FAILURE,
  FETCH_ROLES_REQUEST,
  FETCH_ROLES_SUCCESS,
  FETCH_ROLES_FAILURE,
  SET_SELECTED_MEMBER,
  FETCH_MEMBER_DETAIL_REQUEST,
  FETCH_MEMBER_DETAIL_SUCCESS,
  FETCH_MEMBER_DETAIL_FAILURE,
} from "../actions/membersActions";

const initialState = {
  loading: false,
  members: [],
  roles: [],
  selectedMember: null,
  error: null,
};

const membersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MEMBERS_REQUEST:
    case FETCH_ROLES_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_MEMBERS_SUCCESS:
      return { ...state, loading: false, members: action.payload };

    case FETCH_ROLES_SUCCESS:
      return { ...state, loading: false, roles: action.payload };

    case FETCH_MEMBERS_FAILURE:
    case FETCH_ROLES_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case SET_SELECTED_MEMBER:
      return { ...state, selectedMember: action.payload };
    case FETCH_MEMBER_DETAIL_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_MEMBER_DETAIL_SUCCESS:
      return { ...state, loading: false, memberDetail: action.payload };

    case FETCH_MEMBER_DETAIL_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default membersReducer;

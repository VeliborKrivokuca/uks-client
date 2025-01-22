import {
  FETCH_TRIBINES_REQUEST,
  FETCH_TRIBINES_SUCCESS,
  FETCH_TRIBINES_FAILURE,
  FETCH_TRIBINE_DETAIL_REQUEST,
  FETCH_TRIBINE_DETAIL_SUCCESS,
  FETCH_TRIBINE_DETAIL_FAILURE,
  SET_ACTIVE_TAB,
  SET_ACTIVE_GALLERY_IMAGES,
} from "../actions/tribineActions";

const initialState = {
  loading: false,
  tribines: [],
  error: null,
  tribineDetail: {
    loading: false,
    tribine: null,
    activeTab: null,
    activeGalleryImages: [],
    error: null,
  },
};

const tribineReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TRIBINES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_TRIBINES_SUCCESS:
      return {
        ...state,
        loading: false,
        tribines: action.payload,
      };

    case FETCH_TRIBINES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case FETCH_TRIBINE_DETAIL_REQUEST:
      return {
        ...state,
        tribineDetail: {
          ...state.tribineDetail,
          loading: true,
          error: null,
        },
      };

    case FETCH_TRIBINE_DETAIL_SUCCESS: {
      const { contents = [], galleries = [] } = action.payload || {};

      return {
        ...state,
        tribineDetail: {
          ...state.tribineDetail,
          loading: false,
          tribine: {
            ...action.payload,
            contents,
            galleries,
          },
          activeTab: contents.length
            ? "section-0"
            : galleries.length
            ? `gallery-${galleries[0].id}`
            : null,

          activeGalleryImages: galleries[0]?.images || [],
        },
      };
    }

    case FETCH_TRIBINE_DETAIL_FAILURE:
      return {
        ...state,
        tribineDetail: {
          ...state.tribineDetail,
          loading: false,
          error: action.payload,
        },
      };

    case SET_ACTIVE_TAB:
      return {
        ...state,
        tribineDetail: {
          ...state.tribineDetail,
          activeTab: action.payload,
        },
      };

    case SET_ACTIVE_GALLERY_IMAGES:
      return {
        ...state,
        tribineDetail: {
          ...state.tribineDetail,
          activeGalleryImages: action.payload,
        },
      };

    default:
      return state;
  }
};

export default tribineReducer;

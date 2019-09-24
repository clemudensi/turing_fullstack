import {
  SEARCH_PRODUCT_SUCCESS,
  SEARCH_PRODUCT_EMPTY,
  SEARCH_PRODUCT_ERROR,
} from '../actions/search_products';

export default (
  state = [],
  action,
) => {
  switch (action.type) {
  case SEARCH_PRODUCT_SUCCESS:
    return {
      state,
      loading: false,
      data: action.data,
    };
  case SEARCH_PRODUCT_EMPTY:
    return {
      state,
      loading: false,
      data: action.data,
      error: null,
    };
  case SEARCH_PRODUCT_ERROR:
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  default:
    return state;
  }
};

import {
  FETCH_PRODUCTS_SUCCESS,
  PRODUCTS_CHECK,
  PRODUCTS_EMPTY,
  PRODUCTS_ERROR,
  ADD_PRODUCT_ERROR,
  ADD_PRODUCT_SUCCESS,
  FETCH_PRODUCT_SUCCESS,
  PRODUCT_INFO_CHECK,
  PRODUCT_INFO_EMPTY,
  PRODUCT_INFO_ERROR
} from '../actions/products';

export default (
  state = {
    loading: false, error: false, data: [], products: [], total: '',
  },
  action,
) => {
  switch (action.type) {
    case PRODUCTS_CHECK:
      return { ...state, loading: true };
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        products: action.data.products || [],
        total: action.data.total,
      };
    case PRODUCTS_EMPTY:
      return {
        ...state,
        loading: false,
        data: [],
        error: null,
      };
    case PRODUCTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        data: action.data,
        msg: 'Your have successfully added a product',
        error: null
      };
    case ADD_PRODUCT_ERROR:
      return {
        ...state,
        error: action.error
      };
    case PRODUCT_INFO_CHECK:
      return { ...state, loading: true };
    case FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
      };
    case PRODUCT_INFO_EMPTY:
      return {
        ...state,
        loading: false,
        data: {},
        error: null,
      };
    case PRODUCT_INFO_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

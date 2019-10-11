import axios from 'axios';
import { PRODUCTS, AXIOSCONFIG } from '../constants';

export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const PRODUCTS_CHECK = 'PRODUCTS_CHECK';
export const PRODUCTS_EMPTY = 'PRODUCTS_EMPTY';
export const PRODUCTS_ERROR = 'PRODUCTS_ERROR';
export const FETCH_PRODUCT_SUCCESS = 'FETCH_PRODUCT_SUCCESS';
export const PRODUCT_INFO_CHECK = 'PRODUCT_INFO_CHECK';
export const PRODUCT_INFO_EMPTY = 'PRODUCT_INFO_EMPTY';
export const PRODUCT_INFO_ERROR = 'PRODUCT_INFO_ERROR';
export const ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS';
export const ADD_PRODUCT_ERROR = 'ADD_PRODUCT_ERROR';


export const fetchProducts = (page, category) => async (dispatch) => {
  let URL = '';
  const { pathname } = window.location;
  pathname === '/'
    ? URL = `${PRODUCTS}/products/hottest`
    : URL = `${PRODUCTS}/products?page=${page}&category=${category}`;
  dispatch({ type: PRODUCTS_CHECK });
  try {
    const { data } = await axios.get(URL);
    if (data.length === 0) {
      return dispatch({
        type: PRODUCTS_EMPTY,
        status: 'No products available for this page',
        page,
      });
    }
    dispatch({ type: FETCH_PRODUCTS_SUCCESS, data });
  } catch (error) {
    dispatch({
      type: PRODUCTS_ERROR,
      error: `Sorry products for ${page} not found`,
    });
  }
};


export const fetchProduct = (product_id) => async (dispatch) => {

  let URL = `${PRODUCTS}/product/${product_id}`;

  dispatch({ type: PRODUCT_INFO_CHECK });
  try {
    const { data } = await axios.get(URL);
    if (data === {}) {
      return dispatch({
        type: PRODUCT_INFO_EMPTY,
        status: 'Product does not exist',
      });
    }
    dispatch({ type: FETCH_PRODUCT_SUCCESS, data });
  } catch (error) {
    dispatch({
      type: PRODUCT_INFO_ERROR,
      error: `Sorry product with ${product_id} is not found`,
    });
  }
};

export const addProduct = (
  name,
  categories,
  description,
  attributes,
  price,
  discounted_price
) => async (dispatch) => {
  const URL = `${PRODUCTS}/product`;
  try {
    const {data} = await axios.post(URL, {
      name,
      categories,
      description,
      attributes,
      price,
      discounted_price
    },
      AXIOSCONFIG
    );
    await dispatch({
      type: ADD_PRODUCT_SUCCESS,
      data
    });
  } catch (error) {
    dispatch({
      type: ADD_PRODUCT_ERROR,
      msg: 'There was an error adding a new product',
      error
    });
  }
};
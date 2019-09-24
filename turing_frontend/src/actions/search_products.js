import axios from 'axios';
import { PRODUCTS } from '../constants';

export const SEARCH_PRODUCT_SUCCESS = 'SEARCH_PRODUCT_SUCCESS';
export const SEARCH_PRODUCT_EMPTY = 'SEARCH_PRODUCT_EMPTY';
export const SEARCH_PRODUCT_ERROR = 'SEARCH_PRODUCT_ERROR';

export const searchProducts = (searchQuery) => async (dispatch) => {

  let URL = `${PRODUCTS}/products/search?searchQuery=${searchQuery}`;
  try {
    const { data } = await axios.get(URL);
    if (data === []) {
      await dispatch({
        type: SEARCH_PRODUCT_EMPTY,
        status: 'Product does not exist',
      });
    }
    await dispatch({ type: SEARCH_PRODUCT_SUCCESS, data });
  } catch (error) {
    dispatch({
      type: SEARCH_PRODUCT_ERROR,
      msg: `Sorry an error occurred`,
      error
    });
  }
};

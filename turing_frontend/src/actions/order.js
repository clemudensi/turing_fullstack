import axios from 'axios';
import {PRODUCTS, AXIOSCONFIG} from '../constants';

export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const DELETE_ORDER_SUCCESS = 'DELETE_ORDER_SUCCESS';
export const CREATE_ORDER_ERROR = 'CREATE_ORDER_ERROR';

const URL = `${PRODUCTS}/orders`;

export const createOrder = (orders, shipping_id, tax_id) => async (dispatch) => {
  try {
    const {data} = await axios.post(URL, {orders, shipping_id, tax_id},
      AXIOSCONFIG
    );
    dispatch({
      type: CREATE_ORDER_SUCCESS,
      data
    });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_ERROR,
      msg: 'There was an error creating order',
      error
    });
  }
};

const deleteOrderSuccess = order => ({
  type: DELETE_ORDER_SUCCESS,
  order
});


export const deleteOrder = (order_id) => {
  try {
    return async dispatch => {
      const {response} = await axios.delete(`${PRODUCTS}/orders?order_id=${order_id}`, AXIOSCONFIG);
      dispatch(deleteOrderSuccess(response));
    };
  } catch(err) {
    return err;
  }
};
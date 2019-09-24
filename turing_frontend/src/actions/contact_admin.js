import axios from 'axios';
import { PRODUCTS } from '../constants';

export const CONTACT_ADMIN_SUCCESS = 'CONTACT_ADMIN_SUCCESS';
export const CONTACT_ADMIN_ERROR = 'CONTACT_ADMIN_ERROR';


export const contactAdmin = (email, text) => async (dispatch) => {
  try{
    const {data} = axios.post(`${PRODUCTS}/contact/email`, {
      email, text
    });
    await dispatch({
      type: CONTACT_ADMIN_SUCCESS,
      data
    })
  } catch (error) {
    dispatch({
      type: CONTACT_ADMIN_ERROR,
      error
    })
  }
};

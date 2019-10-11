import axios from 'axios';
import { PAYMENT } from '../constants';

export const CONTACT_ADMIN_SUCCESS = 'IMAGE_UPLOAD_SUCCESS';
export const CONTACT_ADMIN_ERROR = 'CONTACT_ADMIN_ERROR';


export const contactAdmin = (firstName, lastName, email, message) => async (dispatch) => {
  try{
    const {data} = await axios.post(`${PAYMENT}/email/contact`, {
      firstName, lastName, email, message
    });
    dispatch({
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

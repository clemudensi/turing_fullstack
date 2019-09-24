import axios from 'axios';
import { PRODUCTS } from '../constants';
import loginCreator from '../util/loginCreator';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGIN_ERROR = 'LOGIN_ERROR';


export const userLogin = (email, password) => {
  return async (dispatch) => {
    let URL = `${PRODUCTS}/customer/login`;
    try {
      const {data} = await axios.post(URL, {
        email,
        password
      });
      await loginCreator(dispatch, data, LOGIN_SUCCESS, LOGIN_FAILED, LOGIN_ERROR)
    } catch (error) {
      await dispatch({
        type: LOGIN_ERROR,
        error,
        msg: 'Could not login successfully',
      });
    }
  };
};
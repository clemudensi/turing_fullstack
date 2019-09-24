import axios from 'axios';
import { PRODUCTS } from '../constants';
import loginCreator from '../util/loginCreator';

export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILED = 'SIGNUP_FAILED';
export const SIGNUP_ERROR = 'SIGNUP_ERROR';

const URL = `${PRODUCTS}/customer`;

export const signUp = (
  inEmail,
  inPassword,
  inName
) => async (dispatch) => {
  try {
    const {data} = await axios.post(`${URL}`, {
      inEmail,
      inPassword,
      inName
    });
    await loginCreator(dispatch, data, SIGNUP_SUCCESS, SIGNUP_FAILED, SIGNUP_ERROR)
  } catch (err) {
    await dispatch({
      type: SIGNUP_ERROR,
      msg: 'There was a problem creating a user',
      err
    })
  }
};

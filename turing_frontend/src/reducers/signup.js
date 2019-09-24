import {
  SIGNUP_ERROR,
  SIGNUP_FAILED,
  SIGNUP_SUCCESS
} from '../actions/signup';

export default (state = { data: false}, action ) => {
  switch (action.type) {
  case SIGNUP_SUCCESS:
    return {
      state,
      data: action.data,
      token: action.token,
      msg: 'Your have successfully signed up',
      error: null
    };
  case SIGNUP_FAILED:
    return {
      state,
      data: action.data,
    };
  case SIGNUP_ERROR:
    return {
      state,
      error: action.error
    };
  default:
    return state;
  }
};
import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGIN_ERROR,
} from '../actions/login';

export default (state = { data: false}, action) => {
  switch (action.type) {
  case LOGIN_SUCCESS:
    return {
      state,
      data: action.data,
      token: action.token,
      error: null
    };
  case LOGIN_FAILED:
    return {
      state,
      data: action.data,
    };
  case LOGIN_ERROR:
    return {
      state,
      error: action.error
    };
  default:
    return state;
  }
};
import {
  CONTACT_ADMIN_SUCCESS,
  CONTACT_ADMIN_ERROR
} from '../actions/contact_admin';

export default (state={}, action) => {
  switch (action.type) {
  case CONTACT_ADMIN_SUCCESS:
    return {
      state,
      data: action.data
    };
  case CONTACT_ADMIN_ERROR:
    return {
      state,
      error: action.error
    };
  default:
    return state;
  }
};

import {
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_ERROR,
  DELETE_ORDER_SUCCESS
} from '../actions/order';

export default (state = {error: false, data: {}}, action ) => {
  switch (action.type) {
  case CREATE_ORDER_SUCCESS:
    return {
      ...state,
      data: action.data,
      msg: 'Your have successfully created an Order',
      error: null
    };
  case CREATE_ORDER_ERROR:
    return {
      ...state,
      error: action.error
    };
  case DELETE_ORDER_SUCCESS:
    return {
      ...state,
      data: action.data,
      msg: 'Your have deleted an Order',
      error: null
    };
  default:
    return state
  }
}
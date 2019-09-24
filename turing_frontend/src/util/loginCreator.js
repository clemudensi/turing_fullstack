const loginCreator = async (dispatch, data, SUCCESS, FAILED, ERROR) => {
  switch (data.success) {
    case true:
      await dispatch({
        type: SUCCESS,
        data,
        token: data.customer.accessToken
      });
      await sessionStorage.setItem('accessToken', data.customer.accessToken);
      await localStorage.setItem('username', data.customer.schema.email);
      await localStorage.setItem('user_id', data.customer.schema.customer_id);
      break;
    case false:
      await dispatch({
        type: FAILED,
        data
      });
      break;
    default:
      await dispatch({
        type: ERROR,
        msg: 'Could not login successfully',
      });
  }
};

export default loginCreator;

import {
  IMAGE_UPLOAD_SUCCESS,
  IMAGE_UPLOAD_ERROR
} from '../actions/upload_image';

export default (state={ data: '' }, action) => {
  switch (action.type) {
  case IMAGE_UPLOAD_SUCCESS:
    return {
      state,
      data: action.data,
      loading: false,
      msg: 'Image was uploaded successfully'
    };
  case IMAGE_UPLOAD_ERROR:
    return {
      state,
      error: action.error
    };
  default:
    return state;
  }
};

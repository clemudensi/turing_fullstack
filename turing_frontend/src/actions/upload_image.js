import axios from 'axios';
import { PAYMENT } from '../constants';

export const IMAGE_UPLOAD_SUCCESS = 'IMAGE_UPLOAD_SUCCESS';
export const IMAGE_UPLOAD_ERROR = 'IMAGE_UPLOAD_ERROR';


export const uploadImage = (formData) => async (dispatch) => {
  try{
  const {data} = await axios.post(`${PAYMENT}/image/upload`, formData);
    dispatch({
      type: IMAGE_UPLOAD_SUCCESS,
      data
    });
    await localStorage.setItem('image_url', data.url);
  } catch (error) {
    dispatch({
      type: IMAGE_UPLOAD_ERROR,
      error
    })
  }
};


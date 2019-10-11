import { combineReducers } from 'redux';
import products from './products';
import user_login from './login';
import signup from './signup';
import search_products from './search_products';
import contact_admin from './contact_admin';
import create_order from './order';
import upload_image from './upload_image';

export default combineReducers({
  products,
  user_login,
  signup,
  search_products,
  contact_admin,
  create_order,
  upload_image
});

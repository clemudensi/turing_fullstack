import { combineReducers } from 'redux';
import products from './products';
// import product from './product';
import user_login from './user_login';
// import add_product from './add_products';
import signup from './signup';
import search_products from './search_products';
import contact_admin from './contact_admin';
import create_order from './order';


export default combineReducers({
  products,
  // product,
  user_login,
  // add_product,
  signup,
  search_products,
  contact_admin,
  create_order
});

/* eslint-disable linebreak-style */
import productsRoutes from './productDetail';
import productCategory from './productCategory';
import authRoutes from './auth';
import shoppingCart from './checkOut';
import staticPages from './statticPages';

const Routes = [
  ...staticPages,
  ...authRoutes,
  ...shoppingCart,
  ...productsRoutes,
  ...productCategory
];

export default Routes;

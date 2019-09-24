import {
  AsyncAddProduct,
  AsyncProductDetailSite,
} from './products';
import React from 'react';

const productsRoutes = [
  {
    path: '/product/new', name: 'AddProduct', render: AsyncAddProduct,
  },
  {
    path: '/:department/:category/**', name: 'ProductInfo', render: props => <AsyncProductDetailSite {...props} /> ,
  },
];

export default productsRoutes;

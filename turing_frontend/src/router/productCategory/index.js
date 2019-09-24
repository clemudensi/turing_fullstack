import React from 'react';
import { AsyncProductCategory, AsyncProductDepartment } from './category';

const categoryRoutes = [
  { path: '/:category', name: 'ProductCategory', render: props => <AsyncProductCategory {...props} /> },
  { path: '/:category/**', name: 'ProductDepartment', render: props => <AsyncProductDepartment {...props} /> },
];

export default categoryRoutes;

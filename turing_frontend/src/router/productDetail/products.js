import * as React from 'react';

export const AsyncProductDetailSite = React.lazy(() => import('../../components/product/ProductDetailSite'));
export const AsyncAddProduct = React.lazy(()=> import("../../containers/AddProduct"));
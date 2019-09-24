import React from 'react';
import PropType from 'prop-types';
import map from 'lodash/map';
import ProductItem from './ProductItem';
import { DEPARTMENT } from '../../constants';

const propTypes = {
  data: PropType.arrayOf(PropType.object),
};

const ProductList = (props) => {
  const itemsProduct = map(props.data,item => (
    <ProductItem
      key={item.product_id}
      id={item.product_id}
      category={item.categories[0].name}
      department={DEPARTMENT[item.categories[0].department_id]}
      name={item.name}
      price={item.price}
      discounted_price={item.discounted_price}
      image={item.image}
    />
  ));

  return (
    <div id="product-list">
      {itemsProduct}
    </div>
  );
};

ProductList.propTypes = propTypes;

export default ProductList;

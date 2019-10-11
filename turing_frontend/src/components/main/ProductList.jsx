import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import ProductItem from './ProductItem';
import { DEPARTMENT } from '../../constants';
import Pagination from '../../components/main/Pagination';

const ProductList = (props) => {
  const { page, activePage, currentPage,
    loading, handlePagination } = props;

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
    <div>
      <div id="product-list">
        {itemsProduct}
      </div>
      <div id="product-list">
        <Pagination
          page={page}
          activePage={activePage}
          currentPage={currentPage}
          loading={loading}
          handlePagination={handlePagination}
        />
      </div>
    </div>
  );
};

ProductList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  page: PropTypes.number,
  activePage: PropTypes.number,
  currentPage: PropTypes.number,
  loading: PropTypes.bool,
  handlePagination: PropTypes.func,
};

export default ProductList;

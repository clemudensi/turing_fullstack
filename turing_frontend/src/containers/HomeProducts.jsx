import React, { useState, useEffect } from 'react';
import {Grid, Button, Container, Card} from 'semantic-ui-react';
import { connect } from 'react-redux';
import map from 'lodash/map'
import { fetchProducts } from '../actions/products';
import ShowcaseHeader from '../components/header/ShowcaseHeader';
import ProductItem from '../components/main/ProductItem';
import '../assets/style/product.scss';
import PageLoader from '../util/PageLoader';
import { DEPARTMENT } from '../constants';

const HomeProducts = (props) => {
  const { products: { data }, fetchProducts } = props;
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetchProducts();
    if (data === {} ){
      setNotFound(true)
    }
  }, [isLoadMore]);

  const handleReadMoreProduct = () =>{
    setIsLoadMore(true);
    setNotFound(false);
  };

  let hottestProduct;

  switch (isLoadMore) {
  case true:
    hottestProduct = data;
    break;
  case false:
    hottestProduct = data.splice(0, 10);
    break;
  }

  const itemsProductCard = map(hottestProduct, item => (
    <ProductItem
      key={item.product_id}
      id={item.product_id}
      category={map(item.categories, cat => cat.name)}
      department={DEPARTMENT[map(item.categories, cat => cat.department_id)]}
      {...item}
    />
  ));

  const btnLoadMore = (
    <Button
      className="load-more-btn"
      fluid
      onClick={handleReadMoreProduct}
    >
      LOAD MORE
    </Button>
  );

  const loading = () => {
    return notFound === false ? <PageLoader/> : <h2>Product not found</h2>;
  };

  return (
    <Card fluid>
      <Grid id="hot-products" textAlign="center">
        <Grid.Column width={12} id="hot-products-items">
          <ShowcaseHeader
            headerMain="HOTTEST PRODUCTS"
            headerSub="Best Collection for You"
            iconHeader="cart plus"
          />
          {
            data.length > 0 ?
              <div id="product-list">
                {itemsProductCard}
              </div> :
              <Container>
                {loading()}
              </Container>
          }
          {!isLoadMore ? btnLoadMore : ''}
        </Grid.Column>
      </Grid>
    </Card>
  );
};

HomeProducts.defaultProps = {
  products: {
    data: []
  },
};

export default connect(
  ({ products }) => ({ products }),
  { fetchProducts },
)(HomeProducts);

// export for testing component
export { ProductItem }
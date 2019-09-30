import React from 'react';
import { Route } from 'react-router-dom';
import { Card, Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import ProductInfo from '../../containers/ProductInfo';
import 'assets/style/product.scss';

const ProductDetailSite = (props) => {
  const {
    cart,
    cartId,
    handleAddToCart,
    quantity,
    canAddToCart,
    handleChange,
    history,
    getProductId,
    handleAddOnceToCart,
    handleBackToProducts
  } = props;
  return (
    <Card fluid>
      <Card.Content>
        <Grid as="section" textAlign="center">
          <Route>
            {({ location }) => (
              <ProductInfo
                location={location}
                handleAddToCart={handleAddToCart}
                cart={cart}
                cartId={cartId}
                quantity={quantity}
                canAddToCart={canAddToCart}
                handleChange={handleChange}
                history={history}
                handleAddOnceToCart={handleAddOnceToCart}
                handleBackToProducts={handleBackToProducts}
                getProductId={getProductId}
              />
            )}
          </Route>
        </Grid>
      </Card.Content>
    </Card>
  );
};

ProductDetailSite.propTypes = {
  handleAddToCart: PropTypes.func,
  cart: PropTypes.array,
  cartId: PropTypes.string,
  quantity: PropTypes.string,
  canAddToCart: PropTypes.bool,
  addingToCart: PropTypes.bool,
  history: PropTypes.object,
  handleChange: PropTypes.func,
  getProductId: PropTypes.func,
  handleAddOnceToCart: PropTypes.func,
  handleBackToProducts: PropTypes.func
};

export default ProductDetailSite;

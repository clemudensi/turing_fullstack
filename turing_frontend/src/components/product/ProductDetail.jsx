import React from 'react';
import { Button, Icon, Tab, Popup } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const Delivery = (props) => (
  <Tab.Pane>
    Delivery: Shipping is available to residential address or other address Provided, in accordance with your selected delivery option. Payment: We accept card payments via MasterCard and Visa.
  </Tab.Pane>
);

const ProductDetail = (props) => {
  const panes = [
    { menuItem: 'DESCRIPTION', render: () => <Tab.Pane>{props.dataDes}</Tab.Pane> },
    { menuItem: 'DETAILS', render: () => <Tab.Pane>NO DETAIL</Tab.Pane> },
    { menuItem: 'SHARE', render: () => <Tab.Pane>NO SHARE</Tab.Pane> },
    { menuItem: 'DELIVERY', render: () => <Delivery/> },
  ];

  let {
    cartId,
    proInfo,
    hasSelected,
    canAddToCart,
    handleAddToCart,
    handleAddOnceToCart,
    handleBackToProducts,
    history
  } = props;

  const btnAddToCart = (
    <Button as='button' disabled={!canAddToCart} className='add-to-cart'
      // loading={addingToCart}
      icon onClick={()=>{
        if (!hasSelected || !canAddToCart && cartId !== '') return;
        handleAddToCart(proInfo);
        handleAddOnceToCart();
      }}
    >
      <Icon name='shopping bag' />
      ADD TO SHOPPING CART
    </Button>
  );

  return(
    <div className="product-detail">
      <span className='delivers'>Delivers in: <strong>1-7 working days</strong></span>
      {
        canAddToCart ?
          <Popup
            trigger={btnAddToCart}
            content={hasSelected?'Adding product to the shopping cart, proceed to checkout after completion.':'Color and size must be selected.'}
            on='click'
            hideOnScroll
            inverted
          /> :
          <span >
            <Button as="li" className='add-to-cart' onClick={handleBackToProducts}>
              BACK TO PRODUCTS
            </Button>
            <Button as='li' className='save-as-favourite' icon
              onClick={()=>{
                localStorage.removeItem('orderItems');
                history.push('/checkout');
              }}
            >
              <Icon name='cart'/>
              CHECKOUT
            </Button>
          </span>

      }

      <Button as='button' className='save-as-favourite' icon>
        <Icon name='heart'/>
        SAVE AS FAVOURITE
      </Button>
      <Tab menu={{ attached: 'top' }} panes={panes} />
    </div>
  );
};

ProductDetail.propTypes = {
  dataDes: PropTypes.string,
  cartId: PropTypes.string,
  proInfo: PropTypes.object,
  canAddToCart: PropTypes.bool,
  hasSelected: PropTypes.bool,
  history: PropTypes.object,
  handleAddToCart: PropTypes.func,
  handleAddOnceToCart: PropTypes.func,
  handleBackToProducts: PropTypes.func
};

export default ProductDetail;
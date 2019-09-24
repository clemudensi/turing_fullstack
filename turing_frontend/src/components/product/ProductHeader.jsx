import React from 'react';
import {Header} from 'semantic-ui-react';
import PropTypess from 'prop-types';

const ProductHeader = (props) => {
  const {
    name,
    salePrice,
    price
  } = props;

  let clsPrice = '',originValue,actualValue;

  if (!price) {
    actualValue = '$' + salePrice;
    originValue = null;
    clsPrice = 'common';
  }else{
    actualValue = '$' + salePrice;
    originValue = '$' + price;
    clsPrice = 'discount';
  }

  return(
    <div>
      <hgroup>
        <Header as='h2' content={name}/>
        <h3 className="product-price">
          <span className={clsPrice}>{actualValue}</span><span>{originValue}</span>
        </h3>
      </hgroup>
    </div>
  );
};

ProductHeader.propTypes = {
  name: PropTypess.string,
  salePrice: PropTypess.number,
  price: PropTypess.number
};

export default ProductHeader;
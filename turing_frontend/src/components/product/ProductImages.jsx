import React from 'react';
import { Image } from 'semantic-ui-react';

const ProductImages = (props) => (
  <div className="product-image-container">
    <Image src={props.img} fluid />
  </div>
);

export default ProductImages;
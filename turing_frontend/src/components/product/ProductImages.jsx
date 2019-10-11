import React from 'react';
import { Image } from 'semantic-ui-react';

const ProductImages = (props) => (
  <Image src={props.img} fluid/>
);

export default ProductImages;
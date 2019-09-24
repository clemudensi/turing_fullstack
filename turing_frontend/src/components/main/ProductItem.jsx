import React from 'react';
import {Link, Route, Switch } from 'react-router-dom';
import PropType from 'prop-types';
import { Card, Icon, Image } from 'semantic-ui-react';
import {IMAGE} from '../../constants';

const propTypes = {
  id: PropType.number,
  category: PropType.string,
  department: PropType.string,
  type: PropType.string,
  name: PropType.string,
  price: PropType.number,
  image: PropType.string,
  discounted_price: PropType.number
};

const ProductItem = (props) => {
  const {
    id,
    category,
    department,
    name,
    price,
    image,
    discounted_price,
  } = props;
  return (
    <Card className="product-info">
      <Switch>
        <Route>
          <Link to={`/${department}/${category}/${id}`}>
            <Image className="pro-images" src={`${IMAGE}/${image}`} />
          </Link>
          <Card.Content className="pro-info">
            <Card.Header as="h4">
              <Link to={`/${department}/${category}/${id}`}>
                {name}
              </Link>
            </Card.Header>
            <Card.Meta>
              <span className="market-price">
            $
                { price }
              </span>
              <span className="sale-price">
            $
                {discounted_price}
              </span>
            </Card.Meta>
          </Card.Content>
          <Card.Content extra className="pro-tool">
            <a className="add-wishlist">
              <Icon name="heart" />
              Add Wishlist
            </a>
            <Link to={`/${department}/${category}/${id}`} className="add-cart">
              <Icon name="shop" />
              Add Cart
            </Link>
          </Card.Content>
        </Route>
      </Switch>
    </Card>
  );
};

ProductItem.propTypes = propTypes;

export default ProductItem;

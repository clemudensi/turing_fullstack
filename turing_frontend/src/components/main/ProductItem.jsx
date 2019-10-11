import React from 'react';
import {Link, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card, Icon, Image } from 'semantic-ui-react';
import {IMAGE} from '../../constants';

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

ProductItem.propTypes = {
  id: PropTypes.number,
  category: PropTypes.array,
  department: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  image: PropTypes.string,
  discounted_price: PropTypes.number
};

export default ProductItem;

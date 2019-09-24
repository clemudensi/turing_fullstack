import React, {useState, Component } from 'react';
import { Header, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const ProductColor = (props) => {
  const {
    dataColor,
    selectedColor,
    handleSelectColor,
  } = props;
  const [clsActive, setClsActive] = useState('')

  const activeColor = (color) => {
    setClsActive(color);
  };

  const itemsColorBtn = dataColor.map((item, index) => (
    <Button
      as="li"
      disabled={false}
      key={index}
      className={clsActive === item ? 'selected' : ''}
      color={item}
      onClick={() => {
        handleSelectColor(item);
        activeColor(item);
      }}
    />
  ));

  return (
    <div className="product-color">
      <Header as="h4">
        Color:
        {' '}
        <span>{selectedColor}</span>
      </Header>
      <Button.Group as="ul" size="small">
        {itemsColorBtn}
      </Button.Group>
    </div>
  );
};

ProductColor.propTypes = {
  dataColor: PropTypes.array,
  selectedColor: PropTypes.string,
  handleSelectColor: PropTypes.func,
};

ProductColor.defaultProps = {
  dataColor: [],
  selectedColor: '',
};

export default ProductColor;

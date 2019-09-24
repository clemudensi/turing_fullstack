import React from 'react';
import { Header, Button } from 'semantic-ui-react';
import PropType from 'prop-types';

class ProductSize extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clsActive: '',
    };
    this.activeSize = this.activeSize.bind(this);
  }

  activeSize(size) {
    this.setState({
      clsActive: size,
    });
  }

  render() {
    const {
      activeSize,
    } = this;

    const {
      clsActive,
    } = this.state;

    const {
      dataSize,
      selectedSize,
      handleSelectSize,
    } = this.props;


    const itemsSizeBtn = dataSize.map((item, index) => (
      <Button
        as="li"
        key={index}
        className={clsActive === item ? 'selected' : ''}
        onClick={() => {
          handleSelectSize(item);
          activeSize(item);
        }}
      >
        {item.toUpperCase()}
      </Button>
    ));

    return (
      <div className="product-size">
        <Header as="h4">
Size:
          {' '}
          <span>{selectedSize}</span>
        </Header>
        <Button.Group as="ul">
          {itemsSizeBtn}
        </Button.Group>
        {/*<SizeGuide />*/}
      </div>
    );
  }
}

ProductSize.propTypes = {
  dataSize: PropType.array,
  selectedSize: PropType.string,
  handleSelectSize: PropType.func,
};

ProductSize.defaultProps = {
  dataSize: [],
  selectedSize: '',
};

export default ProductSize;

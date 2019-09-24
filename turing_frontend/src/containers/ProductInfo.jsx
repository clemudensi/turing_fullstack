import React, {useState, useEffect} from 'react';
import { Grid } from 'semantic-ui-react';
import _ from 'lodash';
import { connect } from 'react-redux';
import ProductImages from '../components/product/ProductImages';
import ProductHeader from '../components/product/ProductHeader';
import ProductColor from '../components/product/ProductColor';
import ProductSize from '../components/product/ProductSize';
import ProductDetail from '../components/product/ProductDetail';
import { fetchProduct } from '../actions/products';
import {IMAGE, PRODUCTS} from '../constants';
import ProductQuantity from '../components/product/ProductQuantity';
import axios from 'axios';
import PageLoader from '../util/PageLoader';


const ProductInfo = (props) => {
  let { cart } = props;
  const { fetchProduct, getProductId, handleAddOnceToCart } = props;
  const [selectedColor, setSelectedColor] = useState('Please Select Color');
  const [selectedSize, setSelectedSize] = useState('Please Select Size');
  const [notFound, setNotFound] = useState(false);
  const [cartId, setCartId] = useState('');

  const handleSelectColor = (value) =>{
    value = value.replace(/^[a-z]?/, color => color.toUpperCase());
    setSelectedColor(value);
  };

  const handleSelectSize = (value) =>{
    setSelectedSize(value.toUpperCase());
  };

  const {
    handleAddToCart,
    quantity,
    handleChange,
    history,
    products: { data },
    handleBackToProducts,
    canAddToCart,
  } = props;
  const { attribute_values } = data;

  const size = _.map(attribute_values, color => color.value.toLowerCase());
  size.splice(size.indexOf('indigo'), 1, 'pink');
  size.splice(size.indexOf('white'), 1, 'grey');
  const color = size.splice(5, 9);

  const dataProInfo = {
    id: data.product_id,
    name: data.name,
    price: data.price,
    salePrice: data.discounted_price,
    image: `${IMAGE}/${data.image}`,
    quantity: quantity,
    customer_id: localStorage.getItem('user_id'),
    color,
    size,
    des: data.description,
    reference: cartId
  };

  const proInfo = {...dataProInfo};
  Object.assign(proInfo, {color: selectedColor, size: selectedSize});

  let hasSelected = false;

  if (selectedColor !== 'Please Select Color' && selectedSize !== 'Please Select Size') {
    hasSelected = true;
  }

  const loading = () => {
    return notFound === false ? <PageLoader/> : <h2>Product not found</h2>;
  };

  useEffect(() => {
    fetchProduct(getProductId());
    const runEffect = async () => {
      const { data: { cart_id } } = await axios.get(`${PRODUCTS}/shoppingcart/generateUniqueId`);
      setCartId(cart_id);
    };
    runEffect();
    if (data === {} ){
      setNotFound(true)
    }
    handleAddOnceToCart();
  }, [cart]);

  return (
    data && cartId ?
      <Grid.Row>
        <Grid.Column width={6}>
          <ProductImages img={proInfo.image} />
        </Grid.Column>
        <Grid.Column id="product-info" width={6} textAlign="left">
          <ProductHeader
            name={dataProInfo.name}
            price={dataProInfo.price}
            salePrice={dataProInfo.salePrice}
          />
          <ProductColor
            dataColor={dataProInfo.color}
            selectedColor={selectedColor}
            handleSelectColor={handleSelectColor}
          />
          <ProductSize
            dataSize={dataProInfo.size}
            selectedSize={selectedSize}
            handleSelectSize={handleSelectSize}
          />
          <ProductQuantity
            handleChange={handleChange}
            quantity={quantity}
          />
          <ProductDetail
            dataDes={dataProInfo.des}
            canAddToCart={canAddToCart}
            hasSelected={hasSelected}
            handleAddToCart={handleAddToCart}
            handleAddOnceToCart={handleAddOnceToCart}
            proInfo={proInfo}
            cart={cart}
            history={history}
            cartId={cartId}
            handleBackToProducts={handleBackToProducts}
          />
        </Grid.Column>
      </Grid.Row> :
      loading()
  );
};

ProductInfo.defaultProps = {
  product: {
    data: false
  },
  location: {
    pathname: ''
  }
};


export default connect(
  ({ products }) => ({ products }),
  { fetchProduct })(ProductInfo);

import React, {useState, Fragment } from 'react';
import {toast} from 'react-toastify';
import { PRODUCTS } from '../../constants';
import _ from 'lodash';

const withAddToCart = (AddToCartComp) => (
  (props) =>{
    const { history } = props;
    const [inputs, setInputs] = useState({
      firstName: '',
      lastName: '',
      address: '',
      email: '',
      country: '',
      city: '',
      phone: '',
      cart: [],
      total: '0',
      page: '',
      quantity: '1',
      canAddToCart: true,
      cart_id: '',
      cartItem: {}
    });

    let [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState('');
    // const [quantity, setQuantity] = useState(1);
    const [canAddToCart, setCanAddToCart] = useState(true);
    const [cart_id, setCart_id] = useState('');
    const [cartItem, setCartItem] = useState({});
    const [addingToCart, setAddingToCart] = useState(false);

    const {firstName, lastName, address, email, country, city, phone, quantity } = inputs;

    const values = {
      firstName, lastName, address, email, country, city, phone,
    };

    const handleChange = (event, { name, value }) => {
      event.persist();
      setInputs({ ...inputs, [name]: value });
    };

    /** Add product to cart */
    const handleAddToCart = async (cartItem) => {
      setCartItem(cartItem);
      setCart([...cart, cartItem])
    };

    const getProductId = () => (window.location.pathname.substr(1).split('/')[2]);

    const handleAddOnceToCart = () => {
      let found = _.find(cart, (item) =>{
        return item.id === parseInt(getProductId());
      });
      found
        ? setCanAddToCart(false)
        : setCanAddToCart(true);
    };

    //go back to product section
    const handleBackToProducts = () => {
      setAddingToCart(false);
      setInputs(inputs => ({ ...inputs, quantity: 1 }));
      const path = history.location.pathname.substr(1).split('/');
      history.replace(`/${path[0]}/${path[1]}?page=1`);
    };

    //remove an item from cart
    const handleRemoveFromCart = (id) => {
      cart = cart.filter((item) =>{
        return item.id !== id;
      });
      setCart(cart);

      let product = cart.find( item => item.id === id);
      return product ? null : setCanAddToCart(true) && setAddingToCart(false)
    };

    //update product page
    const handleChangePage = () => {
      const params = new URLSearchParams(window.location.search);
      const page = params.get('page');
      setPage(page)
    };

    //error notification
    const notifyError = () =>{
      toast(`Login in or Sign up to continue`, {
        position: toast.POSITION.TOP_CENTER,
        className: "foo-bar"
      });
    };

    return (
      <Fragment>
        <AddToCartComp
          cart={cart}
          cartId={cart_id}
          handleAddToCart={handleAddToCart}
          handleChangePage={handleChangePage}
          handleChange={handleChange}
          quantity={quantity}
          canAddToCart={canAddToCart}
          handleRemoveFromCart={handleRemoveFromCart}
          handleAddOnceToCart={handleAddOnceToCart}
          history={history}
          handleBackToProducts={handleBackToProducts}
          getProductId={getProductId}
          values={values}
          {...props}
        />
      </Fragment>
    )
  }
);


export default withAddToCart
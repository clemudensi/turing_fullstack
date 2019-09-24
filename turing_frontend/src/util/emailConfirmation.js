import axios from 'axios';
import {AXIOSCONFIG, PAYMENT, USERNAME} from '../constants';

export const emailConfirmation = (props) => {
  console.log(props, 'This props')
  const {
    cart,
    values: {
      address,
      city,
      // state,
      country
    }
  } = props;

  return axios.post(`${PAYMENT}/contact/email`, {
    email: USERNAME,
    orderItem: cart,
    address,
    city,
    state: 'state',
    country
  });
};

export const errorReport = (error) => (axios.post(`${PAYMENT}/error/email`, {error}, AXIOSCONFIG));

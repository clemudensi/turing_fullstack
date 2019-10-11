import axios from 'axios';
import {AXIOSCONFIG, PAYMENT, USERNAME} from '../constants';

export const emailConfirmation = (props) => {
  const {
    cart,
    values: {
      address,
      city,
      // state,
      country
    }
  } = props;

  return axios.post(`${PAYMENT}/email/order`, {
    email: USERNAME,
    orderItem: cart,
    address,
    city,
    state: 'state',
    country
  }, AXIOSCONFIG
  );
};

export const errorReport = (error) => (axios.post(`${PAYMENT}/email/error`, {error}, AXIOSCONFIG));



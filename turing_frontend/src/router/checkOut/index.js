import { AsyncShoppingCart, AsyncConfirmation } from './checkOut';

const cartRoutes = [
  { path: '/shopping-cart', name: 'ShoppingCart', render: AsyncShoppingCart  },
  { path: '/confirmation', name: 'Confirmation', render: AsyncConfirmation },
];

export default cartRoutes;

import React from 'react';
import { AsyncCheckout } from '../checkOut/checkOut';
import { AsyncDashBoard } from '../dashboard/dashboard';

const protectedRoute = [
  { path: '/checkout', name: 'CheckOut', render: props => <AsyncCheckout {...props} /> },
  { path: '/dashboard', name: 'Dashboard', render: props => <AsyncDashBoard {...props} />}
];

export default protectedRoute;

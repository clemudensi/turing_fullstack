import { AsyncLogin, AsyncSignUp } from './auth';
import React from 'react';

const authRoutes = [
  { path: '/login', name: 'Login', render: props => <AsyncLogin {...props} />  },
  { path: '/signup', name: 'SignUp', render: props => <AsyncSignUp {...props} /> },
];

export default authRoutes;

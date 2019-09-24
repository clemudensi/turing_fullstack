import React from 'react';
import { ContactUs, About } from './static';

const staticRoutes = [
  { path: '/contact', name: 'Contact', render: ContactUs },
  { path: '/about', name: 'About', render: About }
];

export default staticRoutes;

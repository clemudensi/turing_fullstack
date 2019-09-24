import React from 'react'

export const AsyncShoppingCart = React.lazy(() => import('../../components/cart/CartList'));
export const AsyncConfirmation = React.lazy(() => import('../../components/checkout/Confirmation'));
export const AsyncCheckout = React.lazy(() => import('../../components/checkout/CheckOut'));
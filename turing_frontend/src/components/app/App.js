import React, { Fragment } from 'react';
import {
  Route,
  Switch,
  // BrowserRouter as Router,
  Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import decode from 'jwt-decode';
import { toast } from 'react-toastify';
import ScrollToTop from './ScrollToTop';
import '../../App.css';
import HottestProducts from '../Home/HottestProducts';
import Routes from '../../router';
import protectedRoutes from '../../router/protected';
import Footer from '../Home/Footer';
import HeaderMenu from '../nav/HeaderMenu';
import withAddToCart from '../HOC/WithAddToCart';
import MyLoader from '../../components/shared/loaders';
import NotFound from '../staticPages/404-page';
import withAuth from '../HOC/WithAuth';

const compose = (f, g) => x => f(g(x));
toast.configure({
  autoClose: 8000,
  draggable: true,
});

const validateToken = () => {
  let token = sessionStorage.getItem('accessToken');
  try {
    const decoded = decode(token);
    return token ?
      decoded.exp > (Date.now() / 1000) : false;
  }
  catch (err) {
    return false;
  }
};

const App = (props) => {
  const { cart, handleRemoveFromCart, tokenValid, logOut, history } = props;
  return (
    <Fragment>
      <React.Suspense fallback={<MyLoader />}>
        <ScrollToTop>
          <HeaderMenu
            cart={cart}
            handleRemoveFromCart={handleRemoveFromCart}
            validateToken={validateToken()}
            tokenValid={tokenValid}
            logOut={logOut}
            history={history}
          />
          <div className={'App'}>
            <Switch>
              <Redirect from="/home" to="/" />
              <Route exact path="/" component={HottestProducts} />

              {/*Protected Routes*/}
              {protectedRoutes.map((routeProps, key) => (
                <Route
                  key={key}
                  path={routeProps.path}
                  render={(renderProps) => validateToken() ?
                    <routeProps.render key={key} {...renderProps} {...props} /> :
                    props.history.push('/login', window.location.pathname)
                  }
                />
              ))}

              {/*Unprotected Routes*/}
              {Routes.map((routeProps, key) => (
                <Route
                  key={key}
                  path={routeProps.path}
                  render={(renderProps)=> <routeProps.render key={key} {...renderProps} {...props} />}
                />
              ))}
              <Route path="*" component={NotFound} />
            </Switch>
          </div>
          <Footer />
        </ScrollToTop>
      </React.Suspense>
    </Fragment>
  );
};

App.propTypes = {
  cart: PropTypes.array,
  tokenValid: PropTypes.bool,
  logOut: PropTypes.func,
  history: PropTypes.object,
  handleAddToCart: PropTypes.func,
  handleRemoveFromCart: PropTypes.func
};

export default compose(withAuth, withAddToCart)(App);

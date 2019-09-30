import React from 'react';
import Login from '../../containers/Login';
import SignUp from '../../containers/SignUp';
import PropTypes from 'prop-types';

const AuthPages = (props) => {
  switch (window.location.pathname){
  case '/login':
    return (
      <div className="full-page">
        <p/>
        <h3>Log in to account </h3>
        <Login
          location={props.location}
          history={props.history}
        />
      </div>
    );
  case '/signup':
    return (
      <div className="full-page">
        <p/>
        <h3>Sign up to create an account </h3>
        <SignUp
          location={props.location}
          history={props.history}
        />
      </div>
    );
  default:
    return null;
  }
};

AuthPages.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func
};

export default AuthPages;

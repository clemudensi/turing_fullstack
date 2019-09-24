import React from 'react';
import Login from '../../containers/Login';
import SignUp from '../../containers/SignUp';
import PropType from 'prop-types';

const propTypes = {
  location: PropType.object,
  history: PropType.object,
  handleChange: PropType.func,
  handleBlur: PropType.func
};

const AuthPages = (props) => {
  switch (window.location.pathname){
  case '/login':
    return (
      <div className="full-page">
        <p/>
        <h2>Log in to account </h2>
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
        <h2>Sign up to create an account </h2>
        <SignUp
          location={props.location}
          history={props.history}
        />
      </div>
    );
  }
};

AuthPages.propTypes = propTypes;

export default AuthPages;

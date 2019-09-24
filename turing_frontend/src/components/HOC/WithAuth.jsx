import React, { useState } from 'react';
import AuthService from '../auth/AuthService';

const withAuth = (AuthComponent) => (
  // eslint-disable-next-line react/display-name
  (props) => {
    const [validateToken, setValidateToken] = useState(false);

    const userProps = () => (AuthService.loggedIn());

    const userToken = () => (AuthService.getToken());

    const tokenValidation = () => (AuthService.isTokenExpired());

    const logOut = () => (AuthService.logout());

    return(
      <AuthComponent
        user={userProps()}
        token={userToken()}
        tokenValid={tokenValidation()}
        validateToken={validateToken}
        logOut={logOut}
        {...props}
      />
    );
  }
);

// const withAuth = (AuthComponent) => (
//   class WithAuth extends React.Component{
//
//     state = {
//       validateToken: false
//     };
//
//     static userProps () {
//       AuthService.loggedIn()
//     };
//
//     static userToken (){
//       AuthService.getToken()
//     };
//
//     tokenValidation = () => (AuthService.isTokenExpired());
//
//     logOut = () => (AuthService.logout());
//
//     render() {
//       const { validateToken } = this.state;
//       return(
//         <AuthComponent
//           user={WithAuth.userProps()}
//           token={WithAuth.userToken()}
//           tokenValid={this.tokenValidation()}
//           validateToken={validateToken}
//           logOut={this.logOut}
//           {...this.props}
//         />
//       );
//     }
//   }
// );

export default withAuth;

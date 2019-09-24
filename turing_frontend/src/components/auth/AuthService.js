import decode from 'jwt-decode';

export default class AuthService {

  static loggedIn() {
    const token = sessionStorage.getItem('accessToken');
    return !!token && AuthService.isTokenExpired();
  }

  static isTokenExpired() {
    try {
      const decoded = decode(sessionStorage.getItem('accessToken'));
      return decoded.exp > (Date.now() / 1000);
    }
    catch (err) {
      return false;
    }
  }

  static getToken() {
    sessionStorage.getItem('accessToken');
  }

  static logout () {
    sessionStorage.removeItem('accessToken');
    localStorage.removeItem('username');
    localStorage.removeItem('user_id');
    window.location.reload();
  }
}

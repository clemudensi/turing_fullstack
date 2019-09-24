import decode from 'jwt-decode';

export const userAuth = (res) => {
  localStorage.setItem('id_token', res.headers['x-auth-token']);
  localStorage.setItem(
    'username',
    decode(localStorage.getItem('id_token')).email
  );
  localStorage.setItem(
    'user_type',
    decode(localStorage.getItem('id_token'))['custom:user_type']);
  return localStorage;
};

export const decodeToken = () => {
  return decode(localStorage.getItem('id_token'));
};
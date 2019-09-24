import decode from 'jwt-decode';

const validateToken = (token) => {
  try {
    const decoded = decode(token);
    return token ?
      decoded.exp > (Date.now() / 1000) : false;
  }
  catch (err) {
    return false;
  }
};

export default validateToken;

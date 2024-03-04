// import { jwtExpiry, jwtType } from '../constants';
const  jwt = require("jsonwebtoken");
const  { jwtExpiry, jwtType } = require("../constant")
const TOKEN_SECRET = "123456789";
const signJwtToken = (payload, type) => {
  const expiry = checkExpire(type);
  const data = { data: payload, type };
  const result = jwt.sign(data, TOKEN_SECRET, {
    expiresIn: expiry,
  });
  return result;
};

const verifyJwtToken = (token) => {
  try {
    const decoded = jwt.verify(token, TOKEN_SECRET);
    console.log("refresh token data", decoded);
    return { data: decoded.data };
  } catch (error) {
    console.log("refresh verify error ", error);
    return { error };
  }
};

// type is a union
const checkExpire = (type) => {
  // type must be a union of access refresh, signup, login
  if (type == jwtType.access) return jwtExpiry.access;
  if (type == jwtType.refresh) return jwtExpiry.refresh;
  return jwtExpiry.login;
};

module.exports = {
  signJwtToken,
  verifyJwtToken,
};

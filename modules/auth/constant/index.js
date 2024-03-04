const jwtExpiry = {
  access: "30m",
  refresh: "3d",
  login: "15m",
  signup: "15m",
  auth: "10m",
};

const jwtType = {
  access: "access",
  refresh: "refresh",
  login: "refresh",
  signup: "refresh",
  auth: "auth",
};

const authMessage = {
  notAuthorized: "Account not authorized. Please Login to again your account",
  invalidToken:
    "Account credentials is invalid or has expired. Please login again to your account",
};

module.exports = { jwtExpiry, jwtType, authMessage };

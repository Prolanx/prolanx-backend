const { authMessage } = require("../constant");
const { createError } = require("../utils/core.utils");
const { verifyJwtToken } = require("../utils/token.utils");

const authGuard = async (req, res, next) => {
  const authHeader = req.headers?.authorization || req.headers?.Authorization;
  try {
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw createError(authMessage.invalidToken, 401);
    }
    const token = authHeader.split(" ")[1];
    const decoded = verifyJwtToken(token);
    if (decoded.error) throw createError(authMessage.invalidToken, 401);
    req.user = decoded.data;
    next();
  } catch (error) {
    return next(error);
  }
};

module.exports = {authGuard};

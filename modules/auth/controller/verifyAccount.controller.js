const { findAccountByEmail, saveAccount } = require("../dao/signup.dao");
const { hashPassword, verifyPassword } = require("../utils/password.utils");
const { generateOTP } = require("../utils/core.utils");
const { signJwtToken, verifyJwtToken } = require("../utils/token.utils");
const { jwtType } = require("../constant");

const verifyAccount = async (payload) => {
  const { token, otp } = payload;

  const decoded = verifyJwtToken(token);

  const result = await findAccountByEmail(decoded.data.email);
  if (!result || result.error) throw message.serverError;

  const user = result.data;
  const isValid = verifyPassword(otp, user.otp);
  if (!isValid) this.message.invalidOtp;

  const refresh = signJwtToken(user, jwtType.refresh);
  const access = signJwtToken(user, jwtType.access);

  return {
    status: "success",
    message: "Account has been verified successfully",
    data: {access: refresh},
  };
};

module.exports = {
  verifyAccount,
};

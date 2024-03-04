const {
  updateAccount,
  findAccount,
} = require("../dao/signup.dao");
const { hashPassword, verifyPassword } = require("../utils/password.utils");
const { generateOTP } = require("../utils/core.utils");
const { signJwtToken } = require("../utils/token.utils");
const { jwtType } = require("../constant");


const loginController = async (payload) => {

  const { email, password } = payload;
  const message = {
    userExists: "A user already exist with this email.",
    serverError: "There was an error while signing-in. Please try again",
    userNotFound: "Email does not match any account. Please try again",
    invalidCredentials: "Invalid email or password. Please try again",

    loginSuccess:
      "Signup was successful. Please verify your account using OTP sent to your email address",
  };

  let userResult = await findAccount({ email });

  if (userResult.error) throw new Error(message.serverError);

  if (!userResult.data) throw new Error(message.userNotFound);

  const user = userResult.data;
  const isValid = await verifyPassword(password, user.password);
  if (!isValid) throw new Error(message.invalidCredentials);
  // IF USER IS NOT VERIFIED THEN SEND NEW OTP
  // if (!user.data.verified) {
  // }

  delete user.password;
  if (user?.refreshToken) delete user.refreshToken;
  // if user is verified.....then generate access and refresh token again
  const refreshToken = signJwtToken(user, jwtType.refresh);
  const access = signJwtToken(user, jwtType.access);
  // update the new access refresh token in the db;
  const updates = { refreshToken };
  const updateResult = await updateAccount(user.id, updates);
  if (updateResult.error) throw new Error(message.serverError);

  return {
    status: "success",
    message: "Login Successful",
    data: { token: refreshToken, user },
  };
};

module.exports = {
  loginController,
};

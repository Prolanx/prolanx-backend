const SibApiV3Sdk = require("@getbrevo/brevo");
const { findAccountByEmail, saveAccount } = require("../dao/signup.dao");
const { hashPassword } = require("../utils/password.utils");
const { generateOTP } = require("../utils/core.utils");
const { signJwtToken } = require("../utils/token.utils");
const { jwtType } = require("../constant");

let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

const API_KEY = "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";
let apiKey = apiInstance.authentications["apiKey"];
apiKey.apiKey = API_KEY;


const signupController = async (payload) => {
    const message = {
        userExists: "A user already exist with this email.",
        signupSuccess: "Signup was successful. Please verify your account using OTP sent to your email address"
    }
  const { email, password, firstName } = payload;
  let user = await findAccountByEmail(email);
  if (user.error) "error";
  // if email exist return with 400 error;
  if (user.data) throw new error(message.userExists);

  //  next hash the password;
  const securePass = await hashPassword(password);
  const otp = generateOTP();
  const jwt = signJwtToken({ email }, jwtType.auth);

  // store the data in the db
  const token = { otp, jwt };
  const savePayload = { email, password: securePass, firstName, token };
  const result = await saveAccount(savePayload);
  if (result.error) throw new error("There was an error. Please try again");

  return {
    status: "success",
    message: message.signupSuccess,
  };
};


module.exports = {
  signupController,
};

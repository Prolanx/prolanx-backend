function createError(message, status, data) {
  let msg = message;
  if (!msg) msg = "There was an error with your request. Please try again";
  const error = new Error(msg);
  error.status = status || 500;
  error.data = data || null;
  return error;
}

const generateOTP = () => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString();
};

module.exports = { generateOTP, createError };

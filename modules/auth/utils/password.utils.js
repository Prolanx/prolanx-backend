const bcrypt = require("bcrypt");

const verifyPassword = async (password, checkPassword) => {
  try {
    const data = await bcrypt.compare(password, checkPassword);
    console.log("verify password data ", data);
    return { data };
  } catch (error) {
    return { error };
  }
};

 const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const data = await bcrypt.hash(password, salt);
    return { data };
  } catch (error) {
    console.log("hash error ", error);
    return { error };
  }
};


module.exports = {
  verifyPassword, hashPassword
}

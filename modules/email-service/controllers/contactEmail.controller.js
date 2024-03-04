const { singleMailService } = require("../service/singleMail.service");

const contactEmailController = async (body) => {
  const { email, name, message } = body;
  const destEmail = "enquiry@prolanx.co"
  const payload = {
    senderName: name,
    senderEmail: email,
    subject: "Website Contact",
    message,
    destEmail: destEmail,
  };
  const userResult = await singleMailService(payload);
  // console.log("user result ", userResult);
  if (userResult.error) {
    throw new Error("There was an error sending the mail. Please try again");
  }
  return {
    status: "success",
    message: "Email was sent successfully",
  };
};

module.exports = {
  contactEmailController,
};

const { sendSmtpEmail, apiInstance } = require("../../../config/brevoConfig");

const singleMailService = async ({
  senderName,
  senderEmail,
  subject,
  message,
  destEmail,
  intro,
}) => {
  try {
    sendSmtpEmail.sender = { name: senderName, email: senderEmail };
    sendSmtpEmail.to = [{ email: destEmail }];
    sendSmtpEmail.subject = subject;

    if (intro) {
      sendSmtpEmail.htmlContent =
        "<html><head></head><body><h4>" +
        intro +
        ",</h4><p>" +
        message +
        "</p></body></html>";
    } else {
      sendSmtpEmail.htmlContent =
        "<html><head></head><body><p>" + message + "</p></body></html>";
    }

    await apiInstance.sendTransacEmail(sendSmtpEmail);
    return {
      status: "success",
      message: "Email was sent successfully",
    };
  } catch (error) {
    console.log("email error", error);
    throw "Error sending email. Please try again";
  }
};

module.exports = {
  singleMailService,
};

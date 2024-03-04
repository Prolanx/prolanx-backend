const SibApiV3Sdk = require("@getbrevo/brevo");
let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
const API_KEY =
  "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";
let apiKey = apiInstance.authentications["apiKey"];
apiKey.apiKey = API_KEY;

const { findAccountById } = require("../../auth/dao/signup.dao");
const { verifyJwtToken } = require("../../auth/utils/token.utils");

const sendEmailController = async (payload, user) => {
  try {
    // GET THE EMAIL & NAME OF THE USER FROM DB
    // decode the token
    const { id } = user;
    // query db
    const userResult = await findAccountById(id);
    console.log("user result ", userResult);
    if (userResult.error) {
      throw new Error("There was an error sending the mail. Please try again");
    }
    const senderEmail = userResult.data.email;
    const senderName = userResult.data.firstName;

    let { email, message, subject } = payload;

    const name = payload?.name || "There";

    let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.sender = { name: senderName, email: senderEmail };
    sendSmtpEmail.to = [{ email }];
    sendSmtpEmail.subject = subject;
    sendSmtpEmail.htmlContent =
      "<html><head></head><body><h4>Hello " +
      name +
      ",</h4><p>" +
      message +
      "</p></body></html>";
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
  sendEmailController,
};

//  sendSmtpEmail.subject = "My {{params.subject}}";
// sendSmtpEmail.htmlContent = "<html><head></head><body><p>Hello,</p>This is my first transactional email sent from Brevo.</p></body></html>";

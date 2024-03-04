const SibApiV3Sdk = require("@getbrevo/brevo");
let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
let apiKey = apiInstance.authentications["apiKey"];
apiKey.apiKey = process.env.BREVO_KEY;

module.exports = {
  apiInstance,
  sendSmtpEmail,
};

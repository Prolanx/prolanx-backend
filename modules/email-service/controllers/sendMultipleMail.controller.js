const SibApiV3Sdk = require("@getbrevo/brevo");
let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

const API_KEY = "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";
let apiKey = apiInstance.authentications["apiKey"];
apiKey.apiKey = API_KEY;

const sendMultipleMailController = async (payload) => {
  //   const { sender, name, subject } = payload;

  const sender = "temidaramola7@gmail.com";
  const name = "Instructor";
  const subject = "Registration Confirmed";
  let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  // const
  const sample = {
    email: "email@gmail.com",
    subject: "This is a subject",
    message: "This is the message",
    name: "",
  };
  const samples = [sample, sample, sample];

  sample.map((item) => {
    
    return {

    };
  });

  sendSmtpEmail.subject = "My {{params.subject}}";
  sendSmtpEmail.htmlContent = "<html><body><h1>Common: This is my first transactional email {{params.parameter}}</h1></body></html>";
  sendSmtpEmail.sender = { name: name, email: sender };
  //   sendSmtpEmail.to = [{ email: "brevo@brevo.com", name: "John" }];

  sendSmtpEmail.params = { message: "Common Param", subjects };
  sendSmtpEmail.messageVersions = [
    {
      to: [
        {
          email: "prolanxdigital@gmail.com",
          name: "Prolanx",
        },
      ],
      params: {
        greeting: "Welcome onboard!",
        headline: "Be Ready for Takeoff.",
        parameter: "001 parameter",
      },
      subject: "+001",
      htmlContent: "<html><body><h1>+001 content</h1></body></html>",
    },
    {
      to: [
        {
          email: "temitest99@gmail.com",
          name: "Tope Daramola",
        },
      ],
      params: {
        greeting: "Greeting 1.",
        headline: "Some bathing suits you might like",
        parameter: "002 parameter",
      },
      subject: "+002",
    },
  ];

  const result = await apiInstance.sendTransacEmail(sendSmtpEmail);

  return result;
};

module.exports = {
  sendMultipleMailController,
};

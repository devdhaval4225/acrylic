const nodemailer = require("nodemailer");
const sendEmail = async (mailObj) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: 587,
      secure: true,
      auth: {
        user: process.env.FROM_MAIL,
        pass: process.env.USER_PASS,
      },
    });

    const checkMail = await transporter.sendMail(mailObj);
    console.log("-----checkMail-----",checkMail.messageId)
  } catch (error) {
    console.log("email not sent", error);
  }
};

module.exports = sendEmail;
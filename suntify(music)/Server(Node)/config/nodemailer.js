const nodemailer = require("nodemailer");
require('dotenv').config()

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.ADMIN_USER_GMAIL,
    pass: process.env.PASS_GAMIL_SECRET_KEY,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendMail = async ( user ,subject ,text) => {
  const mailOptions = {
    from: `"Suntify" , ${process.env.ADMIN_USER_GMAIL}`, // sender address
    to: user.email,
    subject: subject, // Subject line
    text: text, // plain text body
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email has been sent");
  } catch (error) {
    console.error(error);
  }
};

module.exports = {sendMail}

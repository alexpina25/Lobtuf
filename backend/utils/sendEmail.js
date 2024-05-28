const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: options.email,
    subject: options.subject,
    html: `
      <h1>${options.subject}</h1>
      <p>${options.message}</p>
      <a href="${options.url}">${options.url}</a>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;

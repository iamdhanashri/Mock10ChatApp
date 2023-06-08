
const nodemailer = require('nodemailer');

const sendVerificationEmail = async (email, verificationToken) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'iamdhanashriahire@gmail.com',
        pass: 'abc',
      },
    });

    const mailOptions = {
      from: 'iamdhanashriahire@gmail.com',
      to: email,
      subject: 'Email Verification',
      html: `<p>Click <a href="http://localhost:3000/auth/verify/${verificationToken}">here</a> to verify your email address.</p>`,
    };

    await transporter.sendMail(mailOptions);
    console.log('Verification email sent');
  } catch (error) {
    console.error('Error sending verification email:', error);
  }
};

module.exports = {
  sendVerificationEmail,
};

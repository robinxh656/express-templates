const nodemailer = require('nodemailer');
const ejs = require('ejs');

module.exports = class Email {
  constructor(data) {
    this.data = data;
    this.to = data.user.email;
    this.from = `Robin Mind <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: true,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(template, subject) {
    const html = await ejs.renderFile(
      `${__dirname}/../views/emails/${template}.ejs`,
      {
        data: this.data,
        subject,
      },
    );

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
    };

    await this.newTransport().sendMail(mailOptions);
  }

  async emailVerify() {
    await this.send('verifyEmail', 'Email verification');
  }

  async loginAlert() {
    await this.send('loginAlert', 'Login alert');
  }

  async emailChangedAlert() {
    await this.send('emailChangedAlert', 'Email changed alert');
  }

  async passwordChangedAlert() {
    await this.send('passwordChangedAlert', 'Password changed alert');
  }

  async forgotPassword() {
    await this.send('forgotPassword', 'Password changed alert');
  }

  async rolePromotedAlert() {
    await this.send('rolePromotedAlert', 'Congratulations on Your Promotion!');
  }
};

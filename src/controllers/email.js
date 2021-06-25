const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


function email(data)
{
  const msg = {
    to: "milanmandal2001@gmail.com",
    from: 'test@gmail.com',
    subject: 'Sending with SendGrid is Fun',
    text: "hello world",
    html: '<strong></strong>',
  };
  sgMail.send(msg);
}

module.exports = email;

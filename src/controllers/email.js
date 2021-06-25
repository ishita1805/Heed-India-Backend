const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const email = (data) => {
  const msg = {
    to: `${data.email}`,
    from: 'milanmandal2001@gmail.com',
    subject: 'Sending with SendGrid is Fun',
    html: '<strong></strong>',
  };
  sgMail.send(msg)
  .then(() => {
    console.log('done')
  })
  .catch((e) => {
    console.log(e);
  })
}

module.exports = email;

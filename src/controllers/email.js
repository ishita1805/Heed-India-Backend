const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


function email(data)
{
  const msg = {
    to: `${data.email}`,
    from: 'test@gmail.com',
    subject: 'Sending with SendGrid is Fun',
    text: `Name: ${data.name}\nPhone No: ${data.contact}`,
    html: '<strong></strong>',
  };
  sgMail.send(msg);
}

module.exports = email;

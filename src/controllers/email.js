const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const email = (email, amt, rec) => {
  const msg = {
    to: email,
    from: 'info@heedindia.org',
    dynamic_template_data: {
      "email": email,
      "amt" : amt*0.01,
      "receipt": rec,
      "date":new Date().toDateString()
    },
    template_id:'d-3b733964886943f1b90ae33b37c3031a'
  };
  sgMail.send(msg)
  .then(() => {
    console.log('done');
  })
  .catch((e) => {
    console.log(e);
  })
}

module.exports = email;

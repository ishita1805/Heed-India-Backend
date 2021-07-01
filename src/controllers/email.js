const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const email = (data) => {
  const msg = {
    to: data.email,
    from: 'milanmandal2001@gmail.com',
    dynamic_template_data: {
      "name": `${data.name}`,
      "amt" :`${data.amount}`,
      "receipt": `${data.receipt}`,
      "date":`${data.date}`
    },
    template_id:'d-f6a113209ecb4c6192092cf604fd906a'
  };
  sgMail.send(msg)
  .then((resp_data) => {
    console.log(resp_data);
  })
  .catch((e) => {
    console.log(e);
  })
}

module.exports = email;

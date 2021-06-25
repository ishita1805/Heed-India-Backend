const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const email = (data) => {
  console.log(data);
  const msg = {
    to: 'milan.mandal2019@vitstudent.ac.in',
    from: 'milanmandal2001@gmail.com',
    dynamic_template_data: {
      "name": `${data.name}`,
      "amt" :`${data.amt}`,
    },
    template_id:'d-7590aa394d6140b3aa5f845e76c8963e'
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

const sgMail = require('@sendgrid/mail')

const sendgridAPIKey = process.env.SENDGRID_API_KEY

sgMail.setApiKey(sendgridAPIKey)

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'mrh@deadlysyn.com',
    subject: 'Thanks for joining!',
    text: `Welcome to the Task App, ${name}. Let me know if you have any questions.`
  })
}

const sendCancelEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'mrh@deadlysyn.com',
    subject: 'Sorry to see you go!',
    text: `Your Task App account has been deleted, ${name}. Please let us know if there is anything we could have done to keep you as an active user!`
  })
}

module.exports = {
  sendWelcomeEmail,
  sendCancelEmail
}

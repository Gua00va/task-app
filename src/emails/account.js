const sgMail = require('@sendgrid/mail')
const sendgridAPIKEY = process.env.sendGridApiKey

sgMail.setApiKey(sendgridAPIKEY)

const sendWelcomeEmail = (email, name)=>{
    sgMail.send({
        to: email,
        from: '',
        subject: 'Thanks for Joining',
        text: `Welcome to the app ${name}`
    })

}

const sendCancellationEmail = (email, name)=>{
    sgMail.send({
        to: email,
        from: '',
        subject: 'Sorry to see you go!',
        text: `Goodbye ${name}. Hope to see you back sometimes soon`
    })

}



module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}

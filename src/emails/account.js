const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth : {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    }
})

const sendWelcomeEmail = (email, name)=>{
    const options = {
        from: process.env.EMAIL,
        to : email,
        subject: 'Thanks for Joining',
        text: `Welcome to the app ${name}`,
    }

    transporter.sendMail(options, function(error, info) {
        if(error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    })
}

const sendCancellationEmail = (email, name)=>{
    const options = {
        from: process.env.EMAIL,
        to : email,
        subject: 'Sorry to see you go!',
        text: `Goodbye ${name}. Hope to see you back sometime soon`
    }
    
    transporter.sendMail(options, function(error, info) {
        if(error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    })
}



module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}

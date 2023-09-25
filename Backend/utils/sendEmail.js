const nodemailer = require("nodemailer")
const smtpTransport = require('nodemailer-smtp-transport');
  
 
  const sendEmail = async (subject, message, send_to, sent_from, reply_to) => {
    // Create Email Transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',  
      host: 'smtp.gmail.com',
      port: 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    var options = {
        from:sent_from,
        to: send_to,
        replyTo: reply_to,
        subject: subject,
        html: message,
    }
       
    transporter.sendMail(options, function (error, info){
        if (error){
            console.log(error)
        }else{
            console.log(info)
        }
    })

}  
module.exports = sendEmail;
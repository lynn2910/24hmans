const nodemailer = require("nodemailer");
require("dotenv").config();

const FROM_ADDRESS = process.env.MAIL;

const smtpTransport = nodemailer.createTransport(
    `smtps://${encodeURIComponent(FROM_ADDRESS)}:` + encodeURIComponent(process.env.PASSWORD) + "@smtp.gmail.com:465");

function sendMail(toAddress, subject, content, next) {
    const mailOptions = {
        from: FROM_ADDRESS,
        to: toAddress,
        subject: subject,
        html: content
    };

    smtpTransport.sendMail(mailOptions, next);
}

const htmlContentTest = `<div>
    <p>Ceci est un mail envoyé depuis NodeJS :)</p>
</div>`;


sendMail(
    'cedric.colin35@gmail.com',
    'Bip boup bip',
    htmlContentTest,
    () => console.log("mail envoyé avec succès!")
)
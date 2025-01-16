const nodemailer = require("nodemailer");

const FROM_ADDRESS = process.env.MAIL_ADDRESS;
const TRANSPORTER_PASSWORD = process.env.MAIL_PASSWORD;

let smpTransport;
let transporterValidity = {valid: false, tried: false};

function registerMailService() {
    console.log("[MAIL] Registering mail service");

    try {
        smtpTransport = nodemailer.createTransport(
            `smtps://${encodeURIComponent(FROM_ADDRESS)}:${encodeURIComponent(TRANSPORTER_PASSWORD)}@smtp.gmail.com:465`);
        transporterValidity = {valid: true, tried: true};
        
        console.log("[MAIL] Mail service registered");
    } catch (error) {
        transporterValidity = {valid: false, tried: true};
        console.error(`[MAIL] Failed to register mail service: ${error}`);
    }
}

module.exports = {registerMailService};
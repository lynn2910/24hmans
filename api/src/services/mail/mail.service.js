const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");
const fs = require("fs");

const FROM_ADDRESS = process.env.MAIL_ADDRESS;
const TRANSPORTER_PASSWORD = process.env.MAIL_PASSWORD;

let smtpTransport;
let transporterValidity = {valid: false, tried: false};

/**
 * Ouvre la connexion avec le service mail
 */
function registerMailService() {
    console.log("[MAIL] Registering mail service");

    try {
        smtpTransport = nodemailer.createTransport(
            `smtps://${encodeURIComponent(FROM_ADDRESS)}:${encodeURIComponent(TRANSPORTER_PASSWORD)}@smtp.gmail.com:465`);
        transporterValidity = {valid: true, tried: true};

        startQueue();

        console.log("[MAIL] Mail service registered");
    } catch (error) {
        transporterValidity = {valid: false, tried: true};
        console.error(`[MAIL] Failed to register mail service: ${error}`);
    }
}

/**
 * Une requête d'envoi de mail
 *
 *
 * Les arguments `htmlPath` et `plainPath` doivent être un chemin partant du dossier `src/services/mail/templates/`.
 *
 * Au moins un de ces deux arguments doit être présent
 *
 * @typedef MailRequest
 * @property {string} sendTo L'adresse du destinataire
 * @property {string?} htmlPath Le chemin vers la template EJS ou le fichier HTML
 * @property {string?} plainPath Le chemin vers la template textuelle EJS (ou un texte pur)
 * @property {string} subject Le sujet du mail
 * @property {function?} callback Un callback, exécuté une fois le mail envoyé*
 * @property {object} args Arguments donnés aux templates
 * @example
 * const mail_request = {
 *   subject: "Inscription",
 *   sendTo: "test@gmail.com",
 *   htmlPath: "signup/signup_html.ejs",
 *   plainPath: "signup/signup_plain.ejs",
 *   args: {
 *      user: {
 *          first_name: "Stephane",
 *          last_name: "DOMAS",
 *          password: "drmad3462@=Bordifier"
 *          email: "stephane.domas@univ-fcomte.fr"
 *          // ne pas envoyer le mail à son adresse, on ne va pas l'embêter
 *      },
 *   }
 * }
 *
 * addMailRequest(mail_request)
 */

/**
 * La liste des mails à envoyer
 * @type {MailRequest[]}
 */
const queue = [];

/**
 * Ajoute le mail dans la liste des mails à envoyer
 * @param {MailRequest} mail
 */
function addMailRequest(mail) {
    queue.push(mail);
}

const wait = (time) => new Promise(r => setTimeout(r, time));


async function startQueue() {
    // Un bon gros while true.
    // Elle boucle toutes les 5s si aucun mail n'est à envoyer
    while (true) {
        if (queue.length < 1) {
            await wait(5000);
            continue;
        }

        try {
            await sendMail(queue.pop())
        } catch (e) {
        }
    }
}

/**
 * Envoie le mail :D
 * @param {MailRequest} mail_request
 */
async function sendMail(mail_request) {
    if (!(mail_request.htmlPath || mail_request.plainPath)) {
        console.error(`[MAIL] Invalid mail:\n${JSON.stringify({...mail_request, args: "[hidden]"}, null, 2)}`);
        return;
    }

    const mailOptions = {
        from: FROM_ADDRESS,
        to: mail_request.sendTo,
        subject: mail_request.subject,
        html: mail_request.htmlPath ? await renderFile(mail_request.htmlPath, mail_request.args) : null,
        text: mail_request.plainPath ? await renderFile(mail_request.plainPath, mail_request.args) : null,
    }

    await smtpTransport.sendMail(
        mailOptions,
        mail_request.callback
    )
}

/**
 * Génère le rendu d'un fichier en utilisant EJS
 * @param {string} file_path
 * @param {Object} args
 */
async function renderFile(file_path, args = {}) {
    try {
        const rawFile = fs.readFileSync(
            path.join(__dirname, 'templates', file_path),
            "utf8"
        );

        return await ejs.render(rawFile, args);
    } catch (err) {
        console.error(`[MAIL] Failed to render file '${file_path}': ${err}`);
    }
}


module.exports = {registerMailService, addMailRequest};
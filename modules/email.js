const nodeMailer = require("nodemailer");
const {mailer} = require("../config");

const send = function (mailOptions) {

    return nodeMailer
        .createTransport({
            host: mailer.host,
            port: mailer.port,
            secure: false,
            auth: {
                user: mailer.user,
                pass: mailer.password,
            },
            tls: {
                rejectUnauthorized: false,
            },
        })
        .sendMail(mailOptions);
};

module.exports = {
    sendMail: async (renderData = {}, to = []) => {

        const mailOptions = {
            from: mailer.user,
            to: to,
            cc: mailer.user,
            subject: renderData.subject,
            html: renderData.data,
        };
        const response = await send(mailOptions);
        return response;
    }
}

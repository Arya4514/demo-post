'use strict';
var nodemailer = require('nodemailer');
var fs = require('fs');
const config = require('../environments/index');


const replaceVariables = async (content, data) => {
    return new Promise(resolve => {
        content = content.split("{{NAME}}").join(data.user_name);
        content = content.split("{{QUALIFICATION}}").join(data.qualification);
        content = content.split("{{CITY}}").join(data.city);
        content = content.split("{{PHONE_NUMBER}}").join(data.phone_number);
        resolve(content);
    })
}

const setEmailConfig = async () => {
    return nodemailer.createTransport({
        host: config.EMAIL_CONFIG.host,
        port: config.EMAIL_CONFIG.port,
        auth: {
            user: config.EMAIL_CONFIG.username,
            pass: config.EMAIL_CONFIG.password
        }
    });
}

const sendEmail = async (mailOptions) => {

    try {
        var transporter = await setEmailConfig();

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
                return true;
            }
        });
    }
    catch (e) {
        throw e;
    }
}

const readTemplate = async (name) => {
    return new Promise(resolve => {
        fs.readFile(`./templates/${name}.html`, 'utf8', function (error, html) {
            if (error) {
                throw error;
            }
            resolve(html);
        });
    })
}


module.exports = {
    signupEmail: async (data) => {

        let template = await readTemplate('signUp')

        template = await replaceVariables(template, data)

        var mailOptions = {
            to: data.email,
            subject: "Thank You For SignUp Test",
            from: "Aryan",
            html: template
        };

        try {
            await sendEmail(mailOptions);
            return true;

        } catch (e) {
            throw e
        }

    },
};

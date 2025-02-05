const nodemailer = require('nodemailer');

class Email {
    constructor(user, url) {
        this.to = user.email;
        this.firstName = user.username.split(' ')[0];
        this.url = url;
        this.from = `Hospital Admin <${process.env.EMAIL_FROM}>`;
    }

    createTransport() {
        if (process.env.NODE_ENV === 'production') {
            // Use SendGrid or other service
            return nodemailer.createTransport({
                service: 'SendGrid',
                auth: {
                    user: process.env.SENDGRID_USERNAME,
                    pass: process.env.SENDGRID_PASSWORD
                }
            });
        }

        return nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        });
    }

    async send(template, subject) {
        // Send actual email
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            html: `
                <h1>${subject}</h1>
                <p>Please click the button below to ${template}:</p>
                <a href="${this.url}" style="
                    display: inline-block;
                    padding: 10px 20px;
                    background: #3498db;
                    color: white;
                    text-decoration: none;
                    border-radius: 5px;
                ">Click here</a>
                <p>If the button doesn't work, please use this link: ${this.url}</p>
            `
        };

        await this.createTransport().sendMail(mailOptions);
    }

    async sendPasswordReset() {
        await this.send('reset your password', 'Your password reset token (valid for 10 minutes)');
    }
}

module.exports = Email; 
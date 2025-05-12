import env from 'env.js';
import * as fs from 'fs';
import * as handlebars from 'handlebars';
import * as nodemailer from 'nodemailer';
import type { Transporter as NodemailerTransporter } from 'nodemailer';
import * as path from 'path';

const files: Record<string, Record<string, string>> = {
	emailConfirmation: {
		path: 'src/common/emails/emailConfirmation.html',
		subject: 'Verdagraph - Confirm your Email'
	},
	passwordReset: {
		path: 'src/common/emails/passwordReset.html',
		subject: 'Verdagraph - Reset your Password'
	}
};

class EmailSender {
	transporter: NodemailerTransporter;
	templates: Record<string, HandlebarsTemplateDelegate> = {};
	constructor() {
		/** Create the transporter object. */
		this.transporter = nodemailer.createTransport({
			host: env.SMTP_HOST,
			port: env.SMTP_PORT,
			secure: false, // upgrade later with STARTTLS
			auth: {
				user: env.SMTP_USERNAME,
				pass: env.SMTP_PASSWORD
			}
		});

		/** Import email templates. */
		const dirname = path.resolve();
		for (const [name, email] of Object.entries(files)) {
			const filepath = path.join(dirname, email.path);
			const source = fs.readFileSync(filepath, 'utf-8').toString();
			this.templates[name] = handlebars.compile(source);
		}
	}

	/**
	 * Sends an email confirmation email.
	 * @param receiver The email address to send to.
	 * @param username The username of the user to send to.
	 * @param frontendBaseUrl The URL to the frontend.
	 * @param frontendVerificationUrl The URL to the verification link on the frontend.
	 */
	sendEmailConfirmationEmail = async (
		receiver: string,
		username: string,
		frontendBaseUrl: string,
		frontendVerificationUrl: string
	) => {
		const html = this.templates.emailConfirmation({
			username,
			frontendBaseUrl,
			frontendVerificationUrl
		});
		const mailOptions = {
			from: env.SMTP_SENDER,
			to: receiver,
			subject: files.emailConfirmation.subject,
			html: html
		};
		await this.transporter.sendMail(mailOptions);
	};

	/**
	 * Sends a password reset email.
	 * @param receiver The email address to send to.
	 * @param frontendVerificationUrl The URL to the verification link on the frontend.
	 */
	sendPasswordResetEmail = async (
		receiver: string,
		frontendVerificationUrl: string
	) => {
		const html = this.templates.passwordReset({
			frontendVerificationUrl
		});
		const mailOptions = {
			from: env.SMTP_SENDER,
			to: receiver,
			subject: files.passwordReset.subject,
			html: html
		};
		await this.transporter.sendMail(mailOptions);
	};

	sendGardenInviteEmail = async () => {};
}
export default EmailSender;

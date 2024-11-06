import * as nodemailer from 'nodemailer';
import type { Transporter as NodemailerTransporter } from 'nodemailer';
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';
import env from 'env';

const files: Record<string, Record<string, string>> = {
	emailConfirmation: { path: './emailConfirmation.html', subject: 'SIERT' }
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
		const info = await this.transporter.sendMail(mailOptions);
	};

	sendPasswordResetEmail = async () => {};

	sendGardenInviteEmail = async () => {};
}

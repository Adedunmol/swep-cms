import nodemailer from 'nodemailer';
import Appointment from '../models/appointment.model';

class EmailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            // Configure your email service here
            service: 'gmail',
            host: process.env.EMAIL_HOST,
            port: parseInt(process.env.EMAIL_PORT || '587'),
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
    }

    async sendAppointmentNotification(email: string, appointment: any) {
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: 'New Appointment Scheduled',
            text: `You have a new appointment scheduled on ${appointment.date} from ${appointment.startTime} to ${appointment.endTime}.`,
        };

        await this.transporter.sendMail(mailOptions);
    }

    async sendAppointmentPDF(email: string, pdfBuffer: Buffer) {
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: 'Appointment Details',
            text: 'Please find attached the details of your appointment.',
            attachments: [
                {
                    filename: 'appointment.pdf',
                    content: pdfBuffer,
                },
            ],
        };

        await this.transporter.sendMail(mailOptions);
    }
}

export default new EmailService();
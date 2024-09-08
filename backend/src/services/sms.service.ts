import twilio from 'twilio';
import Appointment from '../models/appointment.model';

class SMSService {
    private client: twilio.Twilio;

    constructor() {
        this.client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    }

    async sendAppointmentNotification(phoneNumber: string, appointment: any) {
        await this.client.messages.create({
            body: `You have a new appointment scheduled on ${appointment.date} from ${appointment.startTime} to ${appointment.endTime}.`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phoneNumber,
        });
    }
}

// export default new SMSService();
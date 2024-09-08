import PDFDocument from 'pdfkit';
import Appointment from '../models/appointment.model';

class PDFService {
    async generateAppointmentPDF(appointment: any): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            const doc = new PDFDocument();
            const chunks: Buffer[] = [];

            doc.on('data', (chunk: any) => chunks.push(chunk));
            doc.on('end', () => resolve(Buffer.concat(chunks)));
            doc.on('error', reject);

            doc.fontSize(18).text('Appointment Details', { align: 'center' });
            doc.moveDown();
            doc.fontSize(12).text(`Date: ${appointment.date}`);
            doc.text(`Time: ${appointment.startTime} - ${appointment.endTime}`);
            doc.text(`Doctor ID: ${appointment.doctorId}`);
            doc.text(`Patient ID: ${appointment.userId}`);

            doc.end();
        });
    }
}

export default new PDFService();
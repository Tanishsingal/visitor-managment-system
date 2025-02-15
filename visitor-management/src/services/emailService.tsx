// // src/services/emailService.ts
// import api from './api';

// interface EmailData {
//   to: string;
//   subject: string;
//   template: 'VISIT_REQUEST' | 'VISIT_APPROVED' | 'VISIT_DENIED' | 'VISIT_CHECKIN' | 'VISIT_CHECKOUT';
//   data: Record<string, any>;
// }

// export const emailService = {
//   sendEmail: async (emailData: EmailData) => {
//     try {
//       await api.post('/notifications/email', emailData);
//     } catch (error) {
//       console.error('Failed to send email:', error);
//       throw error;
//     }
//   },

//   sendVisitRequestNotification: async (employeeEmail: string, visitorName: string, purpose: string) => {
//     return emailService.sendEmail({
//       to: employeeEmail,
//       subject: 'New Visit Request',
//       template: 'VISIT_REQUEST',
//       data: { visitorName, purpose }
//     });
//   },

//   sendVisitApprovalNotification: async (visitorEmail: string, employeeName: string, visitDate: string) => {
//     return emailService.sendEmail({
//       to: visitorEmail,
//       subject: 'Visit Request Approved',
//       template: 'VISIT_APPROVED',
//       data: { employeeName, visitDate }
//     });
//   }
// };



// src/services/emailService.ts
import api from './api';
import { emailTemplates } from './emailTemplates';

export const emailService = {
  async sendEmail(to: string, template: EmailTemplate) {
    try {
      await api.post('/notifications/email', {
        to,
        subject: template.subject,
        body: template.body
      });
    } catch (error) {
      console.error('Failed to send email:', error);
      throw error;
    }
  },

  async sendVisitRequestEmail(employeeEmail: string, visitorName: string, purpose: string, date: string) {
    const template = emailTemplates.visitRequest(visitorName, purpose, date);
    return this.sendEmail(employeeEmail, template);
  },

  async sendVisitApprovedEmail(visitorEmail: string, visitorName: string, employeeName: string, date: string, qrCode: string) {
    const template = emailTemplates.visitApproved(visitorName, employeeName, date, qrCode);
    return this.sendEmail(visitorEmail, template);
  },

  async sendVisitDeniedEmail(visitorEmail: string, visitorName: string, reason: string) {
    const template = emailTemplates.visitDenied(visitorName, reason);
    return this.sendEmail(visitorEmail, template);
  }
};

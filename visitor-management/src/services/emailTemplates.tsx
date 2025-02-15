// src/services/emailTemplates.ts
interface EmailTemplate {
    subject: string;
    body: string;
  }
  
  export const emailTemplates = {
    visitRequest: (visitorName: string, purpose: string, date: string): EmailTemplate => ({
      subject: 'New Visit Request',
      body: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>New Visit Request</h2>
          <p>You have received a new visit request from ${visitorName}.</p>
          <div style="margin: 20px 0; padding: 15px; background-color: #f5f5f5; border-radius: 5px;">
            <p><strong>Visitor:</strong> ${visitorName}</p>
            <p><strong>Purpose:</strong> ${purpose}</p>
            <p><strong>Date:</strong> ${date}</p>
          </div>
          <p>Please login to approve or deny this request.</p>
        </div>
      `
    }),
  
    visitApproved: (visitorName: string, employeeName: string, date: string, qrCode: string): EmailTemplate => ({
      subject: 'Visit Request Approved',
      body: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Visit Request Approved</h2>
          <p>Your visit request has been approved.</p>
          <div style="margin: 20px 0; padding: 15px; background-color: #f5f5f5; border-radius: 5px;">
            <p><strong>Meeting With:</strong> ${employeeName}</p>
            <p><strong>Date:</strong> ${date}</p>
          </div>
          <div style="text-align: center; margin: 20px 0;">
            <img src="${qrCode}" alt="QR Code" style="max-width: 200px;"/>
            <p style="margin-top: 10px;">Please show this QR code when you arrive.</p>
          </div>
        </div>
      `
    }),
  
    visitDenied: (visitorName: string, reason: string): EmailTemplate => ({
      subject: 'Visit Request Denied',
      body: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Visit Request Denied</h2>
          <p>Unfortunately, your visit request has been denied.</p>
          ${reason ? `<p><strong>Reason:</strong> ${reason}</p>` : ''}
          <p>Please contact the office for more information.</p>
        </div>
      `
    })
  };
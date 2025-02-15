
// // src/utils/qrUtils.ts
// export const generateVisitQRData = (visit: Visit) => {
//     return JSON.stringify({
//       id: visit.id,
//       visitorId: visit.visitorId,
//       timestamp: new Date().toISOString(),
//     });
//   };
  
//   export const parseQRData = (qrData: string) => {
//     try {
//       return JSON.parse(qrData);
//     } catch (error) {
//       throw new Error('Invalid QR code format');
//     }
//   };

// src/utils/qrUtils.ts
import QRCode from 'qrcode';
import { Visit } from '../types';

export const generateVisitQRData = (visit: Visit) => {
  return JSON.stringify({
    id: visit.id,
    visitorId: visit.visitorId,
    timestamp: new Date().toISOString(),
  });
};

export const parseQRData = (qrData: string) => {
  try {
    return JSON.parse(qrData);
  } catch (error) {
    throw new Error('Invalid QR code format');
  }
};

export const generateQRCode = async (visit: Visit): Promise<string> => {
  try {
    const data = generateVisitQRData(visit);
    return await QRCode.toDataURL(data);
  } catch (error) {
    console.error('Failed to generate QR code:', error);
    throw error;
  }
};

// Helper function to validate QR code data
export const validateQRData = (data: any): boolean => {
  return (
    typeof data === 'object' &&
    typeof data.id === 'number' &&
    typeof data.visitorId === 'number' &&
    typeof data.timestamp === 'string' &&
    !isNaN(Date.parse(data.timestamp))
  );
};
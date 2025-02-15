// src/utils/qrCodeGenerator.ts
import QRCode from 'qrcode';

export const generateQRCode = async (data: string): Promise<string> => {
  try {
    return await QRCode.toDataURL(data);
  } catch (error) {
    console.error('Failed to generate QR code:', error);
    throw error;
  }
};
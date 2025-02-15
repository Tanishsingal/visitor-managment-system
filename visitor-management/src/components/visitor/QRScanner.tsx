// // src/components/visitor/QRScanner.tsx
// import { useEffect, useState } from 'react';
// import { Html5QrcodeScanner } from 'html5-qrcode';
// import { Button } from '../common/Button';

// interface QRScannerProps {
//   onScanSuccess: (visitId: string) => void;
//   onScanError: (error: string) => void;
//   onClose?: () => void;
// }

// export const QRScanner: React.FC<QRScannerProps> = ({ 
//   onScanSuccess, 
//   onScanError,
//   onClose 
// }) => {
//   const [isScanning, setIsScanning] = useState(false);

//   useEffect(() => {
//     const qrScanner = new Html5QrcodeScanner(
//       "reader",
//       { 
//         fps: 10, 
//         qrbox: { width: 250, height: 250 },
//         aspectRatio: 1.0,
//         showTorchButtonIfSupported: true,
//         showZoomSliderIfSupported: true,
//       },
//       /* verbose= */ false
//     );

//     qrScanner.render(
//       (decodedText) => {
//         setIsScanning(false);
//         onScanSuccess(decodedText);
//         qrScanner.clear();
//       },
//       (error) => {
//         console.error(error);
//         onScanError(error?.message || 'Scanning failed');
//       }
//     );

//     setIsScanning(true);

//     return () => {
//       qrScanner.clear();
//     };
//   }, [onScanSuccess, onScanError]);

//   return (
//     <div className="flex flex-col items-center space-y-4">
//       <div className="w-full max-w-md bg-white p-4 rounded-lg shadow">
//         <div id="reader" className="w-full"></div>
//       </div>
      
//       {isScanning && (
//         <div className="text-sm text-gray-600">
//           Position the QR code within the frame to scan
//         </div>
//       )}

//       {onClose && (
//         <Button
//           variant="outline"
//           onClick={onClose}
//           className="mt-4"
//         >
//           Cancel Scanning
//         </Button>
//       )}
//     </div>
//   );
// };

// src/components/visitor/QRScanner.tsx
import { useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

interface QRScannerProps {
  onScanSuccess: (decodedText: string) => void;
  onScanError: (error: string) => void;
}

export const QRScanner: React.FC<QRScannerProps> = ({ 
  onScanSuccess, 
  onScanError 
}) => {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      { 
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0
      },
      false
    );

    scanner.render(
      (decodedText) => {
        scanner.clear();
        onScanSuccess(decodedText);
      },
      (error) => {
        if (error) {
          onScanError(error || 'Scanning failed');
        }
      }
    );

    return () => {
      scanner.clear();
    };
  }, [onScanSuccess, onScanError]);

  return (
    <div className="relative">
      <div id="reader" className="w-full"></div>
      <p className="text-sm text-gray-500 text-center mt-2">
        Position the QR code within the frame to scan
      </p>
    </div>
  );
};
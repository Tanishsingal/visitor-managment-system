// // src/components/visitor/QRScanner.tsx
// import { useEffect, useState } from 'react';
// import { Html5QrcodeScanner } from 'html5-qrcode';
// import { Button } from '../../components/common/Button';

// interface QRScannerProps {
//   onScanSuccess: (visitId: string) => void;
//   onScanError: (error: string) => void;
// }

// export const QRScanner: React.FC<QRScannerProps> = ({ 
//   onScanSuccess, 
//   onScanError 
// }) => {
//   const [scanner, setScanner] = useState<Html5QrcodeScanner | null>(null);

//   useEffect(() => {
//     const qrScanner = new Html5QrcodeScanner(
//       "reader",
//       { fps: 10, qrbox: { width: 250, height: 250 } },
//       /* verbose= */ false
//     );

//     qrScanner.render(
//       (decodedText) => {
//         onScanSuccess(decodedText);
//         qrScanner.clear();
//       },
//       (error) => {
//         onScanError(error?.message || 'Scanning failed');
//       }
//     );

//     setScanner(qrScanner);

//     return () => {
//       if (scanner) {
//         scanner.clear();
//       }
//     };
//   }, []);

//   return (
//     <div className="flex flex-col items-center">
//       <div id="reader" className="w-full max-w-md"></div>
//     </div>
//   );
// };

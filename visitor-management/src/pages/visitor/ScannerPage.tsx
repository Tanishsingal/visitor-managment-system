
// // src/pages/visitor/ScannerPage.tsx
// import { useState } from 'react';
// import { QRScanner } from '../../components/visitor/QRScanner';
// import { Visit } from '../../types';
// import toast from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';

// export const ScannerPage = () => {
//   const [isProcessing, setIsProcessing] = useState(false);
//   const navigate = useNavigate();

//   const handleScanSuccess = async (qrData: string) => {
//     setIsProcessing(true);
//     try {
//       // Validate QR data format
//       const visitData = JSON.parse(qrData);
      
//       // API call to verify and process the visit
//       // const response = await api.post('/visits/verify', visitData);
      
//       toast.success('QR code verified successfully');
//       // Navigate to check-in confirmation or details page
//       navigate(`/visit/confirm/${visitData.id}`);
//     } catch (error) {
//       toast.error('Invalid QR code or visit not found');
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto px-4 py-8">
//       <div className="bg-white rounded-lg shadow-lg p-6">
//         <h2 className="text-2xl font-bold text-gray-900 mb-6">
//           Scan Visit QR Code
//         </h2>

//         {isProcessing ? (
//           <div className="flex justify-center items-center h-64">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
//           </div>
//         ) : (
//           <QRScanner
//             onScanSuccess={handleScanSuccess}
//             onScanError={(error) => toast.error(error)}
//             onClose={() => navigate(-1)}
//           />
//         )}

//         <div className="mt-6 text-center text-sm text-gray-600">
//           <p>Please ensure you have camera permissions enabled.</p>
//           <p className="mt-2">The QR code should be clearly visible and well-lit.</p>
//         </div>
//       </div>
//     </div>
//   );
// };


// src/pages/visitor/ScannerPage.tsx
import { useState } from 'react';
import { QRScanner } from '../../components/visitor/QRScanner';
import { Button } from '../../components/common/Button';
import { parseQRData, validateQRData } from '../../utils/qrUtils';
import { Visit } from '../../types';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const ScannerPage = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isScanning, setIsScanning] = useState(true);
  const navigate = useNavigate();

  const handleScanSuccess = async (qrData: string) => {
    setIsProcessing(true);
    try {
      // Parse and validate QR code data
      const parsedData = parseQRData(qrData);
      
      if (!validateQRData(parsedData)) {
        throw new Error('Invalid QR code format');
      }

      // Verify visit details
      const response = await api.get(`/visits/${parsedData.id}`);
      const visit: Visit = response.data;

      // Verify visitor ID matches
      if (visit.visitorId !== parsedData.visitorId) {
        throw new Error('Invalid visitor information');
      }

      // Navigate to check-in/out confirmation
      navigate(`/visit/confirm/${visit.id}`);
      toast.success('QR code verified successfully');
    } catch (error) {
      toast.error(error|| 'Invalid QR code or visit not found');
      setIsScanning(true); // Reset to scanning state
    } finally {
      setIsProcessing(false);
    }
  };

  const handleScanError = (error: string) => {
    toast.error(error || 'Failed to scan QR code');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Scan Visit QR Code
        </h2>

        {isProcessing ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
          </div>
        ) : (
          <div className="space-y-6">
            {isScanning ? (
              <div>
                <QRScanner
                  onScanSuccess={handleScanSuccess}
                  onScanError={handleScanError}
                />
                <p className="text-sm text-gray-500 text-center mt-4">
                  Position the QR code within the frame to scan
                </p>
              </div>
            ) : (
              <Button
                onClick={() => setIsScanning(true)}
                className="w-full"
              >
                Scan Again
              </Button>
            )}

            <div className="mt-6">
              <Button
                variant="outline"
                onClick={() => navigate(-1)}
                className="w-full"
              >
                Cancel
              </Button>
            </div>

            {/* Instructions */}
            <div className="mt-8 border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Instructions
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mr-2">
                    1
                  </span>
                  Hold your device steady and point the camera at the QR code
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mr-2">
                    2
                  </span>
                  Make sure the QR code is well-lit and clearly visible
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mr-2">
                    3
                  </span>
                  The scan will automatically complete when successful
                </li>
              </ul>
            </div>

            {/* Error Messages */}
            <div className="mt-6 text-sm text-gray-500">
              <p>Having trouble scanning?</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Ensure your camera is working properly</li>
                <li>Clean your camera lens</li>
                <li>Try scanning in a well-lit area</li>
                <li>Hold your device steady</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

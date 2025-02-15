
// // src/components/visitor/CheckInOutProcess.tsx
// import { useState } from 'react';
// import { QRScanner } from './QRScanner';
// import { Button } from '../common/Button';
// import api from '../../services/api';
// import toast from 'react-hot-toast';
// import { Visit } from '../../types';

// export const CheckInOutProcess = () => {
//   const [isScanning, setIsScanning] = useState(false);
//   const [visitDetails, setVisitDetails] = useState<Visit | null>(null);
//   const [isProcessing, setIsProcessing] = useState(false);

//   const handleScan = async (qrData: string) => {
//     try {
//       const visitId = JSON.parse(qrData).id;
//       const response = await api.get(`/visits/${visitId}`);
//       setVisitDetails(response.data);
//       setIsScanning(false);
//     } catch (error) {
//       toast.error('Invalid QR code or visit not found');
//     }
//   };

//   const handleCheckInOut = async () => {
//     if (!visitDetails) return;

//     setIsProcessing(true);
//     try {
//       const action = visitDetails.status === 'APPROVED' ? 'check-in' : 'check-out';
//       const response = await api.post(`/visits/${visitDetails.id}/${action}`);
//       toast.success(`Successfully ${action}ed`);
//       setVisitDetails(response.data);
//     } catch (error) {
//       toast.error(`Failed to ${visitDetails.status === 'APPROVED' ? 'check in' : 'check out'}`);
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-6">
//       <div className="bg-white shadow rounded-lg p-6">
//         <h2 className="text-2xl font-bold text-gray-900 mb-6">
//           Visitor Check-In/Out
//         </h2>

//         {!isScanning && !visitDetails && (
//           <Button
//             onClick={() => setIsScanning(true)}
//             className="w-full"
//           >
//             Scan QR Code
//           </Button>
//         )}

//         {isScanning && (
//           <div className="space-y-4">
//             <QRScanner
//               onScanSuccess={handleScan}
//               onScanError={(error) => toast.error(error)}
//             />
//             <Button
//               variant="outline"
//               onClick={() => setIsScanning(false)}
//               className="w-full"
//             >
//               Cancel
//             </Button>
//           </div>
//         )}

//         {visitDetails && (
//           <div className="space-y-6">
//             <div className="border-t border-b border-gray-200 py-4">
//               <dl className="divide-y divide-gray-200">
//                 <div className="py-3 grid grid-cols-3 gap-4">
//                   <dt className="text-sm font-medium text-gray-500">Visitor</dt>
//                   <dd className="text-sm text-gray-900 col-span-2">
//                     {visitDetails.visitor.fullName}
//                   </dd>
//                 </div>
//                 <div className="py-3 grid grid-cols-3 gap-4">
//                   <dt className="text-sm font-medium text-gray-500">Meeting With</dt>
//                   <dd className="text-sm text-gray-900 col-span-2">
//                     {visitDetails.employee.fullName}
//                   </dd>
//                 </div>
//                 <div className="py-3 grid grid-cols-3 gap-4">
//                   <dt className="text-sm font-medium text-gray-500">Purpose</dt>
//                   <dd className="text-sm text-gray-900 col-span-2">
//                     {visitDetails.purpose}
//                   </dd>
//                 </div>
//                 <div className="py-3 grid grid-cols-3 gap-4">
//                   <dt className="text-sm font-medium text-gray-500">Status</dt>
//                   <dd className="text-sm text-gray-900 col-span-2">
//                     <span className={`px-2 py-1 rounded-full text-xs font-medium
//                       ${visitDetails.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
//                         visitDetails.status === 'CHECKED_IN' ? 'bg-blue-100 text-blue-800' :
//                         'bg-gray-100 text-gray-800'}
//                     `}>
//                       {visitDetails.status}
//                     </span>
//                   </dd>
//                 </div>
//               </dl>
//             </div>

//             {['APPROVED', 'CHECKED_IN'].includes(visitDetails.status) && (
//               <Button
//                 onClick={handleCheckInOut}
//                 isLoading={isProcessing}
//                 className="w-full"
//               >
//                 {visitDetails.status === 'APPROVED' ? 'Check In' : 'Check Out'}
//               </Button>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// src/components/visitor/CheckInOutProcess.tsx
import { useState } from 'react';
import { QRScanner } from './QRScanner';
import { Button } from '../common/Button';
import { parseQRData, validateQRData } from '../../utils/qrUtils';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { Visit, VisitStatus } from '../../types'; // Update import to include VisitStatus

export const CheckInOutProcess = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [visitDetails, setVisitDetails] = useState<Visit | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleScan = async (qrData: string) => {
    try {
      const parsedData = parseQRData(qrData);
      
      if (!validateQRData(parsedData)) {
        throw new Error('Invalid QR code');
      }

      const response = await api.get(`/visits/${parsedData.id}`);
      setVisitDetails(response.data);
      setIsScanning(false);
    } catch (error) {
      toast.error('Invalid QR code or visit not found'+error);
    }
  };

  const handleCheckInOut = async () => {
    if (!visitDetails) return;

    setIsProcessing(true);
    try {
      const action = visitDetails.status === 'APPROVED' ? 'check-in' : 'check-out';
      const response = await api.post(`/visits/${visitDetails.id}/${action}`);
      
      // Update visit details
      setVisitDetails(response.data);
      
      // Show success message
      toast.success(`Successfully ${action === 'check-in' ? 'checked in' : 'checked out'}`);
      
      // Notify employee
      await api.post(`/notifications/employee/${visitDetails.employeeId}`, {
        type: action.toUpperCase(),
        visitorName: visitDetails.visitor.fullName
      });
    } catch (error) {
      toast.error(`Failed to ${visitDetails.status === 'APPROVED' ? 'check in' : 'check out'}`+error);
    } finally {
      setIsProcessing(false);
    }
  };

  const getStatusBadgeColor = (status: VisitStatus) => {
    const colors = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      APPROVED: 'bg-green-100 text-green-800',
      DENIED: 'bg-red-100 text-red-800',
      CHECKED_IN: 'bg-blue-100 text-blue-800',
      CHECKED_OUT: 'bg-gray-100 text-gray-800',
      OVERSTAY: 'bg-orange-100 text-orange-800'
    };
    return colors[status] || colors.PENDING;
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Visitor Check-In/Out
        </h2>

        {!isScanning && !visitDetails && (
          <Button
            onClick={() => setIsScanning(true)}
            className="w-full"
          >
            Scan QR Code
          </Button>
        )}

        {isScanning && (
          <div className="space-y-4">
            <QRScanner
              onScanSuccess={handleScan}
              onScanError={(error) => toast.error(error)}
            />
            <Button
              variant="outline"
              onClick={() => setIsScanning(false)}
              className="w-full"
            >
              Cancel
            </Button>
          </div>
        )}

        {visitDetails && (
          <div className="space-y-6">
            <div className="border-t border-b border-gray-200 py-4">
              <dl className="divide-y divide-gray-200">
                <div className="py-3 grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500">Visitor</dt>
                  <dd className="text-sm text-gray-900 col-span-2">
                    {visitDetails.visitor.fullName}
                  </dd>
                </div>
                {visitDetails.visitor.company && (
                  <div className="py-3 grid grid-cols-3 gap-4">
                    <dt className="text-sm font-medium text-gray-500">Company</dt>
                    <dd className="text-sm text-gray-900 col-span-2">
                      {visitDetails.visitor.company}
                    </dd>
                  </div>
                )}
                <div className="py-3 grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500">Meeting With</dt>
                  <dd className="text-sm text-gray-900 col-span-2">
                    {visitDetails.employee.fullName}
                  </dd>
                </div>
                <div className="py-3 grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500">Department</dt>
                  <dd className="text-sm text-gray-900 col-span-2">
                    {visitDetails.employee.department}
                  </dd>
                </div>
                <div className="py-3 grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500">Purpose</dt>
                  <dd className="text-sm text-gray-900 col-span-2">
                    {visitDetails.purpose}
                  </dd>
                </div>
                <div className="py-3 grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500">Status</dt>
                  <dd className="text-sm text-gray-900 col-span-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(visitDetails.status)}`}>
                      {visitDetails.status}
                    </span>
                  </dd>
                </div>
              </dl>
            </div>

            {['APPROVED', 'CHECKED_IN'].includes(visitDetails.status) && (
              <Button
                onClick={handleCheckInOut}
                isLoading={isProcessing}
                className="w-full"
              >
                {visitDetails.status === 'APPROVED' ? 'Check In' : 'Check Out'}
              </Button>
            )}

            {visitDetails.status === 'CHECKED_OUT' && (
              <div className="text-center text-sm text-gray-500">
                Visit completed at {new Date(visitDetails.checkOut!).toLocaleTimeString()}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
// // // src/components/visitor/CheckInOut.tsx
// // import { useState } from 'react';
// // import { QRScanner } from './QRScanner';
// // import { Button } from '../../components/common/Button';
// // import api from '../../services/api';
// // import toast from 'react-hot-toast';

// // export const CheckInOut = () => {
// //   const [isScanning, setIsScanning] = useState(false);
// //   const [isLoading, setIsLoading] = useState(false);

// //   const handleScan = async (qrData: string) => {
// //     setIsLoading(true);
// //     try {
// //       const visitId = JSON.parse(qrData).id;
// //       const response = await api.post(`/visits/${visitId}/check-in`);
// //       toast.success(response.data.message);
// //     } catch (error) {
// //       toast.error('Invalid QR code or visit not found');
// //     } finally {
// //       setIsLoading(false);
// //       setIsScanning(false);
// //     }
// //   };

// //   const handleCheckOut = async (qrData: string) => {
// //     setIsLoading(true);
// //     try {
// //       const visitId = JSON.parse(qrData).id;
// //       const response = await api.post(`/visits/${visitId}/check-out`);
// //       toast.success(response.data.message);
// //     } catch (error) {
// //       toast.error('Failed to check out');
// //     } finally {
// //       setIsLoading(false);
// //       setIsScanning(false);
// //     }
// //   };

// //   return (
// //     <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
// //       <h2 className="text-2xl font-bold mb-6">Visitor Check-In/Out</h2>

// //       {!isScanning ? (
// //         <div className="space-y-4">
// //           <Button
// //             onClick={() => setIsScanning(true)}
// //             className="w-full"
// //             isLoading={isLoading}
// //           >
// //             Scan QR Code
// //           </Button>
// //         </div>
// //       ) : (
// //         <div>
// //           <QRScanner
// //             onScanSuccess={handleScan}
// //             onScanError={(error) => toast.error(error)}
// //             onClose={() => setIsScanning(false)}
// //           />
// //         </div>
// //       )}
// //     </div>
// //   );
// // };


// // src/components/visitor/CheckInOut.tsx
// import { useState } from 'react';
// import { QRScanner } from '../../components/visitor/QRScanner';
// import { Button } from '../common/Button';
// import api from '../../services/api';
// import toast from 'react-hot-toast';

// interface VisitDetails {
//   id: number;
//   visitor: {
//     fullName: string;
//     company?: string;
//   };
//   employee: {
//     fullName: string;
//     department: string;
//   };
//   purpose: string;
//   status: string;
// }

// export const CheckInOut = () => {
//   const [isScanning, setIsScanning] = useState(false);
//   const [visitDetails, setVisitDetails] = useState<VisitDetails | null>(null);
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
//       toast.success(response.data.message);
//       setVisitDetails(response.data.visit);
//     } catch (error) {
//       toast.error('Operation failed');
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
//                 {visitDetails.visitor.company && (
//                   <div className="py-3 grid grid-cols-3 gap-4">
//                     <dt className="text-sm font-medium text-gray-500">Company</dt>
//                     <dd className="text-sm text-gray-900 col-span-2">
//                       {visitDetails.visitor.company}
//                     </dd>
//                   </div>
//                 )}
//                 <div className="py-3 grid grid-cols-3 gap-4">
//                   <dt className="text-sm font-medium text-gray-500">Meeting With</dt>
//                   <dd className="text-sm text-gray-900 col-span-2">
//                     {visitDetails.employee.fullName}
//                   </dd>
//                 </div>
//                 <div className="py-3 grid grid-cols-3 gap-4">
//                   <dt className="text-sm font-medium text-gray-500">Department</dt>
//                   <dd className="text-sm text-gray-900 col-span-2">
//                     {visitDetails.employee.department}
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
//                         'bg-gray-100 text-gray-800'}`}
//                     >
//                       {visitDetails.status}
//                     </span>
//                   </dd>
//                 </div>
//               </dl>
//             </div>

//             <Button
//               onClick={handleCheckInOut}
//               isLoading={isProcessing}
//               className="w-full"
//               disabled={!['APPROVED', 'CHECKED_IN'].includes(visitDetails.status)}
//             >
//               {visitDetails.status === 'APPROVED' ? 'Check In' : 'Check Out'}
//             </Button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };


// // src/components/visits/VisitStatusManager.tsx
// import { useState, useEffect } from 'react';
// import { Visit, VisitStatus } from '../../types';
// import { Button } from '../common/Button';
// import api from '../../services/api';
// import { emailService } from '../../services/emailService';
// import { generateQRCode } from '../../utils/qrCodeGenerator';
// import toast from 'react-hot-toast';

// interface VisitStatusManagerProps {
//   visitId: number;
//   onStatusUpdate?: (visit: Visit) => void;
// }

// export const VisitStatusManager = ({ visitId, onStatusUpdate }: VisitStatusManagerProps) => {
//   const [visit, setVisit] = useState<Visit | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [denyReason, setDenyReason] = useState('');
//   const [showDenyDialog, setShowDenyDialog] = useState(false);

//   useEffect(() => {
//     fetchVisitDetails();
//   }, [visitId]);

//   const fetchVisitDetails = async () => {
//     try {
//       const response = await api.get(`/visits/${visitId}`);
//       setVisit(response.data);
//     } catch (error) {
//       toast.error('Failed to fetch visit details');
//     }
//   };

//   const handleApprove = async () => {
//     if (!visit) return;
//     setIsLoading(true);

//     try {
//       const response = await api.put(`/visits/${visitId}/approve`);
//       const updatedVisit = response.data;
      
//       // Generate QR code
//       const qrCode = await generateQRCode(visitId.toString());
      
//       // Send approval email
//       await emailService.sendVisitApprovedEmail(
//         visit.visitor.email,
//         visit.visitor.fullName,
//         visit.employee.fullName,
//         new Date(visit.checkIn).toLocaleString(),
//         qrCode
//       );

//       setVisit(updatedVisit);
//       onStatusUpdate?.(updatedVisit);
//       toast.success('Visit approved successfully');
//     } catch (error) {
//       toast.error('Failed to approve visit');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleDeny = async () => {
//     if (!visit || !denyReason) return;
//     setIsLoading(true);

//     try {
//       const response = await api.put(`/visits/${visitId}/deny`, { reason: denyReason });
//       const updatedVisit = response.data;

//       // Send denial email
//       await emailService.sendVisitDeniedEmail(
//         visit.visitor.email,
//         visit.visitor.fullName,
//         denyReason
//       );

//       setVisit(updatedVisit);
//       onStatusUpdate?.(updatedVisit);
//       toast.success('Visit denied successfully');
//       setShowDenyDialog(false);
//     } catch (error) {
//       toast.error('Failed to deny visit');
//     } finally {
//       setIsLoading(false);
//       setDenyReason('');
//     }
//   };

//   const getStatusBadgeColor = (status: VisitStatus) => {
//     switch (status) {
//       case 'APPROVED': return 'bg-green-100 text-green-800';
//       case 'DENIED': return 'bg-red-100 text-red-800';
//       case 'CHECKED_IN': return 'bg-blue-100 text-blue-800';
//       case 'CHECKED_OUT': return 'bg-gray-100 text-gray-800';
//       default: return 'bg-yellow-100 text-yellow-800';
//     }
//   };

//   if (!visit) return null;

//   return (
//     <div className="bg-white shadow rounded-lg p-6">
//       <div className="flex justify-between items-center mb-4">
//         <h3 className="text-lg font-medium text-gray-900">Visit Status</h3>
//         <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(visit.status)}`}>
//           {visit.status}
//         </span>
//       </div>

//       <div className="space-y-4">
//         {/* Visit Details */}
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <p className="text-sm text-gray-500">Visitor</p>
//             <p className="font-medium">{visit.visitor.fullName}</p>
//           </div>
//           <div>
//             <p className="text-sm text-gray-500">Purpose</p>
//             <p className="font-medium">{visit.purpose}</p>
//           </div>
//           <div>
//             <p className="text-sm text-gray-500">Visit Date</p>
//             <p className="font-medium">{new Date(visit.checkIn).toLocaleDateString()}</p>
//           </div>
//           <div>
//             <p className="text-sm text-gray-500">Visit Time</p>
//             <p className="font-medium">{new Date(visit.checkIn).toLocaleTimeString()}</p>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         {visit.status === 'PENDING' && (
//           <div className="flex space-x-3">
//             <Button
//               onClick={handleApprove}
//               isLoading={isLoading}
//               className="flex-1"
//             >
//               Approve
//             </Button>
//             <Button
//               onClick={() => setShowDenyDialog(true)}
//               variant="outline"
//               className="flex-1"
//               isLoading={isLoading}
//             >
//               Deny
//             </Button>
//           </div>
//         )}

//         {/* Deny Dialog */}
//         {showDenyDialog && (
//           <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4">
//             <div className="bg-white rounded-lg p-6 max-w-md w-full">
//               <h4 className="text-lg font-medium text-gray-900 mb-4">Deny Visit</h4>
//               <textarea
//                 value={denyReason}
//                 onChange={(e) => setDenyReason(e.target.value)}
//                 placeholder="Please provide a reason for denial"
//                 className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                 rows={3}
//               />
//               <div className="mt-4 flex justify-end space-x-3">
//                 <Button
//                   variant="outline"
//                   onClick={() => {
//                     setShowDenyDialog(false);
//                     setDenyReason('');
//                   }}
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   onClick={handleDeny}
//                   isLoading={isLoading}
//                   disabled={!denyReason.trim()}
//                 >
//                   Confirm Denial
//                 </Button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Status Timeline */}
//         <div className="mt-6 border-t pt-4">
//           <h4 className="text-sm font-medium text-gray-900 mb-2">Status Timeline</h4>
//           <div className="space-y-2">
//             <div className="flex items-center text-sm">
//               <div className="w-2 h-2 rounded-full bg-blue-500 mr-2" />
//               <span className="text-gray-500">Request Created:</span>
//               <span className="ml-2">{new Date(visit.checkIn).toLocaleString()}</span>
//             </div>
//             {visit.status !== 'PENDING' && (
//               <div className="flex items-center text-sm">
//                 <div className={`w-2 h-2 rounded-full mr-2 ${
//                   visit.status === 'APPROVED' ? 'bg-green-500' : 'bg-red-500'
//                 }`} />
//                 <span className="text-gray-500">
//                   {visit.status === 'APPROVED' ? 'Approved' : 'Denied'}:
//                 </span>
//                 <span className="ml-2">{new Date().toLocaleString()}</span>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// src/components/visits/VisitStatusManager.tsx
import { useState, useEffect } from 'react';
import { Visit, VisitStatus } from '../../types';
import { Button } from '../common/Button';
import api from '../../services/api';
import { emailService } from '../../services/emailService';
import { generateQRCode } from '../../utils/qrUtils';
import toast from 'react-hot-toast';

interface VisitStatusManagerProps {
  visitId: number;
  onStatusUpdate?: (visit: Visit) => void;
}

export const VisitStatusManager = ({ visitId, onStatusUpdate }: VisitStatusManagerProps) => {
  const [visit, setVisit] = useState<Visit | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [denyReason, setDenyReason] = useState('');
  const [showDenyDialog, setShowDenyDialog] = useState(false);

  useEffect(() => {
    fetchVisitDetails();
  }, [visitId]);

  const fetchVisitDetails = async () => {
    try {
      const response = await api.get(`/visits/${visitId}`);
      setVisit(response.data);
    } catch (error) {
      toast.error('Failed to fetch visit details'+error);
    }
  };

  const handleApprove = async () => {
    if (!visit) return;
    setIsLoading(true);

    try {
      // Update visit status
      const response = await api.put(`/visits/${visitId}/approve`);
      const updatedVisit = response.data;

      // Generate QR code
      const qrCode = await generateQRCode(updatedVisit);

      // Send approval email with QR code
      await emailService.sendVisitApprovedEmail(
        visit.visitor.email,
        visit.visitor.fullName,
        visit.employee.fullName,
        new Date(visit.checkIn).toLocaleString(),
        qrCode
      );

      setVisit(updatedVisit);
      onStatusUpdate?.(updatedVisit);
      toast.success('Visit approved and notification sent');
    } catch (error) {
      toast.error('Failed to approve visit'+error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeny = async () => {
    if (!visit || !denyReason.trim()) return;
    setIsLoading(true);

    try {
      // Update visit status
      const response = await api.put(`/visits/${visitId}/deny`, { reason: denyReason });
      const updatedVisit = response.data;

      // Send denial email
      await emailService.sendVisitDeniedEmail(
        visit.visitor.email,
        visit.visitor.fullName,
        denyReason
      );

      setVisit(updatedVisit);
      onStatusUpdate?.(updatedVisit);
      toast.success('Visit denied and notification sent');
      setShowDenyDialog(false);
    } catch (error) {
      toast.error('Failed to deny visit'+error);
    } finally {
      setIsLoading(false);
      setDenyReason('');
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

  if (!visit) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-gray-900">Visit Details</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(visit.status)}`}>
          {visit.status}
        </span>
      </div>

      {/* Visit Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-sm text-gray-500">Visitor Name</p>
          <p className="font-medium">{visit.visitor.fullName}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="font-medium">{visit.visitor.email}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Visit Date</p>
          <p className="font-medium">{new Date(visit.checkIn).toLocaleDateString()}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Visit Time</p>
          <p className="font-medium">{new Date(visit.checkIn).toLocaleTimeString()}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Purpose</p>
          <p className="font-medium">{visit.purpose}</p>
        </div>
        {visit.visitor.company && (
          <div>
            <p className="text-sm text-gray-500">Company</p>
            <p className="font-medium">{visit.visitor.company}</p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      {visit.status === 'PENDING' && (
        <div className="flex space-x-3">
          <Button
            onClick={handleApprove}
            isLoading={isLoading}
            className="flex-1"
          >
            Approve
          </Button>
          <Button
            onClick={() => setShowDenyDialog(true)}
            variant="outline"
            className="flex-1"
            isLoading={isLoading}
          >
            Deny
          </Button>
        </div>
      )}

      {/* Status Timeline */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-900 mb-4">Visit Timeline</h4>
        <div className="space-y-3">
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-blue-500 mr-3" />
            <span className="text-sm text-gray-500">Request Created:</span>
            <span className="text-sm ml-2">{new Date(visit.checkIn).toLocaleString()}</span>
          </div>
          {visit.status !== 'PENDING' && (
            <div className="flex items-center">
              <div className={`w-2 h-2 rounded-full mr-3 ${
                visit.status === 'APPROVED' ? 'bg-green-500' : 'bg-red-500'
              }`} />
              <span className="text-sm text-gray-500">
                {visit.status === 'APPROVED' ? 'Approved' : 'Denied'}:
              </span>
              <span className="text-sm ml-2">{new Date().toLocaleString()}</span>
            </div>
          )}
        </div>
      </div>

      {/* Deny Dialog */}
      {showDenyDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Deny Visit</h4>
            <textarea
              value={denyReason}
              onChange={(e) => setDenyReason(e.target.value)}
              placeholder="Please provide a reason for denial"
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              rows={3}
            />
            <div className="mt-4 flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => {
                  setShowDenyDialog(false);
                  setDenyReason('');
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleDeny}
                isLoading={isLoading}
                disabled={!denyReason.trim()}
              >
                Confirm Denial
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisitStatusManager;
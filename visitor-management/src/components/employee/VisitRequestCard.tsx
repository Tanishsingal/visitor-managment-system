// // src/components/employee/VisitRequestCard.tsx
// import { Visit } from '../../types';
// import { Button } from '../../components/common/Button';

// interface VisitRequestCardProps {
//   visit: Visit;
//   onApprove: (id: number) => void;
//   onDeny: (id: number) => void;
//   isLoading?: boolean;
// }

// export const VisitRequestCard = ({ 
//   visit, 
//   onApprove, 
//   onDeny, 
//   isLoading 
// }: VisitRequestCardProps) => {
//   return (
//     <div className="bg-white shadow rounded-lg p-6">
//       <div className="flex justify-between items-start">
//         <div>
//           <h3 className="text-lg font-medium text-gray-900">
//             {visit.visitor.fullName}
//           </h3>
//           <p className="text-sm text-gray-500">{visit.visitor.company}</p>
//         </div>
//         <span className={`
//           px-2 py-1 text-xs font-medium rounded-full
//           ${visit.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 
//             visit.status === 'APPROVED' ? 'bg-green-100 text-green-800' : 
//             'bg-red-100 text-red-800'}
//         `}>
//           {visit.status}
//         </span>
//       </div>

//       <div className="mt-4 space-y-2">
//         <p className="text-sm text-gray-600">
//           <span className="font-medium">Purpose:</span> {visit.purpose}
//         </p>
//         <p className="text-sm text-gray-600">
//           <span className="font-medium">Date:</span> {new Date(visit.checkIn).toLocaleDateString()}
//         </p>
//         <p className="text-sm text-gray-600">
//           <span className="font-medium">Time:</span> {new Date(visit.checkIn).toLocaleTimeString()}
//         </p>
//       </div>

//       {visit.status === 'PENDING' && (
//         <div className="mt-6 flex space-x-3">
//           <Button
//             onClick={() => onApprove(visit.id)}
//             isLoading={isLoading}
//             className="flex-1"
//           >
//             Approve
//           </Button>
//           <Button
//             onClick={() => onDeny(visit.id)}
//             variant="outline"
//             isLoading={isLoading}
//             className="flex-1"
//           >
//             Deny
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// };


// src/components/employee/VisitRequestCard.tsx
import { useState } from 'react';
import { Visit } from '../../types';
import { Button } from '../common/Button';
import api from '../../services/api';
import toast from 'react-hot-toast';

interface VisitRequestCardProps {
  visit: Visit;
  onStatusUpdate: () => void;
}

export const VisitRequestCard = ({ visit, onStatusUpdate }: VisitRequestCardProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = async (action: 'approve' | 'deny') => {
    setIsLoading(true);
    try {
      await api.put(`/visits/${visit.id}/${action}`);
      toast.success(`Visit ${action}d successfully`);
      onStatusUpdate();
    } catch (error) {
      toast.error(`Failed to ${action} visit `+error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'APPROVED': return 'bg-green-100 text-green-800';
      case 'DENIED': return 'bg-red-100 text-red-800';
      case 'CHECKED_IN': return 'bg-blue-100 text-blue-800';
      case 'CHECKED_OUT': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-medium text-gray-900">
            {visit.visitor.fullName}
          </h3>
          <p className="text-sm text-gray-500">
            {visit.visitor.company && `From ${visit.visitor.company}`}
          </p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(visit.status)}`}>
          {visit.status}
        </span>
      </div>

      <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
        <div>
          <dt className="text-sm font-medium text-gray-500">Purpose</dt>
          <dd className="mt-1 text-sm text-gray-900">{visit.purpose}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-gray-500">Visit Date</dt>
          <dd className="mt-1 text-sm text-gray-900">
            {new Date(visit.checkIn).toLocaleDateString()}
          </dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-gray-500">Visit Time</dt>
          <dd className="mt-1 text-sm text-gray-900">
            {new Date(visit.checkIn).toLocaleTimeString()}
          </dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-gray-500">Contact</dt>
          <dd className="mt-1 text-sm text-gray-900">
            {visit.visitor.email}<br />
            {visit.visitor.phone}
          </dd>
        </div>
      </dl>

      {visit.status === 'PENDING' && (
        <div className="mt-6 flex space-x-3">
          <Button
            onClick={() => handleAction('approve')}
            isLoading={isLoading}
            className="flex-1"
          >
            Approve
          </Button>
          <Button
            onClick={() => handleAction('deny')}
            variant="outline"
            isLoading={isLoading}
            className="flex-1"
          >
            Deny
          </Button>
        </div>
      )}
    </div>
  );
};

// // src/pages/visitor/VisitStatus.tsx
// import { useState } from 'react';
// import { Input } from '../../components/common/Input';
// import { Button } from '../../components/common/Button';
// import { Visit } from '../../types';
// import QRCode from 'react-qr-code';
// import toast from 'react-hot-toast';

// export const VisitStatus = () => {
//   const [visitId, setVisitId] = useState('');
//   const [visit, setVisit] = useState<Visit | null>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleCheck = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     try {
//       // API call will go here
//       // const response = await api.get(`/visits/${visitId}`);
//       // setVisit(response.data);
//     } catch (error) {
//       toast.error('Failed to fetch visit status');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto">
//       <div className="bg-white shadow rounded-lg p-6">
//         <h2 className="text-2xl font-bold text-gray-900 mb-6">
//           Check Visit Status
//         </h2>

//         <form onSubmit={handleCheck} className="mb-6">
//           <Input
//             label="Visit ID"
//             value={visitId}
//             onChange={(e) => setVisitId(e.target.value)}
//             placeholder="Enter your visit ID"
//           />
//           <Button
//             type="submit"
//             isLoading={isLoading}
//             className="w-full mt-4"
//           >
//             Check Status
//           </Button>
//         </form>

//         {visit && (
//           <div className="border-t pt-6">
//             <div className="flex justify-between items-start">
//               <div>
//                 <h3 className="text-lg font-medium text-gray-900">
//                   Visit Details
//                 </h3>
//                 <p className="text-sm text-gray-500 mt-1">
//                   Status: <span className="font-medium">{visit.status}</span>
//                 </p>
//               </div>
//               {visit.status === 'APPROVED' && (
//                 <div className="p-4 bg-white shadow rounded">
//                   <QRCode value={visit.id.toString()} size={128} />
//                 </div>
//               )}
//             </div>

//             <dl className="mt-4 space-y-4">
//               <div>
//                 <dt className="text-sm font-medium text-gray-500">Visitor</dt>
//                 <dd className="text-sm text-gray-900">{visit.visitor.fullName}</dd>
//               </div>
//               <div>
//                 <dt className="text-sm font-medium text-gray-500">Purpose</dt>
//                 <dd className="text-sm text-gray-900">{visit.purpose}</dd>
//               </div>
//               <div>
//                 <dt className="text-sm font-medium text-gray-500">Check-in Time</dt>
//                 <dd className="text-sm text-gray-900">
//                   {new Date(visit.checkIn).toLocaleString()}
//                 </dd>
//               </div>
//               {visit.checkOut && (
//                 <div>
//                   <dt className="text-sm font-medium text-gray-500">Check-out Time</dt>
//                   <dd className="text-sm text-gray-900">
//                     {new Date(visit.checkOut).toLocaleString()}
//                   </dd>
//                 </div>
//               )}
//             </dl>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// src/pages/visitor/VisitStatus.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Visit } from '../../types';
import api from '../../services/api';
import toast from 'react-hot-toast';

export const VisitStatus = () => {
  const [visitId, setVisitId] = useState('');
  const [visit, setVisit] = useState<Visit | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitId.trim()) {
      toast.error('Please enter a visit ID');
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.get(`/visits/${visitId}`);
      setVisit(response.data);
    } catch (error) {
      toast.error('Failed to fetch visit status'+error);
      setVisit(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelVisit = async () => {
    if (!visit) return;

    if (!window.confirm('Are you sure you want to cancel this visit?')) {
      return;
    }

    setIsLoading(true);
    try {
      await api.put(`/visits/${visit.id}/cancel`);
      toast.success('Visit cancelled successfully');
      setVisit(null);
      setVisitId('');
    } catch (error) {
      toast.error('Failed to cancel visit'+error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadgeColor = (status: string) => {
    const colors = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      APPROVED: 'bg-green-100 text-green-800',
      DENIED: 'bg-red-100 text-red-800',
      CHECKED_IN: 'bg-blue-100 text-blue-800',
      CHECKED_OUT: 'bg-gray-100 text-gray-800',
      CANCELLED: 'bg-gray-100 text-gray-800'
    };
    return colors[status as keyof typeof colors] || colors.PENDING;
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Check Visit Status
        </h2>

        <form onSubmit={handleCheck} className="mb-6">
          <div className="space-y-4">
            <Input
              label="Visit ID"
              value={visitId}
              onChange={(e) => setVisitId(e.target.value)}
              placeholder="Enter your visit ID"
              disabled={isLoading}
            />
            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full"
            >
              Check Status
            </Button>
          </div>
        </form>

        {visit && (
          <div className="border-t pt-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Visit Details
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Status: {' '}
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeColor(visit.status)}`}>
                    {visit.status}
                  </span>
                </p>
              </div>
              {visit.status === 'APPROVED' && (
                <Button
                  onClick={() => navigate(`/visit-pass/${visit.id}`)}
                >
                  View Pass
                </Button>
              )}
            </div>

            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">Visitor</dt>
                <dd className="text-sm text-gray-900 mt-1">{visit.visitor.fullName}</dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500">Meeting With</dt>
                <dd className="text-sm text-gray-900 mt-1">{visit.employee.fullName}</dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500">Department</dt>
                <dd className="text-sm text-gray-900 mt-1">{visit.employee.department}</dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500">Purpose</dt>
                <dd className="text-sm text-gray-900 mt-1">{visit.purpose}</dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500">Visit Date</dt>
                <dd className="text-sm text-gray-900 mt-1">
                  {new Date(visit.checkIn).toLocaleDateString()}
                </dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500">Visit Time</dt>
                <dd className="text-sm text-gray-900 mt-1">
                  {new Date(visit.checkIn).toLocaleTimeString()}
                </dd>
              </div>
            </dl>

            {/* Status-specific messages and actions */}
            <div className="mt-6">
              {visit.status === 'PENDING' && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                  <p className="text-sm text-yellow-700">
                    Your visit request is being reviewed. You will be notified once it's approved.
                  </p>
                  <Button
                    onClick={handleCancelVisit}
                    variant="outline"
                    className="mt-4"
                    isLoading={isLoading}
                  >
                    Cancel Request
                  </Button>
                </div>
              )}

              {visit.status === 'APPROVED' && (
                <div className="bg-green-50 border border-green-200 rounded-md p-4">
                  <p className="text-sm text-green-700">
                    Your visit has been approved. Please show your QR code at reception when you arrive.
                  </p>
                  <Button
                    onClick={handleCancelVisit}
                    variant="outline"
                    className="mt-4"
                    isLoading={isLoading}
                  >
                    Cancel Visit
                  </Button>
                </div>
              )}

              {visit.status === 'DENIED' && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4">
                  <p className="text-sm text-red-700">
                    Your visit request has been denied. Please contact the office for more information.
                  </p>
                </div>
              )}

              {visit.status === 'CHECKED_IN' && (
                <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                  <p className="text-sm text-blue-700">
                    You are currently checked in. Please remember to check out when leaving.
                  </p>
                </div>
              )}

              {visit.status === 'CHECKED_OUT' && (
                <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
                  <p className="text-sm text-gray-700">
                    Visit completed. Check-out time: {new Date(visit.checkOut!).toLocaleTimeString()}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Help Section */}
        <div className="mt-8 border-t pt-6">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Need Help?</h4>
          <p className="text-sm text-gray-500">
            If you've lost your visit ID or need assistance, please contact:
          </p>
          <ul className="mt-2 text-sm text-gray-500">
            <li>• Reception: (123) 456-7890</li>
            <li>• Email: reception@company.com</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
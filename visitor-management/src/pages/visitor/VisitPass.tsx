
// // src/pages/visitor/VisitPass.tsx
// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { QRCodeGenerator } from './QRCodeGenerator';
// import { Visit } from '../../types';
// import api from '../../services/api';
// import toast from 'react-hot-toast';

// export const VisitPass = () => {
//   const { visitId } = useParams();
//   const [visit, setVisit] = useState<Visit | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     fetchVisitDetails();
//   }, [visitId]);

//   const fetchVisitDetails = async () => {
//     try {
//       const response = await api.get(`/visits/${visitId}`);
//       setVisit(response.data);
//     } catch (error) {
//       toast.error('Failed to fetch visit details');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
//       </div>
//     );
//   }

//   if (!visit) {
//     return (
//       <div className="text-center py-12">
//         <h2 className="text-2xl font-bold text-gray-900">Visit not found</h2>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-lg mx-auto px-4 py-8">
//       <div className="bg-white shadow rounded-lg overflow-hidden">
//         <div className="px-4 py-5 sm:p-6">
//           <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
//             Visitor Pass
//           </h2>
          
//           <div className="flex justify-center mb-6">
//             <QRCodeGenerator value={visitId} size={200} />
//           </div>

//           <div className="space-y-4">
//             <div>
//               <h3 className="text-sm font-medium text-gray-500">Visitor Name</h3>
//               <p className="mt-1 text-lg text-gray-900">{visit.visitor.fullName}</p>
//             </div>

//             <div>
//               <h3 className="text-sm font-medium text-gray-500">Meeting With</h3>
//               <p className="mt-1 text-lg text-gray-900">{visit.employee.fullName}</p>
//             </div>

//             <div>
//               <h3 className="text-sm font-medium text-gray-500">Purpose</h3>
//               <p className="mt-1 text-lg text-gray-900">{visit.purpose}</p>
//             </div>

//             <div>
//               <h3 className="text-sm font-medium text-gray-500">Visit Date</h3>
//               <p className="mt-1 text-lg text-gray-900">
//                 {new Date(visit.checkIn).toLocaleDateString()}
//               </p>
//             </div>

//             <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
//               <p className="text-sm text-blue-700">
//                 Please show this QR code at the reception desk when you arrive.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// src/pages/visitor/VisitPass.tsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { QRCodeGenerator } from '../../components/visitor/QRCodeGenerator';
import { Visit } from '../../types';
import { Button } from '../../components/common/Button';
import api from '../../services/api';
import toast from 'react-hot-toast';

export const VisitPass = () => {
  const { visitId } = useParams();
  const navigate = useNavigate();
  const [visit, setVisit] = useState<Visit | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [qrCode, setQrCode] = useState<string>('');

  useEffect(() => {
    fetchVisitDetails();
  }, [visitId]);

  const fetchVisitDetails = async () => {
    try {
      const response = await api.get(`/visits/${visitId}`);
      setVisit(response.data);
      generateQRCode(response.data);
    } catch (error) {
      toast.error('Failed to fetch visit details'+error);
      navigate('/visit-status');
    } finally {
      setIsLoading(false);
    }
  };

  const generateQRCode = async (visitData: Visit) => {
    try {
      const response = await api.get(`/visits/${visitData.id}/qr-code`);
      setQrCode(response.data.qrCode);
    } catch (error) {
      toast.error('Failed to generate QR code'+error);
    }
  };

  const handleDownloadPass = () => {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = qrCode;
    link.download = `visit-pass-${visitId}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusColor = (status: string) => {
    const colors = {
      APPROVED: 'bg-green-100 text-green-800',
      PENDING: 'bg-yellow-100 text-yellow-800',
      DENIED: 'bg-red-100 text-red-800',
      CHECKED_IN: 'bg-blue-100 text-blue-800',
      CHECKED_OUT: 'bg-gray-100 text-gray-800'
    };
    return colors[status as keyof typeof colors] || colors.PENDING;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (!visit) {
    return (
      <div className="max-w-lg mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Visit not found</h2>
        <p className="mt-2 text-gray-600">The visit you're looking for doesn't exist.</p>
        <Button
          onClick={() => navigate('/visit-status')}
          className="mt-4"
        >
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Visitor Pass
            </h2>
            <span className={`inline-flex mt-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(visit.status)}`}>
              {visit.status}
            </span>
          </div>
          
          {visit.status === 'APPROVED' && (
            <div className="flex justify-center mb-6">
              <QRCodeGenerator value={qrCode} size={200} />
            </div>
          )}

          <div className="space-y-4">
            <div className="border-t border-b border-gray-200 py-4">
              <dl className="divide-y divide-gray-200">
                <div className="py-3 grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500">Visitor Name</dt>
                  <dd className="text-sm text-gray-900 col-span-2">{visit.visitor.fullName}</dd>
                </div>

                <div className="py-3 grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500">Meeting With</dt>
                  <dd className="text-sm text-gray-900 col-span-2">{visit.employee.fullName}</dd>
                </div>

                <div className="py-3 grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500">Department</dt>
                  <dd className="text-sm text-gray-900 col-span-2">{visit.employee.department}</dd>
                </div>

                <div className="py-3 grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500">Purpose</dt>
                  <dd className="text-sm text-gray-900 col-span-2">{visit.purpose}</dd>
                </div>

                <div className="py-3 grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500">Visit Date</dt>
                  <dd className="text-sm text-gray-900 col-span-2">
                    {new Date(visit.checkIn).toLocaleDateString()}
                  </dd>
                </div>

                <div className="py-3 grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500">Visit Time</dt>
                  <dd className="text-sm text-gray-900 col-span-2">
                    {new Date(visit.checkIn).toLocaleTimeString()}
                  </dd>
                </div>
              </dl>
            </div>

            {visit.status === 'APPROVED' && (
              <div className="space-y-4">
                <Button
                  onClick={handleDownloadPass}
                  className="w-full"
                >
                  Download Pass
                </Button>

                <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                  <p className="text-sm text-blue-700">
                    Please show this QR code at the reception desk when you arrive.
                  </p>
                </div>
              </div>
            )}

            {visit.status === 'DENIED' && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <p className="text-sm text-red-700">
                  Your visit request has been denied. Please contact the office for more information.
                </p>
              </div>
            )}

            {visit.status === 'PENDING' && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                <p className="text-sm text-yellow-700">
                  Your visit request is pending approval. You will be notified once it's approved.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
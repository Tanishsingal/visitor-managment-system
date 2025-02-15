// // src/components/visits/VisitMonitor.tsx
// import { useState, useEffect } from 'react';
// import { wsService } from '../../services/websocketService';
// import { Visit } from '../../types';
// import api from '../../services/api';
// import toast from 'react-hot-toast';

// export const VisitMonitor = () => {
//   const [activeVisits, setActiveVisits] = useState<Visit[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     fetchActiveVisits();
//     const cleanup = setupRealTimeUpdates();
//     return cleanup;
//   }, []);

//   const fetchActiveVisits = async () => {
//     try {
//       const response = await api.get('/visits/active');
//       setActiveVisits(response.data);
//     } catch (error) {
//       toast.error('Failed to fetch active visits'+error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const setupRealTimeUpdates = () => {
//     const handleVisitUpdate = (data: { visit: Visit; action: string }) => {
//       const { visit, action } = data;
      
//       switch (action) {
//         case 'check-in':
//           setActiveVisits(prev => [...prev, visit]);
//           toast.success(`${visit.visitor.fullName} checked in`);
//           break;
//         case 'check-out':
//           setActiveVisits(prev => prev.filter(v => v.id !== visit.id));
//           toast.success(`${visit.visitor.fullName} checked out`);
//           break;
//         default:
//           break;
//       }
//     };

//     wsService.subscribe('visitUpdate', handleVisitUpdate);
//     return () => wsService.unsubscribe('visitUpdate', handleVisitUpdate);
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-48">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white shadow rounded-lg p-6">
//       <h2 className="text-lg font-medium text-gray-900 mb-4">Active Visits</h2>
      
//       {activeVisits.length === 0 ? (
//         <p className="text-gray-500 text-center py-4">No active visits</p>
//       ) : (
//         <div className="space-y-4">
//           {activeVisits.map((visit) => (
//             <div
//               key={visit.id}
//               className="border rounded-lg p-4 flex justify-between items-center"
//             >
//               <div>
//                 <h3 className="font-medium text-gray-900">
//                   {visit.visitor.fullName}
//                 </h3>
//                 <p className="text-sm text-gray-500">
//                   Meeting with: {visit.employee.fullName}
//                 </p>
//                 <p className="text-sm text-gray-500">
//                   Purpose: {visit.purpose}
//                 </p>
//               </div>
//               <div className="text-right">
//                 <p className="text-sm text-gray-500">
//                   Checked in at:
//                 </p>
//                 <p className="text-sm font-medium">
//                   {new Date(visit.checkIn).toLocaleTimeString()}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

import { useState, useEffect, useCallback } from 'react';
import { wsService } from '../../services/websocketService';
import { Visit } from '../../types';
import api from '../../services/api';
import toast from 'react-hot-toast';

export const VisitMonitor = () => {
  const [activeVisits, setActiveVisits] = useState<Visit[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchActiveVisits();
    const unsubscribe = setupRealTimeUpdates();
    return unsubscribe;
  }, []);

  const fetchActiveVisits = async () => {
    try {
      const { data } = await api.get<Visit[]>('/visits/active');
      setActiveVisits(data);
    } catch (error) {
      toast.error(`Failed to fetch active visits: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVisitUpdate = useCallback(
    (data: { visit: Visit; action: 'check-in' | 'check-out' }) => {
      const { visit, action } = data;
      setActiveVisits((prev) =>
        action === 'check-in'
          ? [...prev, visit]
          : prev.filter((v) => v.id !== visit.id)
      );
      toast.success(
        `${visit.visitor.fullName} ${
          action === 'check-in' ? 'checked in' : 'checked out'
        }`
      );
    },
    []
  );

  const setupRealTimeUpdates = () => {
    wsService.subscribe('visitUpdate', handleVisitUpdate);
    return () => wsService.unsubscribe('visitUpdate', handleVisitUpdate);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Active Visits</h2>
      {activeVisits.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No active visits</p>
      ) : (
        <div className="space-y-4">
          {activeVisits.map((visit) => (
            <div
              key={visit.id}
              className="border rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <h3 className="font-medium text-gray-900">
                  {visit.visitor.fullName}
                </h3>
                <p className="text-sm text-gray-500">
                  Meeting with: {visit.employee.fullName}
                </p>
                <p className="text-sm text-gray-500">
                  Purpose: {visit.purpose}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Checked in at:</p>
                <p className="text-sm font-medium">
                  {new Date(visit.checkIn).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
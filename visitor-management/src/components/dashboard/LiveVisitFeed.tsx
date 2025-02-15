
// // src/components/dashboard/LiveVisitFeed.tsx
// import { useState, useEffect } from 'react';
// import { useWebSocket } from '../../hooks/useWebSocket';
// import { Visit } from '../../types';

// export const LiveVisitFeed = () => {
//   const [recentVisits, setRecentVisits] = useState<Visit[]>([]);

//   useWebSocket('visitUpdate', (visit: Visit) => {
//     setRecentVisits(prev => [visit, ...prev].slice(0, 5));
//   });

//   return (
//     <div className="bg-white shadow rounded-lg p-6">
//       <h2 className="text-lg font-medium text-gray-900 mb-4">Live Visit Feed</h2>
//       <div className="space-y-4">
//         {recentVisits.map((visit) => (
//           <div
//             key={visit.id}
//             className="border-l-4 border-blue-500 pl-4 py-2 animate-fade-in"
//           >
//             <p className="font-medium text-gray-900">{visit.visitor.fullName}</p>
//             <p className="text-sm text-gray-500">
//               {visit.status === 'CHECKED_IN' ? 'Checked in' : 'Checked out'} - {' '}
//               {new Date().toLocaleTimeString()}
//             </p>
//             <p className="text-sm text-gray-500">
//               Meeting with: {visit.employee.fullName}
//             </p>
//           </div>
//         ))}
//         {recentVisits.length === 0 && (
//           <p className="text-gray-500 text-center">No recent activity</p>
//         )}
//       </div>
//     </div>
//   );
// };



// // src/components/dashboard/LiveVisitFeed.tsx
// import { useState, useEffect } from 'react';
// import { Visit } from '../../types';
// import { wsService } from '../../services/websocketService';
// import api from '../../services/api';

// export const LiveVisitFeed = () => {
//   const [activeVisits, setActiveVisits] = useState<Visit[]>([]);

//   useEffect(() => {
//     fetchActiveVisits();
//     setupWebSocket();
//   }, []);

//   const fetchActiveVisits = async () => {
//     try {
//       const response = await api.get('/visits/active');
//       setActiveVisits(response.data);
//     } catch (error) {
//       console.error('Failed to fetch active visits'+ error);
//     }
//   };

//   const setupWebSocket = () => {
//     const handleVisitUpdate = (data: { visit: Visit; type: string }) => {
//       if (data.type === 'CHECK_IN') {
//         setActiveVisits(prev => [...prev, data.visit]);
//       } else if (data.type === 'CHECK_OUT') {
//         setActiveVisits(prev => prev.filter(v => v.id !== data.visit.id));
//       }
//     };

//     wsService.subscribe('visitUpdate', handleVisitUpdate);
//     return () => wsService.unsubscribe('visitUpdate', handleVisitUpdate);
//   };

//   return (
//     <div className="bg-white shadow rounded-lg p-6">
//       <h2 className="text-lg font-medium text-gray-900 mb-4">Active Visits</h2>
//       <div className="space-y-4">
//         {activeVisits.map((visit) => (
//           <div
//             key={visit.id}
//             className="border-l-4 border-blue-500 pl-4 py-2 animate-fade-in"
//           >
//             <p className="font-medium text-gray-900">{visit.visitor.fullName}</p>
//             <p className="text-sm text-gray-500">
//               Meeting with: {visit.employee.fullName}
//             </p>
//             <p className="text-sm text-gray-500">
//               Checked in: {new Date(visit.checkIn).toLocaleTimeString()}
//             </p>
//           </div>
//         ))}
//         {activeVisits.length === 0 && (
//           <p className="text-gray-500 text-center">No active visits</p>
//         )}
//       </div>
//     </div>
//   );
// };


import { useState, useEffect } from "react";
import { Visit } from "../../types";
import { wsService } from "../../services/websocketService";
import api from "../../services/api";

export const LiveVisitFeed = () => {
  const [activeVisits, setActiveVisits] = useState<Visit[]>([]);

  useEffect(() => {
    fetchActiveVisits();
  }, []);

  useEffect(() => {
    const handleVisitUpdate = (data: { visit: Visit; type: string }) => {
      setActiveVisits((prev) =>
        data.type === "CHECK_IN"
          ? [...prev, data.visit]
          : prev.filter((v) => v.id !== data.visit.id)
      );
    };

    wsService.subscribe("visitUpdate", handleVisitUpdate);
    return () => wsService.unsubscribe("visitUpdate", handleVisitUpdate);
  }, []);

  const fetchActiveVisits = async () => {
    try {
      const response = await api.get("/visits/active");
      setActiveVisits(response.data);
    } catch (error) {
      console.error("Failed to fetch active visits:", error);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Active Visits</h2>
      <div className="space-y-4">
        {activeVisits.length > 0 ? (
          activeVisits.map((visit) => (
            <div
              key={visit.id}
              className="border-l-4 border-blue-500 pl-4 py-2 animate-fade-in"
            >
              <p className="font-medium text-gray-900">
                {visit.visitor.fullName}
              </p>
              <p className="text-sm text-gray-500">
                Meeting with: {visit.employee.fullName}
              </p>
              <p className="text-sm text-gray-500">
                Checked in: {new Date(visit.checkIn).toLocaleTimeString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No active visits</p>
        )}
      </div>
    </div>
  );
};
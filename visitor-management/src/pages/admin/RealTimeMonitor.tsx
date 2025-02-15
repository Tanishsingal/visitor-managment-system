// // // src/components/admin/RealTimeMonitor.tsx
// // import { useState, useEffect } from 'react';
// // import { wsService } from '../../services/websocketService';
// // import { Visit } from '../../types';

// // export const RealTimeMonitor = () => {
// //   const [activeVisits, setActiveVisits] = useState<Visit[]>([]);
// //   const [recentActivity, setRecentActivity] = useState<any[]>([]);

// //   useEffect(() => {
// //     wsService.subscribe('activeVisits', handleActiveVisits);
// //     wsService.subscribe('visitActivity', handleVisitActivity);

// //     return () => {
// //       wsService.unsubscribe('activeVisits', handleActiveVisits);
// //       wsService.unsubscribe('visitActivity', handleVisitActivity);
// //     };
// //   }, []);

// //   const handleActiveVisits = (visits: Visit[]) => {
// //     setActiveVisits(visits);
// //   };

// //   const handleVisitActivity = (activity: any) => {
// //     setRecentActivity(prev => [activity, ...prev].slice(0, 10));
// //   };

// //   return (
// //     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// //       {/* Active Visits */}
// //       <div className="bg-white rounded-lg shadow p-6">
// //         <h3 className="text-lg font-medium mb-4">Active Visits</h3>
// //         <div className="space-y-4">
// //           {activeVisits.map(visit => (
// //             <div key={visit.id} className="flex justify-between items-center p-4 border rounded-lg">
// //               <div>
// //                 <p className="font-medium">{visit.visitor.fullName}</p>
// //                 <p className="text-sm text-gray-500">{visit.purpose}</p>
// //               </div>
// //               <div className="text-right">
// //                 <p className="text-sm text-gray-500">Meeting with</p>
// //                 <p className="font-medium">{visit.employee.fullName}</p>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>

// //       {/* Recent Activity */}
// //       <div className="bg-white rounded-lg shadow p-6">
// //         <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
// //         <div className="space-y-4">
// //           {recentActivity.map((activity, index) => (
// //             <div key={index} className="flex items-center p-4 border rounded-lg">
// //               <div className={`w-2 h-2 rounded-full mr-4 ${
// //                 activity.type === 'check-in' ? 'bg-green-500' :
// //                 activity.type === 'check-out' ? 'bg-red-500' :
// //                 'bg-blue-500'
// //               }`} />
// //               <div>
// //                 <p className="font-medium">{activity.message}</p>
// //                 <p className="text-sm text-gray-500">
// //                   {new Date(activity.timestamp).toLocaleTimeString()}
// //                 </p>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // src/components/admin/RealTimeMonitor.tsx
// import { useState, useEffect } from 'react';
// import { wsService } from '../../services/websocketService';
// import { Visit } from '../../types';
// import api from '../../services/api';
// import toast from 'react-hot-toast';

// export const RealTimeMonitor = () => {
//   const [activeVisits, setActiveVisits] = useState<Visit[]>([]);
//   const [recentActivity, setRecentActivity] = useState<{
//     type: string;
//     message: string;
//     timestamp: Date;
//     visitorName: string;
//   }[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     fetchActiveVisits();
//     const cleanup = setupWebSocket();
//     return cleanup;
//   }, []);

//   const fetchActiveVisits = async () => {
//     try {
//       const response = await api.get('/visits/active');
//       setActiveVisits(response.data);
//     } catch (error) {
//       toast.error('Failed to fetch active visits');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const setupWebSocket = () => {
//     const handleVisitUpdate = (data: {
//       type: 'CHECK_IN' | 'CHECK_OUT';
//       visit: Visit;
//       message: string;
//     }) => {
//       // Update active visits
//       if (data.type === 'CHECK_IN') {
//         setActiveVisits(prev => [...prev, data.visit]);
//       } else if (data.type === 'CHECK_OUT') {
//         setActiveVisits(prev => prev.filter(v => v.id !== data.visit.id));
//       }

//       // Add to recent activity
//       setRecentActivity(prev => [{
//         type: data.type,
//         message: data.message,
//         timestamp: new Date(),
//         visitorName: data.visit.visitor.fullName
//       }, ...prev].slice(0, 10)); // Keep only last 10 activities
//     };

//     wsService.subscribe('visitUpdate', handleVisitUpdate);
//     return () => wsService.unsubscribe('visitUpdate', handleVisitUpdate);
//   };

//   const getStatusColor = (type: string) => {
//     switch (type) {
//       case 'CHECK_IN':
//         return 'bg-green-500';
//       case 'CHECK_OUT':
//         return 'bg-blue-500';
//       default:
//         return 'bg-gray-500';
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-48">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//       {/* Active Visits */}
//       <div className="bg-white shadow rounded-lg p-6">
//         <h2 className="text-lg font-medium text-gray-900 mb-4">
//           Active Visits ({activeVisits.length})
//         </h2>
//         <div className="space-y-4">
//           {activeVisits.length === 0 ? (
//             <p className="text-gray-500 text-center py-4">No active visits</p>
//           ) : (
//             activeVisits.map((visit) => (
//               <div
//                 key={visit.id}
//                 className="border-l-4 border-blue-500 pl-4 py-2 bg-gray-50 rounded-r-lg"
//               >
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <p className="font-medium text-gray-900">
//                       {visit.visitor.fullName}
//                     </p>
//                     <p className="text-sm text-gray-500">
//                       Meeting with: {visit.employee.fullName}
//                     </p>
//                   </div>
//                   <div className="text-right text-sm text-gray-500">
//                     <p>Checked in:</p>
//                     <p>{new Date(visit.checkIn).toLocaleTimeString()}</p>
//                   </div>
//                 </div>
//                 <p className="mt-1 text-sm text-gray-600">
//                   Purpose: {visit.purpose}
//                 </p>
//               </div>
//             ))
//           )}
//         </div>
//       </div>

//       {/* Recent Activity */}
//       <div className="bg-white shadow rounded-lg p-6">
//         <h2 className="text-lg font-medium text-gray-900 mb-4">
//           Recent Activity
//         </h2>
//         <div className="space-y-4">
//           {recentActivity.length === 0 ? (
//             <p className="text-gray-500 text-center py-4">No recent activity</p>
//           ) : (
//             recentActivity.map((activity, index) => (
//               <div
//                 key={index}
//                 className="flex items-start space-x-3"
//               >
//                 <div className={`mt-1 w-2 h-2 rounded-full ${getStatusColor(activity.type)}`} />
//                 <div className="flex-1">
//                   <p className="text-sm text-gray-900">
//                     {activity.visitorName} {activity.message}
//                   </p>
//                   <p className="text-xs text-gray-500">
//                     {new Date(activity.timestamp).toLocaleTimeString()}
//                   </p>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>

//       {/* Quick Stats */}
//       <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
//         <div className="bg-white shadow rounded-lg p-4">
//           <h3 className="text-sm font-medium text-gray-500">Total Check-ins Today</h3>
//           <p className="mt-2 text-2xl font-semibold text-gray-900">
//             {activeVisits.length}
//           </p>
//         </div>
//         <div className="bg-white shadow rounded-lg p-4">
//           <h3 className="text-sm font-medium text-gray-500">Expected Visits</h3>
//           <p className="mt-2 text-2xl font-semibold text-gray-900">
//             {/* Add expected visits count */}
//             --
//           </p>
//         </div>
//         <div className="bg-white shadow rounded-lg p-4">
//           <h3 className="text-sm font-medium text-gray-500">Completed Visits</h3>
//           <p className="mt-2 text-2xl font-semibold text-gray-900">
//             {recentActivity.filter(a => a.type === 'CHECK_OUT').length}
//           </p>
//         </div>
//         <div className="bg-white shadow rounded-lg p-4">
//           <h3 className="text-sm font-medium text-gray-500">Average Visit Duration</h3>
//           <p className="mt-2 text-2xl font-semibold text-gray-900">
//             {/* Add average duration calculation */}
//             --
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };
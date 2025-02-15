
// //   // src/components/admin/InteractiveDashboard.tsx
// //   import { useState, useEffect, useCallback } from 'react';
// //   import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
// //   import { wsService } from '../../services/websocketService';
// //   import { Button } from '../../components/common/Button';
// //   import toast from 'react-hot-toast';
// // import api from '../../services/api';
  
// //   interface ChartData {
// //     labels: string[];
// //     datasets: any[];
// //   }
  
// //   export const InteractiveDashboard = () => {
// //     const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
// //     const [selectedDate, setSelectedDate] = useState<string | null>(null);
// //     const [visitsData, setVisitsData] = useState<ChartData | null>(null);
// //     const [detailedView, setDetailedView] = useState(false);
  
// //     useEffect(() => {
// //       // Subscribe to real-time updates
// //       wsService.subscribe('visitUpdate', handleVisitUpdate);
// //       wsService.subscribe('newVisit', handleNewVisit);
  
// //       return () => {
// //         wsService.unsubscribe('visitUpdate', handleVisitUpdate);
// //         wsService.unsubscribe('newVisit', handleNewVisit);
// //       };
// //     }, []);
  
// //     const handleVisitUpdate = useCallback((data: any) => {
// //       // Update charts with new data
// //       setVisitsData(prevData => {
// //         if (!prevData) return null;
// //         // Update the relevant dataset
// //         return {
// //           ...prevData,
// //           datasets: prevData.datasets.map(dataset => ({
// //             ...dataset,
// //             data: dataset.data.map((value: number, index: number) => 
// //               index === data.index ? data.value : value
// //             )
// //           }))
// //         };
// //       });
// //       toast.success('Dashboard updated');
// //     }, []);
  
// //     const handleNewVisit = useCallback((data: any) => {
// //       // Add new visit to charts
// //       setVisitsData(prevData => {
// //         if (!prevData) return null;
// //         return {
// //           ...prevData,
// //           labels: [...prevData.labels, data.label],
// //           datasets: prevData.datasets.map(dataset => ({
// //             ...dataset,
// //             data: [...dataset.data, data.value]
// //           }))
// //         };
// //       });
// //       toast.success('New visit recorded');
// //     }, []);
  
// //     const handleChartClick = (event: any, elements: any[]) => {
// //       if (elements.length > 0) {
// //         const { datasetIndex, index } = elements[0];
// //         const label = visitsData?.labels[index];
        
// //         if (datasetIndex === 0) { // Department chart
// //           setSelectedDepartment(label);
// //           fetchDepartmentDetails(label);
// //         } else if (datasetIndex === 1) { // Time chart
// //           setSelectedDate(label);
// //           fetchDateDetails(label);
// //         }
// //       }
// //     };
  
// //     const fetchDepartmentDetails = async (department: string) => {
// //       try {
// //         const response = await api.get(`/analytics/department/${department}`);
// //         setDetailedView({
// //           type: 'department',
// //           data: response.data
// //         });
// //       } catch (error) {
// //         toast.error('Failed to fetch department details');
// //       }
// //     };
  
// //     const fetchDateDetails = async (date: string) => {
// //       try {
// //         const response = await api.get(`/analytics/date/${date}`);
// //         setDetailedView({
// //           type: 'date',
// //           data: response.data
// //         });
// //       } catch (error) {
// //         toast.error('Failed to fetch date details');
// //       }
// //     };
  
// //     return (
// //       <div className="space-y-6">
// //         {/* Interactive Charts */}
// //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// //           {/* Department Chart */}
// //           <div className="bg-white rounded-lg shadow p-6">
// //             <h3 className="text-lg font-medium mb-4">
// //               Department Visits
// //               {selectedDepartment && (
// //                 <span className="ml-2 text-sm text-gray-500">
// //                   ({selectedDepartment})
// //                 </span>
// //               )}
// //             </h3>
// //             <Bar
// //               data={visitsData}
// //               options={{
// //                 onClick: handleChartClick,
// //                 responsive: true,
// //                 plugins: {
// //                   tooltip: {
// //                     callbacks: {
// //                       label: (context) => `Visits: ${context.raw}`,
// //                     },
// //                   },
// //                 },
// //               }}
// //             />
// //           </div>
  
// //           {/* Time Chart */}
// //           <div className="bg-white rounded-lg shadow p-6">
// //             <h3 className="text-lg font-medium mb-4">
// //               Visits Over Time
// //               {selectedDate && (
// //                 <span className="ml-2 text-sm text-gray-500">
// //                   ({selectedDate})
// //                 </span>
// //               )}
// //             </h3>
// //             <Line
// //               data={visitsData}
// //               options={{
// //                 onClick: handleChartClick,
// //                 responsive: true,
// //                 plugins: {
// //                   tooltip: {
// //                     callbacks: {
// //                       label: (context) => `Visits: ${context.raw}`,
// //                     },
// //                   },
// //                 },
// //               }}
// //             />
// //           </div>
// //         </div>
  
// //         {/* Detailed View */}
// //         {detailedView && (
// //           <div className="bg-white rounded-lg shadow p-6">
// //             <div className="flex justify-between items-center mb-4">
// //               <h3 className="text-lg font-medium">
// //                 {detailedView.type === 'department' ? 'Department Details' : 'Date Details'}
// //               </h3>
// //               <Button
// //                 variant="outline"
// //                 onClick={() => setDetailedView(null)}
// //               >
// //                 Close
// //               </Button>
// //             </div>
            
// //             {/* Detailed charts and statistics */}
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //               <div>
// //                 <h4 className="text-sm font-medium text-gray-500 mb-2">Visit Distribution</h4>
// //                 <Pie
// //                   data={detailedView.data.distribution}
// //                   options={{
// //                     responsive: true,
// //                     plugins: {
// //                       legend: {
// //                         position: 'bottom',
// //                       },
// //                     },
// //                   }}
// //                 />
// //               </div>
// //               <div>
// //                 <h4 className="text-sm font-medium text-gray-500 mb-2">Statistics</h4>
// //                 <div className="space-y-2">
// //                   {Object.entries(detailedView.data.stats).map(([key, value]) => (
// //                     <div key={key} className="flex justify-between">
// //                       <span className="text-gray-600">{key}</span>
// //                       <span className="font-medium">{value}</span>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     );
// //   };
// // src/components/admin/InteractiveDashboard.tsx
// import { useState, useEffect, useCallback } from 'react';
// import { Line, Bar, Doughnut } from 'react-chartjs-2';
// import { wsService } from '../../services/websocketService';
// import { Button } from '../../components/common/Button';
// import api from '../../services/api';
// import toast from 'react-hot-toast';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler
// } from 'chart.js';

// // Register ChartJS components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler
// );

// interface ChartDataset {
//   label: string;
//   data: number[];
//   backgroundColor?: string | string[];
//   borderColor?: string;
//   fill?: boolean;
// }

// interface ChartData {
//   labels: string[];
//   datasets: ChartDataset[];
// }

// interface DashboardData {
//   visitsOverTime: ChartData;
//   visitorsByDepartment: ChartData;
//   statusDistribution: ChartData;
//   summary: {
//     totalVisits: number;
//     activeVisits: number;
//     pendingVisits: number;
//     completedVisits: number;
//   };
// }

// interface DetailedViewData {
//   stats: Record<string, number | string>;
//   distribution?: ChartData;
// }

// interface DetailedView {
//   type: 'department' | 'date';
//   data: DetailedViewData;
// }

// export const InteractiveDashboard = () => {
//   const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
//   const [selectedDate, setSelectedDate] = useState<string | null>(null);
//   const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month'>('week');
//   const [detailedView, setDetailedView] = useState<DetailedView | null>(null);

//   const handleVisitUpdate = useCallback((data: { 
//     activeVisits: number; 
//     pendingVisits: number;
//   }) => {
//     setDashboardData(prev => {
//       if (!prev) return prev;
//       return {
//         ...prev,
//         summary: {
//           ...prev.summary,
//           activeVisits: data.activeVisits,
//           pendingVisits: data.pendingVisits
//         }
//       };
//     });
//   }, []);

//   useEffect(() => {
//     fetchDashboardData();
    
//     // Subscribe to real-time updates
//     wsService.subscribe('dashboardUpdate', handleVisitUpdate);

//     // Cleanup subscription
//     return () => {
//       wsService.unsubscribe('dashboardUpdate', handleVisitUpdate);
//     };
//   }, [timeRange, handleVisitUpdate]);

//   const fetchDashboardData = async () => {
//     setIsLoading(true);
//     try {
//       const response = await api.get(`/analytics/dashboard?range=${timeRange}`);
//       setDashboardData(response.data);
//     } catch (error) {
//       toast.error('Failed to fetch dashboard data');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleChartClick = async (
//     chartType: 'visitsOverTime' | 'visitorsByDepartment',
//     elements: any[]
//   ) => {
//     if (!elements.length || !dashboardData) return;

//     const { index } = elements[0];
//     const label = dashboardData[chartType].labels[index];

//     if (chartType === 'visitorsByDepartment') {
//       setSelectedDepartment(label);
//       await fetchDepartmentDetails(label);
//     } else {
//       setSelectedDate(label);
//       await fetchDateDetails(label);
//     }
//   };

//   const fetchDepartmentDetails = async (department: string) => {
//     try {
//       const response = await api.get(`/analytics/department/${department}`);
//       setDetailedView({
//         type: 'department',
//         data: response.data
//       });
//     } catch (error) {
//       toast.error('Failed to fetch department details');
//     }
//   };

//   const fetchDateDetails = async (date: string) => {
//     try {
//       const response = await api.get(`/analytics/date/${date}`);
//       setDetailedView({
//         type: 'date',
//         data: response.data
//       });
//     } catch (error) {
//       toast.error('Failed to fetch date details');
//     }
//   };

//   if (isLoading || !dashboardData) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <div className="bg-white rounded-lg shadow p-6">
//           <h3 className="text-sm font-medium text-gray-500">Total Visits</h3>
//           <p className="mt-2 text-3xl font-semibold text-gray-900">
//             {dashboardData.summary.totalVisits}
//           </p>
//         </div>
//         <div className="bg-white rounded-lg shadow p-6">
//           <h3 className="text-sm font-medium text-gray-500">Active Visits</h3>
//           <p className="mt-2 text-3xl font-semibold text-gray-900">
//             {dashboardData.summary.activeVisits}
//           </p>
//         </div>
//         <div className="bg-white rounded-lg shadow p-6">
//           <h3 className="text-sm font-medium text-gray-500">Pending Visits</h3>
//           <p className="mt-2 text-3xl font-semibold text-gray-900">
//             {dashboardData.summary.pendingVisits}
//           </p>
//         </div>
//         <div className="bg-white rounded-lg shadow p-6">
//           <h3 className="text-sm font-medium text-gray-500">Completed Visits</h3>
//           <p className="mt-2 text-3xl font-semibold text-gray-900">
//             {dashboardData.summary.completedVisits}
//           </p>
//         </div>
//       </div>

//       {/* Time Range Selector */}
//       <div className="flex justify-end space-x-2">
//         <Button
//           variant={timeRange === 'day' ? 'primary' : 'outline'}
//           onClick={() => setTimeRange('day')}
//         >
//           Day
//         </Button>
//         <Button
//           variant={timeRange === 'week' ? 'primary' : 'outline'}
//           onClick={() => setTimeRange('week')}
//         >
//           Week
//         </Button>
//         <Button
//           variant={timeRange === 'month' ? 'primary' : 'outline'}
//           onClick={() => setTimeRange('month')}
//         >
//           Month
//         </Button>
//       </div>

//       {/* Charts Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Visits Over Time */}
//         <div className="bg-white rounded-lg shadow p-6">
//           <h3 className="text-lg font-medium mb-4">
//             Visits Over Time
//             {selectedDate && (
//               <span className="ml-2 text-sm text-gray-500">
//                 ({selectedDate})
//               </span>
//             )}
//           </h3>
//           <Line
//             data={dashboardData.visitsOverTime}
//             options={{
//               onClick: (_, element) => handleChartClick('visitsOverTime', element),
//               responsive: true,
//               plugins: {
//                 legend: {
//                   display: false,
//                 },
//               },
//               scales: {
//                 y: {
//                   beginAtZero: true,
//                 },
//               },
//             }}
//           />
//         </div>

//         {/* Visits by Department */}
//         <div className="bg-white rounded-lg shadow p-6">
//           <h3 className="text-lg font-medium mb-4">
//             Visits by Department
//             {selectedDepartment && (
//               <span className="ml-2 text-sm text-gray-500">
//                 ({selectedDepartment})
//               </span>
//             )}
//           </h3>
//           <Bar
//             data={dashboardData.visitorsByDepartment}
//             options={{
//               onClick: (_, element) => handleChartClick('visitorsByDepartment', element),
//               responsive: true,
//               plugins: {
//                 legend: {
//                   display: false,
//                 },
//               },
//               scales: {
//                 y: {
//                   beginAtZero: true,
//                 },
//               },
//             }}
//           />
//         </div>

//         {/* Status Distribution */}
//         <div className="bg-white rounded-lg shadow p-6">
//           <h3 className="text-lg font-medium mb-4">Visit Status Distribution</h3>
//           <div className="h-[300px] flex justify-center">
//             <Doughnut
//               data={dashboardData.statusDistribution}
//               options={{
//                 responsive: true,
//                 maintainAspectRatio: false,
//                 plugins: {
//                   legend: {
//                     position: 'bottom',
//                   },
//                 },
//               }}
//             />
//           </div>
//         </div>

//         {/* Detailed View */}
//         {detailedView && (
//           <div className="bg-white rounded-lg shadow p-6">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-lg font-medium">
//                 {detailedView.type === 'department' ? 'Department Details' : 'Date Details'}
//               </h3>
//               <Button
//                 variant="outline"
//                 onClick={() => setDetailedView(null)}
//               >
//                 Close
//               </Button>
//             </div>
//             <div className="space-y-4">
//               {Object.entries(detailedView.data.stats).map(([key, value]) => (
//                 <div key={key} className="flex justify-between items-center">
//                   <span className="text-sm text-gray-500">{key}</span>
//                   <span className="text-sm font-medium">{value}</span>
//                 </div>
//               ))}
//               {detailedView.data.distribution && (
//                 <div className="mt-4 h-[200px]">
//                   <Doughnut
//                     data={detailedView.data.distribution}
//                     options={{
//                       responsive: true,
//                       maintainAspectRatio: false,
//                       plugins: {
//                         legend: {
//                           position: 'bottom',
//                         },
//                       },
//                     }}
//                   />
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };
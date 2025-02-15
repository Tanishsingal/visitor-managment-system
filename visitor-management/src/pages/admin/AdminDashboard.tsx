// // src/pages/admin/AdminDashboard.tsx
// import { useState } from 'react';
// import { Tab } from '@headlessui/react';
// import { EmployeeList } from './EmployeeList';
// import { VisitAnalytics } from './VisitAnalytics';
// import { SystemSettings } from './SystemSettings';

// function classNames(...classes: string[]) {
//   return classes.filter(Boolean).join(' ');
// }

// export const AdminDashboard = () => {
//   const categories = ['Employees', 'Analytics', 'Settings'];

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//       <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>

//       <Tab.Group>
//         <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
//           {categories.map((category) => (
//             <Tab
//               key={category}
//               className={({ selected }) =>
//                 classNames(
//                   'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
//                   'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
//                   selected
//                     ? 'bg-white text-blue-700 shadow'
//                     : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
//                 )
//               }
//             >
//               {category}
//             </Tab>
//           ))}
//         </Tab.List>
//         <Tab.Panels className="mt-6">
//           <Tab.Panel>
//             <EmployeeList />
//           </Tab.Panel>
//           <Tab.Panel>
//             <VisitAnalytics />
//           </Tab.Panel>
//           <Tab.Panel>
//             <SystemSettings />
//           </Tab.Panel>
//         </Tab.Panels>
//       </Tab.Group>
//     </div>
//   );
// };


// // src/pages/admin/AdminDashboard.tsx
// import { useState, useEffect } from 'react';
// import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
// import { VisitStats } from './VisitStats';
// import { RecentVisits } from '../../components/admin/RecentVisits';
// import { EmployeeList } from './EmployeeList';
// import api from '../../services/api';
// import toast from 'react-hot-toast';

// export const AdminDashboard = () => {
//   const [stats, setStats] = useState({
//     totalVisits: 0,
//     pendingVisits: 0,
//     activeVisits: 0,
//     totalEmployees: 0
//   });
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       const response = await api.get('/admin/dashboard-stats');
//       setStats(response.data);
//     } catch (error) {
//       toast.error('Failed to fetch dashboard data');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <DashboardLayout>
//       <div className="space-y-6">
//         <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
        
//         {isLoading ? (
//           <div className="flex justify-center py-8">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
//           </div>
//         ) : (
//           <>
//             <VisitStats stats={stats} />
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               <RecentVisits />
//               <EmployeeList />
//             </div>
//           </>
//         )}
//       </div>
//     </DashboardLayout>
//   );
// };


// // src/pages/admin/AdminDashboard.tsx
// import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
// import { DashboardOverview } from './DashboardOverview';
// // import { DashboardLayout } from './DashboardLayout';

// export const AdminDashboard = () => {
//   return (
//     <DashboardLayout>
//       <div className="space-y-6">
//         <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
//         <DashboardOverview />
//       </div>
//     </DashboardLayout>
//   );
// };


// src/pages/admin/AdminDashboard.tsx
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { VisitMonitor } from '../../components/visits/VisitMonitor';
import { VisitAnalyticsDashboard } from '../../components/analytics/VisitAnalyticsDashboard';

export const AdminDashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <VisitAnalyticsDashboard />
        <VisitMonitor />
      </div>
    </DashboardLayout>
  );
};
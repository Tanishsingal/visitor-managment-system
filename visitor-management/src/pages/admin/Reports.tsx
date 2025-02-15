

// // src/pages/admin/Reports.tsx
// import { useState } from 'react';
// import { DashboardLayout } from '../../components/layout/DashboardLayout';
// import { VisitReport } from '../../components/reports/VisitReport';
// import { Tab } from '@headlessui/react';

// export const Reports = () => {
//   const [selectedTab, setSelectedTab] = useState(0);

//   return (
//     <DashboardLayout>
//       <div className="space-y-6">
//         <h1 className="text-2xl font-semibold text-gray-900">Reports</h1>

//         <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
//           <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
//             <Tab
//               className={({ selected }) =>
//                 `w-full rounded-lg py-2.5 text-sm font-medium leading-5
//                 ${selected
//                   ? 'bg-white text-blue-700 shadow'
//                   : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
//                 }`
//               }
//             >
//               Visit Reports
//             </Tab>
//             {/* Add more tabs for different types of reports */}
//           </Tab.List>

//           <Tab.Panels className="mt-6">
//             <Tab.Panel>
//               <VisitReport />
//             </Tab.Panel>
//             {/* Add more panels for different reports */}
//           </Tab.Panels>
//         </Tab.Group>
//       </div>
//     </DashboardLayout>
//   );
// };

// // src/components/reports/DetailedVisitView.tsx
// import { Visit } from '../../types';

// interface DetailedVisitViewProps {
//   visit: Visit;
// }

// export const DetailedVisitView = ({ visit }: DetailedVisitViewProps) => {
//   return (
//     <div className="bg-white shadow rounded-lg p-6">
//       <div className="border-b pb-4 mb-4">
//         <h3 className="text-lg font-medium text-gray-900">Visit Details</h3>
//         <p className="text-sm text-gray-500">ID: {visit.id}</p>
//       </div>

//       <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
//         <div>
//           <dt className="text-sm font-medium text-gray-500">Visitor Name</dt>
//           <dd className="mt-1 text-sm text-gray-900">{visit.visitor.fullName}</dd>
//         </div>

//         <div>
//           <dt className="text-sm font-medium text-gray-500">Company</dt>
//           <dd className="mt-1 text-sm text-gray-900">{visit.visitor.company || 'N/A'}</dd>
//         </div>

//         <div>
//           <dt className="text-sm font-medium text-gray-500">Host Employee</dt>
//           <dd className="mt-1 text-sm text-gray-900">{visit.employee.fullName}</dd>
//         </div>

//         <div>
//           <dt className="text-sm font-medium text-gray-500">Department</dt>
//           <dd className="mt-1 text-sm text-gray-900">{visit.employee.department}</dd>
//         </div>

//         <div>
//           <dt className="text-sm font-medium text-gray-500">Purpose</dt>
//           <dd className="mt-1 text-sm text-gray-900">{visit.purpose}</dd>
//         </div>

//         <div>
//           <dt className="text-sm font-medium text-gray-500">Status</dt>
//           <dd className="mt-1">
//             <span className={`px-2 py-1 text-xs font-medium rounded-full
//               ${visit.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
//                 visit.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
//                 visit.status === 'DENIED' ? 'bg-red-100 text-red-800' :
//                 'bg-gray-100 text-gray-800'
//               }`}
//             >
//               {visit.status}
//             </span>
//           </dd>
//         </div>

//         <div>
//           <dt className="text-sm font-medium text-gray-500">Check-in Time</dt>
//           <dd className="mt-1 text-sm text-gray-900">
//             {visit.checkIn ? new Date(visit.checkIn).toLocaleString() : 'Not checked in'}
//           </dd>
//         </div>

//         <div>
//           <dt className="text-sm font-medium text-gray-500">Check-out Time</dt>
//           <dd className="mt-1 text-sm text-gray-900">
//             {visit.checkOut ? new Date(visit.checkOut).toLocaleString() : 'Not checked out'}
//           </dd>
//         </div>
//       </dl>
//     </div>
//   );
// };


// src/pages/admin/Reports.tsx
import { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { VisitReport } from '../../components/reports/VisitReport';
import { EmployeeReport } from '../../components/reports/EmployeeReport';
import { DepartmentReport } from '../../components/reports/DepartmentReport';
import { Tab } from '@headlessui/react';

export const Reports = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900">Reports</h1>

        <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
          <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
            <Tab
              className={({ selected }) =>
                `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                ${selected
                  ? 'bg-white text-blue-700 shadow'
                  : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                }`
              }
            >
              Visit Reports
            </Tab>
            <Tab
              className={({ selected }) =>
                `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                ${selected
                  ? 'bg-white text-blue-700 shadow'
                  : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                }`
              }
            >
              Employee Reports
            </Tab>
            <Tab
              className={({ selected }) =>
                `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                ${selected
                  ? 'bg-white text-blue-700 shadow'
                  : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                }`
              }
            >
              Department Analysis
            </Tab>
          </Tab.List>

          <Tab.Panels className="mt-6">
            <Tab.Panel>
              <VisitReport />
            </Tab.Panel>
            <Tab.Panel>
              <EmployeeReport />
            </Tab.Panel>
            <Tab.Panel>
              <DepartmentReport />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </DashboardLayout>
  );
};

// // // src/components/dashboard/DashboardLayout.tsx
// // import { ReactNode } from 'react';
// // import { useAuth } from '../../hooks/useAuth';
// // import { Link, useLocation } from 'react-router-dom';

// // interface DashboardLayoutProps {
// //   children: ReactNode;
// // }

// // export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
// //   const { user, logout } = useAuth();
// //   const location = useLocation();

// //   const navigation = user?.role === 'ADMIN' 
// //     ? [
// //         { name: 'Dashboard', href: '/admin/dashboard' },
// //         { name: 'Employees', href: '/admin/employees' },
// //         { name: 'Visits', href: '/admin/visits' },
// //         { name: 'Settings', href: '/admin/settings' },
// //       ]
// //     : [
// //         { name: 'Dashboard', href: '/employee/dashboard' },
// //         { name: 'My Visits', href: '/employee/visits' },
// //         { name: 'Schedule', href: '/employee/schedule' },
// //       ];

// //   return (
// //     <div className="min-h-screen bg-gray-100">
// //       {/* Sidebar */}
// //       <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
// //         <div className="flex-1 flex flex-col min-h-0 bg-gray-800">
// //           <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
// //             <div className="flex items-center flex-shrink-0 px-4">
// //               <span className="text-white text-lg font-semibold">
// //                 Visitor Management
// //               </span>
// //             </div>
// //             <nav className="mt-5 flex-1 px-2 space-y-1">
// //               {navigation.map((item) => (
// //                 <Link
// //                   key={item.name}
// //                   to={item.href}
// //                   className={`${
// //                     location.pathname === item.href
// //                       ? 'bg-gray-900 text-white'
// //                       : 'text-gray-300 hover:bg-gray-700 hover:text-white'
// //                   } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
// //                 >
// //                   {item.name}
// //                 </Link>
// //               ))}
// //             </nav>
// //           </div>
// //           <div className="flex-shrink-0 flex bg-gray-700 p-4">
// //             <div className="flex items-center">
// //               <div>
// //                 <p className="text-sm font-medium text-white">
// //                   {user?.fullName}
// //                 </p>
// //                 <button
// //                   onClick={logout}
// //                   className="text-sm text-gray-300 hover:text-white"
// //                 >
// //                   Sign out
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Main content */}
// //       <div className="md:pl-64 flex flex-col flex-1">
// //         <main className="flex-1">
// //           <div className="py-6">
// //             <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
// //               {children}
// //             </div>
// //           </div>
// //         </main>
// //       </div>
// //     </div>
// //   );
// // };

// // src/components/layout/DashboardLayout.tsx
// import { useState } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { 
//   Bars3Icon, 
//   XMarkIcon, 
//   UserCircleIcon,
//   ChartBarIcon,
//   CalendarIcon,
//   UsersIcon,
//   CogIcon,
//   QrCodeIcon,
//   DocumentTextIcon,
// } from '@heroicons/react/24/outline';


// // import { 
// //   ChartBarIcon, 
// //   UsersIcon, 
// //   CalendarIcon, 
// //   DocumentReportIcon,
  
// // } from '@heroicons/react/24/outline';

// import { NotificationBell } from '../notifications/NotificationBell';
// import { useAuth } from '../../hooks/useAuth';

// interface NavigationItem {
//   name: string;
//   href: string;
//   icon: React.ComponentType<any>;
// }

// export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const { user, logout } = useAuth();
//   const location = useLocation();
//   const navigate = useNavigate();

//   // const adminNavigation: NavigationItem[] = [
//   //   { name: 'Dashboard', href: '/admin/dashboard', icon: ChartBarIcon },
//   //   { name: 'Employees', href: '/admin/employees', icon: UsersIcon },
//   //   { name: 'Visits', href: '/admin/visits', icon: CalendarIcon },
//   //   { name: 'Settings', href: '/admin/settings', icon: CogIcon },
//   // ];

//   // const employeeNavigation: NavigationItem[] = [
//   //   { name: 'Dashboard', href: '/employee/dashboard', icon: ChartBarIcon },
//   //   { name: 'My Visits', href: '/employee/visits', icon: CalendarIcon },
//   //   { name: 'Schedule', href: '/employee/schedule', icon: CalendarIcon },
//   // ];

//   // const navigation = user?.role === 'ADMIN' ? adminNavigation : employeeNavigation;


  
// // export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
//   // const { user } = useAuth();

//   const adminNavigation = [
//     { name: 'Dashboard', href: '/admin/dashboard', icon: ChartBarIcon },
//     { name: 'Employees', href: '/admin/employees', icon: UsersIcon },
//     { name: 'Visits', href: '/admin/visits', icon: CalendarIcon },
//     { name: 'Reports', href: '/admin/reports', icon: DocumentTextIcon },
//     { name: 'Check In/Out', href: '/check-in-out', icon: QrCodeIcon },
//   ];

//   const employeeNavigation = [
//     { name: 'Dashboard', href: '/employee/dashboard', icon: ChartBarIcon },
//     { name: 'My Visits', href: '/employee/visits', icon: CalendarIcon },
//     { name: 'Check In/Out', href: '/check-in-out', icon: QrCodeIcon },
//   ];

//   const navigation = user?.role === 'ADMIN' ? adminNavigation : employeeNavigation;

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Sidebar for desktop */}
//       <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
//         <div className="flex min-h-0 flex-1 flex-col bg-gray-800">
//           <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
//             <div className="flex flex-shrink-0 items-center px-4">
//               <h1 className="text-xl font-bold text-white">Visitor Management</h1>
//             </div>
//             <nav className="mt-5 flex-1 space-y-1 px-2">
//               {navigation.map((item) => (
//                 <Link
//                   key={item.name}
//                   to={item.href}
//                   className={`${
//                     location.pathname === item.href
//                       ? 'bg-gray-900 text-white'
//                       : 'text-gray-300 hover:bg-gray-700 hover:text-white'
//                   } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
//                 >
//                   <item.icon
//                     className="mr-3 h-6 w-6 flex-shrink-0"
//                     aria-hidden="true"
//                   />
//                   {item.name}
//                 </Link>
//               ))}
//             </nav>
//           </div>
//           <div className="flex flex-shrink-0 bg-gray-700 p-4">
//             <div className="group block w-full flex-shrink-0">
//               <div className="flex items-center">
//                 <UserCircleIcon className="inline-block h-9 w-9 rounded-full text-gray-300" />
//                 <div className="ml-3">
//                   <p className="text-sm font-medium text-white">{user?.fullName}</p>
//                   <button
//                     onClick={handleLogout}
//                     className="text-xs font-medium text-gray-300 hover:text-white"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile menu */}
//       <div className="md:hidden">
//         <div className="fixed inset-0 z-40 flex">
//           <div
//             className={`fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity ease-linear duration-300 ${
//               isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
//             }`}
//             onClick={() => setIsSidebarOpen(false)}
//           />

//           <div
//             className={`relative flex w-full max-w-xs flex-1 flex-col bg-gray-800 pt-5 pb-4 transform transition ease-in-out duration-300 ${
//               isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
//             }`}
//           >
//             <div className="absolute top-0 right-0 -mr-12 pt-2">
//               <button
//                 type="button"
//                 className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
//                 onClick={() => setIsSidebarOpen(false)}
//               >
//                 <XMarkIcon className="h-6 w-6 text-white" />
//               </button>
//             </div>
//             {/* Mobile navigation items */}
//             <nav className="mt-5 flex-1 space-y-1 px-2">
//               {navigation.map((item) => (
//                 <Link
//                   key={item.name}
//                   to={item.href}
//                   className={`${
//                     location.pathname === item.href
//                       ? 'bg-gray-900 text-white'
//                       : 'text-gray-300 hover:bg-gray-700 hover:text-white'
//                   } group flex items-center px-2 py-2 text-base font-medium rounded-md`}
//                   onClick={() => setIsSidebarOpen(false)}
//                 >
//                   <item.icon
//                     className="mr-4 h-6 w-6 flex-shrink-0"
//                     aria-hidden="true"
//                   />
//                   {item.name}
//                 </Link>
//               ))}
//             </nav>
//           </div>
//         </div>
//       </div>

//       {/* Main content */}
//       <div className="md:pl-64 flex flex-col flex-1">
//         {/* Top header */}
//         <div className="sticky top-0 z-10 bg-white shadow">
//           <div className="flex h-16 items-center justify-between px-4 md:px-6">
//             <button
//               type="button"
//               className="md:hidden text-gray-500 hover:text-gray-900"
//               onClick={() => setIsSidebarOpen(true)}
//             >
//               <Bars3Icon className="h-6 w-6" />
//             </button>
//             <div className="flex items-center space-x-4">
//               <NotificationBell />
//               <div className="md:hidden">
//                 <UserCircleIcon className="h-8 w-8 text-gray-400" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Main content area */}
//         <main className="flex-1">
//           <div className="py-6">
//             <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
//               {children}
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };


// src/components/layout/DashboardLayout.tsx
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Bars3Icon, 
  XMarkIcon, 
  ChartBarIcon,
  UsersIcon,
  CalendarIcon,
  CogIcon,
  QrCodeIcon,
  DocumentTextIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../../hooks/useAuth';
import { NotificationBell } from '../notifications/NotificationBell';

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<any>;
}

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const adminNavigation: NavigationItem[] = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: ChartBarIcon },
    { name: 'Employees', href: '/admin/employees', icon: UsersIcon },
    { name: 'Visits', href: '/admin/visits', icon: CalendarIcon },
    { name: 'Reports', href: '/admin/reports', icon: DocumentTextIcon },
    { name: 'Check In/Out', href: '/check-in-out', icon: QrCodeIcon },
    { name: 'Settings', href: '/admin/settings', icon: CogIcon },
  ];

  const employeeNavigation: NavigationItem[] = [
    { name: 'Dashboard', href: '/employee/dashboard', icon: ChartBarIcon },
    { name: 'My Visits', href: '/employee/visits', icon: CalendarIcon },
    { name: 'Check In/Out', href: '/check-in-out', icon: QrCodeIcon },
  ];

  const navigation = user?.role === 'ADMIN' ? adminNavigation : employeeNavigation;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar for desktop */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <div className="flex min-h-0 flex-1 flex-col bg-gray-800">
          <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <div className="flex flex-shrink-0 items-center px-4">
              <h1 className="text-xl font-bold text-white">Visitor Management</h1>
            </div>
            <nav className="mt-5 flex-1 space-y-1 px-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${
                    location.pathname === item.href
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                >
                  <item.icon
                    className="mr-3 h-6 w-6 flex-shrink-0"
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex flex-shrink-0 bg-gray-700 p-4">
            <div className="group block w-full flex-shrink-0">
              <div className="flex items-center">
                <div>
                  <UserCircleIcon className="inline-block h-9 w-9 rounded-full text-gray-300" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">{user?.fullName}</p>
                  <button
                    onClick={handleLogout}
                    className="text-xs font-medium text-gray-300 hover:text-white"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden">
        <div className={`${isSidebarOpen ? 'fixed inset-0 z-40 flex' : ''}`}>
          {/* Overlay */}
          {isSidebarOpen && (
            <div 
              className="fixed inset-0 bg-gray-600 bg-opacity-75"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* Sidebar */}
          <div
            className={`
              fixed inset-y-0 left-0 flex w-full max-w-xs flex-col bg-gray-800
              transform transition-transform duration-300 ease-in-out
              ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}
          >
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                type="button"
                className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setIsSidebarOpen(false)}
              >
                <XMarkIcon className="h-6 w-6 text-white" />
              </button>
            </div>

            {/* Mobile navigation items */}
            <div className="flex-1 pt-5 pb-4 overflow-y-auto">
              <div className="flex-shrink-0 flex items-center px-4">
                <h1 className="text-xl font-bold text-white">Visitor Management</h1>
              </div>
              <nav className="mt-5 px-2 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`${
                      location.pathname === item.href
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    } group flex items-center px-2 py-2 text-base font-medium rounded-md`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <item.icon
                      className="mr-4 h-6 w-6 flex-shrink-0"
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Mobile user profile */}
            <div className="flex-shrink-0 flex bg-gray-700 p-4">
              <div className="flex items-center">
                <div>
                  <UserCircleIcon className="inline-block h-9 w-9 rounded-full text-gray-300" />
                </div>
                <div className="ml-3">
                  <p className="text-base font-medium text-white">{user?.fullName}</p>
                  <button
                    onClick={handleLogout}
                    className="text-sm font-medium text-gray-300 hover:text-white"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-64 flex flex-col flex-1">
        {/* Top header */}
        <div className="sticky top-0 z-10 bg-white shadow">
          <div className="flex h-16 items-center justify-between px-4 md:px-6">
            <button
              type="button"
              className="md:hidden text-gray-500 hover:text-gray-900"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
            <div className="flex items-center space-x-4">
              <NotificationBell />
            </div>
          </div>
        </div>

        {/* Main content area */}
        <main className="flex-1">
          <div className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
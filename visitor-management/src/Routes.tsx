// // src/Routes.tsx
// import { Routes as RouterRoutes, Route } from 'react-router-dom';
// import { ProtectedRoute } from './components/auth/ProtectedRoute';
// import { Layout } from './components/layout/Layout';
// import { HomePage } from './pages/HomePage';
// import { VisitorRegistration } from './pages/visitor/VisitorRegistration';
// import { VisitRequest } from './pages/visitor/VisitRequest';
// import { VisitStatus } from './pages/visitor/VisitStatus';
// import { EmployeeLogin } from './pages/employee/EmployeeLogin';
// import { EmployeeDashboard } from './pages/employee/EmployeeDashboard';
// import { AdminLogin } from './pages/admin/AdminLogin';
// import { AdminDashboard } from './pages/admin/AdminDashboard';
// import { useAuth } from './hooks/useAuth';

// export const Routes = () => {
//   const { isLoading } = useAuth();

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
//       </div>
//     );
//   }

//   return (
//     <Layout>
//       <RouterRoutes>
//         {/* Public Routes */}
//         <Route path="/" element={<HomePage />} />
//         <Route path="/visitor/register" element={<VisitorRegistration />} />
//         <Route path="/visit-request" element={<VisitRequest />} />
//         <Route path="/status" element={<VisitStatus />} />
//         <Route path="/employee/login" element={<EmployeeLogin />} />
//         <Route path="/admin/login" element={<AdminLogin />} />

//         {/* Protected Employee Routes */}
//         <Route
//           path="/employee/dashboard"
//           element={
//             <ProtectedRoute allowedRoles={['EMPLOYEE']}>
//               <EmployeeDashboard />
//             </ProtectedRoute>
//           }
//         />

//         {/* Protected Admin Routes */}
//         <Route
//           path="/admin/dashboard"
//           element={
//             <ProtectedRoute allowedRoles={['ADMIN']}>
//               <AdminDashboard />
//             </ProtectedRoute>
//           }
//         />
//       </RouterRoutes>
//     </Layout>
//   );
// };

// src/Routes.tsx
import { Routes as RouterRoutes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { VisitorRegistration } from './pages/visitor/VisitorRegistration';
import { VisitRequest } from './pages/visitor/VisitRequest';
import { VisitStatus } from './pages/visitor/VisitStatus';
import { EmployeeLogin } from './pages/employee/EmployeeLogin';
import { EmployeeDashboard } from './pages/employee/EmployeeDashboard';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { Reports } from './pages/admin/Reports';
import { CheckInOutProcess } from './components/visitor/CheckInOutProcess';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { useAuth } from './hooks/useAuth';
import { ScannerPage } from './pages/visitor/ScannerPage';
import { VisitPass } from './pages/visitor/VisitPass';

export const Routes = () => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <RouterRoutes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/visitor/register" element={<VisitorRegistration />} />
      <Route path="/visit-request" element={<VisitRequest />} />
      <Route path="/visit-status" element={<VisitStatus />} />
      <Route path="/check-in-out" element={<CheckInOutProcess />} />
      <Route path="/employee/login" element={<EmployeeLogin />} />
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Protected Employee Routes */}
      <Route
        path="/employee/dashboard"
        element={
          <ProtectedRoute allowedRoles={['EMPLOYEE']}>
            <EmployeeDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employee/visits"
        element={
          <ProtectedRoute allowedRoles={['EMPLOYEE']}>
            <EmployeeDashboard />
          </ProtectedRoute>
        }
      />

      {/* Protected Admin Routes */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/reports"
        element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <Reports />
          </ProtectedRoute>
        }
      />
        // Add to your Routes.tsx
        <Route path="/scanner" element={<ScannerPage />} />
      {/* Catch all route */}
      <Route path="/visit-pass/:visitId" element={<VisitPass />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </RouterRoutes>
  );
};

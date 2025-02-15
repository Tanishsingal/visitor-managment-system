// // // src/components/auth/ProtectedRoute.tsx
// // import { Navigate, useLocation } from 'react-router-dom';
// // import { useAuth } from '../../hooks/useAuth';

// // interface ProtectedRouteProps {
// //   children: React.ReactNode;
// //   allowedRoles?: string[];
// // }

// // export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
// //   children, 
// //   allowedRoles = [] 
// // }) => {
// //   const { user, isAuthenticated } = useAuth();
// //   const location = useLocation();

// //   if (!isAuthenticated) {
// //     return <Navigate to="/login" state={{ from: location }} replace />;
// //   }

// //   if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role || '')) {
// //     return <Navigate to="/unauthorized" replace />;
// //   }

// //   return <>{children}</>;
// // };

// // src/components/auth/ProtectedRoute.tsx
// import { Navigate, useLocation } from 'react-router-dom';
// import { useAuth } from '../../hooks/useAuth';
// import { LoadingSpinner } from '../common/LoadingSpinner';

// interface ProtectedRouteProps {
//   children: React.ReactNode;
//   allowedRoles?: string[];
// }

// export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
//   children, 
//   allowedRoles = [] 
// }) => {
//   const { user, isAuthenticated, isLoading } = useAuth();
//   const location = useLocation();

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <LoadingSpinner size="large" />
//       </div>
//     );
//   }

//   if (!isAuthenticated) {
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role || '')) {
//     return <Navigate to="/unauthorized" replace />;
//   }

//   return <>{children}</>;
// };


// src/components/auth/ProtectedRoute.tsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles = [] 
}) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role || '')) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};
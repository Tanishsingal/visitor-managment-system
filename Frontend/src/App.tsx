// // import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// // import Login from "./pages/Login";
// // import Dashboard from "./pages/Dashboard";
// // import VisitorManagement from "./pages/VisitorManagement";
// // import { AuthProvider } from "./context/AuthContext";
// // import PrivateRoute from "./components/PrivateRoute";

// import EmployeeDashboard from "./pages/EmployeeDashboard";

// function App() {
//   return (
//     // <AuthProvider>
//     //   <Router>
//     //     <Routes>
//     //       <Route path="/" element={<Login />} />
//     //       <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
//     //       <Route path="/visitors" element={<PrivateRoute><VisitorManagement /></PrivateRoute>} />
//     //     </Routes>
//     //   </Router>
//     // </AuthProvider>
//       <EmployeeDashboard employeeId={1}/>

//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import SecurityDashboard from "./pages/SecurityDashboard";
import VisitorDashboard from "./pages/VisitorDashboard";
import ReceptionDashboard from "./pages/ReceptionDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/visitor" element={
            <ProtectedRoute allowedRoles={["VISITOR"]}>
              <VisitorDashboard />
            </ProtectedRoute>
          } />

          <Route path="/security" element={
            <ProtectedRoute allowedRoles={["SECURITY"]}>
              <SecurityDashboard />
            </ProtectedRoute>
          } />

          <Route path="/reception" element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <ReceptionDashboard />
            </ProtectedRoute>
          } />

          <Route path="/employee" element={
            <ProtectedRoute allowedRoles={["EMPLOYEE"]}>
              <EmployeeDashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;

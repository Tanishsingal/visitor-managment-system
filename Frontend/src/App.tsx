// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import VisitorManagement from "./pages/VisitorManagement";
// import { AuthProvider } from "./context/AuthContext";
// import PrivateRoute from "./components/PrivateRoute";

import EmployeeDashboard from "./pages/EmployeeDashboard";

function App() {
  return (
    // <AuthProvider>
    //   <Router>
    //     <Routes>
    //       <Route path="/" element={<Login />} />
    //       <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
    //       <Route path="/visitors" element={<PrivateRoute><VisitorManagement /></PrivateRoute>} />
    //     </Routes>
    //   </Router>
    // </AuthProvider>
      <EmployeeDashboard employeeId={1}/>

  );
}

export default App;

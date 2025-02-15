
// // src/App.tsx
// import { BrowserRouter } from 'react-router-dom';
// import { AuthProvider } from './contexts/AuthContext';
// import { NotificationProvider } from './contexts/NotificationContext';
// import { Routes } from './Routes';
// import { Toaster } from 'react-hot-toast';

// function App() {
//   return (
//     <BrowserRouter>
//       <AuthProvider>
//         <NotificationProvider>
//           <Routes />
//           <Toaster position="top-right" />
//         </NotificationProvider>
//       </AuthProvider>
//     </BrowserRouter>
//   );
// }

// export default App;



import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Routes } from './Routes';
import { Toaster } from 'react-hot-toast';
import { wsService } from './services/websocketService';
import { VisitNotification } from './components/notifications/VisitNotification';

function App() {
  useEffect(() => {
    wsService.connect();
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <VisitNotification />
        <Routes />
        <Toaster position="top-right" />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
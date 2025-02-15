
// // src/components/RealTimeUpdates.tsx
// import { useEffect, useState } from 'react';
// import { useWebSocket } from '../hooks/useWebSocket';
// import toast from 'react-hot-toast';

// interface UpdateData {
//   type: 'visit' | 'notification' | 'alert';
//   message: string;
//   data: any;
// }

// export const RealTimeUpdates = () => {
//   const [updates, setUpdates] = useState<UpdateData[]>([]);

//   useWebSocket('update', (data: UpdateData) => {
//     setUpdates(prev => [data, ...prev].slice(0, 10));
//     showNotification(data);
//   });

//   const showNotification = (update: UpdateData) => {
//     switch (update.type) {
//       case 'visit':
//         toast.success(update.message);
//         break;
//       case 'notification':
//         toast(update.message);
//         break;
//       case 'alert':
//         toast.error(update.message);
//         break;
//     }
//   };

//   return null; // This component just handles real-time updates
// };


// src/components/notifications/RealTimeUpdates.tsx
import { useEffect } from 'react';
import { wsService } from '../services/websocketService';
// import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';

export const RealTimeUpdates = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const handleVisitUpdate = (data: {
      type: string;
      visitId: number;
      visitorName: string;
      status: string;
    }) => {
      switch (data.type) {
        case 'CHECK_IN':
          toast.success(`${data.visitorName} has checked in`);
          break;
        case 'CHECK_OUT':
          toast.success(`${data.visitorName} has checked out`);
          break;
        case 'VISIT_REQUEST':
          toast.success(`New visit request from ${data.visitorName}`);
          break;
        case 'VISIT_APPROVED':
          toast.success(`Visit request approved for ${data.visitorName}`);
          break;
        case 'VISIT_DENIED':
          toast.error(`Visit request denied for ${data.visitorName}`);
          break;
      }
    };

    wsService.subscribe('visitUpdate', handleVisitUpdate);
    return () => wsService.unsubscribe('visitUpdate', handleVisitUpdate);
  }, [user]);

  return null;
};
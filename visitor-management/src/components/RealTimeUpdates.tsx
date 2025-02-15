
// // src/components/notifications/RealTimeUpdates.tsx
// import { useEffect } from 'react';
// import { wsService } from '../services/websocketService';
// // import { useAuth } from '../../hooks/useAuth';
// import toast from 'react-hot-toast';
// import { useAuth } from '../hooks/useAuth';

// export const RealTimeUpdates = () => {
//   const { user } = useAuth();

//   useEffect(() => {
//     if (!user) return;

//     const handleVisitUpdate = (data: {
//       type: string;
//       visitId: number;
//       visitorName: string;
//       status: string;
//     }) => {
//       switch (data.type) {
//         case 'CHECK_IN':
//           toast.success(`${data.visitorName} has checked in`);
//           break;
//         case 'CHECK_OUT':
//           toast.success(`${data.visitorName} has checked out`);
//           break;
//         case 'VISIT_REQUEST':
//           toast.success(`New visit request from ${data.visitorName}`);
//           break;
//         case 'VISIT_APPROVED':
//           toast.success(`Visit request approved for ${data.visitorName}`);
//           break;
//         case 'VISIT_DENIED':
//           toast.error(`Visit request denied for ${data.visitorName}`);
//           break;
//       }
//     };

//     wsService.subscribe('visitUpdate', handleVisitUpdate);
//     return () => wsService.unsubscribe('visitUpdate', handleVisitUpdate);
//   }, [user]);

//   return null;
// };

import { useEffect, useCallback } from 'react';
import { wsService } from '../services/websocketService';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';

export const RealTimeUpdates = () => {
  const { user } = useAuth();

  const handleVisitUpdate = useCallback(
    (data: {
      type: 'CHECK_IN' | 'CHECK_OUT' | 'VISIT_REQUEST' | 'VISIT_APPROVED' | 'VISIT_DENIED';
      visitId: number;
      visitorName: string;
    }) => {
      const messages = {
        CHECK_IN: `${data.visitorName} has checked in`,
        CHECK_OUT: `${data.visitorName} has checked out`,
        VISIT_REQUEST: `New visit request from ${data.visitorName}`,
        VISIT_APPROVED: `Visit request approved for ${data.visitorName}`,
        VISIT_DENIED: `Visit request denied for ${data.visitorName}`,
      };

      const notify = data.type === 'VISIT_DENIED' ? toast.error : toast.success;
      notify(messages[data.type]);
    },
    []
  );

  useEffect(() => {
    if (!user) return;

    wsService.subscribe('visitUpdate', handleVisitUpdate);
    return () => wsService.unsubscribe('visitUpdate', handleVisitUpdate);
  }, [user, handleVisitUpdate]);

  return null;
};
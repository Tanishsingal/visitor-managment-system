// // src/components/notifications/VisitNotification.tsx
// import { useEffect } from 'react';
// import { wsService } from '../../services/websocketService';
// import { useAuth } from '../../hooks/useAuth';
// import toast from 'react-hot-toast';

// export const VisitNotification = () => {
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
//       }
//     };

//     wsService.subscribe('visitUpdate', handleVisitUpdate);

//     return () => {
//       wsService.unsubscribe('visitUpdate', handleVisitUpdate);
//     };
//   }, [user]);

//   return null;
// };

import { useEffect } from 'react';
import { wsService } from '../../services/websocketService';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

export const VisitNotification = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const handleVisitUpdate = ({
      type,
      visitorName,
    }: {
      type: 'CHECK_IN' | 'CHECK_OUT' | 'VISIT_REQUEST';
      visitorName: string;
    }) => {
      const messages: Record<typeof type, string> = {
        CHECK_IN: `${visitorName} has checked in.`,
        CHECK_OUT: `${visitorName} has checked out.`,
        VISIT_REQUEST: `New visit request from ${visitorName}.`,
      };
      toast.success(messages[type]);
    };

    wsService.subscribe('visitUpdate', handleVisitUpdate);

    return () => {
      wsService.unsubscribe('visitUpdate', handleVisitUpdate);
    };
  }, [user]);

  return null;
};
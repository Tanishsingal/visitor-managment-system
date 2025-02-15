// src/components/notifications/VisitNotification.tsx
import { useEffect } from 'react';
import { wsService } from '../../services/websocketService';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

export const VisitNotification = () => {
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
      }
    };

    wsService.subscribe('visitUpdate', handleVisitUpdate);

    return () => {
      wsService.unsubscribe('visitUpdate', handleVisitUpdate);
    };
  }, [user]);

  return null;
};
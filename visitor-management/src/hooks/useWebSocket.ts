
// src/hooks/useWebSocket.ts
import { useEffect } from 'react';
import { wsService } from '../services/websocketService';

export const useWebSocket = (
  eventType: string,
  callback: (data: any) => void
) => {
  useEffect(() => {
    wsService.subscribe(eventType, callback);
    return () => wsService.unsubscribe(eventType, callback);
  }, [eventType, callback]);
};

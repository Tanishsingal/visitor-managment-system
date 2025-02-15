// src/contexts/NotificationContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { wsService } from '../services/websocketService';
import api from '../services/api';
import toast from 'react-hot-toast';

interface Notification {
  id: number;
  message: string;
  type: 'visit_request' | 'visit_approved' | 'visit_denied' | 'check_in' | 'check_out';
  read: boolean;
  createdAt: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: number) => Promise<void>;
  clearAll: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    fetchNotifications();
    const cleanup = setupWebSocket();
    return cleanup;
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await api.get('/notifications');
      setNotifications(response.data);
      updateUnreadCount(response.data);
    } catch (error) {
      console.error('Failed to fetch notifications'+error);
    }
  };

  const setupWebSocket = () => {
    const handleNewNotification = (notification: Notification) => {
      setNotifications(prev => [notification, ...prev]);
      updateUnreadCount([notification, ...notifications]);
      showNotificationToast(notification);
    };

    wsService.subscribe('notification', handleNewNotification);

    return () => {
      wsService.unsubscribe('notification', handleNewNotification);
    };
  };

  const updateUnreadCount = (notifs: Notification[]) => {
    setUnreadCount(notifs.filter(n => !n.read).length);
  };

  const showNotificationToast = (notification: Notification) => {
    toast.custom((t) => (
      <div className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
        <div className="flex-1 p-4">
          <div className="flex items-start">
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">
                {notification.message}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {new Date(notification.createdAt).toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  const markAsRead = async (id: number) => {
    try {
      await api.put(`/notifications/${id}/read`);
      setNotifications(notifications.map(n => 
        n.id === id ? { ...n, read: true } : n
      ));
      updateUnreadCount(notifications);
    } catch (error) {
      console.error('Failed to mark notification as read');
      throw error;
    }
  };

  const clearAll = async () => {
    try {
      await api.post('/notifications/clear-all');
      setNotifications([]);
      setUnreadCount(0);
    } catch (error) {
      console.error('Failed to clear notifications');
      throw error;
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        clearAll,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
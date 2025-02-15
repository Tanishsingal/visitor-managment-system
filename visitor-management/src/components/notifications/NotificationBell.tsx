
// src/components/notifications/NotificationBell.tsx
import { useState, useEffect } from 'react';
import { BellIcon } from '@heroicons/react/24/outline';
import { wsService } from '../../services/websocketService';
import toast from 'react-hot-toast';
import api from '../../services/api';

interface Notification {
  id: number;
  message: string;
  type: 'visit_request' | 'visit_approved' | 'visit_denied' | 'check_in' | 'check_out';
  read: boolean;
  createdAt: string;
}

export const NotificationBell = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchNotifications();
    setupWebSocket();
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
    wsService.subscribe('notification', handleNewNotification);
    return () => {
      wsService.unsubscribe('notification', handleNewNotification);
    };
  };

  const handleNewNotification = (notification: Notification) => {
    setNotifications(prev => [notification, ...prev]);
    updateUnreadCount([notification, ...notifications]);
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 p-4">
          <div className="flex items-start">
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">
                {notification.message}
              </p>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  const updateUnreadCount = (notifs: Notification[]) => {
    setUnreadCount(notifs.filter(n => !n.read).length);
  };

  const markAsRead = async (notificationId: number) => {
    try {
      await api.put(`/notifications/${notificationId}/read`);
      setNotifications(notifications.map(n => 
        n.id === notificationId ? { ...n, read: true } : n
      ));
      updateUnreadCount(notifications);
    } catch (error) {
      console.error('Failed to mark notification as read'+error);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900"
      >
        <BellIcon className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-500 text-xs text-white text-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Notifications
            </h3>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <p className="text-gray-500 text-center py-4">
                  No notifications
                </p>
              ) : (
                notifications.map(notification => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg ${
                      notification.read ? 'bg-gray-50' : 'bg-blue-50'
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <p className="text-sm text-gray-900">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(notification.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
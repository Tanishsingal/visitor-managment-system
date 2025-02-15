// src/components/auth/SessionHandler.tsx
import { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
const WARNING_TIME = 5 * 60 * 1000; // 5 minutes before timeout

export const SessionHandler: React.FC = () => {
  const { logout, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) return;

    let warningTimeout: NodeJS.Timeout;
    let logoutTimeout: NodeJS.Timeout;

    const resetTimers = () => {
      // Clear existing timeouts
      clearTimeout(warningTimeout);
      clearTimeout(logoutTimeout);

      // Set warning timeout (25 minutes)
      warningTimeout = setTimeout(() => {
        toast.error('Your session will expire in 5 minutes');
      }, SESSION_TIMEOUT - WARNING_TIME);

      // Set logout timeout (30 minutes)
      logoutTimeout = setTimeout(() => {
        toast.error('Session expired. Please login again');
        logout();
      }, SESSION_TIMEOUT);
    };

    // Add event listeners for user activity
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach(event => document.addEventListener(event, resetTimers));

    // Initialize timers
    resetTimers();

    // Cleanup
    return () => {
      events.forEach(event => document.removeEventListener(event, resetTimers));
      clearTimeout(warningTimeout);
      clearTimeout(logoutTimeout);
    };
  }, [isAuthenticated, logout]);

  return null;
};
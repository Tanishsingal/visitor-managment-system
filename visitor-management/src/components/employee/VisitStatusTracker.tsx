
// src/components/employee/VisitStatusTracker.tsx
import { useState, useEffect } from 'react';
import { Visit } from '../../types';
import { wsService } from '../../services/websocketService';
import api from '../../services/api';

export const VisitStatusTracker = () => {
  const [activeVisits, setActiveVisits] = useState<Visit[]>([]);

  useEffect(() => {
    fetchActiveVisits();
    setupWebSocket();
  }, []);

  const fetchActiveVisits = async () => {
    try {
      const response = await api.get('/visits/active');
      setActiveVisits(response.data);
    } catch (error) {
      console.error('Failed to fetch active visits'+error);
    }
  };

  const setupWebSocket = () => {
    const handleVisitUpdate = (data: { visit: Visit; type: string }) => {
      if (data.type === 'CHECK_IN') {
        setActiveVisits(prev => [...prev, data.visit]);
      } else if (data.type === 'CHECK_OUT') {
        setActiveVisits(prev => prev.filter(v => v.id !== data.visit.id));
      }
    };

    wsService.subscribe('visitUpdate', handleVisitUpdate);
    return () => wsService.unsubscribe('visitUpdate', handleVisitUpdate);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Active Visits</h2>
      <div className="space-y-4">
        {activeVisits.map((visit) => (
          <div
            key={visit.id}
            className="border-l-4 border-blue-500 pl-4 py-2"
          >
            <p className="font-medium text-gray-900">{visit.visitor.fullName}</p>
            <p className="text-sm text-gray-500">
              Meeting with: {visit.employee.fullName}
            </p>
            <p className="text-sm text-gray-500">
              Checked in: {new Date(visit.checkIn).toLocaleTimeString()}
            </p>
          </div>
        ))}
        {activeVisits.length === 0 && (
          <p className="text-gray-500 text-center">No active visits</p>
        )}
      </div>
    </div>
  );
};


// src/components/admin/RecentVisits.tsx
import { useState, useEffect } from 'react';
import { Visit } from '../../types';
import api from '../../services/api';

export const RecentVisits = () => {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchRecentVisits();
  }, []);

  const fetchRecentVisits = async () => {
    try {
      const response = await api.get('/visits/recent');
      setVisits(response.data);
    } catch (error) {
      console.error('Failed to fetch recent visits'+error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Visits</h2>
        
        {isLoading ? (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
          </div>
        ) : (
          <div className="space-y-4">
            {visits.map((visit) => (
              <div 
                key={visit.id} 
                className="border rounded-lg p-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{visit.visitor.fullName}</p>
                    <p className="text-sm text-gray-500">{visit.purpose}</p>
                  </div>
                  <span className={`
                    px-2 py-1 text-xs font-medium rounded-full
                    ${visit.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                      visit.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'}
                  `}>
                    {visit.status}
                  </span>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  <p>Meeting with: {visit.employee.fullName}</p>
                  <p>Date: {new Date(visit.checkIn).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

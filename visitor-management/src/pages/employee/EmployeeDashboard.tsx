
// import { useState, useEffect } from 'react';
// import { Visit } from '../../types';
// import { VisitRequestCard } from './VisitRequestCard';
// import { DashboardLayout } from '../../components/layout/DashboardLayout';
// import api from '../../services/api';
// import toast from 'react-hot-toast';

// export const EmployeeDashboard = () => {
//   const [visits, setVisits] = useState<Visit[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'all'>('pending');

//   useEffect(() => {
//     fetchVisits();
//   }, [activeTab]);

//   const fetchVisits = async () => {
//     setIsLoading(true);
//     try {
//       const response = await api.get(`/visits?status=${activeTab}`);
//       setVisits(response.data);
//     } catch (error) {
//       toast.error('Failed to fetch visits');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <DashboardLayout>
//       <div className="space-y-6">
//         <div className="flex justify-between items-center">
//           <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
//           <div className="flex space-x-2">
//             <button
//               onClick={() => setActiveTab('pending')}
//               className={`px-4 py-2 rounded-md ${
//                 activeTab === 'pending'
//                   ? 'bg-blue-100 text-blue-700'
//                   : 'text-gray-500 hover:text-gray-700'
//               }`}
//             >
//               Pending
//             </button>
//             <button
//               onClick={() => setActiveTab('approved')}
//               className={`px-4 py-2 rounded-md ${
//                 activeTab === 'approved'
//                   ? 'bg-blue-100 text-blue-700'
//                   : 'text-gray-500 hover:text-gray-700'
//               }`}
//             >
//               Approved
//             </button>
//             <button
//               onClick={() => setActiveTab('all')}
//               className={`px-4 py-2 rounded-md ${
//                 activeTab === 'all'
//                   ? 'bg-blue-100 text-blue-700'
//                   : 'text-gray-500 hover:text-gray-700'
//               }`}
//             >
//               All
//             </button>
//           </div>
//         </div>

//         {isLoading ? (
//           <div className="flex justify-center py-8">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {visits.map((visit) => (
//               <VisitRequestCard
//                 key={visit.id}
//                 visit={visit}
//                 onStatusUpdate={fetchVisits}
//               />
//             ))}
//             {visits.length === 0 && (
//               <div className="col-span-full text-center py-12 text-gray-500">
//                 No visits found
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </DashboardLayout>
//   );
// };


// src/pages/employee/EmployeeDashboard.tsx
import { useState, useEffect } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { LiveVisitFeed } from '../../components/dashboard/LiveVisitFeed';
import { RealTimeUpdates } from '../../components/RealTimeUpdates';
import { VisitRequestCard } from '../../components/employee/VisitRequestCard';
import { Visit } from '../../types';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { Button } from '../../components/common/Button';
import { VisitStatusTracker } from '../../components/employee/VisitStatusTracker';

export const EmployeeDashboard = () => {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'all'>('pending');

  useEffect(() => {
    fetchVisits();
  }, [activeTab]);

  const fetchVisits = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`/visits?status=${activeTab}`);
      setVisits(response.data);
    } catch (error) {
      toast.error('Failed to fetch visits'+error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <RealTimeUpdates />
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <div className="flex space-x-2">
            <Button
              onClick={() => setActiveTab('pending')}
              variant={activeTab === 'pending' ? 'primary' : 'outline'}
            >
              Pending
            </Button>
            <Button
              onClick={() => setActiveTab('approved')}
              variant={activeTab === 'approved' ? 'primary' : 'outline'}
            >
              Approved
            </Button>
            <Button
              onClick={() => setActiveTab('all')}
              variant={activeTab === 'all' ? 'primary' : 'outline'}
            >
              All
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Visit Requests Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-gray-900">Visit Requests</h2>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
              </div>
            ) : (
              <div className="space-y-4">
                {visits.map((visit) => (
                  <VisitRequestCard
                    key={visit.id}
                    visit={visit}
                    onStatusUpdate={fetchVisits}
                  />
                ))}
                {visits.length === 0 && (
                  <div className="text-center py-8 bg-white rounded-lg shadow">
                    <p className="text-gray-500">No visits found</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Live Feed Section */}
          <div>
            <LiveVisitFeed />
            
            {/* Quick Stats */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-sm font-medium text-gray-500">Today's Visits</h3>
                <p className="mt-2 text-2xl font-semibold text-gray-900">
                  {visits.filter(v => 
                    new Date(v.checkIn).toDateString() === new Date().toDateString()
                  ).length}
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-sm font-medium text-gray-500">Pending Requests</h3>
                <p className="mt-2 text-2xl font-semibold text-gray-900">
                  {visits.filter(v => v.status === 'PENDING').length}
                </p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="mt-6 bg-white rounded-lg shadow p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {visits.slice(0, 5).map((visit) => (
                  <div key={visit.id} className="flex items-center space-x-4">
                    <div className={`w-2 h-2 rounded-full ${
                      visit.status === 'PENDING' ? 'bg-yellow-400' :
                      visit.status === 'APPROVED' ? 'bg-green-400' :
                      'bg-red-400'
                    }`} />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {visit.visitor.fullName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(visit.checkIn).toLocaleString()}
                      </p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      visit.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                      visit.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {visit.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
            <VisitStatusTracker/>
        </div>
      </div>
    </DashboardLayout>
  );
};
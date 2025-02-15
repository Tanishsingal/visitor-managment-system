// // src/components/admin/VisitAnalytics.tsx
// import { useState, useEffect } from 'react';
// import { Visit } from '../../types';

// interface AnalyticsData {
//   totalVisits: number;
//   pendingVisits: number;
//   approvedVisits: number;
//   deniedVisits: number;
//   checkedInVisits: number;
//   overStayVisits: number;
// }

// export const VisitAnalytics = () => {
//   const [analytics, setAnalytics] = useState<AnalyticsData>({
//     totalVisits: 0,
//     pendingVisits: 0,
//     approvedVisits: 0,
//     deniedVisits: 0,
//     checkedInVisits: 0,
//     overStayVisits: 0,
//   });
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     fetchAnalytics();
//   }, []);

//   const fetchAnalytics = async () => {
//     setIsLoading(true);
//     try {
//       // API call will go here
//       // const response = await api.get('/visits/analytics');
//       // setAnalytics(response.data);
//     } catch (error) {
//       console.error('Failed to fetch analytics');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const StatCard = ({ title, value, color }: { title: string; value: number; color: string }) => (
//     <div className="bg-white rounded-lg shadow p-6">
//       <div className="flex items-center">
//         <div className={`rounded-full p-3 ${color}`}>
//           {/* Icon can be added here */}
//         </div>
//         <div className="ml-4">
//           <h3 className="text-lg font-medium text-gray-900">{title}</h3>
//           <p className="text-2xl font-semibold text-gray-700">{value}</p>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         <StatCard 
//           title="Total Visits" 
//           value={analytics.totalVisits}
//           color="bg-blue-100"
//         />
//         <StatCard 
//           title="Pending Visits" 
//           value={analytics.pendingVisits}
//           color="bg-yellow-100"
//         />
//         <StatCard 
//           title="Approved Visits" 
//           value={analytics.approvedVisits}
//           color="bg-green-100"
//         />
//         <StatCard 
//           title="Denied Visits" 
//           value={analytics.deniedVisits}
//           color="bg-red-100"
//         />
//         <StatCard 
//           title="Checked In" 
//           value={analytics.checkedInVisits}
//           color="bg-purple-100"
//         />
//         <StatCard 
//           title="Overstay" 
//           value={analytics.overStayVisits}
//           color="bg-orange-100"
//         />
//       </div>

//       {/* Add charts or graphs here */}
//     </div>
//   );
// };



// src/components/admin/VisitAnalytics.tsx
import { useState, useEffect } from 'react';
import { Visit } from '../../types';
import api from '../../services/api';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Button } from '../../components/common/Button';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface AnalyticsData {
  totalVisits: number;
  activeVisits: number;
  completedVisits: number;
  averageDuration: number;
  visitsByDepartment: Record<string, number>;
  visitsByDay: Record<string, number>;
}

export const VisitAnalytics = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dateRange, setDateRange] = useState('week'); // week, month, year

  useEffect(() => {
    fetchAnalytics();
  }, [dateRange]);

  const fetchAnalytics = async () => {
    try {
      const response = await api.get(`/analytics/visits?range=${dateRange}`);
      setAnalytics(response.data);
    } catch (error) {
      console.error('Failed to fetch analytics'+error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || !analytics) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  const departmentChartData = {
    labels: Object.keys(analytics.visitsByDepartment),
    datasets: [
      {
        label: 'Visits by Department',
        data: Object.values(analytics.visitsByDepartment),
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
      },
    ],
  };

  const dailyChartData = {
    labels: Object.keys(analytics.visitsByDay),
    datasets: [
      {
        label: 'Daily Visits',
        data: Object.values(analytics.visitsByDay),
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
      },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Visits</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {analytics.totalVisits}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Active Visits</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {analytics.activeVisits}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Completed Visits</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {analytics.completedVisits}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Avg. Duration</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {Math.round(analytics.averageDuration)} min
          </p>
        </div>
      </div>

      {/* Date Range Selector */}
      <div className="flex justify-end space-x-2">
        <Button
          variant={dateRange === 'week' ? 'primary' : 'outline'}
          onClick={() => setDateRange('week')}
        >
          Week
        </Button>
        <Button
          variant={dateRange === 'month' ? 'primary' : 'outline'}
          onClick={() => setDateRange('month')}
        >
          Month
        </Button>
        <Button
          variant={dateRange === 'year' ? 'primary' : 'outline'}
          onClick={() => setDateRange('year')}
        >
          Year
        </Button>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4">Visits by Department</h3>
          <Bar data={departmentChartData} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4">Daily Visits</h3>
          <Bar data={dailyChartData} />
        </div>
      </div>
    </div>
  );
};

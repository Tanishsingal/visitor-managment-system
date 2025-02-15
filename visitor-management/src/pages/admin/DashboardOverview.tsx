// src/components/admin/DashboardOverview.tsx
import { useState, useEffect } from 'react';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import api from '../../services/api';
import { Button } from '../../components/common/Button';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface DashboardStats {
  visitsByTime: {
    labels: string[];
    data: number[];
  };
  visitsByDepartment: {
    labels: string[];
    data: number[];
  };
  visitorStatus: {
    labels: string[];
    data: number[];
  };
  summary: {
    totalVisits: number;
    activeVisits: number;
    pendingVisits: number;
    completedVisits: number;
  };
}

export const DashboardOverview = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month'>('week');

  useEffect(() => {
    fetchDashboardStats();
  }, [timeRange]);

  const fetchDashboardStats = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`/dashboard/stats?range=${timeRange}`);
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch dashboard stats'+error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || !stats) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  const visitsByTimeConfig = {
    labels: stats.visitsByTime.labels,
    datasets: [
      {
        label: 'Visits Over Time',
        data: stats.visitsByTime.data,
        fill: true,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const visitsByDepartmentConfig = {
    labels: stats.visitsByDepartment.labels,
    datasets: [
      {
        label: 'Visits by Department',
        data: stats.visitsByDepartment.data,
        backgroundColor: [
          'rgba(59, 130, 246, 0.6)',
          'rgba(16, 185, 129, 0.6)',
          'rgba(245, 158, 11, 0.6)',
          'rgba(239, 68, 68, 0.6)',
          'rgba(139, 92, 246, 0.6)',
        ],
      },
    ],
  };

  const visitorStatusConfig = {
    labels: stats.visitorStatus.labels,
    datasets: [
      {
        data: stats.visitorStatus.data,
        backgroundColor: [
          'rgba(16, 185, 129, 0.6)',
          'rgba(245, 158, 11, 0.6)',
          'rgba(59, 130, 246, 0.6)',
        ],
      },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Visits</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {stats.summary.totalVisits}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Active Visits</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {stats.summary.activeVisits}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Pending Visits</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {stats.summary.pendingVisits}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Completed Visits</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {stats.summary.completedVisits}
          </p>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="flex justify-end space-x-2">
        <Button
          variant={timeRange === 'day' ? 'primary' : 'outline'}
          onClick={() => setTimeRange('day')}
        >
          Day
        </Button>
        <Button
          variant={timeRange === 'week' ? 'primary' : 'outline'}
          onClick={() => setTimeRange('week')}
        >
          Week
        </Button>
        <Button
          variant={timeRange === 'month' ? 'primary' : 'outline'}
          onClick={() => setTimeRange('month')}
        >
          Month
        </Button>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visits Over Time */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-4">Visits Over Time</h3>
          <Line data={visitsByTimeConfig} options={{
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
            },
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }} />
        </div>

        {/* Visits by Department */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-4">Visits by Department</h3>
          <Bar data={visitsByDepartmentConfig} options={{
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
            },
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }} />
        </div>

        {/* Visitor Status Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-4">Visitor Status Distribution</h3>
          <div className="h-[300px] flex justify-center">
            <Doughnut data={visitorStatusConfig} options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'bottom',
                },
              },
            }} />
          </div>
        </div>

        {/* Department Performance */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-4">Department Performance</h3>
          <div className="h-[300px] flex justify-center">
            <Pie data={visitsByDepartmentConfig} options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'bottom',
                },
              },
            }} />
          </div>
        </div>
      </div>
    </div>
  );
};
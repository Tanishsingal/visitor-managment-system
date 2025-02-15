
// src/components/analytics/VisitAnalyticsDashboard.tsx
import { useState, useEffect } from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import api from '../../services/api';
import { Button } from '../common/Button';

interface AnalyticsData {
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
    averageDuration: number;
    completedVisits: number;
  };
}

export const VisitAnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month'>('week');

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      const response = await api.get(`/analytics/visits?range=${timeRange}`);
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

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Visits</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {analytics.summary.totalVisits}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Active Visits</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {analytics.summary.activeVisits}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Avg. Duration</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {analytics.summary.averageDuration}m
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Completed</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {analytics.summary.completedVisits}
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

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-4">Visits Over Time</h3>
          <Line
            data={{
              labels: analytics.visitsByTime.labels,
              datasets: [
                {
                  label: 'Visits',
                  data: analytics.visitsByTime.data,
                  borderColor: 'rgb(59, 130, 246)',
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                  fill: true,
                },
              ],
            }}
            options={{
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
            }}
          />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-4">Visits by Department</h3>
          <Bar
            data={{
              labels: analytics.visitsByDepartment.labels,
              datasets: [
                {
                  label: 'Visits',
                  data: analytics.visitsByDepartment.data,
                  backgroundColor: 'rgba(59, 130, 246, 0.5)',
                },
              ],
            }}
            options={{
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
            }}
          />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-4">Visit Status Distribution</h3>
          <div className="h-[300px] flex justify-center">
            <Doughnut
              data={{
                labels: analytics.visitorStatus.labels,
                datasets: [
                  {
                    data: analytics.visitorStatus.data,
                    backgroundColor: [
                      'rgba(59, 130, 246, 0.5)',
                      'rgba(16, 185, 129, 0.5)',
                      'rgba(239, 68, 68, 0.5)',
                    ],
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom',
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// src/components/reports/VisitReport.tsx
import { useState } from 'react';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { exportToCsv, exportToPdf } from '../../utils/exportUtils';
import api from '../../services/api';
import toast from 'react-hot-toast';

interface ReportFilters {
  startDate: string;
  endDate: string;
  department?: string;
  status?: string;
}

export const VisitReport = () => {
  const [filters, setFilters] = useState<ReportFilters>({
    startDate: '',
    endDate: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const generateReport = async (format: 'csv' | 'pdf') => {
    setIsLoading(true);
    try {
      const response = await api.get('/reports/visits', { params: filters });
      const data = response.data;

      if (format === 'csv') {
        exportToCsv(data, `visits-report-${filters.startDate}-${filters.endDate}`);
      } else {
        exportToPdf(
          data,
          `visits-report-${filters.startDate}-${filters.endDate}`,
          'Visitor Management System - Visit Report'
        );
      }
      toast.success('Report generated successfully');
    } catch (error) {
      toast.error('Failed to generate report'+error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-6">Generate Visit Report</h2>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Start Date"
            type="date"
            value={filters.startDate}
            onChange={(e) => setFilters(prev => ({ ...prev, startDate: e.target.value }))}
          />
          <Input
            label="End Date"
            type="date"
            value={filters.endDate}
            onChange={(e) => setFilters(prev => ({ ...prev, endDate: e.target.value }))}
          />
          <Input
            label="Department"
            value={filters.department}
            onChange={(e) => setFilters(prev => ({ ...prev, department: e.target.value }))}
          />
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={filters.status}
            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
          >
            <option value="">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="DENIED">Denied</option>
            <option value="CHECKED_IN">Checked In</option>
            <option value="CHECKED_OUT">Checked Out</option>
          </select>
        </div>

        <div className="flex space-x-4">
          <Button
            onClick={() => generateReport('csv')}
            isLoading={isLoading}
            variant="outline"
          >
            Export CSV
          </Button>
          <Button
            onClick={() => generateReport('pdf')}
            isLoading={isLoading}
          >
            Export PDF
          </Button>
        </div>
      </div>
    </div>
  );
};

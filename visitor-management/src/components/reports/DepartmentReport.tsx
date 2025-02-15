
// src/components/reports/DepartmentReport.tsx
import { useState } from 'react';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { exportToCsv, exportToPdf } from '../../utils/exportUtils';
import api from '../../services/api';
import toast from 'react-hot-toast';

interface DepartmentReportFilters {
  startDate: string;
  endDate: string;
}

export const DepartmentReport = () => {
  const [filters, setFilters] = useState<DepartmentReportFilters>({
    startDate: '',
    endDate: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const generateReport = async (format: 'csv' | 'pdf') => {
    setIsLoading(true);
    try {
      const response = await api.get('/reports/departments', { params: filters });
      const data = response.data;

      if (format === 'csv') {
        exportToCsv(data, `department-report-${filters.startDate}-${filters.endDate}`);
      } else {
        exportToPdf(
          data,
          `department-report-${filters.startDate}-${filters.endDate}`,
          'Department Visit Analysis'
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
      <h2 className="text-lg font-medium text-gray-900 mb-6">Department Analysis Report</h2>

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
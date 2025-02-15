
// src/components/reports/EmployeeReport.tsx
import { useState } from 'react';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { exportToCsv, exportToPdf } from '../../utils/exportUtils';
import api from '../../services/api';
import toast from 'react-hot-toast';

interface EmployeeReportFilters {
  department?: string;
  startDate?: string;
  endDate?: string;
}

export const EmployeeReport = () => {
  const [filters, setFilters] = useState<EmployeeReportFilters>({});
  const [isLoading, setIsLoading] = useState(false);

  const generateReport = async (format: 'csv' | 'pdf') => {
    setIsLoading(true);
    try {
      const response = await api.get('/reports/employees', { params: filters });
      const data = response.data;

      if (format === 'csv') {
        exportToCsv(data, `employee-report-${new Date().toISOString()}`);
      } else {
        exportToPdf(
          data,
          `employee-report-${new Date().toISOString()}`,
          'Employee Activity Report'
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
      <h2 className="text-lg font-medium text-gray-900 mb-6">Employee Activity Report</h2>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Department"
            value={filters.department}
            onChange={(e) => setFilters(prev => ({ ...prev, department: e.target.value }))}
          />
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
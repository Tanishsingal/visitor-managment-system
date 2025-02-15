
// src/components/admin/SystemSettings.tsx
import { useState } from 'react';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import toast from 'react-hot-toast';

interface Settings {
  maxVisitorsPerDay: number;
  visitDurationLimit: number;
  preApprovalRequired: boolean;
  autoExpireTime: number;
}

export const SystemSettings = () => {
  const [settings, setSettings] = useState<Settings>({
    maxVisitorsPerDay: 50,
    visitDurationLimit: 8,
    preApprovalRequired: true,
    autoExpireTime: 24,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // API call will go here
      // await api.put('/settings', settings);
      toast.success('Settings updated successfully');
    } catch (error) {
      toast.error('Failed to update settings'+error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">System Settings</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Maximum Visitors Per Day"
            type="number"
            value={settings.maxVisitorsPerDay}
            onChange={(e) => setSettings({
              ...settings,
              maxVisitorsPerDay: parseInt(e.target.value)
            })}
          />

          <Input
            label="Visit Duration Limit (hours)"
            type="number"
            value={settings.visitDurationLimit}
            onChange={(e) => setSettings({
              ...settings,
              visitDurationLimit: parseInt(e.target.value)
            })}
          />

          <Input
            label="Auto Expire Time (hours)"
            type="number"
            value={settings.autoExpireTime}
            onChange={(e) => setSettings({
              ...settings,
              autoExpireTime: parseInt(e.target.value)
            })}
          />

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="preApprovalRequired"
              checked={settings.preApprovalRequired}
              onChange={(e) => setSettings({
                ...settings,
                preApprovalRequired: e.target.checked
              })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="preApprovalRequired" className="text-sm font-medium text-gray-700">
              Require Pre-approval for Visits
            </label>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            isLoading={isLoading}
          >
            Save Settings
          </Button>
        </div>
      </form>
    </div>
  );
};
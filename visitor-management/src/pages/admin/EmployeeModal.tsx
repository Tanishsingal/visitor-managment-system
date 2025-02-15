// src/components/admin/EmployeeModal.tsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import toast from 'react-hot-toast';
import api from '../../services/api';

interface EmployeeFormData {
  fullName: string;
  email: string;
  department: string;
  password?: string;
}

interface EmployeeModalProps {
  employee?: {
    id: number;
    fullName: string;
    email: string;
    department: string;
  };
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const EmployeeModal = ({ 
  employee, 
  isOpen, 
  onClose, 
  onSuccess 
}: EmployeeModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<EmployeeFormData>({
    defaultValues: employee
  });

  const onSubmit = async (data: EmployeeFormData) => {
    setIsLoading(true);
    try {
      if (employee) {
        await api.put(`/employees/${employee.id}`, data);
        toast.success('Employee updated successfully');
      } else {
        await api.post('/employees/register', data);
        toast.success('Employee added successfully');
      }
      onSuccess();
      onClose();
    } catch (error) {
      toast.error('Operation failed'+error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg font-medium text-gray-900">
            {employee ? 'Edit Employee' : 'Add New Employee'}
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
            <Input
              label="Full Name"
              {...register('fullName', { required: 'Full name is required' })}
              error={errors.fullName?.message}
            />
            <Input
              label="Email"
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              error={errors.email?.message}
            />
            <Input
              label="Department"
              {...register('department', { required: 'Department is required' })}
              error={errors.department?.message}
            />
            {!employee && (
              <Input
                label="Password"
                type="password"
                {...register('password', { required: 'Password is required' })}
                error={errors.password?.message}
              />
            )}
            <div className="mt-4 flex justify-end space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                isLoading={isLoading}
              >
                {employee ? 'Update' : 'Add'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};


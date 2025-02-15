// // src/pages/visitor/VisitRequest.tsx
// import { useForm } from 'react-hook-form';
// import { Input } from '../../components/common/Input';
// import { Button } from '../../components/common/Button';
// import toast from 'react-hot-toast';
// import { useState } from 'react';

// interface VisitRequestFormData {
//   visitorId?: number;
//   fullName: string;
//   email: string;
//   phone: string;
//   company?: string;
//   purpose: string;
//   employeeToMeet: string;
//   visitDate: string;
//   visitTime: string;
// }

// export const VisitRequest = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const { register, handleSubmit, formState: { errors } } = useForm<VisitRequestFormData>();

//   const onSubmit = async (data: VisitRequestFormData) => {
//     setIsLoading(true);
//     try {
//       // API call will go here
//       console.log(data);
//       toast.success('Visit request submitted successfully!');
//     } catch (error) {
//       toast.error('Failed to submit visit request. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto">
//       <div className="bg-white shadow rounded-lg p-6">
//         <h2 className="text-2xl font-bold text-gray-900 mb-6">
//           Request a Visit
//         </h2>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <Input
//               label="Full Name"
//               {...register('fullName', { required: 'Full name is required' })}
//               error={errors.fullName?.message}
//             />

//             <Input
//               label="Email"
//               type="email"
//               {...register('email', { 
//                 required: 'Email is required',
//                 pattern: {
//                   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                   message: 'Invalid email address'
//                 }
//               })}
//               error={errors.email?.message}
//             />

//             <Input
//               label="Phone"
//               {...register('phone', { 
//                 required: 'Phone number is required',
//                 pattern: {
//                   value: /^[0-9]{10}$/,
//                   message: 'Invalid phone number'
//                 }
//               })}
//               error={errors.phone?.message}
//             />

//             <Input
//               label="Company (Optional)"
//               {...register('company')}
//             />

//             <Input
//               label="Employee to Meet"
//               {...register('employeeToMeet', { required: 'Please specify whom you want to meet' })}
//               error={errors.employeeToMeet?.message}
//             />

//             <Input
//               label="Purpose of Visit"
//               {...register('purpose', { required: 'Purpose is required' })}
//               error={errors.purpose?.message}
//             />

//             <Input
//               label="Visit Date"
//               type="date"
//               min={new Date().toISOString().split('T')[0]}
//               {...register('visitDate', { required: 'Visit date is required' })}
//               error={errors.visitDate?.message}
//             />

//             <Input
//               label="Visit Time"
//               type="time"
//               {...register('visitTime', { required: 'Visit time is required' })}
//               error={errors.visitTime?.message}
//             />
//           </div>

//           <div className="flex justify-end space-x-4">
//             <Button
//               type="button"
//               variant="outline"
//               onClick={() => window.history.back()}
//             >
//               Cancel
//             </Button>
//             <Button
//               type="submit"
//               isLoading={isLoading}
//             >
//               Submit Request
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };


// src/pages/visitor/VisitRequest.tsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { emailService } from '../../services/emailService';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface VisitRequestFormData {
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  purpose: string;
  employeeToMeet: string;
  visitDate: string;
  visitTime: string;
}

export const VisitRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<VisitRequestFormData>();

//   const onSubmit = async (data: VisitRequestFormData) => {
//     setIsLoading(true);
//     try {
//       // Create visit request
//       const response = await api.post('/visits/request', data);
      
//       // The email notification is now handled on the backend
//       toast.success('Visit request submitted successfully');
//       // Navigate to status page with the visit ID
//       navigate(`/visit-status/${response.data.id}`);
//     } catch (error) {
//       toast.error('Failed to submit visit request');
//     } finally {
//       setIsLoading(false);
//     }
//   };

const onSubmit = async (data: VisitRequestFormData) => {
    setIsLoading(true);
    try {
      // Create visit request
      const response = await api.post('/visits/request', data);
      
      // Send email to employee
      await emailService.sendVisitRequestEmail(
        response.data.employee.email,
        data.fullName,
        data.purpose,
        `${data.visitDate} ${data.visitTime}`
      );
  
      toast.success('Visit request submitted successfully');
      navigate(`/visit-status/${response.data.id}`);
    } catch (error) {
      toast.error('Failed to submit visit request'+error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Request a Visit
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              label="Phone"
              {...register('phone', { 
                required: 'Phone number is required',
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'Invalid phone number'
                }
              })}
              error={errors.phone?.message}
            />

            <Input
              label="Company (Optional)"
              {...register('company')}
            />

            <Input
              label="Employee to Meet"
              {...register('employeeToMeet', { required: 'Please specify whom you want to meet' })}
              error={errors.employeeToMeet?.message}
            />

            <Input
              label="Purpose of Visit"
              {...register('purpose', { required: 'Purpose is required' })}
              error={errors.purpose?.message}
            />

            <Input
              label="Visit Date"
              type="date"
              min={new Date().toISOString().split('T')[0]}
              {...register('visitDate', { required: 'Visit date is required' })}
              error={errors.visitDate?.message}
            />

            <Input
              label="Visit Time"
              type="time"
              {...register('visitTime', { required: 'Visit time is required' })}
              error={errors.visitTime?.message}
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={isLoading}
            >
              Submit Request
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
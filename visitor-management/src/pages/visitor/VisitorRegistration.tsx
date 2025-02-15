// // src/pages/visitor/VisitorRegistration.tsx
// import { useForm } from 'react-hook-form';
// import { Input } from '../../components/common/Input';
// import { Button } from '../../components/common/Button';
// import toast from 'react-hot-toast';
// import { useState } from 'react';

// interface VisitorFormData {
//   fullName: string;
//   email: string;
//   phone: string;
//   company?: string;
// }

// export const VisitorRegistration = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const { register, handleSubmit, formState: { errors } } = useForm<VisitorFormData>();

//   const onSubmit = async (data: VisitorFormData) => {
//     setIsLoading(true);
//     try {
//       // API call will go here
//       console.log(data);
//       toast.success('Registration successful!');
//     } catch (error) {
//       toast.error('Registration failed. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto">
//       <h2 className="text-2xl font-bold text-gray-900 mb-6">
//         Visitor Registration
//       </h2>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//         <Input
//           label="Full Name"
//           {...register('fullName', { required: 'Full name is required' })}
//           error={errors.fullName?.message}
//         />

//         <Input
//           label="Email"
//           type="email"
//           {...register('email', { 
//             required: 'Email is required',
//             pattern: {
//               value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//               message: 'Invalid email address'
//             }
//           })}
//           error={errors.email?.message}
//         />

//         <Input
//           label="Phone"
//           {...register('phone', { 
//             required: 'Phone number is required',
//             pattern: {
//               value: /^[0-9]{10}$/,
//               message: 'Invalid phone number'
//             }
//           })}
//           error={errors.phone?.message}
//         />

//         <Input
//           label="Company (Optional)"
//           {...register('company')}
//         />

//         <Button
//           type="submit"
//           isLoading={isLoading}
//           className="w-full"
//         >
//           Register
//         </Button>
//       </form>
//     </div>
//   );
// };


// src/pages/visitor/VisitorRegistration.tsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import toast from 'react-hot-toast';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

interface VisitorFormData {
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  purpose: string;
  employeeToMeet: string;
}

export const VisitorRegistration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<VisitorFormData>();

  const onSubmit = async (data: VisitorFormData) => {
    setIsLoading(true);
    try {
      await api.post('/visitors/register', data);
      toast.success('Registration successful! Please wait for approval.');
      navigate('/visit-status');
    } catch (error) {
      toast.error('Registration failed. Please try again.'+error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Visitor Registration
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

            {/* <Input
              label="Company (Optional)"
              {...register('company')}
            /> */}

            {/* <Input
              label="Purpose of Visit"
              {...register('purpose', { required: 'Purpose is required' })}
              error={errors.purpose?.message}
            /> */}

            {/* <Input
              label="Employee to Meet"
              {...register('employeeToMeet', { required: 'Employee name is required' })}
              error={errors.employeeToMeet?.message}
            /> */}
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
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

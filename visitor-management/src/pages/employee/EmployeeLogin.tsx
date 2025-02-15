// // src/pages/employee/EmployeeLogin.tsx
// import { useForm } from 'react-hook-form';
// import { Input } from '../../components/common/Input';
// import { Button } from '../../components/common/Button';
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';

// interface LoginFormData {
//   email: string;
//   password: string;
// }

// export const EmployeeLogin = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();
//   const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

//   const onSubmit = async (data: LoginFormData) => {
//     setIsLoading(true);
//     try {
//       // API call will go here
//       console.log(data);
//       toast.success('Login successful!');
//       navigate('/employee/dashboard');
//     } catch (error) {
//       toast.error('Login failed. Please check your credentials.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-[80vh] flex items-center justify-center">
//       <div className="max-w-md w-full bg-white shadow rounded-lg p-8">
//         <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
//           Employee Login
//         </h2>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           <Input
//             label="Email"
//             type="email"
//             {...register('email', { 
//               required: 'Email is required',
//               pattern: {
//                 value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                 message: 'Invalid email address'
//               }
//             })}
//             error={errors.email?.message}
//           />

//           <Input
//             label="Password"
//             type="password"
//             {...register('password', { required: 'Password is required' })}
//             error={errors.password?.message}
//           />

//           <Button
//             type="submit"
//             isLoading={isLoading}
//             className="w-full"
//           >
//             Login
//           </Button>
//         </form>
//       </div>
//     </div>
//   );
// };

// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import { Input } from '../../components/common/Input';
// import { Button } from '../../components/common/Button';
// import { useAuth } from '../../hooks/useAuth';
// import toast from 'react-hot-toast';
// import api from '../../services/api';

// interface LoginFormData {
//   email: string;
//   password: string;
// }

// export const EmployeeLogin = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();
//   const { login } = useAuth();
//   const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

//   const onSubmit = async (data: LoginFormData) => {
//     setIsLoading(true);
//     try {
//       const response = await api.post('/employees/login', data);
//       const { token, user } = response.data;
//       login(token, { ...user, role: 'EMPLOYEE' });
//       toast.success('Login successful!');
//       navigate('/employee/dashboard');
//     } catch (error) {
//       toast.error('Invalid credentials');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             Employee Login
//           </h2>
//         </div>
//         <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
//           <div className="rounded-md shadow-sm -space-y-px">
//             <Input
//               label="Email Address"
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
//               label="Password"
//               type="password"
//               {...register('password', {
//                 required: 'Password is required',
//                 minLength: {
//                   value: 6,
//                   message: 'Password must be at least 6 characters'
//                 }
//               })}
//               error={errors.password?.message}
//             />
//           </div>

//           <Button
//             type="submit"
//             isLoading={isLoading}
//             className="w-full"
//           >
//             Sign in
//           </Button>
//         </form>
//       </div>
//     </div>
//   );
// };


// src/pages/employee/EmployeeLogin.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import api from '../../services/api';

interface LoginFormData {
  email: string;
  password: string;
}

export const EmployeeLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
        console.log(data);
      const response = await api.post('/employees/login', data);
      const { token, user } = response.data;
      console.log(token)
      console.log(user);
      
      login(token, { ...user, role: 'EMPLOYEE' });
      toast.success('Login successful!');
      navigate('/employee/dashboard');
    } catch (error) {
      toast.error('Invalid credentials'+error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Employee Login
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <Input
              label="Email Address"
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
              label="Password"
              type="password"
              {...register('password', {
                required: 'Password is required'
              })}
              error={errors.password?.message}
            />
          </div>

          <Button
            type="submit"
            isLoading={isLoading}
            className="w-full"
          >
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
};



// // src/components/admin/EmployeeList.tsx
// import { useState, useEffect } from 'react';
// import { Employee } from '../../types';
// import { Button } from '../../components/common/Button';
// import { EmployeeModal } from './EmployeeModal'; // Make sure to import the modal
// import api from '../../services/api';
// import toast from 'react-hot-toast';

// export const EmployeeList = () => {
//   const [employees, setEmployees] = useState<Employee[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [selectedEmployee, setSelectedEmployee] = useState<Employee | undefined>();
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     fetchEmployees();
//   }, []);

//   const fetchEmployees = async () => {
//     try {
//       const response = await api.get('/employees');
//       setEmployees(response.data);
//     } catch (error) {
//       toast.error('Failed to fetch employees');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleDelete = async (employeeId: number) => {
//     if (window.confirm('Are you sure you want to delete this employee?')) {
//       try {
//         await api.delete(`/employees/${employeeId}`);
//         toast.success('Employee deleted successfully');
//         fetchEmployees();
//       } catch (error) {
//         toast.error('Failed to delete employee');
//       }
//     }
//   };

//   const handleAddEmployee = () => {
//     setSelectedEmployee(undefined); // Clear selected employee
//     setIsModalOpen(true); // Open modal
//   };

//   const handleEditEmployee = (employee: Employee) => {
//     setSelectedEmployee(employee); // Set selected employee
//     setIsModalOpen(true); // Open modal
//   };

//   return (
//     <div className="bg-white shadow rounded-lg">
//       <div className="px-4 py-5 sm:p-6">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-lg font-medium text-gray-900">Employees</h2>
//           <Button onClick={handleAddEmployee}>
//             Add Employee
//           </Button>
//         </div>

//         {isLoading ? (
//           <div className="flex justify-center py-4">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead>
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Name
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Department
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Email
//                   </th>
//                   <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {employees.map((employee) => (
//                   <tr key={employee.id}>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm font-medium text-gray-900">
//                         {employee.fullName}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-500">
//                         {employee.department}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-500">
//                         {employee.email}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                       <button 
//                         onClick={() => handleEditEmployee(employee)}
//                         className="text-blue-600 hover:text-blue-900 mr-4"
//                       >
//                         Edit
//                       </button>
//                       <button 
//                         onClick={() => handleDelete(employee.id)}
//                         className="text-red-600 hover:text-red-900"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       {/* Employee Modal */}
//       <EmployeeModal
//         employee={selectedEmployee}
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onSuccess={() => {
//           fetchEmployees();
//           setIsModalOpen(false);
//         }}
//       />
//     </div>
//   );
// };


// src/components/admin/EmployeeList.tsx
import { useState, useEffect } from 'react';
import { Employee } from '../../types';
import { Button } from '../../components/common/Button';
import { EmployeeModal } from './EmployeeModal'; // Make sure to import the modal
import api from '../../services/api';
import toast from 'react-hot-toast';

export const EmployeeList = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await api.get('/employees');
      setEmployees(response.data);
    } catch (error) {
      toast.error('Failed to fetch employees'+error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (employeeId: number) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await api.delete(`/employees/${employeeId}`);
        toast.success('Employee deleted successfully');
        fetchEmployees();
      } catch (error) {
        toast.error('Failed to delete employee'+error);
      }
    }
  };

  const handleAddEmployee = () => {
    setSelectedEmployee(undefined); // Clear selected employee
    setIsModalOpen(true); // Open modal
  };

  const handleEditEmployee = (employee: Employee) => {
    setSelectedEmployee(employee); // Set selected employee
    setIsModalOpen(true); // Open modal
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Employees</h2>
          <Button onClick={handleAddEmployee}>
            Add Employee
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {employees.map((employee) => (
                  <tr key={employee.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {employee.fullName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {employee.department}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {employee.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => handleEditEmployee(employee)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(employee.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Employee Modal */}
      <EmployeeModal
        employee={selectedEmployee}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          fetchEmployees();
          setIsModalOpen(false);
        }}
      />
    </div>
  );
};
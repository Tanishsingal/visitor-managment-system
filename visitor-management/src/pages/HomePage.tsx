// src/pages/HomePage.tsx
import { Link } from 'react-router-dom';

export const HomePage = () => {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Welcome to Visitor Management System
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Choose your entry point below
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Visitor Card */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900">Visitors</h3>
              <p className="mt-2 text-sm text-gray-500">
                Register as a visitor or request a visit
              </p>
              <div className="mt-4 space-y-2">
                <Link
                  to="/visitor/register"
                  className="block w-full text-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Register
                </Link>
                <Link
                  to="/visit-request"
                  className="block w-full text-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Request Visit
                </Link>
              </div>
            </div>
          </div>

          {/* Employee Card */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900">Employees</h3>
              <p className="mt-2 text-sm text-gray-500">
                Employee login and dashboard access
              </p>
              <div className="mt-4">
                <Link
                  to="/employee/login"
                  className="block w-full text-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Employee Login
                </Link>
              </div>
            </div>
          </div>

          {/* Admin Card */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900">Admin</h3>
              <p className="mt-2 text-sm text-gray-500">
                System administration and management
              </p>
              <div className="mt-4">
                <Link
                  to="/admin/login"
                  className="block w-full text-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Admin Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
import React from 'react';
import { Activity } from 'lucide-react';
import { UserLogin } from '../components/auth/UserLogin';
import { AdminLogin } from '../components/auth/AdminLogin';

export function LoginPage() {
  return (
    <div className="min-h-screen bg-[#121212] flex flex-col items-center justify-center px-4">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Activity size={48} className="text-emerald-400" />
          <span className="text-5xl font-bold text-emerald-400 ml-2">777</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-100">Welcome to Trackit</h1>
        <p className="text-gray-400 mt-2">Please log in to continue</p>
      </div>

      <div className="w-full max-w-md space-y-4">
        <div className="bg-[#1e1e1e] p-6 rounded-lg border border-gray-700">
          <h2 className="text-xl font-semibold text-gray-200 mb-4">User Login</h2>
          <UserLogin />
        </div>

        <div className="bg-[#1e1e1e] p-6 rounded-lg border border-gray-700">
          <h2 className="text-xl font-semibold text-gray-200 mb-4">Admin Login</h2>
          <AdminLogin />
        </div>
      </div>
    </div>
  );
}
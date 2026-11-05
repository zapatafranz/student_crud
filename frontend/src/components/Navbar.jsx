import React from 'react';
import { GraduationCap, Users } from 'lucide-react';

export default function Navbar({ totalStudents }) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-100">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-tight">
                Student Registry
              </h1>
              <p className="text-xs text-slate-500">
                CRUD Management System
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-full text-indigo-700 text-sm font-semibold">
            <Users className="w-4 h-4 text-indigo-600" />
            <span>{totalStudents} {totalStudents === 1 ? 'Student' : 'Students'}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

'use client';

import { useState } from 'react';
import { Search, UserPlus, Filter, MoreVertical, Eye } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const MOCK_PATIENTS = [
  { id: '1', name: 'John Doe', age: 45, gender: 'Male', lastVisit: '2024-03-10', contact: '+1 234 567 890', status: 'Stable' },
  { id: '2', name: 'Jane Smith', age: 32, gender: 'Female', lastVisit: '2024-03-12', contact: '+1 987 654 321', status: 'Under Observation' },
  { id: '3', name: 'Robert Brown', age: 58, gender: 'Male', lastVisit: '2024-03-08', contact: '+1 456 789 012', status: 'Critical' },
  { id: '4', name: 'Emily Davis', age: 27, gender: 'Female', lastVisit: '2024-03-14', contact: '+1 321 654 098', status: 'Stable' },
];

export default function PatientsPage() {
  const searchParams = useSearchParams();
  const role = searchParams.get('role') || 'doctor';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Patient Management</h1>
          <p className="text-slate-500 text-sm">View and manage all registered patients.</p>
        </div>
        {(role === 'receptionist' || role === 'admin') && (
          <Link
            href={`/dashboard/register?role=${role}`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-all font-medium"
          >
            <UserPlus className="w-4 h-4" />
            Register Patient
          </Link>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, ID or contact..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg border border-slate-200 text-sm font-medium transition-all">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Patient Name</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Age/Gender</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Last Visit</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_PATIENTS.map((patient) => (
                <tr key={patient.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                        {patient.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="font-semibold text-slate-900">{patient.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {patient.age} yrs / {patient.gender}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{patient.contact}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{patient.lastVisit}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      patient.status === 'Stable' ? 'bg-emerald-50 text-emerald-600' :
                      patient.status === 'Critical' ? 'bg-red-50 text-red-600' :
                      'bg-amber-50 text-amber-600'
                    }`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link 
                      href={`/dashboard/patients/${patient.id}?role=${role}`}
                      className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all inline-flex"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

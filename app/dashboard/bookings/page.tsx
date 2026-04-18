'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Plus, 
  Search, 
  Filter,
  MoreVertical,
  CheckCircle2,
  XCircle,
  AlertCircle
} from 'lucide-react';
import AppointmentModal from '@/components/appointments/AppointmentModal';

const MOCK_APPOINTMENTS = [
  { id: '1', patient: 'John Doe', doctor: 'Dr. Sarah Wilson', date: '2024-03-20', time: '09:30 AM', type: 'General Checkup', status: 'Confirmed' },
  { id: '2', patient: 'Jane Smith', doctor: 'Dr. James Lee', date: '2024-03-20', time: '11:00 AM', type: 'Follow-up', status: 'Pending' },
  { id: '3', patient: 'Robert Brown', doctor: 'Dr. Sarah Wilson', date: '2024-03-21', time: '02:15 PM', type: 'Consultation', status: 'Completed' },
  { id: '4', patient: 'Emily Davis', doctor: 'Dr. Michael Chen', date: '2024-03-21', time: '04:00 PM', type: 'Emergency', status: 'Cancelled' },
];

export default function AppointmentsPage() {
  const searchParams = useSearchParams();
  const role = searchParams.get('role') || 'doctor';
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState('All');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'Pending': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'Completed': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Cancelled': return 'bg-red-50 text-red-600 border-red-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Appointments</h1>
          <p className="text-slate-500 text-sm">Manage and schedule patient visits.</p>
        </div>
        {(role === 'receptionist' || role === 'patient' || role === 'admin') && (
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all font-semibold shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Book Appointment
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Filter className="w-4 h-4 text-blue-600" />
              Filter Status
            </h3>
            <div className="space-y-2">
              {['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled'].map((s) => (
                <button
                  key={s}
                  onClick={() => setFilter(s)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    filter === s ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-blue-600 rounded-2xl p-6 text-white shadow-lg shadow-blue-200">
            <CalendarIcon className="w-8 h-8 mb-4 opacity-80" />
            <h3 className="font-bold text-lg mb-1">Quick Tip</h3>
            <p className="text-blue-100 text-sm leading-relaxed">
              You can reschedule appointments by clicking on the action menu in the list.
            </p>
          </div>
        </div>

        {/* Appointments List */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by patient or doctor name..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
              <CalendarIcon className="w-4 h-4" />
              <span>March 20, 2024</span>
            </div>
          </div>

          <div className="space-y-3">
            {MOCK_APPOINTMENTS.filter(a => filter === 'All' || a.status === filter).map((apt) => (
              <div key={apt.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:border-blue-200 transition-all group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      apt.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'
                    }`}>
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{apt.patient}</h4>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <span className="font-medium text-blue-600">{apt.type}</span> • {apt.doctor}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right hidden sm:block">
                      <p className="text-sm font-bold text-slate-900">{apt.time}</p>
                      <p className="text-xs text-slate-500">{apt.date}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(apt.status)}`}>
                      {apt.status}
                    </div>
                    <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-all">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AppointmentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        role={role}
      />
    </div>
  );
}

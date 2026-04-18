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
  ChevronDown,
  MapPin,
  User
} from 'lucide-react';
import AppointmentModal from '@/components/appointments/AppointmentModal';

const INITIAL_APPOINTMENTS = [
  { id: '1', patient: 'John Doe', doctor: 'Dr. Sarah Wilson', date: '2024-03-20', time: '09:30 AM', type: 'General Checkup', status: 'Confirmed', location: 'Room 302' },
  { id: '2', patient: 'Jane Smith', doctor: 'Dr. James Lee', date: '2024-03-20', time: '11:00 AM', type: 'Follow-up', status: 'Pending', location: 'Room 105' },
  { id: '3', patient: 'Robert Brown', doctor: 'Dr. Sarah Wilson', date: '2024-03-21', time: '02:15 PM', type: 'Consultation', status: 'Completed', location: 'Room 302' },
  { id: '4', patient: 'Emily Davis', doctor: 'Dr. Michael Chen', date: '2024-03-21', time: '04:00 PM', type: 'Emergency', status: 'Cancelled', location: 'ER-1' },
];

type Status = 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';

export default function AppointmentsPage() {
  const searchParams = useSearchParams();
  const role = searchParams.get('role') || 'doctor';
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState('All');
  const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS);

  const handleStatusChange = (id: string, newStatus: Status) => {
    setAppointments(prev => prev.map(apt => 
      apt.id === id ? { ...apt, status: newStatus } : apt
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'Pending': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'Completed': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Cancelled': return 'bg-red-50 text-red-600 border-red-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  const canEditStatus = role === 'admin' || role === 'doctor' || role === 'receptionist';

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Appointments</h1>
          <p className="text-slate-500 mt-1">Manage your schedule and patient visits.</p>
        </div>
        {(role === 'receptionist' || role === 'patient' || role === 'admin') && (
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl flex items-center justify-center gap-2 transition-all font-bold shadow-lg shadow-blue-100"
          >
            <Plus className="w-5 h-5" />
            Book Appointment
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Filters */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Filter className="w-4 h-4 text-blue-600" />
              Filter by Status
            </h3>
            <div className="space-y-1.5">
              {['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled'].map((s) => (
                <button
                  key={s}
                  onClick={() => setFilter(s)}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    filter === s ? 'bg-blue-600 text-white shadow-md shadow-blue-100' : 'text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* List */}
        <div className="lg:col-span-9 space-y-4">
          <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search appointments..."
                className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border border-transparent rounded-2xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid gap-4">
            {appointments.filter(a => filter === 'All' || a.status === filter).map((apt) => (
              <div key={apt.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all group">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-5">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
                      apt.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'
                    }`}>
                      <User className="w-7 h-7" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg">{apt.patient}</h4>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                        <span className="text-sm font-bold text-blue-600">{apt.type}</span>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Stethoscope className="w-3 h-3" /> {apt.doctor}
                        </span>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {apt.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-4 md:pt-0">
                    <div className="text-left md:text-right">
                      <p className="text-sm font-black text-slate-900">{apt.time}</p>
                      <p className="text-xs font-bold text-slate-400">{apt.date}</p>
                    </div>
                    
                    {canEditStatus ? (
                      <div className="relative">
                        <select
                          value={apt.status}
                          onChange={(e) => handleStatusChange(apt.id, e.target.value as Status)}
                          className={`appearance-none pl-4 pr-10 py-2 rounded-2xl text-xs font-black border cursor-pointer outline-none transition-all shadow-sm ${getStatusColor(apt.status)}`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                        <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-60" />
                      </div>
                    ) : (
                      <div className={`px-4 py-2 rounded-2xl text-xs font-black border ${getStatusColor(apt.status)}`}>
                        {apt.status}
                      </div>
                    )}

                    <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all">
                      <MoreVertical className="w-5 h-5" />
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

// Helper component for Stethoscope icon since it was missing in previous imports
function Stethoscope({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.8 2.3A.3.3 0 1 0 5 2a.3.3 0 0 0-.2.3Z"/><path d="M10 22v-2a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v2"/><path d="M10 14a2 2 0 0 0 2-2V2.1L10 2"/><path d="M2 21a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2"/><path d="M12 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"/><path d="m17.8 21.2 1.5-3a2 2 0 0 1 3.5 0l1.5 3"/><path d="M20 14a2 2 0 0 1 2 2v2.1L20 19l-2-.9V16a2 2 0 0 1 2-2Z"/>
    </svg>
  );
}

'use client';

import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  FileText, 
  Settings, 
  LogOut, 
  Activity,
  Stethoscope,
  UserPlus,
  TrendingUp,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import { useSearchParams, usePathname } from 'next/navigation';

const menuItems = {
  admin: [
    { icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
    { icon: Stethoscope, label: 'Doctors', href: '/dashboard/doctors' },
    { icon: Users, label: 'Receptionists', href: '/dashboard/receptionists' },
    { icon: TrendingUp, label: 'Analytics', href: '/dashboard/analytics' },
    { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
  ],
  doctor: [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: Calendar, label: 'Appointments', href: '/dashboard/appointments' },
    { icon: Users, label: 'Patients', href: '/dashboard/patients' },
    { icon: FileText, label: 'Prescriptions', href: '/dashboard/prescriptions' },
    { icon: Activity, label: 'AI Diagnosis', href: '/dashboard/ai' },
  ],
  receptionist: [
    { icon: LayoutDashboard, label: 'Schedule', href: '/dashboard' },
    { icon: UserPlus, label: 'Register Patient', href: '/dashboard/register' },
    { icon: Calendar, label: 'Bookings', href: '/dashboard/bookings' },
    { icon: Users, label: 'Patient List', href: '/dashboard/patients' },
  ],
  patient: [
    { icon: LayoutDashboard, label: 'My Health', href: '/dashboard' },
    { icon: Calendar, label: 'Appointments', href: '/dashboard/appointments' },
    { icon: FileText, label: 'Prescriptions', href: '/dashboard/prescriptions' },
    { icon: Settings, label: 'Profile', href: '/dashboard/profile' },
  ],
};

export default function Sidebar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const role = (searchParams.get('role') || 'doctor') as keyof typeof menuItems;
  console.log(`[Sidebar] role param: ${role}, pathname: ${pathname}`);
  
  const items = menuItems[role] || menuItems.doctor;

  return (
    <aside className="w-72 bg-white border-r border-slate-100 flex flex-col h-screen sticky top-0 z-20 shrink-0">
      <div className="p-8 flex items-center gap-3">
        <div className="bg-blue-600 p-2 rounded-2xl shadow-lg shadow-blue-200">
          <Activity className="w-6 h-6 text-white" />
        </div>
        <span className="font-black text-2xl text-slate-900 tracking-tight">MediFlow</span>
      </div>

      <nav className="flex-1 px-6 space-y-1.5">
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={`${item.href}?role=${role}`}
              className={`flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-200 group ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                <span className="font-bold text-sm">{item.label}</span>
              </div>
              {isActive && <ChevronRight className="w-4 h-4 opacity-60" />}
            </Link>
          );
        })}
        {console.log(`[Sidebar] Rendered menu items for role: ${role}`)}
      </nav>

      <div className="p-6">
        <div className="bg-slate-50 rounded-3xl p-5 mb-6">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Support</p>
          <p className="text-sm text-slate-600 font-medium leading-relaxed">Need help with the platform?</p>
          <button className="mt-3 text-sm font-bold text-blue-600 hover:underline">Contact Support</button>
        </div>
        
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3.5 text-red-500 hover:bg-red-50 rounded-2xl transition-all font-bold text-sm"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </Link>
      </div>
    </aside>
  );
}

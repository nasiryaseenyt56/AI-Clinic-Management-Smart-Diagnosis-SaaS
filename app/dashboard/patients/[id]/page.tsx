'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Calendar, 
  FileText, 
  Activity, 
  Clock, 
  User, 
  Phone, 
  MapPin, 
  Droplets,
  Plus
} from 'lucide-react';

const MOCK_HISTORY = [
  { id: '1', type: 'Appointment', title: 'General Checkup', date: '2024-03-10', doctor: 'Dr. Sarah Wilson', status: 'Completed' },
  { id: '2', type: 'Diagnosis', title: 'Hypertension Stage 1', date: '2024-03-10', doctor: 'Dr. Sarah Wilson', notes: 'Patient advised to reduce salt intake.' },
  { id: '3', type: 'Prescription', title: 'Lisinopril 10mg', date: '2024-03-10', doctor: 'Dr. Sarah Wilson', dosage: 'Once daily' },
  { id: '4', type: 'Appointment', title: 'Follow-up Visit', date: '2024-02-15', doctor: 'Dr. James Lee', status: 'Completed' },
];

export default function PatientProfilePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get('role') || 'doctor';

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Patients
        </button>
        {role === 'doctor' && (
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-all font-medium">
            <Plus className="w-4 h-4" />
            Add Diagnosis
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Patient Info */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 text-center">
            <div className="w-24 h-24 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-3xl mx-auto mb-4">
              JD
            </div>
            <h2 className="text-xl font-bold text-slate-900">John Doe</h2>
            <p className="text-slate-500 text-sm">Patient ID: #PT-8829</p>
            
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="p-3 bg-slate-50 rounded-xl">
                <p className="text-xs text-slate-500 font-medium uppercase">Age</p>
                <p className="text-lg font-bold text-slate-900">45</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <p className="text-xs text-slate-500 font-medium uppercase">Gender</p>
                <p className="text-lg font-bold text-slate-900">Male</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <User className="w-4 h-4 text-blue-600" />
              Contact Details
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-slate-400" />
                <span className="text-slate-600">+1 234 567 890</span>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="w-4 h-4 text-slate-400 mt-0.5" />
                <span className="text-slate-600">123 Medical Way, Health City, HC 90210</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Droplets className="w-4 h-4 text-red-500" />
                <span className="text-slate-600 font-medium">Blood Group: O+</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Timeline */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="font-bold text-slate-900 mb-8 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              Medical History Timeline
            </h3>

            <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-blue-600 before:via-slate-200 before:to-slate-200">
              {MOCK_HISTORY.map((item) => (
                <div key={item.id} className="relative flex items-start gap-6 group">
                  <div className={`absolute left-0 w-10 h-10 rounded-full border-4 border-white shadow-sm flex items-center justify-center z-10 transition-transform group-hover:scale-110 ${
                    item.type === 'Appointment' ? 'bg-blue-600' :
                    item.type === 'Diagnosis' ? 'bg-amber-500' :
                    'bg-emerald-500'
                  }`}>
                    {item.type === 'Appointment' && <Calendar className="w-4 h-4 text-white" />}
                    {item.type === 'Diagnosis' && <Activity className="w-4 h-4 text-white" />}
                    {item.type === 'Prescription' && <FileText className="w-4 h-4 text-white" />}
                  </div>

                  <div className="flex-1 ml-12 bg-slate-50 rounded-2xl p-5 border border-slate-100 group-hover:border-blue-200 transition-all">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{item.date}</span>
                      <span className="text-xs font-medium text-slate-500">{item.doctor}</span>
                    </div>
                    <h4 className="font-bold text-slate-900">{item.title}</h4>
                    {item.notes && <p className="text-sm text-slate-600 mt-2 italic">"{item.notes}"</p>}
                    {item.dosage && (
                      <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-bold">
                        <Activity className="w-3 h-3" />
                        {item.dosage}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

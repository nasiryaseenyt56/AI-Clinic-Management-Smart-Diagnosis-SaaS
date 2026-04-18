'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  FileText, 
  Plus, 
  Search, 
  Download, 
  Eye, 
  Activity,
  Sparkles,
  Clock,
  User,
  Pill
} from 'lucide-react';
import PrescriptionModal from '@/components/prescriptions/PrescriptionModal';
import { jsPDF } from 'jspdf';

const MOCK_PRESCRIPTIONS = [
  { id: '1', patient: 'John Doe', doctor: 'Dr. Sarah Wilson', date: '2024-03-10', diagnosis: 'Hypertension', medicines: ['Lisinopril 10mg', 'Amlodipine 5mg'] },
  { id: '2', patient: 'Jane Smith', doctor: 'Dr. James Lee', date: '2024-03-12', diagnosis: 'Seasonal Allergies', medicines: ['Cetirizine 10mg', 'Fluticasone Spray'] },
  { id: '3', patient: 'Robert Brown', doctor: 'Dr. Sarah Wilson', date: '2024-03-15', diagnosis: 'Type 2 Diabetes', medicines: ['Metformin 500mg'] },
];

export default function PrescriptionsPage() {
  const searchParams = useSearchParams();
  const role = searchParams.get('role') || 'doctor';
  const [isModalOpen, setIsModalOpen] = useState(false);

  const downloadPDF = (prescription: typeof MOCK_PRESCRIPTIONS[0]) => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text('MediFlow AI - Prescription', 20, 20);
    doc.setFontSize(12);
    doc.text(`Date: ${prescription.date}`, 20, 35);
    doc.text(`Patient: ${prescription.patient}`, 20, 45);
    doc.text(`Doctor: ${prescription.doctor}`, 20, 55);
    doc.text(`Diagnosis: ${prescription.diagnosis}`, 20, 70);
    doc.text('Medicines:', 20, 85);
    prescription.medicines.forEach((m, i) => {
      doc.text(`- ${m}`, 30, 95 + (i * 10));
    });
    doc.save(`prescription-${prescription.patient}.pdf`);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Prescriptions</h1>
          <p className="text-slate-500 mt-1">Manage and issue medical prescriptions.</p>
        </div>
        {role === 'doctor' && (
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl flex items-center justify-center gap-2 transition-all font-bold shadow-lg shadow-blue-100"
          >
            <Plus className="w-5 h-5" />
            New Prescription
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-6 text-white shadow-xl shadow-blue-100">
            <Sparkles className="w-10 h-10 mb-4 opacity-80" />
            <h3 className="font-bold text-xl mb-2">AI Assistant</h3>
            <p className="text-blue-100 text-sm leading-relaxed mb-4">
              Issue prescriptions faster with AI-powered medicine suggestions and dosage checks.
            </p>
            <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
              <p className="text-xs font-bold uppercase tracking-widest opacity-60 mb-2">Pro Tip</p>
              <p className="text-xs leading-relaxed">AI can now explain prescriptions in simple terms for patients.</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by patient or diagnosis..."
                className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border border-transparent rounded-2xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid gap-4">
            {MOCK_PRESCRIPTIONS.map((pres) => (
              <div key={pres.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all group">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <FileText className="w-7 h-7" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg">{pres.patient}</h4>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                        <span className="text-sm font-bold text-blue-600">{pres.diagnosis}</span>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {pres.date}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => downloadPDF(pres)}
                      className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all flex items-center gap-2 text-sm font-bold"
                    >
                      <Download className="w-4 h-4" />
                      <span className="hidden sm:inline">Download PDF</span>
                    </button>
                    <button className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all">
                      <Eye className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-slate-50 flex flex-wrap gap-2">
                  {pres.medicines.map((med, i) => (
                    <span key={i} className="px-3 py-1.5 bg-slate-50 text-slate-600 rounded-xl text-xs font-bold flex items-center gap-2">
                      <Pill className="w-3 h-3 text-blue-500" />
                      {med}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <PrescriptionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}

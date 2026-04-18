'use client';

import { useState } from 'react';
import { X, Pill, Plus, Trash2, Sparkles, Activity, AlertCircle } from 'lucide-react';

interface PrescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrescriptionModal({ isOpen, onClose }: PrescriptionModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [medicines, setMedicines] = useState([{ name: '', dosage: '', duration: '' }]);
  const [symptoms, setSymptoms] = useState('');
  const [aiResponse, setAiResponse] = useState<any>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  if (!isOpen) return null;

  const addMedicine = () => setMedicines([...medicines, { name: '', dosage: '', duration: '' }]);
  const removeMedicine = (index: number) => setMedicines(medicines.filter((_, i) => i !== index));

  const handleAiDiagnosis = () => {
    if (!symptoms) return;
    setIsAiLoading(true);
    // Simulate AI API call
    setTimeout(() => {
      setAiResponse({
        conditions: ['Common Cold', 'Influenza', 'Allergic Rhinitis'],
        risk: 'Low',
        suggestions: ['Rest', 'Hydration', 'Antihistamines']
      });
      setIsAiLoading(false);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Create New Prescription</h2>
            <p className="text-slate-500 text-sm">Issue medical advice and medicines to patient.</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white rounded-xl transition-all text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: AI Diagnosis Assistant */}
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-3xl p-6 border border-blue-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-blue-900 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    AI Diagnosis Assistant
                  </h3>
                </div>
                <textarea
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  placeholder="Enter patient symptoms (e.g., fever, cough, headache)..."
                  className="w-full p-4 bg-white border border-blue-200 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all min-h-[120px]"
                />
                <button
                  onClick={handleAiDiagnosis}
                  disabled={isAiLoading || !symptoms}
                  className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-2xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isAiLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Activity className="w-4 h-4" />
                      Analyze Symptoms
                    </>
                  )}
                </button>

                {aiResponse && (
                  <div className="mt-6 space-y-4 animate-in slide-in-from-top-2 duration-300">
                    <div className="p-4 bg-white rounded-2xl border border-blue-100">
                      <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">Possible Conditions</p>
                      <div className="flex flex-wrap gap-2">
                        {aiResponse.conditions.map((c: string) => (
                          <span key={c} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold">{c}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-1 p-4 bg-white rounded-2xl border border-blue-100">
                        <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-1">Risk Level</p>
                        <p className="text-sm font-bold text-emerald-600">{aiResponse.risk}</p>
                      </div>
                      <div className="flex-1 p-4 bg-white rounded-2xl border border-blue-100">
                        <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-1">Suggested Tests</p>
                        <p className="text-sm font-bold text-slate-700">Blood Work, X-Ray</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Prescription Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                  <Pill className="w-5 h-5 text-blue-600" />
                  Medicines & Dosage
                </h3>
                
                {medicines.map((med, index) => (
                  <div key={index} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3 relative group">
                    <button 
                      type="button"
                      onClick={() => removeMedicine(index)}
                      className="absolute -right-2 -top-2 p-1.5 bg-white text-red-500 rounded-full shadow-sm border border-red-100 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                    <input
                      placeholder="Medicine Name"
                      className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        placeholder="Dosage (e.g. 1-0-1)"
                        className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      />
                      <input
                        placeholder="Duration (e.g. 5 days)"
                        className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      />
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addMedicine}
                  className="w-full py-3 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all flex items-center justify-center gap-2 text-sm font-bold"
                >
                  <Plus className="w-4 h-4" />
                  Add Another Medicine
                </button>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Additional Notes</label>
                <textarea
                  rows={3}
                  placeholder="Lifestyle advice, follow-up instructions..."
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
            </form>
          </div>
        </div>

        <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 px-6 py-3 text-slate-600 font-bold hover:bg-white rounded-2xl transition-all border border-slate-200"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit}
            disabled={isLoading}
            className="flex-[2] px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <FileText className="w-4 h-4" />
                Issue Prescription
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

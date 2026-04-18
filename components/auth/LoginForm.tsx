'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';

type Role = 'admin' | 'doctor' | 'receptionist' | 'patient';

const DEMO_CREDENTIALS = {
  admin: 'admin@mediflow.com',
  doctor: 'dr.wilson@mediflow.com',
  receptionist: 'amy.reception@mediflow.com',
  patient: 'john.doe@example.com'
};

export default function LoginForm({ onToggle }: { onToggle: () => void }) {
  const router = useRouter();
  const [role, setRole] = useState<Role>('doctor');
  const [email, setEmail] = useState(DEMO_CREDENTIALS.doctor);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Update email when role changes for demo purposes
  useEffect(() => {
    setEmail(DEMO_CREDENTIALS[role]);
  }, [role]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(`[LoginForm] handleLogin called. role: ${role}, email: ${email}`);
    
    setTimeout(() => {
      console.log(`[LoginForm] Navigating to dashboard. role: ${role}`);
      router.push(`/dashboard?role=${role}`);
    }, 1000);
  };

  return (
    <form onSubmit={handleLogin} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">Select Role</label>
        <div className="grid grid-cols-2 gap-2">
          {(['admin', 'doctor', 'receptionist', 'patient'] as Role[]).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={`px-3 py-2 text-sm font-medium rounded-lg border transition-all ${
                role === r
                  ? 'bg-blue-50 border-blue-600 text-blue-700'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@clinic.com"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-900"
            />
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type={showPassword ? "text" : "password"}
              required
              defaultValue="password123"
              placeholder="••••••••"
              className="w-full pl-10 pr-12 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-900"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
        <p className="text-xs text-blue-700 leading-relaxed">
          <strong>Demo Mode:</strong> Credentials for <b>{role}</b> are pre-filled. Just click Sign In to explore.
        </p>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70"
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            Sign In as {role.charAt(0).toUpperCase() + role.slice(1)}
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>

      <p className="text-center text-sm text-slate-500">
        Don't have an account?{' '}
        <button
          type="button"
          onClick={onToggle}
          className="text-blue-600 font-semibold hover:underline"
        >
          Sign Up
        </button>
      </p>
    </form>
  );
}

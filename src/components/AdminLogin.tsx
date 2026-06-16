import React, { useState } from 'react';
import { Eye, EyeOff, LogIn, ChevronLeft } from 'lucide-react';
import { ADMIN_PASSWORD } from '../config';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onCancel: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({
  onLoginSuccess,
  onCancel,
}) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setError(null);
      onLoginSuccess();
    } else {
      setError('Senha incorreta. Tente novamente.');
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="w-full max-w-sm glass-premium rounded-3xl p-6 md:p-8 border border-neon-purple/20 shadow-2xl relative overflow-hidden shadow-neon-purple/5">
        
        {/* Subtle neon top line */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-neon-purple/30" />
        
        <button
          onClick={onCancel}
          className="flex items-center gap-1 text-[10px] text-gray-500 hover:text-white uppercase tracking-wider transition-colors mb-6 cursor-pointer"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          Voltar ao catálogo
        </button>

        <div className="text-center mb-6">
          {/* Logo replacing custom icon badge */}
          <div className="mx-auto w-16 h-16 rounded-full bg-[#040008] p-0.5 mb-4 flex items-center justify-center shadow-md border border-neon-purple/30 shadow-neon-purple/10">
            <img src="/logo.svg" alt="Lux Logo" className="w-15 h-15 rounded-full object-contain" />
          </div>

          <h2 className="font-display text-lg font-bold tracking-widest text-white uppercase">
            Acesso Restrito
          </h2>
          <p className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">
            Insira a senha do vendedor
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-2">
              Senha de Vendedor
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(null);
                }}
                placeholder="Digite a senha..."
                className="w-full bg-white/5 border border-white/10 focus:border-neon-purple rounded-xl py-3 pl-4 pr-11 text-white placeholder-gray-600 text-sm focus:outline-none transition-all focus:ring-1 focus:ring-neon-purple"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-white cursor-pointer"
              >
                {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-neon-purple to-neon-pink text-white font-bold font-display uppercase tracking-wider text-xs hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer shadow-md shadow-neon-purple/20"
          >
            <LogIn className="h-4.5 w-4.5" />
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

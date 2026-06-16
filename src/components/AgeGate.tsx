import React, { useState, useEffect } from 'react';
import { LogOut, CheckCircle2 } from 'lucide-react';

interface AgeGateProps {
  onVerify: () => void;
}

export const AgeGate: React.FC<AgeGateProps> = ({ onVerify }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [denied, setDenied] = useState(false);

  useEffect(() => {
    const isVerified = localStorage.getItem('age_verified');
    if (isVerified === 'true') {
      setIsOpen(false);
      onVerify();
    }
  }, [onVerify]);

  const handleConfirm = () => {
    localStorage.setItem('age_verified', 'true');
    setIsOpen(false);
    onVerify();
  };

  const handleExit = () => {
    setDenied(true);
    setTimeout(() => {
      window.location.href = 'https://www.google.com';
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 transition-all duration-500">
      <div className="relative w-full max-w-sm glass-premium rounded-3xl p-8 text-center border border-white/5 shadow-2xl overflow-hidden">
        {!denied ? (
          <>
            {/* Official Logo replacing the letter icon */}
            <div className="mx-auto w-24 h-24 rounded-full bg-[#040008] p-0.5 mb-6 flex items-center justify-center shadow-[0_0_20px_rgba(217,0,255,0.4)] border border-neon-purple/30">
              <img src="/logo.svg" alt="Lux" className="w-23 h-23 rounded-full object-contain" />
            </div>

            <h2 className="font-display text-lg font-bold tracking-widest text-white uppercase mb-1">
              Verificação de Idade
            </h2>
            <div className="h-[1px] w-12 bg-neon-purple/30 mx-auto mb-6" />

            <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-8">
              Este conteúdo é destinado apenas para maiores de 18 anos.
            </p>

            <div className="flex flex-col gap-2.5">
              <button
                onClick={handleConfirm}
                className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-neon-purple to-neon-pink text-white font-bold hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer font-display text-sm tracking-wide uppercase shadow-[0_0_20px_rgba(217,0,255,0.25)]"
              >
                <CheckCircle2 className="h-4.5 w-4.5" />
                Sou maior de 18 anos
              </button>

              <button
                onClick={handleExit}
                className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium border border-white/10 hover:scale-[0.98] active:scale-[0.95] transition-all cursor-pointer font-display text-xs tracking-wide uppercase"
              >
                <LogOut className="h-4 w-4 text-gray-400" />
                Sair
              </button>
            </div>

            <p className="text-[9px] text-gray-600 mt-6 tracking-widest uppercase font-semibold">
              LUX PODS • +18 APENAS
            </p>
          </>
        ) : (
          <div className="py-8">
            <div className="mx-auto w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 text-red-500 flex items-center justify-center mb-6">
              <LogOut className="h-6 w-6" />
            </div>
            <h2 className="font-display text-xl font-bold text-red-500 mb-2">
              ACESSO NEGADO
            </h2>
            <p className="text-gray-500 text-xs">
              Você precisa ser maior de 18 anos para acessar este site. Redirecionando...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

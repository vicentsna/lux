import React from 'react';
import { MessageSquare, UserCheck } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../config';

interface HeaderProps {
  onAdminClick: () => void;
  isAdmin: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onAdminClick, isAdmin }) => {
  const handleWhatsAppContact = () => {
    const message = encodeURIComponent("Olá! Estou visitando o catálogo da Lux Pods e gostaria de fazer um pedido.");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <header className="relative w-full py-10 md:py-14 flex flex-col items-center justify-center border-b border-neon-purple/10 bg-black/40">
      
      {/* Admin Button top right */}
      <div className="absolute top-4 right-4 z-20 flex gap-2">
        <button
          onClick={onAdminClick}
          className="flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-gray-300 hover:text-neon-purple hover:border-neon-purple/30 hover:bg-neon-purple/10 active:scale-95 transition-all cursor-pointer"
        >
          <UserCheck className="h-3.5 w-3.5" />
          {isAdmin ? 'Painel Admin' : 'Admin'}
        </button>
      </div>

      {/* Main Branding details */}
      <div className="flex flex-col items-center text-center px-4 max-w-2xl">
        {/* Official Brand Logo */}
        <div className="w-24 h-24 rounded-full bg-[#040008] p-0.5 mb-5 flex items-center justify-center shadow-[0_0_20px_rgba(217,0,255,0.4)] border border-neon-purple/30">
          <img src="/logo.svg" alt="Lux Logo" className="w-23 h-23 rounded-full object-contain" />
        </div>

        <h1 className="font-display text-4xl md:text-6xl font-black tracking-tight text-white uppercase mb-2">
          LUX{' '}
          <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-pink text-glow-light">
            PODS
          </span>
        </h1>

        <p className="text-gray-400 text-xs md:text-sm font-semibold tracking-widest uppercase">
          Premium Vapes &amp; Descartáveis
        </p>

        {/* WhatsApp Action */}
        <button
          onClick={handleWhatsAppContact}
          className="mt-6 flex items-center gap-2 py-2.5 px-5 rounded-xl bg-neon-purple/10 border border-neon-purple/20 hover:border-neon-purple/60 text-white font-semibold hover:bg-neon-purple/20 shadow-[0_0_15px_rgba(217,0,255,0.15)] transition-all active:scale-95 cursor-pointer text-xs uppercase tracking-wider"
        >
          <MessageSquare className="h-4 w-4 text-neon-purple" />
          Fale no WhatsApp
        </button>
      </div>
    </header>
  );
};

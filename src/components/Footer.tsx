import React from 'react';
import { ShieldCheck, HelpCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#040008] border-t border-neon-purple/10 py-12 px-6 mt-16 text-center text-gray-400">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Instagram Link */}
        <a
          href="https://instagram.com/lux.pods"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 py-2 px-5 rounded-full bg-neon-purple/5 hover:bg-neon-purple/20 border border-neon-purple/20 hover:border-neon-purple/50 text-sm font-semibold text-gray-200 hover:text-white transition-all duration-300 mb-8 cursor-pointer shadow-[0_0_15px_rgba(217,0,255,0.05)]"
        >
          <svg className="h-4.5 w-4.5 text-neon-purple" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          @lux.pods
        </a>

        {/* Warning Policy / Notice */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-2xl text-xs md:text-sm leading-relaxed border-t border-neon-purple/10 pt-8">
          <div className="p-4 rounded-2xl bg-neon-purple/[0.02] border border-neon-purple/10">
            <h5 className="font-display font-bold text-gray-300 mb-2 uppercase tracking-wider flex items-center gap-1.5 text-xs text-neon-purple">
              <ShieldCheck className="h-4 w-4" />
              Políticas de Garantia
            </h5>
            <ul className="text-gray-400 space-y-2 list-disc list-inside">
              <li>Produtos a partir de 5 mil puffs possuem <strong>até 2 dias (48h) de garantia</strong> após a entrega.</li>
              <li>Produtos abaixo de 5 mil puffs possuem apenas garantia de funcionalidade (testados no ato do recebimento).</li>
              <li>Itens em promoção possuem apenas garantia de funcionamento no ato da entrega, sem garantia estendida.</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-neon-purple/[0.02] border border-neon-purple/10">
            <h5 className="font-display font-bold text-gray-300 mb-2 uppercase tracking-wider flex items-center gap-1.5 text-xs text-neon-pink">
              <HelpCircle className="h-4 w-4" />
              Avisos Importantes
            </h5>
            <ul className="text-gray-400 space-y-2 list-disc list-inside">
              <li>Fique atento à entrega! Não nos responsabilizamos por produtos perdidos devido a atrasos ou ausência do cliente.</li>
              <li>Não cobrimos danos causados por mau uso, quedas ou carregamento incorreto em adaptadores de tomada incompatíveis.</li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright-like mark */}
        <div className="mt-12 text-[10px] uppercase tracking-widest text-gray-600 font-bold">
          © {new Date().getFullYear()} LUX PODS • TODOS OS DIREITOS RESERVADOS
        </div>
      </div>
    </footer>
  );
};

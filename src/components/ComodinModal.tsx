import React from 'react';
import { ProfileComodin } from '../types';
import { 
  Zap, 
  TrendingUp, 
  TrendingDown, 
  X, 
  Check, 
  Coins, 
  Clock 
} from 'lucide-react';

interface ComodinModalProps {
  comodin: ProfileComodin;
  usesLeft: number;
  hasFunds: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export const ComodinModal: React.FC<ComodinModalProps> = ({
  comodin,
  usesLeft,
  hasFunds,
  onConfirm,
  onClose
}) => {
  const isExhausted = usesLeft <= 0;
  const canActivate = !isExhausted && hasFunds;

  const renderDeltaBadges = (deltas: ProfileComodin['deltas']) => {
    return (
      <div className="flex flex-wrap gap-1.5 mt-2">
        {deltas.polling !== undefined && (
          <span className={`text-xs px-2 py-0.5 rounded-md font-sans font-bold flex items-center gap-1 ${
            deltas.polling >= 0 
              ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800' 
              : 'bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300 border border-red-300 dark:border-red-800'
          }`}>
            {deltas.polling >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {deltas.polling >= 0 ? `+${deltas.polling}%` : `${deltas.polling}%`} Intención de Voto
          </span>
        )}
        {deltas.popularSympathy !== undefined && (
          <span className={`text-xs px-2 py-0.5 rounded-md font-sans font-bold flex items-center gap-1 ${
            deltas.popularSympathy >= 0 
              ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800' 
              : 'bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300 border border-red-300 dark:border-red-800'
          }`}>
            {deltas.popularSympathy >= 0 ? `+${deltas.popularSympathy}%` : `${deltas.popularSympathy}%`} Cariño Popular
          </span>
        )}
        {deltas.mediaCredibility !== undefined && (
          <span className={`text-xs px-2 py-0.5 rounded-md font-sans font-bold flex items-center gap-1 ${
            deltas.mediaCredibility >= 0 
              ? 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-800' 
              : 'bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300 border border-red-300 dark:border-red-800'
          }`}>
            {deltas.mediaCredibility >= 0 ? `+${deltas.mediaCredibility}%` : `${deltas.mediaCredibility}%`} Prensa & Debates
          </span>
        )}
        {deltas.campaignFunds !== undefined && deltas.campaignFunds > 0 && (
          <span className="text-xs px-2 py-0.5 rounded-md font-sans font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800 flex items-center gap-1">
            <Coins className="w-3 h-3" /> +S/. {deltas.campaignFunds}M Fondos
          </span>
        )}
        {deltas.jneTachaRisk !== undefined && (
          <span className={`text-xs px-2 py-0.5 rounded-md font-sans font-bold flex items-center gap-1 ${
            deltas.jneTachaRisk <= 0 
              ? 'bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-800' 
              : 'bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 border border-purple-300 dark:border-purple-800'
          }`}>
            {deltas.jneTachaRisk > 0 ? `+${deltas.jneTachaRisk}%` : `${deltas.jneTachaRisk}%`} Riesgo JNE
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md max-h-[90vh] overflow-y-auto bg-white dark:bg-[#0c0c0e] rounded-2xl border border-slate-200 dark:border-neutral-800 shadow-2xl p-5 md:p-6 text-slate-900 dark:text-neutral-100 relative">
        
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with icon & title */}
        <div className="flex items-start gap-3.5 mb-4">
          <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 flex items-center justify-center text-2xl shrink-0 shadow-inner">
            {comodin.icon}
          </div>
          <div className="pr-6">
            <div className="text-[10px] font-sans font-bold uppercase tracking-wider text-slate-500 dark:text-neutral-400">
              COMODÍN ESTRATÉGICO
            </div>
            <h3 className="text-lg font-bold leading-snug font-sans text-slate-900 dark:text-white">
              {comodin.title}
            </h3>
          </div>
        </div>

        {/* Description */}
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#121214] border border-slate-200 dark:border-neutral-800 text-xs md:text-sm text-slate-700 dark:text-neutral-300 font-sans leading-relaxed mb-4">
          {comodin.description}
        </div>

        {/* Impact deltas box */}
        <div className="p-3 rounded-xl bg-slate-100/80 dark:bg-[#161619] border border-slate-200 dark:border-neutral-700 mb-4">
          <div className="text-[10px] font-sans font-bold uppercase tracking-wider text-slate-600 dark:text-neutral-400">
            Impacto Proyectado en Estadísticas:
          </div>
          {renderDeltaBadges(comodin.deltas)}
        </div>

        {/* Cost & uses info */}
        <div className="grid grid-cols-2 gap-2 mb-5">
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#121214] border border-slate-200 dark:border-neutral-800 text-center">
            <div className="text-[10px] font-sans font-medium text-slate-500 dark:text-neutral-400">Costo de Fondos</div>
            <div className={`text-sm font-bold mt-0.5 ${
              comodin.costFunds > 0 
                ? (hasFunds ? 'text-slate-900 dark:text-amber-300' : 'text-red-500') 
                : 'text-emerald-600 dark:text-emerald-400'
            }`}>
              {comodin.costFunds > 0 ? `S/. ${comodin.costFunds}M` : '¡GRATIS!'}
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#121214] border border-slate-200 dark:border-neutral-800 text-center">
            <div className="text-[10px] font-sans font-medium text-slate-500 dark:text-neutral-400">Usos de Campaña</div>
            <div className={`text-sm font-bold mt-0.5 ${
              isExhausted ? 'text-red-500' : 'text-slate-900 dark:text-neutral-200'
            }`}>
              {isExhausted ? 'AGOTADO' : `${usesLeft} de ${comodin.maxUses} disponibles`}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 px-4 rounded-xl border border-slate-300 dark:border-neutral-800 hover:bg-slate-100 dark:hover:bg-neutral-800 text-slate-700 dark:text-neutral-300 font-sans font-bold text-xs transition-colors cursor-pointer"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={() => {
              if (canActivate) {
                onConfirm();
                onClose();
              }
            }}
            disabled={!canActivate}
            className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-sans font-bold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-98 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>{isExhausted ? 'Sin Usos' : !hasFunds ? 'Sin Fondos' : 'Activar Comodín'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};


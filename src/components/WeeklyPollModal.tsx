import React from 'react';
import { Candidate, CampaignStats, RivalCandidate } from '../types';
import { PARTIES } from '../data/gameData';
import { 
  TrendingUp, 
  TrendingDown, 
  ArrowRight, 
  BarChart3
} from 'lucide-react';

interface WeeklyPollModalProps {
  week: number;
  candidate: Candidate;
  stats: CampaignStats;
  rivals: RivalCandidate[];
  pollingDelta: number;
  onContinue: () => void;
}

export const WeeklyPollModal: React.FC<WeeklyPollModalProps> = ({
  week,
  candidate,
  stats,
  rivals,
  pollingDelta,
  onContinue
}) => {
  const party = PARTIES.find(p => p.id === candidate.partyId) || PARTIES[0];

  const agencyNames = [
    'IPSOS OPINIÓN & MERCADO',
    'DATUM INTERNACIONAL PERÚ',
    'COMPAÑÍA PERUANA DE INVESTIGACIÓN (CPI)',
    'INSTITUTO DE ESTUDIOS PERUANOS (IEP)',
    'SIMULACRO DE VOTACIÓN CON CÉDULA Y ÁNFORA SECRETA'
  ];

  const currentAgency = agencyNames[(week - 1) % agencyNames.length];

  // Combine and sort
  const allCandidates = [
    {
      id: 'player',
      name: candidate.name,
      partyName: party.name,
      partyShort: party.shortName,
      color: party.color,
      polling: stats.polling,
      isPlayer: true
    },
    ...rivals
  ].sort((a, b) => b.polling - a.polling);

  const playerRank = allCandidates.findIndex(c => c.isPlayer) + 1;

  const getAnalysis = () => {
    if (pollingDelta > 0) {
      return `TENDENCIA AL ALZA: Tu presencia en debates y tu estrategia en distritos clave te han permitido sumar +${pollingDelta.toFixed(1)}% en esta semana. La prensa y los analistas ya te consideran un contendiente serio.`;
    } else if (pollingDelta < 0) {
      return `TROPIEZO EN EL SONDEO: Tus últimas decisiones generaron controversia en la opinión pública y bajaste ${Math.abs(pollingDelta).toFixed(1)}%. Tu equipo de campaña te pide afinar la puntería en la siguiente semana.`;
    }
    return `EMPATE TÉCNICO: Te mantienes estable en las preferencias de los limeños. La próxima semana será decisiva para romper la paridad.`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-4 bg-black/75 backdrop-blur-md animate-fadeIn font-sans">
      
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#0c0c0e] rounded-3xl border border-slate-200 dark:border-neutral-800 p-5 md:p-7 shadow-2xl relative text-slate-900 dark:text-neutral-100">
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-200 dark:border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-sm shrink-0">
              <BarChart3 className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                {currentAgency} // SONDEO OFICIAL
              </div>
              <h2 className="text-lg md:text-xl font-black text-slate-900 dark:text-white tracking-tight">
                ENCUESTA MUNICIPAL: SEMANA {week} DE 5
              </h2>
            </div>
          </div>

          <div className="text-right hidden sm:block">
            <div className="text-[10px] text-slate-400 dark:text-neutral-500 font-medium">FICHA TÉCNICA</div>
            <div className="text-xs text-slate-600 dark:text-neutral-300 font-bold">1,200 casos • E: +/-2.8%</div>
          </div>
        </div>

        {/* Player Status Callout */}
        <div className="bg-slate-50 dark:bg-[#121214] rounded-2xl p-4 border border-slate-200 dark:border-neutral-800 mb-5 flex items-center justify-between gap-4">
          <div>
            <div className="text-[10px] font-bold text-slate-500 dark:text-neutral-400 uppercase tracking-wider">
              POSICIÓN ACTUAL EN LA TABLA
            </div>
            <div className="flex flex-wrap items-center gap-2 mt-0.5">
              <span className={`text-xl md:text-2xl font-black ${
                playerRank === 1 
                  ? 'text-amber-500 dark:text-amber-400' 
                  : playerRank === 2 
                    ? 'text-slate-700 dark:text-slate-200' 
                    : 'text-slate-500 dark:text-slate-400'
              }`}>
                {playerRank === 1 ? '🥇 1ER LUGAR' : playerRank === 2 ? '🥈 2DO LUGAR' : `#${playerRank} PUESTO`}
              </span>
              <span className="text-sm font-bold text-slate-900 dark:text-white">
                ({stats.polling.toFixed(1)}% de votos)
              </span>
            </div>
          </div>

          {/* Delta badge */}
          <div className="text-right shrink-0">
            <div className="text-[10px] text-slate-400 dark:text-neutral-500 font-medium">VARIACIÓN SEMANAL</div>
            <div className={`text-base md:text-lg font-black flex items-center gap-1 justify-end ${
              pollingDelta >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
            }`}>
              {pollingDelta >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              {pollingDelta >= 0 ? `+${pollingDelta.toFixed(1)}%` : `${pollingDelta.toFixed(1)}%`}
            </div>
          </div>
        </div>

        {/* Polling Bars List */}
        <div className="space-y-2 mb-5">
          {allCandidates.map((cand, idx) => {
            const isUser = cand.isPlayer;
            return (
              <div key={cand.id} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className={`flex items-center gap-1.5 truncate ${isUser ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-700 dark:text-neutral-300 font-medium'}`}>
                    <span className="font-bold text-[11px] text-slate-400 dark:text-neutral-500 w-5">#{idx + 1}</span>
                    <span className="truncate">{cand.name}</span>
                    <span className="text-[10px] text-slate-400 dark:text-neutral-500 hidden sm:inline">({cand.partyShort})</span>
                    {isUser && (
                      <span className="px-1.5 py-0.2 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-[9px] font-bold border border-blue-300 dark:border-blue-800 shrink-0">
                        TÚ
                      </span>
                    )}
                  </span>
                  
                  <span className={`font-bold shrink-0 ${isUser ? 'text-blue-600 dark:text-blue-400 text-sm font-black' : 'text-slate-600 dark:text-neutral-400 text-xs'}`}>
                    {cand.polling.toFixed(1)}%
                  </span>
                </div>

                <div className="w-full bg-slate-100 dark:bg-neutral-800 rounded-full h-2 overflow-hidden border border-slate-200 dark:border-neutral-700/60">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      isUser 
                        ? 'bg-blue-600 dark:bg-blue-500 shadow-sm' 
                        : 'bg-slate-400 dark:bg-neutral-600'
                    }`}
                    style={{ width: `${Math.min(100, Math.max(3, cand.polling * 2.2))}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Analysis Commentary */}
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#121214] border border-slate-200 dark:border-neutral-800 text-xs text-slate-700 dark:text-neutral-300 leading-relaxed mb-5">
          <div className="text-blue-600 dark:text-blue-400 font-bold text-[10px] uppercase tracking-wider mb-1 flex items-center gap-1">
            <span>🎙️</span> ANÁLISIS POLÍTICO DEL PANEL ELECTORAL:
          </div>
          "{getAnalysis()}"
        </div>

        {/* Continue Button */}
        <button
          type="button"
          onClick={onContinue}
          className="w-full py-3 px-5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all cursor-pointer"
        >
          <span>{week < 5 ? `Continuar a la Semana ${week + 1} de Campaña` : 'Ir al Cierre de Campaña y Día de Votación'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>

      </div>

    </div>
  );
};

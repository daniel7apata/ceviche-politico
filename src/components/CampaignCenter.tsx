import React, { useState } from 'react';
import { Candidate, CampaignStats, RivalCandidate, ProfileComodin } from '../types';
import { PARTIES } from '../data/gameData';
import { ComodinModal } from './ComodinModal';
import { 
  Vote, 
  Zap, 
  TrendingUp, 
  Sparkles,
  Radio
} from 'lucide-react';

interface CampaignCenterProps {
  candidate: Candidate;
  stats: CampaignStats;
  week: number;
  maxWeeks: number;
  rivals: RivalCandidate[];
  profileComodines: ProfileComodin[];
  comodinUses: Record<string, number>;
  onTriggerComodin: (comodin: ProfileComodin) => void;
  lastHeadline: string;
  onOpenTelemetry?: () => void;
}

export const CampaignCenter: React.FC<CampaignCenterProps> = ({
  candidate,
  stats,
  week,
  maxWeeks,
  rivals,
  profileComodines,
  comodinUses,
  onTriggerComodin,
  lastHeadline,
  onOpenTelemetry
}) => {
  const [selectedComodin, setSelectedComodin] = useState<ProfileComodin | null>(null);

  const party = PARTIES.find(p => p.id === candidate.partyId) || PARTIES[0];

  // Combine player with rivals to compute live ranking
  const allCandidates = [
    {
      id: 'player',
      name: candidate.name,
      partyName: party.name,
      partyShort: party.shortName,
      avatarEmoji: '🇵🇪',
      color: party.color,
      polling: stats.polling,
      isPlayer: true
    },
    ...rivals
  ].sort((a, b) => b.polling - a.polling);

  const playerRank = allCandidates.findIndex(c => c.isPlayer) + 1;

  const getWeekTheme = (w: number) => {
    switch (w) {
      case 1:
        return {
          title: 'SEMANA 1: ARRANQUE & MÍTINES EN CONOS',
          desc: 'Presentación oficial de listas, primeros discursos y contacto en Lima Norte y Lima Este.'
        };
      case 2:
        return {
          title: 'SEMANA 2: CONTACTO POPULAR & MERCADOS',
          desc: 'Gira por mercados de abastos, degustación de pan con chicharrón y selfies con caseras.'
        };
      case 3:
        return {
          title: 'SEMANA 3: GUERRA SUCIA & TIKTOK WARS',
          desc: 'Audios filtrados, clips virales, ataques de troles y batallas de aura entre candidatos.'
        };
      case 4:
        return {
          title: 'SEMANA 4: EL GRAN DEBATE EN TELEVISIÓN',
          desc: 'Transmisión nacional en vivo por América TV. Minuto de oro y confrontación de propuestas.'
        };
      case 5:
      default:
        return {
          title: 'SEMANA 5: CIERRE DE CAMPAÑA & DÍA D',
          desc: 'Mitin final masivo en la Plaza San Martín, veda electoral y boca de urna del domingo.'
        };
    }
  };

  const currentTheme = getWeekTheme(week);

  return (
    <div className="w-full h-full flex flex-col justify-between bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-3 md:p-4 overflow-y-auto space-y-2.5 shadow-sm">
      
      {/* 1. Header: Current Campaign Week, Goal & Telemetry Button */}
      <div className="bg-slate-50 dark:bg-slate-950/80 rounded-xl p-3 border border-slate-200 dark:border-slate-800 relative overflow-hidden shrink-0">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
            <span className="text-[10px] font-sans uppercase tracking-wider text-slate-700 dark:text-slate-300 font-bold">
              CENTRO DE COMANDO // {currentTheme.title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {onOpenTelemetry && (
              <button
                type="button"
                onClick={onOpenTelemetry}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-600 dark:hover:bg-blue-500 text-xs font-bold transition-all shadow-sm cursor-pointer active:scale-95"
                title="Abrir modal de estadísticas y telemetría completa"
              >
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                <span>📊 Ver Telemetría & Perfil</span>
              </button>
            )}

            <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-[10px] font-sans font-bold text-slate-700 dark:text-slate-300">
              <span>SEMANA {week} DE {maxWeeks}</span>
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
          {currentTheme.desc}
        </p>

        {/* User Rank Callout */}
        <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-sans">
          <div className="flex items-center gap-2">
            <span className={`px-2 py-0.5 rounded-md font-bold text-xs ${
              playerRank === 1 
                ? 'bg-amber-100 text-amber-900 dark:bg-amber-400 dark:text-slate-950 shadow-sm' 
                : playerRank === 2 
                ? 'bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200' 
                : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
            }`}>
              {playerRank === 1 ? '🏆 PUESTO #1' : `PUESTO #${playerRank}`}
            </span>
            <span className="text-slate-600 dark:text-slate-300 font-medium">
              {playerRank === 1 
                ? '¡Liderando las encuestas! Mantén la punta hasta el domingo.' 
                : `A ${(allCandidates[0].polling - stats.polling).toFixed(1)}% del primer lugar. ¡Activa tus comodines!`}
            </span>
          </div>

          <span className="font-sans text-slate-900 dark:text-white font-bold text-sm">
            {stats.polling.toFixed(1)}% VOTO
          </span>
        </div>
      </div>

      {/* 2. Live Polling Simulator Bar Chart */}
      <div id="tutorial-simulator-section" className="bg-slate-50 dark:bg-slate-950/60 rounded-xl p-3 md:p-3.5 border border-slate-200 dark:border-slate-800 flex-1 min-h-0 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2 text-[10px] font-sans text-slate-600 dark:text-slate-400 uppercase tracking-wider shrink-0">
          <span className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
            <Vote className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            SIMULADOR DE INTENCIÓN DE VOTO // ÚLTIMO SONDEO
          </span>
          <span className="text-slate-500 dark:text-slate-400 text-[10px] font-medium">IPSOS / DATUM 2026</span>
        </div>

        <div className="flex-1 flex flex-col justify-around space-y-1.5 overflow-y-auto pr-1">
          {allCandidates.map((cand, idx) => {
            const isUser = cand.isPlayer;
            return (
              <div key={cand.id} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-sans">
                  <span className={`flex items-center gap-1.5 truncate ${isUser ? 'text-blue-700 dark:text-blue-400 font-bold' : 'text-slate-700 dark:text-slate-300 font-medium'}`}>
                    <span className="w-4 text-center font-bold text-[10px] text-slate-400">#{idx + 1}</span>
                    <span className="truncate max-w-[220px]">{cand.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">({cand.partyShort})</span>
                    {isUser && <span className="text-[9px] bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 px-1.5 py-0.2 rounded font-bold">TÚ</span>}
                  </span>
                  
                  <span className={`font-bold text-xs font-mono ${isUser ? 'text-blue-700 dark:text-blue-300 font-black text-sm' : 'text-slate-700 dark:text-slate-300'}`}>
                    {cand.polling.toFixed(1)}%
                  </span>
                </div>

                <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isUser 
                        ? 'bg-blue-600 dark:bg-blue-500' 
                        : 'bg-slate-400 dark:bg-slate-600'
                    }`}
                    style={{ width: `${Math.min(100, Math.max(3, cand.polling * 2.2))}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ESTADO DEL COMANDO (Ubicado justo arriba de los comodines) */}
      <div id="tutorial-command-status-section" className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 text-[11px] shrink-0 space-y-1.5">
        <div className="font-bold uppercase text-slate-500 dark:text-slate-400 flex items-center justify-between text-[10px]">
          <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            ESTADO DEL COMANDO
          </span>
          <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
            stats.jneTachaRisk >= 75
              ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200 border border-red-400 dark:border-red-700 animate-pulse'
              : stats.jneTachaRisk >= 65 
              ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-800' 
              : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
          }`}>
            {stats.jneTachaRisk >= 75 ? '🚨 RIESGO EXCLUSIÓN (80% LÍMITE)' : stats.jneTachaRisk >= 65 ? '⚠️ EN LA MIRA JNE' : '✓ HABILITADO JNE'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 border-t border-slate-200 dark:border-slate-800/80 text-[10px]">
          <div className="flex items-center justify-between sm:flex-col sm:items-start bg-white dark:bg-slate-900 p-1.5 rounded-lg border border-slate-200 dark:border-slate-800">
            <span className="text-slate-500 dark:text-slate-400">Estrategia activa:</span>
            <span className="font-bold text-slate-800 dark:text-slate-200 truncate">
              {week <= 2 ? 'Conectar con conos' : week <= 4 ? 'Debates & confrontación' : 'Asegurar boca de urna'}
            </span>
          </div>

          <div className="flex items-center justify-between sm:flex-col sm:items-start bg-white dark:bg-slate-900 p-1.5 rounded-lg border border-slate-200 dark:border-slate-800">
            <span className="text-slate-500 dark:text-slate-400">Cariño en la calle:</span>
            <span className="font-bold text-orange-600 dark:text-orange-400">
              {stats.popularSympathy >= 50 ? '🔥 Alto respaldo' : '❄️ Campaña fría'} ({stats.popularSympathy}%)
            </span>
          </div>

          <div className="flex items-center justify-between sm:flex-col sm:items-start bg-white dark:bg-slate-900 p-1.5 rounded-lg border border-slate-200 dark:border-slate-800">
            <span className="text-slate-500 dark:text-slate-400">Caja disponible:</span>
            <span className="font-bold text-amber-600 dark:text-amber-400">
              S/. {stats.campaignFunds.toFixed(1)}M
            </span>
          </div>
        </div>
      </div>

      {/* 3. Comodines Estratégicos: Solo Icono y Título (Clic abre Modal de Detalle) */}
      <div id="tutorial-comodines-section" className="bg-slate-50 dark:bg-slate-950/80 rounded-xl p-3 border border-slate-200 dark:border-slate-800 shrink-0">
        <div className="flex items-center justify-between text-[11px] font-sans uppercase tracking-wider mb-2">
          <span className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            COMODINES ESTRATÉGICOS // {candidate.name.toUpperCase()}
          </span>
          <span className="text-slate-600 dark:text-slate-300 font-bold">
            CAJA: S/. {stats.campaignFunds.toFixed(1)}M
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {profileComodines.map((comodin) => {
            const usedCount = comodinUses[comodin.id] || 0;
            const usesLeft = Math.max(0, comodin.maxUses - usedCount);
            const isExhausted = usesLeft <= 0;
            const hasFunds = comodin.costFunds <= stats.campaignFunds;

            return (
              <button
                key={comodin.id}
                type="button"
                onClick={() => setSelectedComodin(comodin)}
                className={`p-2.5 rounded-xl border text-left transition-all duration-150 flex items-center justify-between gap-2 ${
                  isExhausted
                    ? 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 opacity-60'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800/80 shadow-sm active:scale-98'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-xl shrink-0">{comodin.icon}</span>
                  <div className="min-w-0">
                    <span className="font-bold text-xs text-slate-900 dark:text-white truncate block font-sans">
                      {comodin.title}
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block">
                      {isExhausted ? 'Agotado' : `${usesLeft}/${comodin.maxUses} usos`}
                    </span>
                  </div>
                </div>

                <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold shrink-0">
                  Ver ➔
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Live Social Media Trends Ticker (#Tendencias) */}
      <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-[10px] font-sans text-slate-500 dark:text-slate-400 shrink-0">
        <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-bold shrink-0">
          <span>🔥</span> EN X / PERÚ:
        </span>
        <span className="truncate text-slate-600 dark:text-slate-400 pl-2">
          #DebateLima2026 • #PorcinoVsCabezon • #PanConChicharron • #AuraMunicipal • #{candidate.name.replace(/\s+/g, '')}Alcalde • #LabubuSusel
        </span>
      </div>

      {/* Comodin Modal */}
      {selectedComodin && (
        <ComodinModal
          comodin={selectedComodin}
          usesLeft={Math.max(0, selectedComodin.maxUses - (comodinUses[selectedComodin.id] || 0))}
          hasFunds={selectedComodin.costFunds <= stats.campaignFunds}
          onConfirm={() => onTriggerComodin(selectedComodin)}
          onClose={() => setSelectedComodin(null)}
        />
      )}

    </div>
  );
};

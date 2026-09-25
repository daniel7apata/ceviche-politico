import React from 'react';
import { Candidate, CampaignStats } from '../types';
import { MALE_PROFILES, FEMALE_PROFILES, PARTIES } from '../data/gameData';
import { 
  X, 
  Vote, 
  Coins, 
  Scale, 
  Users, 
  Tv, 
  AlertTriangle, 
  Radio, 
  TrendingUp, 
  Award,
  ShieldCheck 
} from 'lucide-react';

interface CandidateTelemetryModalProps {
  candidate: Candidate;
  stats: CampaignStats;
  currentWeek: number;
  maxWeeks: number;
  decisionIndex: number;
  totalDecisions: number;
  onClose: () => void;
}

export const CandidateTelemetryModal: React.FC<CandidateTelemetryModalProps> = ({
  candidate,
  stats,
  currentWeek,
  maxWeeks,
  decisionIndex,
  totalDecisions,
  onClose
}) => {
  const party = PARTIES.find(p => p.id === candidate.partyId) || PARTIES[0];
  const allProfiles = [...MALE_PROFILES, ...FEMALE_PROFILES];
  const profile = allProfiles.find(p => p.id === candidate.profileId) || allProfiles[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn font-sans">
      <div className="w-full max-w-lg max-h-[92vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-5 md:p-6 text-slate-900 dark:text-slate-100 relative">
        
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-sm">
            <Radio className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              EXPEDIENTE & TELEMETRÍA ELECTORAL
            </div>
            <h3 className="text-base md:text-lg font-black text-slate-900 dark:text-white">
              Panel de Estadísticas de Campaña
            </h3>
          </div>
        </div>

        {/* Candidate ID Card */}
        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 mb-4 relative overflow-hidden">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-3xl shrink-0 shadow-sm">
              {profile.avatarEmoji}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-slate-900 dark:text-white truncate">{candidate.name}</span>
                <span 
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase shrink-0"
                  style={{ backgroundColor: `${party.color}20`, color: party.color, border: `1px solid ${party.color}40` }}
                >
                  {party.symbol}
                </span>
              </div>
              <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                {profile.name.toUpperCase()}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 italic truncate mt-0.5">
                "{party.slogan}"
              </div>
            </div>
          </div>

          {/* Campaign Progression Counter */}
          <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-500 dark:text-slate-400 font-medium">FASE ELECTORAL:</span>
            <span className="text-blue-600 dark:text-blue-400 font-bold">
              SEMANA {currentWeek} DE {maxWeeks} (EVENTO {decisionIndex + 1}/{totalDecisions})
            </span>
          </div>
        </div>

        {/* Telemetry Gauges Header */}
        <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
          <span>Métricas de Desempeño:</span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold animate-pulse">
            <TrendingUp className="w-3 h-3" /> Pasivo: +0.02%/5s
          </span>
        </div>

        {/* The 5 Main Telemetry Gauges */}
        <div className="space-y-2.5">
          {/* 1. Intención de Voto */}
          <div className="bg-slate-50 dark:bg-slate-950/90 p-3 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-slate-700 dark:text-slate-200 font-bold flex items-center gap-1.5">
                <Vote className="w-4 h-4 text-blue-600 dark:text-blue-400" /> Intención de Voto en Encuestas
              </span>
              <span className={`font-black text-base font-mono ${
                stats.polling >= 22 ? 'text-emerald-600 dark:text-emerald-400' :
                stats.polling >= 14 ? 'text-blue-600 dark:text-blue-400' : 'text-slate-700 dark:text-slate-300'
              }`}>
                {stats.polling.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
              <div 
                className="bg-blue-600 dark:bg-blue-500 h-full transition-all duration-500 rounded-full shadow"
                style={{ width: `${Math.min(100, stats.polling * 2.2)}%` }}
              />
            </div>
          </div>

          {/* 2. Fondos de Campaña */}
          <div className="bg-slate-50 dark:bg-slate-950/80 p-3 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-slate-700 dark:text-slate-300 font-semibold flex items-center gap-1.5">
                <Coins className="w-4 h-4 text-amber-500" /> Fondos de Campaña Disponibles
              </span>
              <span className="font-bold text-amber-600 dark:text-amber-400 font-mono text-sm">
                S/. {stats.campaignFunds.toFixed(1)}M
              </span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-amber-500 h-full transition-all duration-300 rounded-full"
                style={{ width: `${Math.min(100, (stats.campaignFunds / 10) * 100)}%` }}
              />
            </div>
          </div>

          {/* 3. Riesgo de Tacha del JNE */}
          <div className={`p-3 rounded-2xl border transition-all ${
            stats.jneTachaRisk >= 65 ? 'bg-red-50 dark:bg-red-950/60 border-red-300 dark:border-red-600 animate-pulse' : 'bg-slate-50 dark:bg-slate-950/80 border-slate-200 dark:border-slate-800'
          }`}>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-slate-700 dark:text-slate-300 font-semibold flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-purple-600 dark:text-purple-400" /> Riesgo de Tacha / Inhabilitación JNE
              </span>
              <span className={`font-bold font-mono text-sm ${stats.jneTachaRisk >= 65 ? 'text-red-600 dark:text-red-400' : 'text-purple-600 dark:text-purple-400'}`}>
                {stats.jneTachaRisk}% <span className="text-[10px] font-normal text-slate-500">(Límite: 80%)</span>
              </span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
              <div 
                className={`h-full transition-all duration-300 rounded-full ${stats.jneTachaRisk >= 65 ? 'bg-red-600' : 'bg-purple-600'}`}
                style={{ width: `${Math.min(100, (stats.jneTachaRisk / 80) * 100)}%` }}
              />
            </div>
            {stats.jneTachaRisk >= 65 && (
              <div className="text-[10px] text-red-600 dark:text-red-400 font-bold mt-1.5 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3 shrink-0" />
                {stats.jneTachaRisk >= 75 
                  ? '🚨 ¡EXCLUSIÓN INMINENTE! Al llegar al 80%, el JEE resuelve inhabilitación.' 
                  : '⚠️ ¡AUDITORÍA ACTIVA! El JNE fiscaliza tus cuentas y declaraciones.'}
              </div>
            )}
          </div>

          {/* 4. Cariño Popular / Voto en la Calle */}
          <div className="bg-slate-50 dark:bg-slate-950/80 p-3 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-slate-700 dark:text-slate-300 font-semibold flex items-center gap-1.5">
                <Users className="w-4 h-4 text-orange-500" /> Cariño Popular & Voto en la Calle
              </span>
              <span className="font-bold text-orange-600 dark:text-orange-400 font-mono text-sm">
                {stats.popularSympathy}%
              </span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-orange-500 h-full transition-all duration-300 rounded-full"
                style={{ width: `${stats.popularSympathy}%` }}
              />
            </div>
          </div>

          {/* 5. Credibilidad en Medios y Debates */}
          <div className="bg-slate-50 dark:bg-slate-950/80 p-3 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-slate-700 dark:text-slate-300 font-semibold flex items-center gap-1.5">
                <Tv className="w-4 h-4 text-sky-600 dark:text-sky-400" /> Cobertura en Prensa & Debates TV
              </span>
              <span className="font-bold text-sky-600 dark:text-sky-400 font-mono text-sm">
                {stats.mediaCredibility}%
              </span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-sky-500 h-full transition-all duration-300 rounded-full"
                style={{ width: `${stats.mediaCredibility}%` }}
              />
            </div>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="mt-5 pt-3 border-t border-slate-200 dark:border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-all shadow-md active:scale-98 cursor-pointer"
          >
            Cerrar Telemetría
          </button>
        </div>

      </div>
    </div>
  );
};


import React, { useRef, useState, useEffect } from 'react';
import { Candidate, CampaignStats, GameEnding } from '../types';
import { PARTIES, MALE_PROFILES, FEMALE_PROFILES } from '../data/gameData';
import confetti from 'canvas-confetti';
import { 
  Share2, 
  RotateCcw, 
  Check, 
  Copy, 
  ShieldAlert,
  Award
} from 'lucide-react';

interface GameOverCardProps {
  candidate: Candidate;
  finalStats: CampaignStats;
  ending: GameEnding;
  week: number;
  finalRank?: number;
  totalCandidates?: number;
  onRestart: () => void;
}

export const GameOverCard: React.FC<GameOverCardProps> = ({
  candidate,
  finalStats,
  ending,
  week,
  finalRank = 1,
  totalCandidates = 7,
  onRestart
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);

  const party = PARTIES.find(p => p.id === candidate.partyId) || PARTIES[0];
  const allProfiles = [...MALE_PROFILES, ...FEMALE_PROFILES];
  const profile = allProfiles.find(p => p.id === candidate.profileId) || allProfiles[0];

  const isVictory = ending.type === 'GANADOR_ALCALDIA';

  useEffect(() => {
    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      setCanNativeShare(true);
    }
  }, []);

  useEffect(() => {
    if (isVictory) {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.55 }
      });
    }
  }, [isVictory]);

  const getGameUrl = () => {
    return typeof window !== 'undefined' ? (window.location.origin + window.location.pathname) : '';
  };

  const handleCopyText = async () => {
    const gameUrl = getGameUrl();
    const rankLabel = finalRank === 1 ? 'Puesto #1 🏆 (Alcalde Electo)' : `Puesto #${finalRank} en el Ranking`;
    const textToShare = `🇵🇪 Sé Alcalde - Elecciones Lima 2026\nCandidato: ${candidate.name} (${party.shortName})\nPosición Final: ${rankLabel}\nResultado: ${ending.badge}\nVotación Final: ${finalStats.polling.toFixed(1)}% | Simpatía Popular: ${finalStats.popularSympathy}%\n\n"${ending.headline}"\n\n${ending.shareMessage}\n\n👉 ¡Juega tú también gratis aquí! 🗳️🏛️\n${gameUrl}`;
    
    let success = false;
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(textToShare);
        success = true;
      } catch (e) {
        console.warn('Clipboard API error, intentando fallback:', e);
      }
    }

    if (!success) {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = textToShare;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        success = true;
      } catch (err) {
        console.error('Error al copiar texto:', err);
      }
    }

    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleShareWhatsApp = () => {
    const gameUrl = getGameUrl();
    const rankLabel = finalRank === 1 ? 'Puesto #1 🏆 (Alcalde Electo)' : `Puesto #${finalRank} en el Ranking`;
    const text = encodeURIComponent(
      `🇵🇪 *Sé Alcalde - Elecciones Lima 2026*\nCandidato: *${candidate.name}* (${party.shortName})\nPosición Final: *${rankLabel}*\nResultado: *${ending.badge}*\nVotación Final: *${finalStats.polling.toFixed(1)}%*\n\n"${ending.headline}"\n\n${ending.shareMessage}\n\n👉 ¡Juega tú también gratis aquí! 🗳️🏛️\n${gameUrl}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const handleShareTwitter = () => {
    const gameUrl = getGameUrl();
    const rankLabel = finalRank === 1 ? 'Puesto #1 🏆' : `Puesto #${finalRank}`;
    const text = encodeURIComponent(
      `🇵🇪 Jugué la campaña de "Sé Alcalde Lima 2026" como ${candidate.name} (${party.shortName}) y quedé en el ${rankLabel} con ${finalStats.polling.toFixed(1)}% de votos!\n\n"${ending.headline}"\n\n¿Lograrás ganar y gobernar Lima? 🗳️🏛️\n${gameUrl}`
    );
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const handleNativeShare = async () => {
    const gameUrl = getGameUrl();
    const rankLabel = finalRank === 1 ? 'Puesto #1 🏆' : `Puesto #${finalRank}`;
    const textToShare = `🇵🇪 Sé Alcalde - Elecciones Lima 2026\nCandidato: ${candidate.name} (${party.shortName})\nPosición Final: ${rankLabel}\nResultado: ${ending.badge} con ${finalStats.polling.toFixed(1)}% de votos.\n\n"${ending.headline}"\n\n¿Podrás ganar la Alcaldía de Lima?`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Sé Alcalde - Elecciones Lima 2026',
          text: textToShare,
          url: gameUrl
        });
      } catch {
        // Intentionally silent if user cancels share dialog
      }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 animate-fadeIn">
      
      {/* Upper Congrats / Condolence Banner */}
      <div className="text-center mb-6">
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-2 ${ending.badgeColor}`}>
          {isVictory ? <Award className="w-4 h-4" /> : <ShieldAlert className="w-4 h-4" />}
          {ending.badge}
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight font-sans">
          {ending.title}
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base mt-1 font-sans">
          {ending.subtitle}
        </p>
      </div>

      {/* The Official Shareable Visual Card */}
      <div 
        ref={cardRef}
        className="bg-white dark:bg-[#0c0c0e] rounded-3xl p-5 md:p-8 border-2 shadow-xl relative overflow-hidden mb-8 text-slate-900 dark:text-neutral-100 font-sans"
        style={{ borderColor: party.color }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-neutral-800 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🇵🇪</span>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-neutral-300">
                Jurado Nacional de Elecciones • Acta Final de Votación
              </div>
              <div className="text-[10px] text-slate-500 dark:text-neutral-400 font-medium">
                Proceso Electoral Municipal Lima 2026 // Conteo Rápido 100%
              </div>
            </div>
          </div>
          <span 
            className="text-xs font-bold px-3 py-1 rounded-full uppercase"
            style={{ backgroundColor: `${party.color}20`, color: party.color, border: `1px solid ${party.color}40` }}
          >
            {party.name}
          </span>
        </div>

        {/* Candidate Profile Info */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-6">
          <div className="w-20 h-20 rounded-3xl bg-slate-100 dark:bg-neutral-800 border-2 border-slate-200 dark:border-neutral-700 flex items-center justify-center text-4xl shadow-md shrink-0">
            {profile.avatarEmoji}
          </div>
          <div className="text-center sm:text-left flex-1 min-w-0">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">
                {candidate.name}
              </h2>
              <span className="px-2.5 py-0.5 rounded-md font-bold text-xs bg-blue-600 text-white shadow-sm inline-flex items-center gap-1">
                {finalRank === 1 ? `🏆 PUESTO 1 DE ${totalCandidates}` : `PUESTO ${finalRank} DE ${totalCandidates}`}
              </span>
            </div>
            <p className="text-xs font-bold text-amber-600 dark:text-amber-400 mt-0.5">
              {profile.name}
            </p>
            <p className="text-xs text-slate-600 dark:text-neutral-300 italic mt-1 max-w-xl">
              {isVictory ? '¡Ganamos carajo! ¡A gobernar Lima!' : '"Tmre, perdí, será pa la presidencia p"'}
            </p>
          </div>
        </div>

        {/* Newspaper Headline Box */}
        <div className="rounded-2xl bg-amber-100 dark:bg-[#121214] text-slate-950 dark:text-white p-4 md:p-5 shadow-sm mb-6 border-l-8 border-red-600 border-slate-200 dark:border-neutral-800 border">
          <div className="text-[10px] font-bold tracking-widest text-red-700 dark:text-red-400 uppercase mb-1 flex items-center justify-between">
            <span>📰 {ending.newspaperName} — EDICIÓN HISTÓRICA</span>
            <span className="text-slate-500 dark:text-neutral-400 font-bold">100% ACTAS CONTABILIZADAS</span>
          </div>
          <h3 className="text-xl md:text-2xl font-black uppercase leading-tight font-['Times_New_Roman',serif] tracking-tight">
            "{ending.headline}"
          </h3>
          <p className="text-xs text-slate-700 dark:text-neutral-300 mt-2 font-medium leading-relaxed font-serif">
            {ending.description}
          </p>
        </div>

        {/* Final Stats Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
          <div className="bg-slate-50 dark:bg-[#121214] rounded-2xl p-3 border border-slate-200 dark:border-neutral-800 text-center col-span-2 sm:col-span-1">
            <div className="text-[11px] font-bold text-slate-500 dark:text-neutral-400">Puesto Ranking</div>
            <div className={`text-2xl font-black mt-1 ${
              finalRank === 1 ? 'text-amber-500 dark:text-amber-400' :
              finalRank === 2 ? 'text-blue-600 dark:text-blue-400' :
              'text-slate-800 dark:text-neutral-200'
            }`}>
              {finalRank === 1 ? '🥇 #1' : finalRank === 2 ? '🥈 #2' : `#${finalRank}`}
            </div>
            <div className="text-[10px] text-slate-400 dark:text-neutral-500 font-bold mt-0.5">
              {finalRank === 1 ? `1er Lugar de ${totalCandidates}` : `Puesto ${finalRank} de ${totalCandidates}`}
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-[#121214] rounded-2xl p-3 border border-slate-200 dark:border-neutral-800 text-center">
            <div className="text-[11px] font-bold text-slate-500 dark:text-neutral-400">Votación Final</div>
            <div className={`text-2xl font-black mt-1 ${
              finalStats.polling >= 22 ? 'text-emerald-600 dark:text-emerald-400' :
              finalStats.polling >= 14 ? 'text-amber-600 dark:text-amber-400' : 'text-red-600 dark:text-red-400'
            }`}>
              {finalStats.polling.toFixed(1)}%
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-[#121214] rounded-2xl p-3 border border-slate-200 dark:border-neutral-800 text-center">
            <div className="text-[11px] font-bold text-slate-500 dark:text-neutral-400">Cariño Popular</div>
            <div className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">
              {finalStats.popularSympathy}%
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-[#121214] rounded-2xl p-3 border border-slate-200 dark:border-neutral-800 text-center">
            <div className="text-[11px] font-bold text-slate-500 dark:text-neutral-400">Riesgo JNE</div>
            <div className={`text-2xl font-black mt-1 ${
              finalStats.jneTachaRisk >= 70 ? 'text-red-600 dark:text-red-400' : 'text-purple-600 dark:text-purple-400'
            }`}>
              {finalStats.jneTachaRisk}%
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-[#121214] rounded-2xl p-3 border border-slate-200 dark:border-neutral-800 text-center">
            <div className="text-[11px] font-bold text-slate-500 dark:text-neutral-400">Fondos Restantes</div>
            <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
              S/. {finalStats.campaignFunds.toFixed(1)}M
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-neutral-400 pt-3 border-t border-slate-200 dark:border-neutral-800">
          <span>🎮 Simulador Electoral "Sé Alcalde Lima 2026"</span>
          <span>Semanas de Campaña: {week} semanas completadas</span>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3 font-sans">

        {canNativeShare && (
          <button
            onClick={handleNativeShare}
            className="w-full py-3 px-5 rounded-xl bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-white text-white dark:text-neutral-900 font-bold text-sm flex items-center justify-center gap-2 shadow-sm active:scale-98 transition-all cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>Compartir Tarjeta y Veredicto con Aplicaciones</span>
          </button>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <button
            onClick={handleShareWhatsApp}
            className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm active:scale-98 transition-all cursor-pointer"
          >
            <span className="text-base">💬</span>
            <span>Compartir en WhatsApp</span>
          </button>

          <button
            onClick={handleShareTwitter}
            className="py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-white font-bold text-sm flex items-center justify-center gap-2 border border-slate-700 dark:border-neutral-700 shadow-sm active:scale-98 transition-all cursor-pointer"
          >
            <span className="font-mono text-base font-bold">𝕏</span>
            <span>Publicar en X (Twitter)</span>
          </button>

          <button
            onClick={handleCopyText}
            className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-slate-900 dark:text-white font-bold text-sm flex items-center justify-center gap-2 border border-slate-300 dark:border-neutral-700 active:scale-98 transition-all cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? '¡Copiado al portapapeles!' : 'Copiar Veredicto'}</span>
          </button>
        </div>

        <div className="pt-3 text-center">
          <button
            onClick={onRestart}
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-neutral-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors py-2 px-4 rounded-xl hover:bg-slate-100 dark:hover:bg-neutral-800 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Postular otra vez con otro perfil</span>
          </button>
        </div>
      </div>

    </div>
  );
};

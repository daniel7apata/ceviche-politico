import React, { useRef, useState, useEffect } from 'react';
import { Candidate, CampaignStats, GameEnding } from '../types';
import { PARTIES, MALE_PROFILES, FEMALE_PROFILES } from '../data/gameData';
import confetti from 'canvas-confetti';
import { 
  Download, 
  Share2, 
  RotateCcw, 
  Check, 
  Copy, 
  Sparkles, 
  ShieldAlert,
  Award,
  Vote
} from 'lucide-react';

interface GameOverCardProps {
  candidate: Candidate;
  finalStats: CampaignStats;
  ending: GameEnding;
  week: number;
  onRestart: () => void;
}

export const GameOverCard: React.FC<GameOverCardProps> = ({
  candidate,
  finalStats,
  ending,
  week,
  onRestart
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
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
    const textToShare = `🇵🇪 Sé Alcalde - Elecciones Lima 2026\nCandidato: ${candidate.name} (${party.shortName})\nResultado: ${ending.badge}\nVotación Final: ${finalStats.polling.toFixed(1)}% | Simpatía Popular: ${finalStats.popularSympathy}%\n\n"${ending.headline}"\n\n${ending.shareMessage}\n\n👉 ¡Juega tú también gratis aquí! 🗳️🏛️\n${gameUrl}`;
    
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
    const text = encodeURIComponent(
      `🇵🇪 *Sé Alcalde - Elecciones Lima 2026*\nCandidato: *${candidate.name}* (${party.shortName})\nResultado: *${ending.badge}*\nVotación Final: *${finalStats.polling.toFixed(1)}%*\n\n"${ending.headline}"\n\n${ending.shareMessage}\n\n👉 ¡Juega tú también gratis aquí! 🗳️🏛️\n${gameUrl}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const handleShareTwitter = () => {
    const gameUrl = getGameUrl();
    const text = encodeURIComponent(
      `🇵🇪 Jugué la campaña de "Sé Alcalde Lima 2026" como ${candidate.name} (${party.shortName}) y mi resultado final fue: ${ending.badge} con ${finalStats.polling.toFixed(1)}% de votos!\n\n"${ending.headline}"\n\n¿Lograrás ganar y gobernar Lima? 🗳️🏛️\n${gameUrl}`
    );
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const handleNativeShare = async () => {
    const gameUrl = getGameUrl();
    const textToShare = `🇵🇪 Sé Alcalde - Elecciones Lima 2026\nCandidato: ${candidate.name} (${party.shortName})\nResultado: ${ending.badge} con ${finalStats.polling.toFixed(1)}% de votos.\n\n"${ending.headline}"\n\n¿Podrás ganar la Alcaldía de Lima?`;
    
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

  // Helper for safe canvas rounded rectangle drawing
  const drawRoundRect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number
  ) => {
    if (typeof ctx.roundRect === 'function') {
      ctx.roundRect(x, y, w, h, r);
    } else {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
    }
  };

  const generateAndDownloadImage = () => {
    if (downloading) return;
    setDownloading(true);

    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setDownloading(false);
        return;
      }

      const width = 1080;
      const height = 1350;
      canvas.width = width;
      canvas.height = height;

      // Background
      const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
      bgGradient.addColorStop(0, '#0f172a');
      bgGradient.addColorStop(0.5, '#050a14');
      bgGradient.addColorStop(1, '#020617');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // Outer border
      ctx.lineWidth = 16;
      ctx.strokeStyle = party.color || '#3b82f6';
      ctx.strokeRect(30, 30, width - 60, height - 60);

      // Top Header Banner
      ctx.fillStyle = '#dc2626';
      ctx.fillRect(50, 50, width - 100, 70);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 28px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('ELECCIONES MUNICIPALES LIMA 2026 • ACTA OFICIAL DE ESCRUTINIO', width / 2, 95);

      // Main Game Title
      ctx.fillStyle = '#38bdf8';
      ctx.font = '900 60px sans-serif';
      ctx.fillText('SÉ ALCALDE: RESULTADOS FINALES', width / 2, 195);

      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 24px sans-serif';
      ctx.fillText('Campaña Electoral de las 5 Semanas Previas al Voto', width / 2, 235);

      // Candidate Card Box
      ctx.fillStyle = '#1e293b';
      drawRoundRect(ctx, 80, 275, width - 160, 230, 24);
      ctx.fill();
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.font = '95px "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(profile?.avatarEmoji || '🇵🇪', 190, 415);

      ctx.textAlign = 'left';
      ctx.fillStyle = '#ffffff';
      ctx.font = '900 42px sans-serif';
      ctx.fillText(candidate.name, 280, 345);

      ctx.fillStyle = party.color || '#3b82f6';
      ctx.font = 'bold 26px sans-serif';
      ctx.fillText(`Partido: ${party.name} (${party.symbolEmoji || ''} ${party.symbol || ''})`, 280, 390);

      ctx.fillStyle = '#cbd5e1';
      ctx.font = 'italic 22px sans-serif';
      ctx.fillText(`Perfil: ${profile?.name || ''}`, 280, 430);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '20px sans-serif';
      const quoteStr = profile?.quote ? (profile.quote.length > 55 ? `${profile.quote.substring(0, 55)}...` : profile.quote) : '';
      ctx.fillText(`"${quoteStr}"`, 280, 470);

      // Outcome Badge Box
      const outcomeColor = isVictory ? '#059669' : '#dc2626';
      ctx.fillStyle = outcomeColor;
      drawRoundRect(ctx, 80, 535, width - 160, 110, 20);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.font = '900 38px sans-serif';
      ctx.fillText(ending.badge, width / 2, 603);

      // Newspaper Headline clipping
      ctx.fillStyle = '#f8fafc';
      drawRoundRect(ctx, 80, 675, width - 160, 220, 20);
      ctx.fill();

      ctx.fillStyle = '#b91c1c';
      ctx.font = '900 24px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(`📰 ${ending.newspaperName} — EDICIÓN EXTRAORDINARIA`, 110, 720);

      ctx.fillStyle = '#0f172a';
      ctx.font = '900 32px sans-serif';
      const words = `"${ending.headline}"`.split(' ');
      let line = '';
      let y = 765;
      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > width - 240 && n > 0) {
          ctx.fillText(line, 110, y);
          line = words[n] + ' ';
          y += 40;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, 110, y);

      // Stats Grid
      const statBoxes = [
        { label: 'Votación Final', val: `${finalStats.polling.toFixed(1)}%`, color: '#38bdf8' },
        { label: 'Cariño Popular', val: `${finalStats.popularSympathy}%`, color: '#f59e0b' },
        { label: 'Riesgo JNE', val: `${finalStats.jneTachaRisk}%`, color: '#ef4444' },
        { label: 'Fondos Restantes', val: `S/. ${finalStats.campaignFunds.toFixed(1)}M`, color: '#10b981' }
      ];

      const boxWidth = (width - 160 - 45) / 4;
      statBoxes.forEach((st, i) => {
        const bx = 80 + i * (boxWidth + 15);
        const by = 925;

        ctx.fillStyle = '#1e293b';
        drawRoundRect(ctx, bx, by, boxWidth, 140, 16);
        ctx.fill();
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = '#94a3b8';
        ctx.textAlign = 'center';
        ctx.font = 'bold 16px sans-serif';
        ctx.fillText(st.label, bx + boxWidth / 2, by + 40);

        ctx.fillStyle = st.color;
        ctx.font = '900 36px sans-serif';
        ctx.fillText(st.val, bx + boxWidth / 2, by + 95);
      });

      // Stamp
      ctx.save();
      ctx.translate(width - 250, 1170);
      ctx.rotate(-0.15);
      ctx.strokeStyle = '#dc2626';
      ctx.lineWidth = 6;
      ctx.strokeRect(-160, -40, 320, 80);
      ctx.fillStyle = '#dc2626';
      ctx.font = '900 24px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('VOTO OFICIAL 2026', 0, -5);
      ctx.font = 'bold 18px sans-serif';
      ctx.fillText(new Date().toLocaleDateString('es-PE'), 0, 22);
      ctx.restore();

      // Footer Watermark
      ctx.textAlign = 'center';
      ctx.fillStyle = '#64748b';
      ctx.font = 'bold 22px sans-serif';
      ctx.fillText('Simulador de Campaña "Sé Alcalde" • Lima 2026', width / 2, 1260);
      ctx.fillStyle = '#38bdf8';
      ctx.font = '18px sans-serif';
      ctx.fillText('¡Juega gratis sin registro y conquista el voto popular!', width / 2, 1290);

      const fileName = `se-alcalde-lima-${candidate.name.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase() || 'candidato'}.png`;

      // Cross-browser reliable download
      if (typeof canvas.toBlob === 'function') {
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.download = fileName;
            link.href = url;
            document.body.appendChild(link);
            link.click();
            setTimeout(() => {
              document.body.removeChild(link);
              URL.revokeObjectURL(url);
              setDownloading(false);
            }, 400);
          } else {
            const link = document.createElement('a');
            link.download = fileName;
            link.href = canvas.toDataURL('image/png');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setDownloading(false);
          }
        }, 'image/png');
      } else {
        const link = document.createElement('a');
        link.download = fileName;
        link.href = canvas.toDataURL('image/png');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setDownloading(false);
      }
    } catch (err) {
      console.error('Error al generar la imagen descargable:', err);
      setDownloading(false);
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
          <div className="text-center sm:text-left">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">
              {candidate.name}
            </h2>
            <p className="text-xs font-bold text-amber-600 dark:text-amber-400 mt-0.5">
              {profile.name}
            </p>
            <p className="text-xs text-slate-600 dark:text-neutral-300 italic mt-1 max-w-xl">
              {profile.quote}
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
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
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
        <button
          onClick={generateAndDownloadImage}
          disabled={downloading}
          className={`w-full py-4 px-6 rounded-2xl font-bold text-base md:text-lg flex items-center justify-center gap-3 shadow-md active:scale-[0.99] transition-all cursor-pointer ${
            downloading 
              ? 'bg-slate-400 text-white cursor-wait'
              : 'bg-red-600 hover:bg-red-500 text-white'
          }`}
        >
          <Download className={`w-5 h-5 stroke-[2.5] ${downloading ? 'animate-bounce' : ''}`} />
          <span>{downloading ? 'Generando Imagen en Alta Resolución...' : '📸 Descargar Tarjeta para Instagram Stories / X'}</span>
        </button>

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

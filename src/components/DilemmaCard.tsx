import React, { useState } from 'react';
import { Dilemma, DilemmaChoice } from '../types';
import { 
  ArrowRight, 
  Newspaper, 
  TrendingUp, 
  TrendingDown, 
  AlertCircle,
  Quote,
  MessageSquare,
  UserCheck
} from 'lucide-react';

interface DilemmaCardProps {
  dilemma: Dilemma;
  onSelectChoice: (choice: DilemmaChoice) => void;
}

export const DilemmaCard: React.FC<DilemmaCardProps> = ({ 
  dilemma, 
  onSelectChoice 
}) => {
  const [selectedChoice, setSelectedChoice] = useState<DilemmaChoice | null>(null);

  const handleChoiceClick = (choice: DilemmaChoice) => {
    setSelectedChoice(choice);
  };

  const handleConfirmNext = () => {
    if (selectedChoice) {
      onSelectChoice(selectedChoice);
      setSelectedChoice(null);
    }
  };

  const renderDeltaBadges = (deltas: DilemmaChoice['deltas']) => {
    return (
      <div className="flex flex-wrap gap-1 mt-1.5">
        {deltas.polling !== undefined && (
          <span className={`text-[10px] px-1.5 py-0.5 rounded font-sans font-bold flex items-center gap-0.5 ${
            deltas.polling >= 0 
              ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800' 
              : 'bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300 border border-red-300 dark:border-red-800'
          }`}>
            {deltas.polling >= 0 ? <TrendingUp className="w-2.5 h-2.5" /> : <TrendingDown className="w-2.5 h-2.5" />}
            {deltas.polling >= 0 ? `+${deltas.polling}%` : `${deltas.polling}%`} Voto
          </span>
        )}

        {deltas.campaignFunds !== undefined && (
          <span className={`text-[10px] px-1.5 py-0.5 rounded font-sans font-bold flex items-center gap-0.5 ${
            deltas.campaignFunds >= 0 
              ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800' 
              : 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-800'
          }`}>
            {deltas.campaignFunds >= 0 ? `+S/. ${deltas.campaignFunds}M` : `-S/. ${Math.abs(deltas.campaignFunds)}M`} Fondos
          </span>
        )}

        {deltas.jneTachaRisk !== undefined && (
          <span className={`text-[10px] px-1.5 py-0.5 rounded font-sans font-bold flex items-center gap-0.5 ${
            deltas.jneTachaRisk <= 0 
              ? 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-800' 
              : 'bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 border border-purple-300 dark:border-purple-800'
          }`}>
            {deltas.jneTachaRisk > 0 ? `+${deltas.jneTachaRisk}%` : `${deltas.jneTachaRisk}%`} Riesgo JNE
          </span>
        )}

        {deltas.popularSympathy !== undefined && (
          <span className={`text-[10px] px-1.5 py-0.5 rounded font-sans font-bold flex items-center gap-0.5 ${
            deltas.popularSympathy >= 0 
              ? 'bg-orange-100 dark:bg-orange-950 text-orange-800 dark:text-orange-300 border border-orange-300 dark:border-orange-800' 
              : 'bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300 border border-red-300 dark:border-red-800'
          }`}>
            {deltas.popularSympathy >= 0 ? `+${deltas.popularSympathy}%` : `${deltas.popularSympathy}%`} Cariño
          </span>
        )}

        {deltas.mediaCredibility !== undefined && (
          <span className={`text-[10px] px-1.5 py-0.5 rounded font-sans font-bold flex items-center gap-0.5 ${
            deltas.mediaCredibility >= 0 
              ? 'bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 border border-sky-300 dark:border-sky-800' 
              : 'bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300 border border-red-300 dark:border-red-800'
          }`}>
            {deltas.mediaCredibility >= 0 ? `+${deltas.mediaCredibility}%` : `${deltas.mediaCredibility}%`} Prensa
          </span>
        )}
      </div>
    );
  };

  // Stably shuffle choices per dilemma so option A is never predictably always one type of choice
  const displayChoices = React.useMemo(() => {
    const shouldFlip = dilemma.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 2 === 1;
    return shouldFlip ? [...dilemma.choices].reverse() : dilemma.choices;
  }, [dilemma.id, dilemma.choices]);

  const getStrategicTags = (deltas: DilemmaChoice['deltas']) => {
    const tags: { text: string; color: string }[] = [];
    if (deltas.campaignFunds && deltas.campaignFunds < 0) {
      tags.push({ 
        text: `💸 Costo S/. ${Math.abs(deltas.campaignFunds)}M`, 
        color: 'bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-800' 
      });
    }
    if (deltas.campaignFunds && deltas.campaignFunds > 0) {
      tags.push({ 
        text: `💰 +S/. ${deltas.campaignFunds}M Caja`, 
        color: 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800' 
      });
    }
    if (deltas.jneTachaRisk && deltas.jneTachaRisk > 10) {
      tags.push({ 
        text: `⚠️ Alto Riesgo JNE`, 
        color: 'bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 border border-purple-300 dark:border-purple-800' 
      });
    } else if (deltas.jneTachaRisk && deltas.jneTachaRisk < 0) {
      tags.push({ 
        text: `⚖️ Blindaje Legal`, 
        color: 'bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-800' 
      });
    }
    if (deltas.popularSympathy && Math.abs(deltas.popularSympathy) >= 6) {
      tags.push({ 
        text: `📢 Voto en Calles`, 
        color: 'bg-orange-100 dark:bg-orange-950/80 text-orange-800 dark:text-orange-300 border border-orange-300 dark:border-orange-800' 
      });
    }
    if (deltas.mediaCredibility && Math.abs(deltas.mediaCredibility) >= 6) {
      tags.push({ 
        text: `📺 Prensa & Medios`, 
        color: 'bg-sky-100 dark:bg-sky-950/80 text-sky-800 dark:text-sky-300 border border-sky-300 dark:border-sky-800' 
      });
    }
    return tags.slice(0, 2);
  };

  return (
    <div className="h-full flex flex-col justify-between bg-white dark:bg-[#0c0c0e] rounded-xl p-3 md:p-3.5 border border-slate-200 dark:border-neutral-800 shadow-sm relative overflow-y-auto font-sans">
      
      {selectedChoice ? (
        /* Choice Consequence Feedback: Auténtica Estética de DIARIO CHICHA PERUANO con Zoom Sutil Sobrio */
        <div className="space-y-2.5 animate-fadeIn flex-1 flex flex-col justify-between overflow-y-auto">
          
          <div className="space-y-2">
            
            {/* Cabecera Clásica de Periódico Popular / Chicha */}
            <div className="border-b-2 border-slate-900 dark:border-neutral-700 pb-1 flex items-center justify-between text-[9px] font-serif uppercase tracking-widest text-slate-700 dark:text-neutral-300 font-bold">
              <span className="flex items-center gap-1">
                <span>📰</span> DIARIO LA CHICHA METROPOLITANA
              </span>
              <span className="bg-red-600 text-white px-1.5 py-0.2 rounded font-sans text-[8px] font-black">
                EDICIÓN EXTRAORDINARIA
              </span>
            </div>

            {/* Titular Estilo Diario: Fondo Rojo con Letras Blancas O Fondo Amarillo con Letras Negras */}
            {((selectedChoice.deltas.polling || 0) >= 0) ? (
              /* Estilo Fondo Amarillo con Letras Negras (Trome / Extra) */
              <div className="bg-amber-300 text-slate-950 p-3 rounded-lg border-2 border-slate-950 shadow-md relative overflow-hidden">
                <div className="text-[10px] font-sans font-black uppercase tracking-wider text-red-800 mb-1 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <span>⚡</span> ¡BOMBAZO EN LAS CALLES!
                  </span>
                  <span className="text-[9px] bg-red-700 text-white px-1.5 py-0.2 rounded font-bold">
                    EDICIÓN CENTRAL
                  </span>
                </div>
                
                {/* Clean Subtle Zoom Headline */}
                <h3 className="text-base md:text-xl font-black leading-tight uppercase font-['Times_New_Roman',serif] tracking-tight animate-subtle-zoom select-none">
                  "{selectedChoice.headlineNews}"
                </h3>

                <p className="text-slate-950 text-xs mt-2 font-serif leading-relaxed border-t border-slate-950/30 pt-1.5 font-bold">
                  {selectedChoice.feedback}
                </p>
              </div>
            ) : (
              /* Estilo Fondo Rojo con Letras Blancas (El Men / El Chino / El Popular) */
              <div className="bg-red-600 text-white p-3 rounded-lg border-2 border-red-950 shadow-md relative overflow-hidden">
                <div className="text-[10px] font-sans font-black uppercase tracking-wider text-yellow-300 mb-1 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <span>🚨</span> ¡ALERTA EN CAMPAÑA!
                  </span>
                  <span className="text-[9px] bg-yellow-400 text-slate-950 px-1.5 py-0.2 rounded font-black">
                    ÚLTIMO MINUTO
                  </span>
                </div>

                {/* Clean Subtle Zoom Headline */}
                <h3 className="text-base md:text-xl font-black leading-tight uppercase font-['Times_New_Roman',serif] tracking-tight animate-subtle-zoom select-none text-white">
                  "{selectedChoice.headlineNews}"
                </h3>

                <p className="text-red-50 text-xs mt-2 font-serif leading-relaxed border-t border-red-400/40 pt-1.5 font-semibold">
                  {selectedChoice.feedback}
                </p>
              </div>
            )}

            {/* Reacción en X (Twitter) */}
            {selectedChoice.tweetReaction && (
              <div className="bg-slate-50 dark:bg-[#121214] rounded-xl p-2 border border-slate-200 dark:border-neutral-800">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-base">{selectedChoice.tweetReaction.avatar}</span>
                    <div>
                      <div className="text-[11px] font-bold text-slate-900 dark:text-white leading-none font-sans">
                        {selectedChoice.tweetReaction.author}
                      </div>
                      <div className="text-[9px] text-slate-500 dark:text-neutral-400 font-sans">
                        {selectedChoice.tweetReaction.handle} • En X
                      </div>
                    </div>
                  </div>
                  <span className="text-slate-400 font-bold text-xs font-sans">𝕏</span>
                </div>
                <p className="text-[11px] text-slate-700 dark:text-neutral-300 pl-6 leading-tight font-sans">
                  "{selectedChoice.tweetReaction.content}"
                </p>
              </div>
            )}

            {/* Impacto en Sondeos */}
            <div className="p-2 bg-slate-50 dark:bg-[#121214] rounded-lg border border-slate-200 dark:border-neutral-800">
              <div className="text-[9px] font-bold text-slate-500 dark:text-neutral-400 uppercase tracking-wider font-sans">
                Efecto en los sondeos:
              </div>
              {renderDeltaBadges(selectedChoice.deltas)}
            </div>
          </div>

          <button
            type="button"
            onClick={handleConfirmNext}
            className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold text-xs md:text-sm flex items-center justify-center gap-1.5 shadow-md active:scale-98 transition-all font-sans cursor-pointer"
          >
            <span>Continuar con el Siguiente Evento</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </div>
      ) : (
        /* Dilemma Choice Question */
        <div className="flex-1 flex flex-col justify-between space-y-2">
          
          <div className="space-y-2">
            {/* Header context tag */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-neutral-800 text-slate-700 dark:text-neutral-300 border border-slate-200 dark:border-neutral-700 flex items-center gap-1 font-sans">
                <AlertCircle className="w-3 h-3 text-amber-500" />
                {dilemma.contextTag}
              </span>
              <span className="text-[10px] font-sans text-slate-500 dark:text-neutral-400 font-bold">
                SEMANA {dilemma.week}
              </span>
            </div>

            {/* Interlocutor Person Card & Premise Dialogue */}
            <div className="rounded-xl border border-slate-200 dark:border-neutral-800 p-2.5 sm:p-3 bg-slate-50/60 dark:bg-[#121214]/60">
              <div className="flex items-center gap-3">
                {/* Person Avatar */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-amber-100 to-amber-200 dark:from-neutral-800 dark:to-neutral-700 border-2 border-amber-300 dark:border-amber-500/60 flex items-center justify-center text-2xl sm:text-3xl shadow-sm shrink-0 select-none">
                  {dilemma.characterAvatar}
                </div>

                {/* Person Identity */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950/70 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800 flex items-center gap-1">
                      <UserCheck className="w-2.5 h-2.5" /> Interlocutor
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white leading-tight font-sans">
                    {dilemma.characterName}
                  </h3>
                  <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 font-sans truncate">
                    {dilemma.characterRole}
                  </p>
                </div>
              </div>

              {/* Large, Distinct Premise Dialogue Speech Bubble */}
              <div className="mt-2.5 p-3 sm:p-3.5 rounded-xl bg-white dark:bg-[#161619] border-2 border-blue-200 dark:border-blue-900/60 shadow-sm relative">
                <Quote className="w-4 h-4 text-blue-500/70 dark:text-blue-400/60 mb-1" />
                <p className="text-sm sm:text-base font-medium text-slate-900 dark:text-neutral-100 leading-relaxed font-sans">
                  “{dilemma.dialogue}”
                </p>
              </div>
            </div>

            <div className="text-[11px] font-bold uppercase text-blue-700 dark:text-blue-400 tracking-wider font-sans flex items-center gap-1.5 pt-0.5">
              <MessageSquare className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" /> ¿Cuál es tu reacción como candidato a la Alcaldía de Lima?
            </div>
          </div>

          {/* 2 Choices */}
          <div className="grid grid-cols-1 gap-2 shrink-0 pt-1">
            {displayChoices.map((choice, index) => {
              const tags = getStrategicTags(choice.deltas);
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleChoiceClick(choice)}
                  className="group text-left p-3 rounded-xl bg-slate-50 dark:bg-[#121214] border border-slate-200 dark:border-neutral-800 hover:border-blue-300 dark:hover:border-blue-800/80 hover:bg-slate-100 dark:hover:bg-[#161619] transition-all duration-150 flex flex-col justify-between shadow-sm active:scale-99 font-sans cursor-pointer shrink-0"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="w-6 h-6 rounded-md bg-slate-200 dark:bg-neutral-800 border border-slate-300 dark:border-neutral-700 group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-blue-600 dark:group-hover:text-white text-slate-700 dark:text-neutral-300 font-bold text-xs flex items-center justify-center shrink-0 transition-colors font-sans">
                      {index === 0 ? 'A' : 'B'}
                    </span>
                    <div className="text-xs md:text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 leading-snug transition-colors font-sans">
                      {choice.text}
                    </div>
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-200 dark:border-neutral-800/60 w-full flex items-center justify-between">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {tags.map((tag, tIdx) => (
                        <span key={tIdx} className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${tag.color}`}>
                          {tag.text}
                        </span>
                      ))}
                      {tags.length === 0 && (
                        <span className="text-[10px] text-slate-400 dark:text-neutral-500 italic">
                          Decisión de postura
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                      Elegir ➔
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

        </div>
      )}

    </div>
  );
};

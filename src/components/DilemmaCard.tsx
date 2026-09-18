import React, { useState } from 'react';
import { Dilemma, DilemmaChoice } from '../types';
import { 
  ArrowRight, 
  Newspaper, 
  TrendingUp, 
  TrendingDown, 
  AlertCircle 
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

  return (
    <div className="h-full flex flex-col justify-between bg-white dark:bg-slate-900 rounded-xl p-3 md:p-3.5 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden font-sans">
      
      {selectedChoice ? (
        /* Choice Consequence Feedback: Auténtica Estética de DIARIO CHICHA PERUANO con Zoom Sutil Sobrio */
        <div className="space-y-2.5 animate-fadeIn flex-1 flex flex-col justify-between">
          
          <div className="space-y-2">
            
            {/* Cabecera Clásica de Periódico Popular / Chicha */}
            <div className="border-b-2 border-slate-900 dark:border-slate-100 pb-1 flex items-center justify-between text-[9px] font-serif uppercase tracking-widest text-slate-700 dark:text-slate-300 font-bold">
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
              <div className="bg-slate-50 dark:bg-slate-950/80 rounded-xl p-2 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-base">{selectedChoice.tweetReaction.avatar}</span>
                    <div>
                      <div className="text-[11px] font-bold text-slate-900 dark:text-white leading-none font-sans">
                        {selectedChoice.tweetReaction.author}
                      </div>
                      <div className="text-[9px] text-slate-500 dark:text-slate-400 font-sans">
                        {selectedChoice.tweetReaction.handle} • En X
                      </div>
                    </div>
                  </div>
                  <span className="text-slate-400 font-bold text-xs font-sans">𝕏</span>
                </div>
                <p className="text-[11px] text-slate-700 dark:text-slate-300 pl-6 leading-tight font-sans">
                  "{selectedChoice.tweetReaction.content}"
                </p>
              </div>
            )}

            {/* Impacto en Sondeos */}
            <div className="p-2 bg-slate-50 dark:bg-slate-950/60 rounded-lg border border-slate-200 dark:border-slate-800">
              <div className="text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-sans">
                Efecto en los sondeos:
              </div>
              {renderDeltaBadges(selectedChoice.deltas)}
            </div>
          </div>

          <button
            type="button"
            onClick={handleConfirmNext}
            className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold text-xs md:text-sm flex items-center justify-center gap-1.5 shadow-md active:scale-98 transition-all font-sans"
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
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 flex items-center gap-1 font-sans">
                <AlertCircle className="w-3 h-3 text-amber-500" />
                {dilemma.contextTag}
              </span>
              <span className="text-[10px] font-sans text-slate-500 dark:text-slate-400 font-bold">
                SEMANA {dilemma.week}
              </span>
            </div>

            {/* Character & Dialogue */}
            <div className="flex items-start gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-2xl shrink-0 shadow-sm">
                {dilemma.characterAvatar}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white leading-none font-sans">
                    {dilemma.characterName}
                  </h3>
                  <span className="text-[9px] text-slate-500 dark:text-slate-400 font-sans">
                    {dilemma.characterRole}
                  </span>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 font-sans leading-snug mt-1">
                  “{dilemma.dialogue}”
                </div>
              </div>
            </div>

            <div className="text-[10px] font-bold uppercase text-slate-600 dark:text-slate-400 tracking-wider font-sans">
              ¿Cuál es tu reacción como candidato a la Alcaldía de Lima?
            </div>
          </div>

          {/* 2 Choices */}
          <div className="grid grid-cols-1 gap-2.5 flex-1 min-h-0">
            {dilemma.choices.map((choice, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleChoiceClick(choice)}
                className="group text-left p-3 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all duration-150 flex flex-col justify-between shadow-sm active:scale-99 font-sans cursor-pointer"
              >
                <div className="flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-md bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 group-hover:bg-slate-900 group-hover:text-white dark:group-hover:bg-blue-600 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center justify-center shrink-0 transition-colors font-sans">
                    {index === 0 ? 'A' : 'B'}
                  </span>
                  <div className="text-xs md:text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 leading-snug transition-colors font-sans">
                    {choice.text}
                  </div>
                </div>

                <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-800/60 w-full flex items-center justify-between">
                  <span className="text-[10px] font-medium text-slate-500 font-sans">Efecto estimado:</span>
                  {renderDeltaBadges(choice.deltas)}
                </div>
              </button>
            ))}
          </div>

        </div>
      )}

    </div>
  );
};

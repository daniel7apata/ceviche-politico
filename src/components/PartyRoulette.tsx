import React, { useState, useEffect, useRef } from 'react';
import { PartyId } from '../types';
import { PARTIES, PES_LICENSE_DISCLAIMER } from '../data/gameData';
import { Sparkles, Dices, RotateCcw, CheckCircle2, AlertTriangle, Info, Zap } from 'lucide-react';

interface PartyRouletteProps {
  selectedPartyId: PartyId;
  onSelectParty: (partyId: PartyId) => void;
}

// Sound effects generator using Web Audio API (Zero external mp3 files needed)
class SoundEffects {
  private ctx: AudioContext | null = null;

  private getContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Snappy casino slot tick
  playTick() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(400 + Math.random() * 150, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {
      // Audio might be blocked by browser policy until user interacts
    }
  }

  // Troll recoil sound (spring / comical wobble)
  playRecoil() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(520, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.35);
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.36);
    } catch {
      // Audio error ignored
    }
  }

  // Fanfare / Success bell
  playSuccess() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      [440, 554, 659, 880].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08);
        gain.gain.setValueAtTime(0.12, ctx.currentTime + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.08 + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.08);
        osc.stop(ctx.currentTime + i * 0.08 + 0.36);
      });
    } catch {
      // Audio error ignored
    }
  }
}

const sfx = new SoundEffects();

export const PartyRoulette: React.FC<PartyRouletteProps> = ({
  selectedPartyId,
  onSelectParty
}) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [fakePartyIndex, setFakePartyIndex] = useState<number | null>(null);
  const [isRecoiling, setIsRecoiling] = useState(false);
  const [recoilMessage, setRecoilMessage] = useState<string | null>(null);
  const [highlightIndex, setHighlightIndex] = useState(() => {
    const idx = PARTIES.findIndex(p => p.id === selectedPartyId);
    return idx >= 0 ? idx : 0;
  });

  const reelRef = useRef<HTMLDivElement>(null);

  const currentSelected = PARTIES.find(p => p.id === selectedPartyId) || PARTIES[0];

  const handleSpinRoulette = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setFakePartyIndex(null);
    setIsRecoiling(false);
    setRecoilMessage(null);

    // Pick final target randomly
    const totalParties = PARTIES.length;
    const finalTargetIndex = Math.floor(Math.random() * totalParties);

    // Calculate a "fake near-miss" target (1 or 2 slots away)
    // The ludópata suspense: it looks like you won this one, but then recoils!
    const fakeOffset = Math.random() > 0.5 ? 1 : -1;
    const fakeIndex = (finalTargetIndex + fakeOffset + totalParties) % totalParties;

    let currentIndex = highlightIndex;
    let speed = 40; // fast tick ms
    let elapsed = 0;
    const fastSpinDuration = 2000; // 2 seconds of high speed
    const totalFakeStopDuration = 3600; // time until it fake-lands

    const spinInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % totalParties;
      setHighlightIndex(currentIndex);
      sfx.playTick();
      elapsed += speed;

      // Slow down gradually after fast spin
      if (elapsed > fastSpinDuration) {
        speed += 28;
      }

      // Time to fake-stop!
      if (elapsed >= totalFakeStopDuration && currentIndex === fakeIndex) {
        clearInterval(spinInterval);
        setFakePartyIndex(fakeIndex);
        setRecoilMessage(`¡TE TOCÓ: ${PARTIES[fakeIndex].name.toUpperCase()}! ... ¡ESPERA!`);

        // The Ludópata Recoil Fake-Out after 700ms of suspense!
        setTimeout(() => {
          setIsRecoiling(true);
          sfx.playRecoil();
          setRecoilMessage('⚠️ ¡TACHA DE ÚLTIMO MINUTO EN EL JNE! ¡LA RULETA RETROCEDE!');

          setTimeout(() => {
            // Animate backward/forward slip to true final target
            setHighlightIndex(finalTargetIndex);
            onSelectParty(PARTIES[finalTargetIndex].id);
            setIsRecoiling(false);
            setIsSpinning(false);
            sfx.playSuccess();
            setRecoilMessage(`🎉 ¡OFICIAL! Inscrito en: ${PARTIES[finalTargetIndex].name} (${PARTIES[finalTargetIndex].symbol})`);
          }, 700);
        }, 850);
      }
    }, speed);
  };

  return (
    <div className="rounded-3xl border border-amber-300 dark:border-amber-500/40 bg-gradient-to-b from-amber-500/10 via-slate-50 to-slate-100 dark:from-amber-950/30 dark:via-slate-900/90 dark:to-slate-950 p-4 md:p-6 shadow-xl relative overflow-hidden">
      
      {/* Casino Chaser Lights Header */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-amber-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-2xl bg-amber-400 dark:bg-amber-500 text-slate-950 flex items-center justify-center font-black shadow-md">
            <Dices className={`w-5 h-5 ${isSpinning ? 'animate-spin' : ''}`} />
          </div>
          <div>
            <div className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500 animate-pulse" />
              TÓMBOLA DE LA DEMOCRACIA PERUANA (RULETA GACHA)
            </div>
            <h3 className="text-base md:text-lg font-black text-slate-900 dark:text-white">
              Sorteo de Vientre de Alquiler Electoral
            </h3>
          </div>
        </div>

        <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 hidden sm:inline">
          9 Partidos Políticos en Contienda
        </span>
      </div>

      {/* Ludópata Slot / Roulette Display */}
      <div className="relative my-3">
        {/* Needle / Pointer at Top Center */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none">
          <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[14px] border-t-red-600 dark:border-t-amber-400 drop-shadow-md animate-bounce" />
        </div>

        {/* Carousel Reel Window */}
        <div 
          ref={reelRef}
          className={`rounded-2xl p-4 transition-all duration-300 border-2 relative overflow-hidden ${
            isRecoiling 
              ? 'animate-alarako-shake bg-red-100 dark:bg-red-950/60 border-red-500'
              : isSpinning
                ? 'bg-amber-100/50 dark:bg-amber-950/40 border-amber-400 shadow-inner'
                : 'bg-white dark:bg-slate-900 border-amber-300 dark:border-slate-700 shadow-lg'
          }`}
        >
          {/* Active Highlighted Party inside Reel */}
          {(() => {
            const activeParty = PARTIES[highlightIndex];
            return (
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                
                {/* Symbol & Emoji */}
                <div className="flex items-center gap-3.5">
                  <div 
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg border-2 transition-transform duration-150 ${
                      isSpinning ? 'scale-95' : 'scale-105'
                    }`}
                    style={{ 
                      backgroundColor: `${activeParty.color}20`,
                      borderColor: activeParty.color
                    }}
                  >
                    {activeParty.symbolEmoji}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span 
                        className="text-xs font-black px-2.5 py-0.5 rounded-full uppercase"
                        style={{ backgroundColor: `${activeParty.color}25`, color: activeParty.color }}
                      >
                        {activeParty.symbol}
                      </span>
                    </div>

                    <h4 
                      className="text-xl md:text-2xl font-black transition-colors"
                      style={{ color: activeParty.color }}
                    >
                      {activeParty.name}
                    </h4>

                    <p className="text-xs md:text-sm font-semibold italic text-slate-600 dark:text-slate-300">
                      "{activeParty.slogan}"
                    </p>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="text-center md:text-right shrink-0">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    ESTADO DE LA INSCRIPCIÓN
                  </div>
                  <div className={`text-xs font-extrabold px-3 py-1 rounded-xl inline-flex items-center gap-1.5 ${
                    isRecoiling
                      ? 'bg-red-600 text-white animate-pulse'
                      : isSpinning
                        ? 'bg-amber-400 text-slate-950 animate-pulse'
                        : 'bg-emerald-600 text-white'
                  }`}>
                    {isRecoiling ? (
                      <>
                        <AlertTriangle className="w-3.5 h-3.5" /> ¡TACHA EN CURSO!
                      </>
                    ) : isSpinning ? (
                      <>
                        <Zap className="w-3.5 h-3.5 animate-spin" /> GIRANDO RULETA...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" /> PARTIDO ASIGNADO
                      </>
                    )}
                  </div>
                </div>

              </div>
            );
          })()}

          {/* Recoil / Ludópata Drama Message Bar */}
          {recoilMessage && (
            <div className={`mt-3 pt-2.5 border-t text-center text-xs font-black tracking-wide ${
              isRecoiling 
                ? 'text-red-600 dark:text-red-400 animate-alarako-shake' 
                : 'text-amber-700 dark:text-amber-300'
            }`}>
              {recoilMessage}
            </div>
          )}
        </div>
      </div>

      {/* Roulette Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mt-4">
        <button
          type="button"
          disabled={isSpinning}
          onClick={handleSpinRoulette}
          className={`w-full sm:flex-1 py-3 px-5 rounded-2xl font-black text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg ${
            isSpinning
              ? 'bg-slate-300 dark:bg-slate-800 text-slate-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 hover:scale-[1.02] active:scale-[0.98] ring-2 ring-amber-400/50 cursor-pointer'
          }`}
        >
          <Dices className={`w-5 h-5 ${isSpinning ? 'animate-spin' : ''}`} />
          <span>{isSpinning ? 'GIRANDO LA TÓMBOLA...' : '¡GIRAR RULETA ELECTORAL! 🎰'}</span>
        </button>

        <button
          type="button"
          disabled={isSpinning}
          onClick={handleSpinRoulette}
          className="w-full sm:w-auto py-3 px-4 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
          title="Girar de nuevo"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Probar Otra Suerte</span>
        </button>
      </div>

      {/* Manual Selection Fallback Grid (Click to choose directly if user prefers) */}
      <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800">
        <div className="text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-2 flex items-center justify-between">
          <span>O selecciona manualmente tu vientre de alquiler:</span>
          <span className="text-[10px] text-slate-400">Clic para cambiar de inmediato</span>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-1.5">
          {PARTIES.map((party, idx) => {
            const isSelected = party.id === selectedPartyId;
            return (
              <button
                type="button"
                key={party.id}
                disabled={isSpinning}
                onClick={() => {
                  setHighlightIndex(idx);
                  onSelectParty(party.id);
                  sfx.playTick();
                }}
                style={{ borderColor: isSelected ? party.color : undefined }}
                className={`p-2 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                  isSelected
                    ? 'bg-white dark:bg-slate-800 ring-2 shadow-sm font-black'
                    : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-400'
                }`}
              >
                <span className="text-xl">{party.symbolEmoji}</span>
                <span 
                  className="text-[9px] font-bold uppercase truncate max-w-full"
                  style={{ color: party.color }}
                >
                  {party.symbol}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Satirical PES disclaimer */}
      <div className="mt-3 text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed italic">
        * {PES_LICENSE_DISCLAIMER}
      </div>

    </div>
  );
};


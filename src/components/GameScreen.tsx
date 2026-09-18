import React, { useState, useEffect } from 'react';
import { 
  Candidate, 
  CampaignStats, 
  Dilemma, 
  DilemmaChoice, 
  GameEnding,
  RivalCandidate,
  Scene3DType,
  ProfileComodin
} from '../types';
import { 
  CAMPAIGN_DILEMMAS, 
  GAME_ENDINGS, 
  MALE_PROFILES, 
  FEMALE_PROFILES, 
  CAMPAIGN_PROMISES,
  PARTIES,
  RIVAL_CANDIDATES,
  PROFILE_COMODINES
} from '../data/gameData';
import { ThreeEventViewer } from './ThreeEventViewer';
import { DilemmaCard } from './DilemmaCard';
import { CampaignCenter } from './CampaignCenter';
import { WeeklyPollModal } from './WeeklyPollModal';
import { 
  Users, 
  Coins, 
  Scale, 
  Sparkles, 
  AlertTriangle,
  Radio,
  Vote,
  Tv,
  CheckCircle2,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';

interface GameScreenProps {
  candidate: Candidate;
  theme?: 'light' | 'dark';
  onGameOver: (finalStats: CampaignStats, ending: GameEnding, week: number) => void;
}

const TOTAL_DECISIONS = CAMPAIGN_DILEMMAS.length; // 15 dilemmas total
const MAX_WEEKS = 5;

export const GameScreen: React.FC<GameScreenProps> = ({ 
  candidate, 
  theme = 'dark',
  onGameOver 
}) => {
  const party = PARTIES.find(p => p.id === candidate.partyId) || PARTIES[0];
  const allProfiles = [...MALE_PROFILES, ...FEMALE_PROFILES];
  const profile = allProfiles.find(p => p.id === candidate.profileId) || allProfiles[0];

  // Starting Campaign Stats
  const [stats, setStats] = useState<CampaignStats>(() => {
    const base: CampaignStats = {
      polling: 14.5,
      campaignFunds: 4.5,
      jneTachaRisk: 10,
      popularSympathy: 50,
      mediaCredibility: 50
    };

    if (profile?.statBonus) {
      if (profile.statBonus.polling) base.polling += profile.statBonus.polling;
      if (profile.statBonus.campaignFunds) base.campaignFunds += profile.statBonus.campaignFunds;
      if (profile.statBonus.jneTachaRisk) base.jneTachaRisk = Math.max(0, base.jneTachaRisk + profile.statBonus.jneTachaRisk);
      if (profile.statBonus.popularSympathy) base.popularSympathy += profile.statBonus.popularSympathy;
      if (profile.statBonus.mediaCredibility) base.mediaCredibility += profile.statBonus.mediaCredibility;
    }

    const promise = CAMPAIGN_PROMISES.find(pr => pr.id === candidate.promiseId);
    if (promise?.initialBonus) {
      const b = promise.initialBonus;
      if (b.stat === 'polling') base.polling += b.amount;
      if (b.stat === 'campaignFunds') base.campaignFunds += b.amount;
      if (b.stat === 'jneTachaRisk') base.jneTachaRisk += b.amount;
      if (b.stat === 'popularSympathy') base.popularSympathy += b.amount;
      if (b.stat === 'mediaCredibility') base.mediaCredibility += b.amount;
    }

    return base;
  });

  const [decisionIndex, setDecisionIndex] = useState<number>(0);
  const [rivals, setRivals] = useState<RivalCandidate[]>(RIVAL_CANDIDATES);
  const [weekStartPolling, setWeekStartPolling] = useState<number>(stats.polling);
  const [showPollModal, setShowPollModal] = useState<boolean>(false);
  const [pollModalWeek, setPollModalWeek] = useState<number>(1);
  const [weeklyPollingDelta, setWeeklyPollingDelta] = useState<number>(0);
  const [comodinUses, setComodinUses] = useState<Record<string, number>>({});

  const profileComodines = PROFILE_COMODINES[candidate.profileId] || PROFILE_COMODINES.bajado_de_pepa;

  const [lastHeadline, setLastHeadline] = useState<string>(
    'CAMPAÑA ELECTORAL MUNICIPAL LIMA 2026: CANDIDATOS SALEN A LA CAZA DEL VOTO POPULAR EN LAS 5 SEMANAS PREVIAS AL SUFRAGIO'
  );

  // Passive Campaign Momentum: increases stats very slowly over time (+0.02% polling, +0.05 sympathy every 5s)
  useEffect(() => {
    const timer = setInterval(() => {
      setStats(prev => ({
        ...prev,
        polling: parseFloat(Math.min(65, prev.polling + 0.02).toFixed(2)),
        popularSympathy: Math.min(100, parseFloat((prev.popularSympathy + 0.05).toFixed(2)))
      }));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Current Dilemma
  const currentDilemma: Dilemma = CAMPAIGN_DILEMMAS[Math.min(decisionIndex, TOTAL_DECISIONS - 1)];
  const currentWeek = Math.min(MAX_WEEKS, Math.floor(decisionIndex / 3) + 1);

  // Title for 3D Scene Viewer
  const getSceneTitle = (scene: Scene3DType): string => {
    switch (scene) {
      case 'debate':
        return 'SET TELEVISIÓN // GRAN DEBATE ELECTORAL EN VIVO';
      case 'pan_chicharron':
        return 'MERCADO DE ABASTOS // DEGUSTACIÓN POPULAR DE CHICHARRÓN';
      case 'batalla_aura':
        return 'PARQUE KENNEDY // BATALLA DE AURA ENTRE CANDIDATOS';
      case 'entrevista_tv':
        return 'ESTUDIO DE TELEVISIÓN // ENTREVISTA POLÍTICA HOSTIL';
      case 'caldo_gallina':
        return 'CARRETILLA NOCTURNA // CALDO DE GALLINA REPARADOR CON VECINOS';
      case 'conferencia_prensa':
        return 'SALA DE CONFERENCIAS // FLASHES DE PRENSA Y PERIODISTAS INCÓMODOS';
      case 'mitin_banderas':
        return 'AVENIDA DE LA PERUANIDAD // MITIN CON BANDERAS ROJIBLANCAS';
      case 'mitin_calle':
      default:
        return 'PLAZA CENTRAL // MITIN MASIVO DE CIERRE DE CAMPAÑA';
    }
  };

  // Evaluate premature or final election conditions
  const evaluateEndConditions = (newStats: CampaignStats, nextIndex: number, currentRivals: RivalCandidate[]) => {
    // 1. Inhabilitación por el JNE
    if (newStats.jneTachaRisk >= 100) {
      onGameOver(newStats, GAME_ENDINGS.TACHADO_JNE, currentWeek);
      return true;
    }

    // 2. Quiebra de Campaña
    if (newStats.campaignFunds <= 0) {
      onGameOver(newStats, GAME_ENDINGS.QUIEBRA_CAMPANA, currentWeek);
      return true;
    }

    // 3. Cancelación / Escándalo viral insostenible
    if (newStats.popularSympathy <= 5) {
      onGameOver(newStats, GAME_ENDINGS.ESCANDALO_VIRAL, currentWeek);
      return true;
    }

    // 4. Final of Week 5 (Decision 15 finished)
    if (nextIndex >= TOTAL_DECISIONS) {
      const topRivalPoll = Math.max(...currentRivals.map(r => r.polling));
      if (newStats.polling > topRivalPoll) {
        onGameOver(newStats, GAME_ENDINGS.GANADOR_ALCALDIA, MAX_WEEKS);
      } else if (newStats.polling >= topRivalPoll - 2.5) {
        onGameOver(newStats, GAME_ENDINGS.SEGUNDO_LUGAR, MAX_WEEKS);
      } else {
        onGameOver(newStats, GAME_ENDINGS.DERROTA_HUMILLANTE, MAX_WEEKS);
      }
      return true;
    }

    return false;
  };

  // Simulate slight rival polling shifts
  const updateRivalsPolling = (playerDelta: number) => {
    setRivals(prev => {
      return prev.map(r => {
        // As player gains, rivals lose some share proportionately
        const fluctuation = (Math.random() - 0.5) * 0.8 - (playerDelta * 0.25);
        const newPoll = parseFloat(Math.max(3.0, Math.min(38.0, r.polling + fluctuation)).toFixed(1));
        return { ...r, polling: newPoll };
      });
    });
  };

  const handleSelectChoice = (choice: DilemmaChoice) => {
    const pDelta = choice.deltas.polling || 0;
    const fDelta = choice.deltas.campaignFunds || 0;
    const jDelta = choice.deltas.jneTachaRisk || 0;
    const sDelta = choice.deltas.popularSympathy || 0;
    const mDelta = choice.deltas.mediaCredibility || 0;

    const updatedStats: CampaignStats = {
      polling: parseFloat(Math.max(1, Math.min(65, stats.polling + pDelta)).toFixed(1)),
      campaignFunds: parseFloat(Math.max(0, stats.campaignFunds + fDelta).toFixed(1)),
      jneTachaRisk: Math.max(0, Math.min(100, stats.jneTachaRisk + jDelta)),
      popularSympathy: Math.max(0, Math.min(100, stats.popularSympathy + sDelta)),
      mediaCredibility: Math.max(0, Math.min(100, stats.mediaCredibility + mDelta)),
    };

    setStats(updatedStats);
    setLastHeadline(choice.headlineNews);
    updateRivalsPolling(pDelta);

    const nextIndex = decisionIndex + 1;
    const isGameOver = evaluateEndConditions(updatedStats, nextIndex, rivals);

    if (!isGameOver) {
      // Check if end of a week (after decision 3, 6, 9, 12)
      if (nextIndex % 3 === 0 && nextIndex < TOTAL_DECISIONS) {
        const completedWeek = nextIndex / 3;
        const deltaThisWeek = parseFloat((updatedStats.polling - weekStartPolling).toFixed(1));
        setWeeklyPollingDelta(deltaThisWeek);
        setPollModalWeek(completedWeek);
        setShowPollModal(true);
      } else {
        setDecisionIndex(nextIndex);
      }
    }
  };

  const handleContinueAfterWeeklyPoll = () => {
    setShowPollModal(false);
    setWeekStartPolling(stats.polling);
    setDecisionIndex(prev => prev + 1);
  };

  // Strategic Comodines Trigger Handler
  const handleTriggerComodin = (comodin: ProfileComodin) => {
    const currentUses = comodinUses[comodin.id] || 0;
    if (currentUses >= comodin.maxUses) return;
    if (stats.campaignFunds < comodin.costFunds) return;

    const pDelta = comodin.deltas.polling || 0;
    const fDelta = (comodin.deltas.campaignFunds || 0) - comodin.costFunds;
    const jDelta = comodin.deltas.jneTachaRisk || 0;
    const sDelta = comodin.deltas.popularSympathy || 0;
    const mDelta = comodin.deltas.mediaCredibility || 0;

    const updated: CampaignStats = {
      polling: parseFloat(Math.max(1, Math.min(65, stats.polling + pDelta)).toFixed(1)),
      campaignFunds: parseFloat(Math.max(0, stats.campaignFunds + fDelta).toFixed(1)),
      jneTachaRisk: Math.max(0, Math.min(100, stats.jneTachaRisk + jDelta)),
      popularSympathy: Math.max(0, Math.min(100, stats.popularSympathy + sDelta)),
      mediaCredibility: Math.max(0, Math.min(100, stats.mediaCredibility + mDelta)),
    };

    setStats(updated);
    setComodinUses(prev => ({ ...prev, [comodin.id]: currentUses + 1 }));
    updateRivalsPolling(pDelta);
    setLastHeadline(comodin.headlineNews);
  };

  return (
    <div className="w-full min-h-[calc(100vh-64px)] lg:h-[calc(100vh-64px)] p-2 md:p-3 flex flex-col justify-between lg:overflow-hidden overflow-y-auto bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-blue-600 selection:text-white font-sans">
      
      {/* 3-Column Campaign Center Dashboard (Responsive: Stacks on mobile, zero-scroll on desktop) */}
      <div className="flex-1 grid grid-cols-12 gap-2.5 min-h-0 lg:overflow-hidden">
        
        {/* =========================================================================
            COLUMNA IZQUIERDA (3 COLS): TELEMETRÍA DEL CANDIDATO, ESTADÍSTICAS & SEMANA
           ========================================================================= */}
        <div className="col-span-12 lg:col-span-3 lg:h-full flex flex-col justify-between bg-white dark:bg-slate-900 rounded-2xl p-3 border border-slate-200 dark:border-slate-800 lg:overflow-y-auto space-y-2.5 shadow-sm dark:shadow-xl">
          
          <div className="space-y-2.5">
            {/* Candidate ID Card */}
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 relative overflow-hidden">
              <div className="flex items-center gap-2.5">
                <div className="w-11 h-11 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-2xl shrink-0 shadow-sm">
                  {profile.avatarEmoji}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-slate-900 dark:text-white truncate">{candidate.name}</span>
                    <span 
                      className="text-[9px] font-bold px-1.5 py-0.5 rounded uppercase shrink-0"
                      style={{ backgroundColor: `${party.color}20`, color: party.color, border: `1px solid ${party.color}40` }}
                    >
                      {party.symbol}
                    </span>
                  </div>
                  <div className="text-[10px] text-blue-600 dark:text-blue-400 font-medium truncate">
                    {profile.name.toUpperCase()} • {candidate.age} AÑOS
                  </div>
                </div>
              </div>

              {/* Campaign Progression Counter */}
              <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[10px]">
                <span className="text-slate-500 dark:text-slate-400">FASE ELECTORAL:</span>
                <span className="text-blue-600 dark:text-blue-400 font-bold">
                  SEMANA {currentWeek} DE {MAX_WEEKS} (EVENTO {decisionIndex + 1}/{TOTAL_DECISIONS})
                </span>
              </div>
            </div>

            {/* Campaign Telemetry Gauges */}
            <div className="space-y-1.5">
              <div className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <Radio className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                  TELEMETRÍA ELECTORAL
                </span>
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-[9px] font-medium animate-pulse" title="Efecto pasivo: el candidato gana apoyo y simpatía lentamente">
                  <TrendingUp className="w-2.5 h-2.5" /> Pasivo: +0.02%/5s
                </span>
              </div>

              {/* 1. Intención de Voto (Principal) */}
              <div className="bg-slate-50 dark:bg-slate-950/90 p-2 rounded-xl border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="text-slate-700 dark:text-slate-200 font-semibold flex items-center gap-1">
                    <Vote className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" /> Intención de Voto
                  </span>
                  <span className={`font-bold text-sm ${
                    stats.polling >= 22 ? 'text-emerald-600 dark:text-emerald-400' :
                    stats.polling >= 14 ? 'text-blue-600 dark:text-blue-400' : 'text-slate-700 dark:text-slate-300'
                  }`}>
                    {stats.polling.toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-blue-600 dark:bg-blue-500 h-full transition-all duration-500 rounded-full shadow"
                    style={{ width: `${Math.min(100, stats.polling * 2.2)}%` }}
                  />
                </div>
              </div>

              {/* 2. Fondos de Campaña */}
              <div className="bg-slate-50 dark:bg-slate-950/80 p-2 rounded-xl border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="text-slate-700 dark:text-slate-300 font-medium flex items-center gap-1">
                    <Coins className="w-3 h-3 text-amber-500" /> Fondos Disponibles
                  </span>
                  <span className="font-bold text-amber-600 dark:text-amber-400">
                    S/. {stats.campaignFunds.toFixed(1)}M
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-amber-500 h-full transition-all duration-300 rounded-full"
                    style={{ width: `${Math.min(100, (stats.campaignFunds / 10) * 100)}%` }}
                  />
                </div>
              </div>

              {/* 3. Riesgo de Tacha del JNE */}
              <div className={`p-2 rounded-xl border transition-all ${
                stats.jneTachaRisk >= 70 ? 'bg-red-50 dark:bg-red-950/60 border-red-300 dark:border-red-600 animate-pulse' : 'bg-slate-50 dark:bg-slate-950/80 border-slate-200 dark:border-slate-800'
              }`}>
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="text-slate-700 dark:text-slate-300 font-medium flex items-center gap-1">
                    <Scale className="w-3 h-3 text-purple-600 dark:text-purple-400" /> Riesgo Tacha JNE
                  </span>
                  <span className={`font-bold ${stats.jneTachaRisk >= 65 ? 'text-red-600 dark:text-red-400' : 'text-purple-600 dark:text-purple-400'}`}>
                    {stats.jneTachaRisk}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 rounded-full ${stats.jneTachaRisk >= 65 ? 'bg-red-600' : 'bg-purple-600'}`}
                    style={{ width: `${stats.jneTachaRisk}%` }}
                  />
                </div>
                {stats.jneTachaRisk >= 70 && (
                  <div className="text-[9px] text-red-600 dark:text-red-400 font-bold mt-1 flex items-center gap-1">
                    <AlertTriangle className="w-2.5 h-2.5" /> ¡FISCALIZACIÓN JNE ACTIVA!
                  </div>
                )}
              </div>

              {/* 4. Cariño Popular / Voto en la Calle */}
              <div className="bg-slate-50 dark:bg-slate-950/80 p-2 rounded-xl border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="text-slate-700 dark:text-slate-300 font-medium flex items-center gap-1">
                    <Users className="w-3 h-3 text-orange-500" /> Cariño Popular
                  </span>
                  <span className="font-bold text-orange-600 dark:text-orange-400">
                    {stats.popularSympathy}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-orange-500 h-full transition-all duration-300 rounded-full"
                    style={{ width: `${stats.popularSympathy}%` }}
                  />
                </div>
              </div>

              {/* 5. Credibilidad en Medios y Debates */}
              <div className="bg-slate-50 dark:bg-slate-950/80 p-2 rounded-xl border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="text-slate-700 dark:text-slate-300 font-medium flex items-center gap-1">
                    <Tv className="w-3 h-3 text-sky-600 dark:text-sky-400" /> Prensa & Debates
                  </span>
                  <span className="font-bold text-sky-600 dark:text-sky-400">
                    {stats.mediaCredibility}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-sky-500 h-full transition-all duration-300 rounded-full"
                    style={{ width: `${stats.mediaCredibility}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Slogan & Party Callout */}
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-[10px] text-slate-600 dark:text-slate-400">
              <div className="font-bold text-slate-900 dark:text-white mb-0.5 flex items-center gap-1">
                <span>{party.symbolEmoji}</span> {party.name}
              </div>
              <div className="italic text-slate-600 dark:text-slate-300">"{party.slogan}"</div>
            </div>

            {/* Campaign Vital Status (Aprovecha el espacio vertical con elegancia) */}
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-[10px] space-y-1.5">
              <div className="font-bold uppercase text-slate-500 dark:text-slate-400 flex items-center justify-between">
                <span>ESTADO DEL COMANDO</span>
                <span className={`px-1.5 py-0.2 rounded font-bold ${
                  stats.jneTachaRisk >= 70 ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                }`}>
                  {stats.jneTachaRisk >= 70 ? '⚠️ EN LA MIRA' : '✓ HABILITADO'}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                <span>Estrategia activa:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {currentWeek <= 2 ? 'Conectar con los conos' : currentWeek <= 4 ? 'Debates y confrontación' : 'Asegurar boca de urna'}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                <span>Cariño en la calle:</span>
                <span className="font-bold text-orange-600 dark:text-orange-400">
                  {stats.popularSympathy >= 50 ? '🔥 Alto respaldo popular' : '❄️ Campaña fría'}
                </span>
              </div>
            </div>
          </div>

          <div className="text-[9px] text-slate-400 dark:text-slate-500 text-center pt-2 border-t border-slate-200 dark:border-slate-800">
            ELECCIONES MUNICIPALES LIMA 2026 // SISTEMA SIN SCROLL
          </div>

        </div>

        {/* =========================================================================
            COLUMNA CENTRO (5 COLS): CENTRO DE CAMPAÑA, BARRAS DE ENCUESTAS & ACCIONES
           ========================================================================= */}
        <div className="col-span-12 lg:col-span-5 lg:h-full flex flex-col min-h-0 lg:overflow-hidden">
          <CampaignCenter
            candidate={candidate}
            stats={stats}
            week={currentWeek}
            maxWeeks={MAX_WEEKS}
            rivals={rivals}
            profileComodines={profileComodines}
            comodinUses={comodinUses}
            onTriggerComodin={handleTriggerComodin}
            lastHeadline={lastHeadline}
          />
        </div>

        {/* =========================================================================
            COLUMNA DERECHA (4 COLS): 3D EVENT VIEWER (TOP) + DILEMMA DE DECISIÓN (BOTTOM)
           ========================================================================= */}
        <div className="col-span-12 lg:col-span-4 lg:h-full flex flex-col justify-between gap-2.5 lg:overflow-y-auto">
          
          {/* Top: Three.js 3D Dynamic Event Viewer (Debate, Pan con chicharrón, etc.) */}
          <div className="shrink-0">
            <ThreeEventViewer
              sceneType={currentDilemma.scene3D}
              title={getSceneTitle(currentDilemma.scene3D)}
              theme={theme}
            />
          </div>

          {/* Bottom: Active Dilemma / Proposal / Street Human Interaction */}
          <div className="flex-1 min-h-0">
            <DilemmaCard
              dilemma={currentDilemma}
              onSelectChoice={handleSelectChoice}
            />
          </div>

        </div>

      </div>

      {/* Bottom Flash Informativo Ticker */}
      <div className="h-8 shrink-0 mt-2 bg-red-600 dark:bg-red-950 text-white rounded-lg px-3 flex items-center overflow-hidden border border-red-500/50 shadow-md">
        <div className="px-2 py-0.5 bg-white text-red-700 dark:bg-red-600 dark:text-white font-black text-[10px] uppercase tracking-widest shrink-0 rounded mr-2.5 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-red-600 dark:bg-white animate-ping" />
          FLASH INFORMATIVO
        </div>
        <div className="overflow-hidden whitespace-nowrap w-full">
          <div className="animate-ticker text-xs font-semibold text-white tracking-wide">
            {lastHeadline} &nbsp; • &nbsp; IPSOS Y DATUM PREPARAN NUEVOS SONDEOS &nbsp; • &nbsp; REDES SOCIALES ARDEN CON MEMES DEL CANDIDATO &nbsp; • &nbsp; GRAN DEBATE ELECTORAL EN TELEVISIÓN &nbsp; • &nbsp;
          </div>
        </div>
      </div>

      {/* Weekly Official Polling Report Modal */}
      {showPollModal && (
        <WeeklyPollModal
          week={pollModalWeek}
          candidate={candidate}
          stats={stats}
          rivals={rivals}
          pollingDelta={weeklyPollingDelta}
          onContinue={handleContinueAfterWeeklyPoll}
        />
      )}

    </div>
  );
};

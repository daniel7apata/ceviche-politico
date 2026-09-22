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
import { CandidateTelemetryModal } from './CandidateTelemetryModal';

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
  const [showTelemetryModal, setShowTelemetryModal] = useState<boolean>(false);

  const profileComodines = PROFILE_COMODINES[candidate.profileId] || PROFILE_COMODINES.bajado_de_pepa;

  const [lastHeadline, setLastHeadline] = useState<string>(
    'CAMPAÑA ELECTORAL MUNICIPAL LIMA 2026: CANDIDATOS SALEN A LA CAZA DEL VOTO POPULAR EN LAS 5 SEMANAS PREVIAS AL SUFRAGIO'
  );

  // Passive Campaign Momentum & Operating Costs:
  // Every 8s:
  // - Headquarters and staff operational burn: -S/. 0.02M
  // - If popular sympathy is high (>= 60%), candidate gains slight momentum (+0.01% polling)
  // - If popular sympathy is cold (<= 35%), polling slightly erodes (-0.01%)
  // - If JNE risk is in danger zone (>= 65%), active judicial audit creeps risk up (+0.2%)
  useEffect(() => {
    const timer = setInterval(() => {
      setStats(prev => {
        const fundsBurn = Math.max(0, parseFloat((prev.campaignFunds - 0.02).toFixed(2)));
        let pollBonus = 0;
        if (prev.popularSympathy >= 60) pollBonus = 0.01;
        else if (prev.popularSympathy <= 35) pollBonus = -0.01;
        
        let jneCreep = 0;
        if (prev.jneTachaRisk >= 65) jneCreep = 0.2;

        return {
          ...prev,
          campaignFunds: fundsBurn,
          polling: parseFloat(Math.max(1, Math.min(65, prev.polling + pollBonus)).toFixed(2)),
          jneTachaRisk: Math.min(100, parseFloat((prev.jneTachaRisk + jneCreep).toFixed(1)))
        };
      });
    }, 8000);
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
    // 1. Inhabilitación por el JNE (A partir de 80%, el JEE Lima Centro resuelve exclusión definitiva)
    if (newStats.jneTachaRisk >= 80) {
      onGameOver(newStats, GAME_ENDINGS.TACHADO_JNE, currentWeek);
      return true;
    }

    // 2. Quiebra de Campaña (Sin fondos para locales ni logística)
    if (newStats.campaignFunds <= 0) {
      onGameOver(newStats, GAME_ENDINGS.QUIEBRA_CAMPANA, currentWeek);
      return true;
    }

    // 3. Cancelación / Escándalo viral insostenible (El pueblo te repudia)
    if (newStats.popularSympathy <= 10) {
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

  // Intelligent Rival Machinery (Frontrunners actively campaign, surge and attack)
  const updateRivalsPolling = (playerDelta: number, currentStats: CampaignStats) => {
    setRivals(prev => {
      const sorted = [...prev].sort((a, b) => b.polling - a.polling);
      const topRivalId = sorted[0]?.id;

      return prev.map(r => {
        const isTopRival = r.id === topRivalId;
        const isPlayerLeading = currentStats.polling > r.polling;
        
        // Frontrunner campaigns have deep corporate backing and party machinery
        let rivalMachineryGrowth = 0;
        if (r.id === 'rival_porky') {
          // El Magnate Porcino pushes aggressively with advertising
          rivalMachineryGrowth = 0.25 + Math.random() * 0.4;
        } else if (r.id === 'rival_allison') {
          // El Gran Cabezón consolidates middle class & conos
          rivalMachineryGrowth = 0.2 + Math.random() * 0.35;
        } else {
          rivalMachineryGrowth = 0.05 + Math.random() * 0.2;
        }

        // If player is #1, rivals unleash attack ads against the frontrunner
        let antiPunteroPressure = 0;
        if (isPlayerLeading && isTopRival) {
          antiPunteroPressure = currentStats.mediaCredibility < 50 ? 0.35 : 0.15;
        }

        // Net change for rival
        const netRivalDelta = rivalMachineryGrowth + antiPunteroPressure - (playerDelta > 0 ? playerDelta * 0.15 : -playerDelta * 0.2);
        const newPoll = parseFloat(Math.max(4.0, Math.min(36.0, r.polling + netRivalDelta)).toFixed(1));
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
    updateRivalsPolling(pDelta, updatedStats);

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
    updateRivalsPolling(pDelta, updated);
    setLastHeadline(comodin.headlineNews);
    evaluateEndConditions(updated, decisionIndex, rivals);
  };

  return (
    <div className="w-full min-h-[calc(100vh-64px)] lg:h-[calc(100vh-64px)] p-2 md:p-3 flex flex-col justify-between lg:overflow-hidden overflow-y-auto bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-blue-600 selection:text-white font-sans">
      
      {/* 2-Column Campaign Center Dashboard (Simulator has expanded width, Zero-scroll responsive) */}
      <div className="flex-1 grid grid-cols-12 gap-3 min-h-0 lg:overflow-hidden">
        
        {/* =========================================================================
            COLUMNA SIMULADOR & COMANDO (7 COLS): AMPLIO ESPACIO HORIZONTAL
           ========================================================================= */}
        <div className="col-span-12 lg:col-span-7 xl:col-span-7 lg:h-full flex flex-col min-h-0 lg:overflow-hidden">
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
            onOpenTelemetry={() => setShowTelemetryModal(true)}
          />
        </div>

        {/* =========================================================================
            COLUMNA DERECHA (5 COLS): 3D EVENT VIEWER (TOP) + DILEMMA DE DECISIÓN (BOTTOM)
           ========================================================================= */}
        <div className="col-span-12 lg:col-span-5 xl:col-span-5 lg:h-full flex flex-col justify-between gap-2.5 lg:overflow-y-auto">
          
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

      {/* Candidate Telemetry & Stats Modal */}
      {showTelemetryModal && (
        <CandidateTelemetryModal
          candidate={candidate}
          stats={stats}
          currentWeek={currentWeek}
          maxWeeks={MAX_WEEKS}
          decisionIndex={decisionIndex}
          totalDecisions={TOTAL_DECISIONS}
          onClose={() => setShowTelemetryModal(false)}
        />
      )}

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

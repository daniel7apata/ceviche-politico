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
  getRivalsForCandidate,
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
  onGameOver: (finalStats: CampaignStats, ending: GameEnding, week: number, finalRank?: number) => void;
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
      polling: 8.2,
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
  const [rivals, setRivals] = useState<RivalCandidate[]>(() => 
    getRivalsForCandidate(candidate.partyId)
  );
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
  const [headlineHistory, setHeadlineHistory] = useState<string[]>([
    'CAMPAÑA ELECTORAL MUNICIPAL LIMA 2026: CANDIDATOS SALEN A LA CAZA DEL VOTO POPULAR EN LAS 5 SEMANAS PREVIAS AL SUFRAGIO',
    'ENCUESTADORAS MIDEN INTENCIÓN DE VOTO EN TIEMPO REAL',
    'JNE MONITOREA EXPEDIENTES DE CANDIDATOS EN LIMA METROPOLITANA'
  ]);
  const [tickerFlash, setTickerFlash] = useState<boolean>(false);

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

  // Randomized dilemma sequence for unique, unpredictable campaigns on each run
  const [dilemmas] = useState<Dilemma[]>(() => {
    // 14 campaign dilemmas shuffled randomly, keeping the final Sunday Boca de Urna at event 15
    const campaignPool = CAMPAIGN_DILEMMAS.filter(d => d.id !== 'sem5_boca_de_urna_domingo');
    const finalEvent = CAMPAIGN_DILEMMAS.find(d => d.id === 'sem5_boca_de_urna_domingo');

    // Fisher-Yates shuffle
    const shuffled = [...campaignPool];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return finalEvent ? [...shuffled, finalEvent] : shuffled;
  });

  // All candidates sorted for real-time ranking and adjacent rival lookup
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
  const adjacentCandidate = playerRank > 1 
    ? allCandidates[playerRank - 2] 
    : (allCandidates[playerRank] || rivals[0]);

  // Current Dilemma with dynamic rival substitution and week context adaptation
  const rawDilemma: Dilemma = dilemmas[Math.min(decisionIndex, dilemmas.length - 1)];
  const currentWeek = Math.min(MAX_WEEKS, Math.floor(decisionIndex / 3) + 1);

  // Dynamic context tag to match the active campaign week
  const topicTag = rawDilemma.contextTag.replace(/^Semana \d+\s*•\s*/i, '');
  const dynamicContextTag = rawDilemma.id === 'sem5_boca_de_urna_domingo'
    ? 'Semana 5 • FLASH ELECTORAL BOCA DE URNA'
    : `Semana ${currentWeek} • ${topicTag}`;

  const currentDilemma: Dilemma = {
    ...rawDilemma,
    characterName: rawDilemma.characterName.includes('El Celeste')
      ? adjacentCandidate.name
      : rawDilemma.characterName,
    characterRole: rawDilemma.characterName.includes('El Celeste')
      ? `Candidato Rival (${adjacentCandidate.partyShort})`
      : rawDilemma.characterRole,
    dialogue: rawDilemma.dialogue.replace(/Rival "El Celeste"|Rival El Celeste/gi, adjacentCandidate.name),
    contextTag: dynamicContextTag
  };

  // Title for 3D Scene Viewer
  const getSceneTitle = (scene: Scene3DType): string => {
    switch (scene) {
      case 'fiscalizacion_jne':
        return 'SEDE CENTRAL JNE // AUDIENCIA DE FISCALIZACIÓN Y REVISIÓN DE TACHA';
      case 'centro_campana':
        return 'CENTRO DE CAMPAÑA // COMITÉ DE CRISIS Y PRENSA';
      case 'chifa_trucho':
        return 'REUNIÓN CLANDESTINA EN CHIFA TRUCHO // MALETÍN DE FONDOS OSCUROS';
      case 'flash_electoral':
        return 'SET TELEVISIÓN // FLASH ELECTORAL A BOCA DE URNA';
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
      case 'pichanga_futbol':
        return 'LOSA DEPORTIVA VES // PICHANGA INTERBARRIOS Y TRIBUNA POPULAR';
      case 'cuartel_estrategia':
        return 'CUARTEL GENERAL // ESTRATEGIA A PUERTA CERRADA EN VEDA ELECTORAL';
      case 'mitin_calle':
      default:
        return 'PLAZA CENTRAL // MITIN MASIVO DE CIERRE DE CAMPAÑA';
    }
  };

  const calculatePlayerRank = (playerPoll: number, currentRivals: RivalCandidate[]) => {
    const sorted = [playerPoll, ...currentRivals.map(r => r.polling)].sort((a, b) => b - a);
    return sorted.indexOf(playerPoll) + 1;
  };

  // Intelligent Rival Machinery calculation
  const calculateUpdatedRivals = (playerDelta: number, currentStats: CampaignStats, currentRivalsList: RivalCandidate[]): RivalCandidate[] => {
    const sorted = [...currentRivalsList].sort((a, b) => b.polling - a.polling);
    const topRivalId = sorted[0]?.id;

    return currentRivalsList.map(r => {
      const isTopRival = r.id === topRivalId;
      const isPlayerLeading = currentStats.polling > r.polling;
      
      let rivalMachineryGrowth = 0;
      if (isTopRival) {
        rivalMachineryGrowth = 0.25 + Math.random() * 0.4;
      } else if (r.id === 'rival_porky' || r.id === 'rival_allison' || r.id === 'rival_keiko') {
        rivalMachineryGrowth = 0.2 + Math.random() * 0.35;
      } else {
        rivalMachineryGrowth = 0.05 + Math.random() * 0.2;
      }

      let antiPunteroPressure = 0;
      if (isPlayerLeading && isTopRival) {
        antiPunteroPressure = currentStats.mediaCredibility < 50 ? 0.35 : 0.15;
      }

      const netRivalDelta = rivalMachineryGrowth + antiPunteroPressure - (playerDelta > 0 ? playerDelta * 0.15 : -playerDelta * 0.2);
      const newPoll = parseFloat(Math.max(4.0, Math.min(36.0, r.polling + netRivalDelta)).toFixed(1));
      return { ...r, polling: newPoll };
    });
  };

  // Evaluate premature or final election conditions
  const evaluateEndConditions = (newStats: CampaignStats, nextIndex: number, currentRivals: RivalCandidate[]) => {
    const currentRank = calculatePlayerRank(newStats.polling, currentRivals);

    // 1. Inhabilitación por el JNE (A partir de 80%, el JEE Lima Centro resuelve exclusión definitiva)
    if (newStats.jneTachaRisk >= 80) {
      onGameOver(newStats, GAME_ENDINGS.TACHADO_JNE, currentWeek, currentRank);
      return true;
    }

    // 2. Quiebra de Campaña (Sin fondos para locales ni logística)
    if (newStats.campaignFunds <= 0) {
      onGameOver(newStats, GAME_ENDINGS.QUIEBRA_CAMPANA, currentWeek, currentRank);
      return true;
    }

    // 3. Cancelación / Escándalo viral insostenible (El pueblo te repudia)
    if (newStats.popularSympathy <= 10) {
      onGameOver(newStats, GAME_ENDINGS.ESCANDALO_VIRAL, currentWeek, currentRank);
      return true;
    }

    // 4. Final of Week 5 (Decision 15 finished)
    if (nextIndex >= TOTAL_DECISIONS) {
      if (currentRank === 1) {
        onGameOver(newStats, GAME_ENDINGS.GANADOR_ALCALDIA, MAX_WEEKS, 1);
      } else if (currentRank === 2) {
        onGameOver(newStats, GAME_ENDINGS.SEGUNDO_LUGAR, MAX_WEEKS, 2);
      } else {
        onGameOver(newStats, GAME_ENDINGS.DERROTA_HUMILLANTE, MAX_WEEKS, currentRank);
      }
      return true;
    }

    return false;
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

    const updatedRivals = calculateUpdatedRivals(pDelta, updatedStats, rivals);
    setStats(updatedStats);
    setRivals(updatedRivals);
    setLastHeadline(choice.headlineNews);

    // Formulate lively flash news reacting specifically to the user's choice
    const pollTrend = pDelta > 0 
      ? `📈 ${candidate.name} repunta a ${updatedStats.polling}% en intención de voto`
      : pDelta < 0
        ? `📉 ${candidate.name} retrocede a ${updatedStats.polling}% tras su reciente respuesta`
        : `📊 ${candidate.name} se consolida con ${updatedStats.polling}% en encuestas`;

    let streetReaction = `🗣️ OPINIÓN PÚBLICA: Vecinos comentan intensamente la postura de ${candidate.name}`;
    if ((choice.deltas.popularSympathy || 0) <= -10) {
      streetReaction = `⚠️ DESCONTENTO EN LAS CALLES: Vecinos reclaman por la decisión de ${candidate.name}`;
    } else if ((choice.deltas.popularSympathy || 0) >= 10) {
      streetReaction = `🔥 APLAUSO POPULAR: Vecinos y redes elogian el gesto de ${candidate.name}`;
    } else if ((choice.deltas.jneTachaRisk || 0) >= 15) {
      streetReaction = `🚨 ALERTA LEGAL: Fiscalizadores del JNE abren indagación a la campaña de ${candidate.name}`;
    } else if ((choice.deltas.jneTachaRisk || 0) <= -10) {
      streetReaction = `⚖️ BLINDAJE JURÍDICO: ${candidate.name} subsana observaciones y calma al JNE`;
    }

    const newItems = [
      choice.headlineNews,
      streetReaction,
      pollTrend
    ];

    setHeadlineHistory(prev => [...newItems, ...prev.slice(0, 4)]);
    setTickerFlash(true);
    setTimeout(() => setTickerFlash(false), 2200);

    const nextIndex = decisionIndex + 1;

    // Premature game over check
    if (updatedStats.jneTachaRisk >= 80 || updatedStats.campaignFunds <= 0 || updatedStats.popularSympathy <= 10) {
      evaluateEndConditions(updatedStats, nextIndex, updatedRivals);
      return;
    }

    // Check if end of a week (after decision 3, 6, 9, 12, and 15 for Week 5)
    if (nextIndex % 3 === 0) {
      const completedWeek = nextIndex / 3;
      const deltaThisWeek = parseFloat((updatedStats.polling - weekStartPolling).toFixed(1));
      setWeeklyPollingDelta(deltaThisWeek);
      setPollModalWeek(completedWeek);
      setShowPollModal(true);
    } else {
      setDecisionIndex(nextIndex);
    }
  };

  const handleContinueAfterWeeklyPoll = () => {
    setShowPollModal(false);
    if (pollModalWeek >= MAX_WEEKS) {
      // Completed week 5: Transition to game over with the exact final stats & rank from week 5
      evaluateEndConditions(stats, TOTAL_DECISIONS, rivals);
    } else {
      setWeekStartPolling(stats.polling);
      setDecisionIndex(prev => prev + 1);
    }
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

    const updatedRivals = calculateUpdatedRivals(pDelta, updated, rivals);
    setStats(updated);
    setRivals(updatedRivals);
    setComodinUses(prev => ({ ...prev, [comodin.id]: currentUses + 1 }));
    setLastHeadline(comodin.headlineNews);
    setHeadlineHistory(prev => [
      `⚡ COMODÍN ESTRATÉGICO: ${comodin.headlineNews}`,
      `📢 ${candidate.name} activa jugada táctica: ${comodin.title}`,
      ...prev.slice(0, 4)
    ]);
    setTickerFlash(true);
    setTimeout(() => setTickerFlash(false), 2200);
    evaluateEndConditions(updated, decisionIndex, updatedRivals);
  };

  return (
    <div className="w-full min-h-[calc(100vh-64px)] lg:h-[calc(100vh-64px)] p-2 md:p-3 flex flex-col justify-between lg:overflow-hidden overflow-y-auto bg-slate-100 dark:bg-[#050505] text-slate-900 dark:text-neutral-100 selection:bg-amber-400 selection:text-black font-sans">
      
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
        <div className="col-span-12 lg:col-span-5 xl:col-span-5 lg:h-full flex flex-col gap-2.5 overflow-y-auto">
          
          {/* Top: Three.js 3D Dynamic Event Viewer (Debate, Pan con chicharrón, etc.) */}
          <div id="tutorial-3d-section" className="shrink-0">
            <ThreeEventViewer
              sceneType={currentDilemma.scene3D}
              title={getSceneTitle(currentDilemma.scene3D)}
              theme={theme}
            />
          </div>

          {/* Bottom: Active Dilemma / Proposal / Street Human Interaction */}
          <div id="tutorial-dilemma-section" className="flex-1 min-h-0 flex flex-col">
            <DilemmaCard
              dilemma={currentDilemma}
              onSelectChoice={handleSelectChoice}
            />
          </div>

        </div>

      </div>

      {/* Bottom Flash Informativo Ticker */}
      <div className={`h-8 shrink-0 mt-2 text-white rounded-lg px-3 flex items-center overflow-hidden border shadow-md transition-all duration-500 ${
        tickerFlash 
          ? 'bg-amber-500 border-amber-300 dark:bg-amber-600 dark:border-amber-400 ring-2 ring-amber-300 animate-pulse' 
          : 'bg-red-600 dark:bg-red-950 border-red-500/50'
      }`}>
        <div className="px-2 py-0.5 bg-white text-red-700 dark:bg-red-600 dark:text-white font-black text-[10px] uppercase tracking-widest shrink-0 rounded mr-2.5 flex items-center gap-1.5 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-red-600 dark:bg-white animate-ping" />
          FLASH INFORMATIVO
        </div>
        <div className="overflow-hidden whitespace-nowrap w-full">
          <div className="animate-ticker text-xs font-semibold text-white tracking-wide">
            {headlineHistory.map((item, idx) => (
              <span key={idx} className="mr-6">
                {item} &nbsp; •
              </span>
            ))}
            &nbsp; TRANSMISIÓN EN DIRECTO 24/7 &nbsp; • &nbsp; ELECCIONES MUNICIPALES LIMA 2026 &nbsp; • &nbsp;
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

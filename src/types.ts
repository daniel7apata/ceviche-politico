export type Gender = 'masculino' | 'femenino';

export type MaleProfileId = 'intelectual' | 'bajado_de_pepa' | 'galan' | 'sindicalista' | 'vendedor';
export type FemaleProfileId = 'doctora_academica' | 'tiktoker' | 'dirigente_social' | 'girly' | 'emprendedora' | 'ex_chica_reality';
export type ProfileId = MaleProfileId | FemaleProfileId;

export interface CharacterProfile {
  id: ProfileId;
  gender: Gender;
  name: string;
  tagline: string;
  description: string;
  avatarEmoji: string;
  avatarBg: string;
  statBonus: {
    polling?: number;
    campaignFunds?: number;
    jneTachaRisk?: number;
    popularSympathy?: number;
    mediaCredibility?: number;
  };
  quote: string;
}

export type PartyId = 
  | 'bloque_naranja'
  | 'renovacion_del_pueblo'
  | 'juan_perez'
  | 'avanza_patriota'
  | 'somos_clave'
  | 'nosotros_podemos'
  | 'obra_bien'
  | 'granito_de_mostaza'
  | 'altoque_peru';

export interface PoliticalParty {
  id: PartyId;
  name: string;
  originalInspiration: string;
  shortName: string;
  color: string;
  bgClass: string;
  borderClass: string;
  textClass: string;
  slogan: string;
  symbol: string;
  symbolEmoji: string;
  description: string;
}

export type CampaignPromiseId = 
  | 'seguridad'
  | 'transporte'
  | 'comercio'
  | 'obras_arboles';

export interface CampaignPromise {
  id: CampaignPromiseId;
  label: string;
  description: string;
  icon: string;
  initialBonus: {
    stat: 'polling' | 'campaignFunds' | 'jneTachaRisk' | 'popularSympathy' | 'mediaCredibility';
    amount: number;
  };
}

export interface Candidate {
  gender: Gender;
  name: string;
  age?: number;
  profileId: ProfileId;
  partyId: PartyId;
  promiseId: CampaignPromiseId;
}

export interface CampaignStats {
  polling: number;            // 0 - 100% Intención de Voto (¡Objetivo: llegar 1ro!)
  campaignFunds: number;      // S/. Fondos de Campaña (en Millones)
  jneTachaRisk: number;       // 0 - 100% Riesgo de Tacha del JNE
  popularSympathy: number;    // 0 - 100% Cariño de la gente / Voto Popular
  mediaCredibility: number;   // 0 - 100% Credibilidad en Prensa y Debates
}

export interface RivalCandidate {
  id: string;
  partyId?: PartyId;
  name: string;
  partyName: string;
  partyShort: string;
  avatarEmoji?: string;
  color: string;
  polling: number; // Current polling percentage
  isPlayer?: boolean;
}

export type Scene3DType = 
  | 'debate' 
  | 'pan_chicharron' 
  | 'batalla_aura' 
  | 'entrevista_tv' 
  | 'mitin_calle'
  | 'caldo_gallina'
  | 'conferencia_prensa'
  | 'mitin_banderas';

export interface StatDeltas {
  polling?: number;
  campaignFunds?: number;
  jneTachaRisk?: number;
  popularSympathy?: number;
  mediaCredibility?: number;
}

export interface ProfileComodin {
  id: string;
  title: string;
  description: string;
  icon: string;
  costFunds: number; // En Millones S/. (0 si es gratis)
  maxUses: number;   // Límite de usos en la campaña
  deltas: StatDeltas;
  headlineNews: string;
}

export interface DilemmaChoice {
  text: string;
  feedback: string;
  deltas: StatDeltas;
  headlineNews: string;
  tweetReaction?: {
    author: string;
    handle: string;
    avatar: string;
    content: string;
  };
}

export interface Dilemma {
  id: string;
  week: number; // 1 to 5
  characterName: string;
  characterRole: string;
  characterAvatar: string;
  dialogue: string;
  contextTag: string;
  scene3D: Scene3DType;
  choices: [DilemmaChoice, DilemmaChoice];
}

export type EndingType = 
  | 'GANADOR_ALCALDIA'
  | 'TACHADO_JNE'
  | 'QUIEBRA_CAMPANA'
  | 'SEGUNDO_LUGAR'
  | 'DERROTA_HUMILLANTE'
  | 'ESCANDALO_VIRAL';

export interface GameEnding {
  type: EndingType;
  title: string;
  subtitle: string;
  newspaperName: string;
  headline: string;
  description: string;
  badge: string;
  badgeColor: string;
  shareMessage: string;
}

export interface WeeklyPollReport {
  week: number;
  agencyName: string;
  date: string;
  userRank: number; // 1, 2, 3, etc.
  playerPolling: number;
  rivals: RivalCandidate[];
  analysisSnippet: string;
  topTrend: string;
}

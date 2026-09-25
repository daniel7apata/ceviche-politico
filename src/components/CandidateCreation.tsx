import React, { useState } from 'react';
import { 
  Gender, 
  ProfileId, 
  PartyId, 
  CampaignPromiseId, 
  Candidate 
} from '../types';
import { 
  MALE_PROFILES, 
  FEMALE_PROFILES, 
  PARTIES, 
  CAMPAIGN_PROMISES,
  PES_LICENSE_DISCLAIMER 
} from '../data/gameData';
import { 
  Shield, 
  Bus, 
  Store, 
  Trees, 
  ChevronRight, 
  CheckCircle2, 
  AlertTriangle,
  Sparkles,
  Info
} from 'lucide-react';
import { PartyRoulette } from './PartyRoulette';

interface CandidateCreationProps {
  onStartGame: (candidate: Candidate) => void;
}

export const CandidateCreation: React.FC<CandidateCreationProps> = ({ onStartGame }) => {
  const [gender, setGender] = useState<Gender>('masculino');
  const [name, setName] = useState<string>('Lucho "El Causa" Pérez');
  const [age, setAge] = useState<number>(44);
  const [selectedProfileId, setSelectedProfileId] = useState<ProfileId>('bajado_de_pepa');
  const [selectedPartyId, setSelectedPartyId] = useState<PartyId>('bloque_naranja');
  const [selectedPromiseId, setSelectedPromiseId] = useState<CampaignPromiseId>('seguridad');

  const profiles = gender === 'masculino' ? MALE_PROFILES : FEMALE_PROFILES;
  const currentProfile = profiles.find(p => p.id === selectedProfileId) || profiles[0];
  const currentParty = PARTIES.find(p => p.id === selectedPartyId) || PARTIES[0];

  const handleGenderChange = (newGender: Gender) => {
    setGender(newGender);
    if (newGender === 'masculino') {
      setSelectedProfileId('bajado_de_pepa');
      setName('Lucho "El Causa" Pérez');
    } else {
      setSelectedProfileId('tiktoker');
      setName('Sheyla "La Patrona" Flores');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartGame({
      gender,
      name: name.trim() || (gender === 'masculino' ? 'Candidato NN' : 'Candidata NN'),
      age,
      profileId: selectedProfileId,
      partyId: selectedPartyId,
      promiseId: selectedPromiseId,
    });
  };

  const getPromiseIcon = (id: CampaignPromiseId) => {
    switch(id) {
      case 'seguridad': return <Shield className="w-5 h-5 text-amber-500" />;
      case 'transporte': return <Bus className="w-5 h-5 text-blue-500" />;
      case 'comercio': return <Store className="w-5 h-5 text-emerald-500" />;
      case 'obras_arboles': return <Trees className="w-5 h-5 text-emerald-500" />;
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 font-sans">
      {/* Hero Header */}
      <div className="text-center mb-8 relative">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400"></span> SISTEMA ELECTORAL • LIMA 2026
        </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-2">
          SÉ <span className="text-blue-600 dark:text-blue-400">ALCALDE</span>
        </h1>
        
        <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
          ¿Tienes lo necesario para gobernar Lima sin terminar <span className="text-red-600 dark:text-red-400 font-semibold underline decoration-wavy">inhabilitado por el JNE</span>, acusado de corrupción o denunciado por tus propios regidores?
        </p>

        <div className="mt-3 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          Sin registros ni contraseñas. ¡Clic y a jugar!
        </div>
      </div>

      {/* Main Creation Form Card */}
      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 dark:border-slate-800 relative space-y-8">
        
        {/* Step 1: Datos Básicos & Género */}
        <div>
          <div className="flex items-center gap-2 text-slate-900 dark:text-white text-sm font-bold tracking-wider uppercase mb-4">
            <span className="flex items-center justify-center w-6 h-6 rounded-md bg-slate-900 text-white dark:bg-blue-600 text-xs font-bold">01</span>
            Arma tu perfil • Género, Nombre y Edad
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Gender Toggle */}
            <div className="md:col-span-4">
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Género del Candidato(a)</label>
              <div className="grid grid-cols-2 gap-2 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => handleGenderChange('masculino')}
                  className={`py-2 px-3 rounded-lg text-sm font-bold flex items-center justify-center gap-1.5 transition-all ${
                    gender === 'masculino'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <span>👨</span> Masculino
                </button>
                <button
                  type="button"
                  onClick={() => handleGenderChange('femenino')}
                  className={`py-2 px-3 rounded-lg text-sm font-bold flex items-center justify-center gap-1.5 transition-all ${
                    gender === 'femenino'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <span>👩</span> Femenino
                </button>
              </div>
            </div>

            {/* Candidate Name */}
            <div className="md:col-span-5">
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Nombre & Apodo Electoral</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={36}
                required
                placeholder="Ej. Jorge 'Porky' Chávez"
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
              />
            </div>

            {/* Candidate Age */}
            <div className="md:col-span-3">
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                Edad: <span className="text-blue-600 dark:text-blue-400 font-bold">{age} años</span>
              </label>
              <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5">
                <input
                  type="range"
                  min="25"
                  max="78"
                  value={age}
                  onChange={(e) => setAge(parseInt(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Step 2: Arquetipos de Candidatos */}
        <div id="tutorial-profile-section">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white text-sm font-bold tracking-wide uppercase">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-900 text-white dark:bg-blue-600 text-xs font-bold">2</span>
              Elige tu perfil ({gender === 'masculino' ? 'Hombre' : 'Mujer'})
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400">Cada perfil otorga comodines estratégicos únicos</span>
          </div>

          <div className={`grid gap-3 ${
            gender === 'masculino' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-5' 
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'
          }`}>
            {profiles.map((profile) => {
              const isSelected = profile.id === selectedProfileId;
              return (
                <div
                  key={profile.id}
                  onClick={() => setSelectedProfileId(profile.id)}
                  className={`relative cursor-pointer rounded-2xl p-3.5 transition-all duration-200 flex flex-col justify-between border ${
                    isSelected
                      ? 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-600 dark:border-blue-500 shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/70 hover:border-slate-400 dark:hover:border-slate-600'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-2.5 right-2.5 text-blue-600 dark:text-blue-400">
                      <CheckCircle2 className="w-5 h-5 fill-blue-600 dark:fill-blue-500 text-white" />
                    </div>
                  )}

                  <div>
                    <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-2xl mb-2.5 shadow-inner bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      {profile.avatarEmoji}
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1 leading-snug">
                      {profile.name}
                    </h3>

                    <p className="text-xs font-medium text-blue-700 dark:text-blue-300 mb-2 leading-snug">
                      {profile.tagline}
                    </p>

                    <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-4">
                      {profile.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 3: Partidos Políticos Parodia - Ruleta Ludópata */}
        <div id="tutorial-party-section">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white text-sm font-bold tracking-wide uppercase">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-900 text-white dark:bg-blue-600 text-xs font-bold">3</span>
              Ruleta de Partidos Políticos (Vientre de Alquiler)
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              ¡Gira la ruleta y desafía al JNE!
            </span>
          </div>

          {/* Dynamic Gacha Roulette with recoil near-miss */}
          <PartyRoulette 
            selectedPartyId={selectedPartyId} 
            onSelectParty={setSelectedPartyId} 
          />
        </div>

        {/* Step 4: Promesa Principal de Campaña (Solo Título e Ícono, sin párrafos de detalle) */}
        <div id="tutorial-promise-section">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white text-sm font-bold tracking-wide uppercase mb-4">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-900 text-white dark:bg-blue-600 text-xs font-bold">4</span>
            ¿Cuál sería tu promesa principal?
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {CAMPAIGN_PROMISES.map((promise) => {
              const isSelected = promise.id === selectedPromiseId;
              return (
                <div
                  key={promise.id}
                  onClick={() => setSelectedPromiseId(promise.id)}
                  className={`cursor-pointer rounded-2xl p-4 transition-all flex items-center justify-between border ${
                    isSelected
                      ? 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-600 dark:border-blue-500 shadow-sm ring-1 ring-blue-500'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm shrink-0">
                      {getPromiseIcon(promise.id)}
                    </div>
                    <span className="text-xs md:text-sm font-bold text-slate-900 dark:text-white leading-tight">
                      {promise.label}
                    </span>
                  </div>

                  {isSelected && (
                    <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 ml-2" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Submit Bar & Satirical Disclaimer */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center">
          
          <button
            type="submit"
            className="group relative inline-flex items-center justify-center px-10 py-4 text-base md:text-lg font-bold text-white transition-all duration-150 bg-blue-600 hover:bg-blue-500 dark:bg-blue-600 dark:hover:bg-blue-500 rounded-2xl shadow-md hover:scale-[1.01] active:scale-[0.99] tracking-wide"
          >
            <span className="mr-2">🗳️</span>
            <span>LANZAR MI CANDIDATURA</span>
            <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400 max-w-xl">
            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
            <span>
              Al hacer clic declaras bajo juramento <strong>no tener sentencias firmes</strong>... o al menos que no salgan en Google.
            </span>
          </div>

          <div className="mt-2 text-[11px] text-slate-400 dark:text-slate-500">
            Postulando por el partido: <strong className="text-slate-700 dark:text-slate-300">{currentParty.name}</strong> • Perfil: <strong className="text-slate-700 dark:text-slate-300">{currentProfile.name}</strong>
          </div>
        </div>

      </form>
    </div>
  );
};

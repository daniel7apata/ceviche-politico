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
  Trees, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  AlertTriangle,
  Sparkles,
  Info
} from 'lucide-react';
import { StreetCartIcon } from './StreetCartIcon';
import { PartyRoulette } from './PartyRoulette';

interface CandidateCreationProps {
  onStartGame: (candidate: Candidate) => void;
}

export const CandidateCreation: React.FC<CandidateCreationProps> = ({ onStartGame }) => {
  const [gender, setGender] = useState<Gender>('masculino');
  const [name, setName] = useState<string>('Lucho "El Causa" Pérez');
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
      profileId: selectedProfileId,
      partyId: selectedPartyId,
      promiseId: selectedPromiseId,
    });
  };

  const currentIndex = profiles.findIndex(p => p.id === selectedProfileId);
  const activeIndex = currentIndex >= 0 ? currentIndex : 0;

  const navigateProfile = (direction: -1 | 1) => {
    const n = profiles.length;
    const nextIndex = (activeIndex + direction + n) % n;
    setSelectedProfileId(profiles[nextIndex].id);
  };

  // Touch Swipe & Drag Handling
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [isSwiping, setIsSwiping] = useState(false);
  const [mouseStartX, setMouseStartX] = useState<number | null>(null);
  const [isMouseDragging, setIsMouseDragging] = useState(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
    setIsSwiping(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX === null || touchStartY === null) return;
    const diffX = touchStartX - e.touches[0].clientX;
    const diffY = touchStartY - e.touches[0].clientY;
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 10) {
      setIsSwiping(true);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null || touchStartY === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 35) {
      if (diffX > 0) {
        navigateProfile(1);
      } else {
        navigateProfile(-1);
      }
    }
    setTouchStartX(null);
    setTouchStartY(null);
    setTimeout(() => setIsSwiping(false), 50);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setMouseStartX(e.clientX);
    setIsMouseDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (mouseStartX === null) return;
    if (Math.abs(e.clientX - mouseStartX) > 10) {
      setIsMouseDragging(true);
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (mouseStartX === null) return;
    const diffX = mouseStartX - e.clientX;
    if (Math.abs(diffX) > 35) {
      if (diffX > 0) {
        navigateProfile(1);
      } else {
        navigateProfile(-1);
      }
    }
    setMouseStartX(null);
    setTimeout(() => setIsMouseDragging(false), 50);
  };

  const carouselSlots = [-2, -1, 0, 1, 2].map(offset => {
    const n = profiles.length;
    const slotIndex = (activeIndex + offset + n * 10) % n;
    return {
      offset,
      profile: profiles[slotIndex],
      index: slotIndex,
    };
  });

  const getPromiseIcon = (id: CampaignPromiseId) => {
    switch(id) {
      case 'seguridad': return <Shield className="w-5 h-5 text-amber-500" />;
      case 'transporte': return <Bus className="w-5 h-5 text-blue-500" />;
      case 'comercio': return <StreetCartIcon className="w-5 h-5 text-orange-500" />;
      case 'obras_arboles': return <Trees className="w-5 h-5 text-emerald-500" />;
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 font-sans">
      {/* Hero Header */}
      <div className="text-center mb-8 relative">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200 dark:bg-neutral-900 border border-slate-300 dark:border-neutral-800 text-slate-700 dark:text-neutral-300 text-xs font-semibold uppercase tracking-wider mb-3">
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
      <form onSubmit={handleSubmit} className="bg-white dark:bg-[#0b0b0c] rounded-3xl p-6 md:p-8 shadow-xl dark:shadow-2xl border border-slate-200 dark:border-neutral-800 relative space-y-8">
        
        {/* Step 1: Datos Básicos & Género */}
        <div>
          <div className="flex items-center gap-2 text-slate-900 dark:text-white text-sm font-bold tracking-wider uppercase mb-4">
            <span className="flex items-center justify-center w-6 h-6 rounded-md bg-slate-900 text-white dark:bg-blue-600 text-xs font-bold">01</span>
            Arma tu perfil • Género y Nombre
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Gender Toggle */}
            <div className="md:col-span-5">
              <label className="block text-xs font-semibold text-slate-600 dark:text-neutral-400 mb-1.5">Género del Candidato(a)</label>
              <div className="grid grid-cols-2 gap-2 bg-slate-100 dark:bg-neutral-900 p-1.5 rounded-xl border border-slate-200 dark:border-neutral-800">
                <button
                  type="button"
                  onClick={() => handleGenderChange('masculino')}
                  className={`py-2 px-3 rounded-lg text-sm font-bold flex items-center justify-center gap-1.5 transition-all ${
                    gender === 'masculino'
                      ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-sm'
                      : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <span>👨</span> Masculino
                </button>
                <button
                  type="button"
                  onClick={() => handleGenderChange('femenino')}
                  className={`py-2 px-3 rounded-lg text-sm font-bold flex items-center justify-center gap-1.5 transition-all ${
                    gender === 'femenino'
                      ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-sm'
                      : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <span>👩</span> Femenino
                </button>
              </div>
            </div>

            {/* Candidate Name */}
            <div className="md:col-span-7">
              <label className="block text-xs font-semibold text-slate-600 dark:text-neutral-400 mb-1.5">Nombre & Apodo Electoral</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={36}
                required
                placeholder="Ej. Jorge 'Porky' Chávez"
                className="w-full bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl px-4 py-2.5 text-slate-900 dark:text-neutral-100 font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-neutral-500"
              />
            </div>
          </div>
        </div>

        {/* Step 2: Arquetipos de Candidatos - Carrusel de 5 Cards (Actual y 2 a cada lado) */}
        <div id="tutorial-profile-section" className="space-y-2 overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white text-sm font-bold tracking-wide uppercase">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-900 text-white dark:bg-blue-600 text-xs font-bold">2</span>
              Elige tu perfil ({gender === 'masculino' ? 'Hombre' : 'Mujer'})
            </div>
            <span className="text-xs text-slate-500 dark:text-neutral-400">
              Desliza o usa las flechas • 2 a cada lado y perfil actual centrado
            </span>
          </div>

          <div className="relative py-1">
            {/* Left Nav Button */}
            <button
              type="button"
              onClick={() => navigateProfile(-1)}
              className="absolute left-0 sm:left-1 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 dark:bg-neutral-900 border-2 border-slate-200 dark:border-neutral-700 shadow-lg flex items-center justify-center text-slate-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all transform hover:scale-110 active:scale-95"
              title="Perfil anterior"
              aria-label="Perfil anterior"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Right Nav Button */}
            <button
              type="button"
              onClick={() => navigateProfile(1)}
              className="absolute right-0 sm:right-1 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 dark:bg-neutral-900 border-2 border-slate-200 dark:border-neutral-700 shadow-lg flex items-center justify-center text-slate-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all transform hover:scale-110 active:scale-95"
              title="Siguiente perfil"
              aria-label="Siguiente perfil"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Carousel 5 Cards Track with Touch Swipe & Mouse Drag Support */}
            <div 
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={() => setMouseStartX(null)}
              className="h-[275px] flex items-center justify-center gap-2 sm:gap-3 md:gap-4 overflow-x-auto overflow-y-hidden py-3 px-8 sm:px-12 no-scrollbar select-none touch-pan-y cursor-grab active:cursor-grabbing"
            >
              {carouselSlots.map(({ offset, profile }) => {
                const isCenter = offset === 0;
                const isNear = Math.abs(offset) === 1;

                if (isCenter) {
                  return (
                    <div
                      key={profile.id}
                      className="w-56 sm:w-64 md:w-72 h-[240px] shrink-0 rounded-2xl p-4 flex flex-col justify-between border-2 border-blue-600 dark:border-blue-500 bg-white dark:bg-[#121214] shadow-xl dark:shadow-black/90 ring-2 ring-blue-500/25 z-20 transition-all duration-300 transform scale-100 overflow-hidden"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-blue-600 text-white shadow-sm">
                            <CheckCircle2 className="w-3 h-3" /> ACTUAL
                          </span>
                          <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400">
                            SELECCIONADO
                          </span>
                        </div>

                        <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-2xl mb-1.5 shadow-inner bg-slate-100 dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700">
                          {profile.avatarEmoji}
                        </div>

                        <h3 className="text-base font-black text-slate-900 dark:text-white mb-0.5 leading-snug truncate">
                          {profile.name}
                        </h3>

                        <p className="text-xs font-bold text-amber-600 dark:text-amber-400 mb-1 leading-snug line-clamp-1">
                          {profile.tagline}
                        </p>

                        <p className="text-xs text-slate-600 dark:text-neutral-300 leading-relaxed line-clamp-3">
                          {profile.description}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-100 dark:border-neutral-800 text-center">
                        <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                          Candidato Seleccionado
                        </span>
                      </div>
                    </div>
                  );
                }

                if (isNear) {
                  return (
                    <div
                      key={profile.id}
                      onClick={() => {
                        if (isSwiping || isMouseDragging) return;
                        setSelectedProfileId(profile.id);
                      }}
                      className="w-40 sm:w-48 md:w-56 h-[240px] shrink-0 cursor-pointer rounded-2xl p-3.5 flex flex-col justify-between border border-slate-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/60 hover:border-slate-400 dark:hover:border-neutral-600 shadow-sm hover:shadow-md transition-all duration-300 transform scale-95 opacity-80 hover:opacity-100 overflow-hidden"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[10px] font-bold text-slate-400 dark:text-neutral-500 uppercase">
                            {offset === -1 ? '← Anterior' : 'Siguiente →'}
                          </span>
                        </div>

                        <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-2xl mb-1.5 shadow-inner bg-slate-100 dark:bg-neutral-800/80 border border-slate-200 dark:border-neutral-700/80">
                          {profile.avatarEmoji}
                        </div>

                        <h3 className="text-sm font-bold text-slate-800 dark:text-neutral-200 mb-0.5 leading-snug truncate">
                          {profile.name}
                        </h3>

                        <p className="text-[11px] font-medium text-slate-500 dark:text-neutral-400 mb-1 line-clamp-1">
                          {profile.tagline}
                        </p>

                        <p className="text-[11px] text-slate-500 dark:text-neutral-400 leading-snug line-clamp-3">
                          {profile.description}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-100 dark:border-neutral-800/80 text-center">
                        <span className="text-[10px] font-semibold text-neutral-700 dark:text-neutral-300 hover:underline">
                          Clic para elegir
                        </span>
                      </div>
                    </div>
                  );
                }

                // Outer neighbor (Math.abs(offset) === 2)
                return (
                  <div
                    key={profile.id}
                    onClick={() => {
                      if (isSwiping || isMouseDragging) return;
                      setSelectedProfileId(profile.id);
                    }}
                    className="w-32 sm:w-36 md:w-44 h-[240px] shrink-0 cursor-pointer rounded-2xl p-3 flex flex-col justify-between border border-slate-200/80 dark:border-neutral-850/80 bg-slate-50/80 dark:bg-neutral-950/40 hover:border-slate-400 dark:hover:border-neutral-800 transition-all duration-300 transform scale-90 opacity-60 hover:opacity-90 overflow-hidden"
                  >
                    <div>
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xl mb-1.5 shadow-inner bg-white/80 dark:bg-neutral-800/40 border border-slate-200/60 dark:border-neutral-700/60">
                        {profile.avatarEmoji}
                      </div>

                      <h3 className="text-xs font-bold text-slate-700 dark:text-neutral-300 mb-0.5 truncate">
                        {profile.name}
                      </h3>

                      <p className="text-[10px] text-slate-500 dark:text-neutral-400 line-clamp-1">
                        {profile.tagline}
                      </p>

                      <p className="text-[10px] text-slate-400 dark:text-neutral-500 line-clamp-3 leading-snug mt-1">
                        {profile.description}
                      </p>
                    </div>

                    <div className="text-center pt-2 border-t border-slate-200/40 dark:border-neutral-850">
                      <span className="text-[9px] font-medium text-slate-400 dark:text-neutral-500">
                        {offset === -2 ? '« -2' : '+2 »'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Dot Navigation Indicators */}
            <div className="flex items-center justify-center gap-1.5 mt-2">
              {profiles.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedProfileId(p.id)}
                  className={`transition-all duration-300 rounded-full ${
                    i === activeIndex
                      ? 'w-7 h-2 bg-blue-600 dark:bg-blue-500'
                      : 'w-2 h-2 bg-slate-300 dark:bg-neutral-800 hover:bg-slate-400 dark:hover:bg-neutral-700'
                  }`}
                  title={`Seleccionar perfil: ${p.name}`}
                  aria-label={`Seleccionar perfil: ${p.name}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Step 3: Partidos Políticos Parodia - Ruleta Ludópata */}
        <div id="tutorial-party-section">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white text-sm font-bold tracking-wide uppercase">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-900 text-white dark:bg-blue-600 text-xs font-bold">3</span>
              Ruleta de Partidos Políticos (Vientre de Alquiler)
            </div>
            <span className="text-xs text-slate-500 dark:text-neutral-400">
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
                      ? 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-600 dark:border-blue-500 shadow-md ring-1 ring-blue-500'
                      : 'bg-slate-50 dark:bg-neutral-900/40 border-slate-200 dark:border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-white dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 shadow-sm shrink-0">
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
        <div className="pt-6 border-t border-slate-200 dark:border-neutral-800 flex flex-col items-center justify-center text-center">
          
          <button
            type="submit"
            className="group relative inline-flex items-center justify-center px-10 py-4 text-base md:text-lg font-bold text-white transition-all duration-150 bg-blue-600 hover:bg-blue-500 dark:bg-blue-600 dark:hover:bg-blue-500 rounded-2xl shadow-xl hover:scale-[1.01] active:scale-[0.99] tracking-wide cursor-pointer"
          >
            <span className="mr-2">🗳️</span>
            <span>LANZAR MI CANDIDATURA</span>
            <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-neutral-400 max-w-xl">
            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
            <span>
              Al hacer clic declaras bajo juramento <strong>no tener sentencias firmes</strong>... o al menos que no salgan en Google.
            </span>
          </div>

          <div className="mt-2 text-[11px] text-slate-400 dark:text-neutral-500">
            Postulando por el partido: <strong className="text-slate-700 dark:text-neutral-300">{currentParty.name}</strong> • Perfil: <strong className="text-slate-700 dark:text-neutral-300">{currentProfile.name}</strong>
          </div>
        </div>

      </form>
    </div>
  );
};

import React, { useState, useEffect, useRef, useLayoutEffect, useCallback } from 'react';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Vote, 
  Coins, 
  Scale, 
  Heart, 
  Tv, 
  Sparkles, 
  Flag, 
  CheckCircle2, 
  Zap,
  MessageSquare,
  Radio,
  Eye
} from 'lucide-react';

export type TutorialMode = 'intro' | 'gameplay' | 'all';

interface TutorialModalProps {
  isOpen: boolean;
  mode?: TutorialMode;
  initialStep?: number;
  onClose: () => void;
}

export const TUTORIAL_INTRO_KEY = 'roleplay_tutorial_intro_seen_v1';
export const TUTORIAL_GAMEPLAY_KEY = 'roleplay_tutorial_gameplay_seen_v1';

interface TourStep {
  id: string;
  targetSelector: string;
  title: string;
  subtitle: string;
  badge: string;
  icon: React.ReactNode;
  finishButtonText: string;
  content: React.ReactNode;
}

export const TutorialModal: React.FC<TutorialModalProps> = ({ 
  isOpen, 
  mode = 'all', 
  initialStep = 0,
  onClose 
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [dontShowAgain, setDontShowAgain] = useState<boolean>(true);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{
    x: number;
    y: number;
    placement: 'right' | 'left' | 'bottom' | 'top' | 'center';
  }>({ x: 0, y: 0, placement: 'center' });

  const tooltipRef = useRef<HTMLDivElement>(null);

  // All tour steps mapped to specific interface DOM targets
  const allTourSteps: TourStep[] = [
    // 0. Intro Step 1: Perfiles Políticos
    {
      id: 'intro_profile',
      targetSelector: '#tutorial-profile-section',
      title: '1. Elige tu Perfil Político',
      subtitle: 'Cada arquetipo tiene ventajas y comodines únicos',
      badge: 'FASE INICIAL • PERFIL ELECTORAL',
      icon: <Flag className="w-5 h-5 text-blue-600" />,
      finishButtonText: '¡A crear mi candidato!',
      content: (
        <div className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
          <p className="leading-relaxed">
            Tu meta es alcanzar la <strong>Alcaldía de Lima 2026</strong> remontando desde el <strong>puesto #5 o #6</strong> en las encuestas hasta superar el 25% para ganar.
          </p>
          <div className="p-2.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 space-y-1">
            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
              <span>🎯</span> Bonos & Comodines Tácticos
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300">
              Escoge entre los 6 perfiles masculinos o 6 femeninos. Cada uno otorga bonos iniciales en votos, caja o medios, y <strong>3 comodines exclusivos</strong>.
            </p>
          </div>
        </div>
      )
    },

    // 1. Intro Step 2: Ruleta de Partidos
    {
      id: 'intro_party',
      targetSelector: '#tutorial-party-section',
      title: '2. Ruleta Electoral de Partidos',
      subtitle: 'Vientre de alquiler y suerte de tómbola',
      badge: 'FASE INICIAL • TU PARTIDO',
      icon: <Sparkles className="w-5 h-5 text-amber-500" />,
      finishButtonText: '¡A crear mi candidato!',
      content: (
        <div className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
          <p className="leading-relaxed">
            Gira la <strong>ruleta electoral</strong> para que la suerte te asigne un partido tradicional o independiente, o escógelo tú mismo.
          </p>
          <div className="p-2.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 space-y-1">
            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
              <span>🗳️</span> Candidatura Única
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300">
              El partido asignado es <strong>exclusivamente tuyo</strong>: ningún otro rival competirá con tu misma camiseta en las encuestas.
            </p>
          </div>
        </div>
      )
    },

    // 2. Intro Step 3: Promesa de Campaña & Botón
    {
      id: 'intro_promise',
      targetSelector: '#tutorial-promise-section',
      title: '3. Promesa Central & Lanzamiento',
      subtitle: 'Define tu propuesta bandera para Lima',
      badge: 'FASE INICIAL • LANZAMIENTO',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
      finishButtonText: '¡Entendido, a crear mi candidato!',
      content: (
        <div className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
          <p className="leading-relaxed">
            Selecciona tu promesa principal (Seguridad, Transporte, Comercio ambulatorio u Obras). Te dará un empujón estadístico para arrancar.
          </p>
          <div className="p-2.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 space-y-1">
            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
              <span>🚀</span> ¡Lanza tu Campaña!
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300">
              Una vez completados los 4 pasos, presiona el botón inferior para abrir el <strong>Centro de Comando y la simulación 3D</strong>.
            </p>
          </div>
        </div>
      )
    },

    // 3. Gameplay Step 1: Simulador de Intención de Voto
    {
      id: 'game_simulator',
      targetSelector: '#tutorial-simulator-section',
      title: 'Simulador de Intención de Voto',
      subtitle: 'Sondeos en tiempo real Ipsos / Datum 2026',
      badge: 'CAMPAÑA • ENCUESTAS EN VIVO',
      icon: <Vote className="w-5 h-5 text-blue-600" />,
      finishButtonText: '¡Entendido, a hacer campaña!',
      content: (
        <div className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
          <p className="leading-relaxed">
            Aquí observas las barras de intención de voto actualizadas en vivo. Tu posición inicial ronda el <strong>puesto #5 o #6 (6.5% - 8.5%)</strong>.
          </p>
          <div className="p-2.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 space-y-1">
            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
              <span>🏆</span> Meta: Puesto #1
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300">
              Tus rivales inyectan pauta publicitaria en cada semana. Debes recortar distancia y llegar primero al final de la Semana 5.
            </p>
          </div>
        </div>
      )
    },

    // 4. Gameplay Step 2: Estado del Comando & Riesgo JNE
    {
      id: 'game_command',
      targetSelector: '#tutorial-command-status-section',
      title: 'Estado del Comando & Riesgo JNE',
      subtitle: 'Tus signos vitales políticos y alerta de tacha',
      badge: 'CAMPAÑA • CAJA Y FISCALIZACIÓN',
      icon: <Scale className="w-5 h-5 text-red-600" />,
      finishButtonText: '¡Entendido, a hacer campaña!',
      content: (
        <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
          <div className="flex items-start gap-2 p-1.5 rounded-lg bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50">
            <Coins className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 dark:text-white">Fondos de Campaña (S/.):</strong> Dinero en millones. Si cae a <strong>S/. 0.0M caes en quiebra</strong> y pierdes.
            </div>
          </div>
          <div className="flex items-start gap-2 p-1.5 rounded-lg bg-red-50/70 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50">
            <Scale className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 dark:text-white">Riesgo JNE (%):</strong> Si alcanza el <strong>80%</strong>, el Jurado emite tu <em>resolución de exclusión definitiva</em>.
            </div>
          </div>
          <div className="flex items-start gap-2 p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <Heart className="w-4 h-4 text-pink-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 dark:text-white">Simpatía Popular:</strong> Si supera el 60%, ganas votos pasivos solos. Mantén la campaña caliente.
            </div>
          </div>
        </div>
      )
    },

    // 5. Gameplay Step 3: Visor 3D en Vivo
    {
      id: 'game_3d',
      targetSelector: '#tutorial-3d-section',
      title: 'Visor 3D de Eventos en Vivo',
      subtitle: 'Debates oficiales de TV, mítines masivos y calle',
      badge: 'CAMPAÑA • ESCENA EN VIVO',
      icon: <Eye className="w-5 h-5 text-indigo-600" />,
      finishButtonText: '¡Entendido, a hacer campaña!',
      content: (
        <div className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
          <p className="leading-relaxed">
            Esta pantalla interactiva reproduce en 3D la atmósfera de tu campaña según el evento que estés viviendo.
          </p>
          <div className="p-2.5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 space-y-1">
            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
              <span>📺</span> Escenarios Auténticos
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300">
              Observa el <strong>Debate Municipal del JNE</strong> con atril y panel completo, <strong>mítines de cierre</strong> con pancartas gigantes, desayunos populares y ruedas de prensa.
            </p>
          </div>
        </div>
      )
    },

    // 6. Gameplay Step 4: Toma de Decisiones Semanales
    {
      id: 'game_dilemma',
      targetSelector: '#tutorial-dilemma-section',
      title: 'Toma de Decisiones Semanales',
      subtitle: 'Interlocutores limeños y titulares chicha',
      badge: 'CAMPAÑA • ACCIÓN SEMANAL',
      icon: <MessageSquare className="w-5 h-5 text-purple-600" />,
      finishButtonText: '¡Entendido, a hacer campaña!',
      content: (
        <div className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
          <p className="leading-relaxed">
            Cada semana resolverás <strong>3 situaciones reales</strong> planteadas por vecinos, comerciantes o periodistas de Lima Metropolitana.
          </p>
          <div className="p-2.5 rounded-xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/60 space-y-1">
            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
              <span>📰</span> Consecuencias en Diario Chicha
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300">
              Elige entre la opción A o B. Tu decisión se plasmará en la portada de un tabloide popular chicha y repercutirá en tus votos y fondos.
            </p>
          </div>
        </div>
      )
    },

    // 7. Gameplay Step 5: Comodines Estratégicos
    {
      id: 'game_comodines',
      targetSelector: '#tutorial-comodines-section',
      title: 'Comodines Estratégicos de tu Perfil',
      subtitle: 'Tus cartas bajo la manga para remontar la elección',
      badge: 'CAMPAÑA • COMODINES TÁCTICOS',
      icon: <Zap className="w-5 h-5 text-amber-500" />,
      finishButtonText: '¡Entendido, a hacer campaña!',
      content: (
        <div className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
          <p className="leading-relaxed">
            Ubicados en la parte inferior del tablero. Cada perfil cuenta con <strong>3 comodines tácticos</strong> con costo en caja y usos limitados por partida.
          </p>
          <div className="p-2.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 space-y-1">
            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
              <span>⚡</span> Momento Oportuno
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300">
              Actívalos cuando los rivales se te escapen en las encuestas, o para limpiar tu riesgo legal ante el JNE antes del debate.
            </p>
          </div>
        </div>
      )
    }
  ];

  // Filter steps according to the mode
  const activeSteps = React.useMemo(() => {
    if (mode === 'intro') {
      return allTourSteps.slice(0, 3); // Steps 0, 1, 2 (Creation phase)
    }
    if (mode === 'gameplay') {
      return allTourSteps.slice(3);    // Steps 3, 4, 5, 6, 7 (Gameplay phase)
    }
    return allTourSteps;              // All 8 steps for on-demand top button
  }, [mode]);

  // Reset or initialize step index
  useEffect(() => {
    if (isOpen) {
      if (mode === 'all' && initialStep >= 0 && initialStep < allTourSteps.length) {
        setCurrentStep(initialStep);
      } else {
        setCurrentStep(0);
      }
    }
  }, [isOpen, mode, initialStep]);

  const stepData = activeSteps[Math.min(currentStep, activeSteps.length - 1)];

  // Measure and position tooltip dynamically relative to target element
  const updatePosition = useCallback(() => {
    if (!isOpen || !stepData) return;

    const el = document.querySelector(stepData.targetSelector);
    if (!el) {
      setTargetRect(null);
      setTooltipPos({ x: (window.innerWidth - 380) / 2, y: (window.innerHeight - 280) / 2, placement: 'center' });
      return;
    }

    const rect = el.getBoundingClientRect();
    setTargetRect(rect);

    // Auto-scroll target into view if outside viewport
    const isInViewport = (
      rect.top >= 40 &&
      rect.bottom <= window.innerHeight - 40 &&
      rect.left >= 10 &&
      rect.right <= window.innerWidth - 10
    );

    if (!isInViewport) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Measure tooltip dimensions (default approx 380x280)
    const tooltipWidth = Math.min(380, window.innerWidth - 32);
    const tooltipHeight = tooltipRef.current ? tooltipRef.current.offsetHeight : 280;
    const margin = 18;

    const spaceRight = window.innerWidth - rect.right;
    const spaceLeft = rect.left;
    const spaceBottom = window.innerHeight - rect.bottom;
    const spaceTop = rect.top;

    let placement: 'right' | 'left' | 'bottom' | 'top' | 'center' = 'bottom';
    let posX = 0;
    let posY = 0;

    // Desktop placement priority
    if (window.innerWidth >= 1024) {
      if (spaceRight >= tooltipWidth + margin) {
        placement = 'right';
        posX = rect.right + margin;
        posY = Math.max(margin, Math.min(rect.top, window.innerHeight - tooltipHeight - margin));
      } else if (spaceLeft >= tooltipWidth + margin) {
        placement = 'left';
        posX = rect.left - tooltipWidth - margin;
        posY = Math.max(margin, Math.min(rect.top, window.innerHeight - tooltipHeight - margin));
      } else if (spaceBottom >= tooltipHeight + margin) {
        placement = 'bottom';
        posX = Math.max(margin, Math.min(rect.left, window.innerWidth - tooltipWidth - margin));
        posY = rect.bottom + margin;
      } else {
        placement = 'top';
        posX = Math.max(margin, Math.min(rect.left, window.innerWidth - tooltipWidth - margin));
        posY = Math.max(margin, rect.top - tooltipHeight - margin);
      }
    } else {
      // Mobile / Tablet placement: Place below or above, or centered bottom sheet
      if (spaceBottom >= tooltipHeight + margin) {
        placement = 'bottom';
        posX = Math.max(16, (window.innerWidth - tooltipWidth) / 2);
        posY = rect.bottom + margin;
      } else if (spaceTop >= tooltipHeight + margin) {
        placement = 'top';
        posX = Math.max(16, (window.innerWidth - tooltipWidth) / 2);
        posY = Math.max(margin, rect.top - tooltipHeight - margin);
      } else {
        placement = 'bottom';
        posX = Math.max(16, (window.innerWidth - tooltipWidth) / 2);
        posY = window.innerHeight - tooltipHeight - margin;
      }
    }

    setTooltipPos({ x: posX, y: posY, placement });
  }, [isOpen, stepData]);

  // Recalculate position on open, step change, resize, and scroll
  useLayoutEffect(() => {
    updatePosition();
    const handleScroll = () => updatePosition();
    const handleResize = () => updatePosition();

    window.addEventListener('scroll', handleScroll, true);
    window.addEventListener('resize', handleResize);

    const timer = setTimeout(updatePosition, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, [updatePosition]);

  if (!isOpen || !stepData) return null;

  const handleFinish = () => {
    if (dontShowAgain) {
      try {
        if (mode === 'intro') {
          localStorage.setItem(TUTORIAL_INTRO_KEY, 'true');
        } else if (mode === 'gameplay') {
          localStorage.setItem(TUTORIAL_GAMEPLAY_KEY, 'true');
        } else {
          localStorage.setItem(TUTORIAL_INTRO_KEY, 'true');
          localStorage.setItem(TUTORIAL_GAMEPLAY_KEY, 'true');
        }
      } catch (e) {
        console.warn('No se pudo guardar en localStorage:', e);
      }
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 pointer-events-none font-sans overflow-hidden">
      {/* 1. Subtle Dimming Backdrop (Non-glassed, allows full transparency over UI) */}
      <div 
        className="absolute inset-0 bg-slate-950/45 transition-opacity duration-300 pointer-events-auto"
        onClick={onClose}
      />

      {/* 2. Spotlight Highlight Ring over the Active Target Element */}
      {targetRect && (
        <div
          className="fixed pointer-events-none transition-all duration-300 ease-out z-50"
          style={{
            top: `${Math.max(0, targetRect.top - 6)}px`,
            left: `${Math.max(0, targetRect.left - 6)}px`,
            width: `${targetRect.width + 12}px`,
            height: `${targetRect.height + 12}px`,
          }}
        >
          {/* Animated Glowing Spotlight Border */}
          <div className="w-full h-full rounded-2xl border-2 border-blue-500 shadow-[0_0_35px_rgba(59,130,246,0.6)] ring-4 ring-blue-500/25 animate-pulse" />

          {/* Floating Target Beacon Badge */}
          <div className="absolute -top-3.5 left-4 px-2.5 py-0.5 rounded-full bg-blue-600 text-white font-black text-[9px] uppercase tracking-wider shadow-md flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            <span>🎯 SECCIÓN RESALTADA</span>
          </div>
        </div>
      )}

      {/* 3. Popover Card positioned strategically next to target */}
      <div
        ref={tooltipRef}
        style={{
          transform: `translate3d(${tooltipPos.x}px, ${tooltipPos.y}px, 0)`,
          width: `${Math.min(380, window.innerWidth - 32)}px`,
        }}
        className="fixed top-0 left-0 z-50 pointer-events-auto bg-white dark:bg-slate-900 rounded-2xl border-2 border-blue-500/80 dark:border-blue-500 shadow-2xl transition-transform duration-200 ease-out flex flex-col max-h-[85vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Dynamic Pointer Arrow towards target */}
        {tooltipPos.placement === 'left' && (
          <div className="hidden lg:block absolute -right-2 top-8 w-4 h-4 bg-white dark:bg-slate-900 border-r-2 border-t-2 border-blue-500 rotate-45 transform" />
        )}
        {tooltipPos.placement === 'right' && (
          <div className="hidden lg:block absolute -left-2 top-8 w-4 h-4 bg-white dark:bg-slate-900 border-l-2 border-b-2 border-blue-500 rotate-45 transform" />
        )}
        {tooltipPos.placement === 'bottom' && (
          <div className="absolute -top-2 left-8 w-4 h-4 bg-white dark:bg-slate-900 border-l-2 border-t-2 border-blue-500 rotate-45 transform" />
        )}
        {tooltipPos.placement === 'top' && (
          <div className="absolute -bottom-2 left-8 w-4 h-4 bg-white dark:bg-slate-900 border-r-2 border-b-2 border-blue-500 rotate-45 transform" />
        )}

        {/* Card Header */}
        <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/90 dark:bg-slate-950/90">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 flex items-center justify-center shrink-0">
              {stepData.icon}
            </div>
            <div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 font-sans block">
                {activeSteps.length > 1 
                  ? `PASO ${currentStep + 1} DE ${activeSteps.length} • ${stepData.badge}` 
                  : stepData.badge}
              </span>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-tight font-sans">
                {stepData.title}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title="Cerrar tutorial"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Card Body */}
        <div className="p-4 overflow-y-auto space-y-2.5">
          <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            {stepData.subtitle}
          </div>
          {stepData.content}
        </div>

        {/* Card Footer */}
        <div className="px-4 py-2.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-950/90 flex flex-col gap-2">
          {/* Don't show again checkbox */}
          <label className="flex items-center gap-1.5 text-[11px] text-slate-600 dark:text-slate-400 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
              className="w-3.5 h-3.5 rounded text-blue-600 focus:ring-blue-500 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 cursor-pointer"
            />
            <span>No volver a mostrar automáticamente</span>
          </label>

          {/* Stepper buttons and Dots */}
          <div className="flex items-center justify-between gap-2 pt-0.5">
            {/* Step Dots */}
            {activeSteps.length > 1 && (
              <div className="flex items-center gap-1">
                {activeSteps.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentStep(idx)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      idx === currentStep 
                        ? 'w-4 bg-blue-600 dark:bg-blue-500' 
                        : 'w-1.5 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
                    }`}
                    title={`Paso ${idx + 1}`}
                  />
                ))}
              </div>
            )}

            <div className="flex items-center gap-1.5 ml-auto">
              {currentStep > 0 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold text-xs flex items-center gap-0.5 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-3 h-3" />
                  <span>Atrás</span>
                </button>
              )}

              {currentStep < activeSteps.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(prev => prev + 1)}
                  className="px-3.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1 transition-colors shadow-sm cursor-pointer"
                >
                  <span>Siguiente</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleFinish}
                  className="px-3 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1 transition-colors shadow-sm cursor-pointer"
                >
                  <span>{stepData.finishButtonText || '¡Listo!'}</span>
                  <CheckCircle2 className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

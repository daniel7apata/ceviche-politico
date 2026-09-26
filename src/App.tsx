import React, { useState, useEffect } from 'react';
import { Candidate, CampaignStats, GameEnding } from './types';
import { CandidateCreation } from './components/CandidateCreation';
import { GameScreen } from './components/GameScreen';
import { GameOverCard } from './components/GameOverCard';
import { 
  TutorialModal, 
  TUTORIAL_INTRO_KEY, 
  TUTORIAL_GAMEPLAY_KEY, 
  TutorialMode 
} from './components/TutorialModal';
import { Sun, Moon, RotateCcw, HelpCircle } from 'lucide-react';

type GameState = 'creation' | 'playing' | 'gameover';

export const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('creation');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [finalStats, setFinalStats] = useState<CampaignStats | null>(null);
  const [ending, setEnding] = useState<GameEnding | null>(null);
  const [finalWeek, setFinalWeek] = useState<number>(5);
  const [finalRank, setFinalRank] = useState<number>(1);
  const [showTutorial, setShowTutorial] = useState<boolean>(false);
  const [tutorialMode, setTutorialMode] = useState<TutorialMode>('intro');
  const [tutorialInitialStep, setTutorialInitialStep] = useState<number>(0);

  useEffect(() => {
    // Show first part of tutorial (intro) automatically on initial first load
    try {
      const introSeen = localStorage.getItem(TUTORIAL_INTRO_KEY);
      if (!introSeen) {
        setTutorialMode('intro');
        setTutorialInitialStep(0);
        setShowTutorial(true);
      }
    } catch (e) {
      console.warn('Error accediendo a localStorage:', e);
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleStartGame = (newCandidate: Candidate) => {
    setCandidate(newCandidate);
    setGameState('playing');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Show remaining parts of tutorial (metrics, 3D, comodines) when entering the game
    try {
      const gameplaySeen = localStorage.getItem(TUTORIAL_GAMEPLAY_KEY);
      if (!gameplaySeen) {
        setTimeout(() => {
          setTutorialMode('gameplay');
          setTutorialInitialStep(0);
          setShowTutorial(true);
        }, 400);
      }
    } catch (e) {
      console.warn('Error accediendo a localStorage:', e);
    }
  };

  const handleGameOver = (stats: CampaignStats, outcome: GameEnding, week: number, rank?: number) => {
    setFinalStats(stats);
    setEnding(outcome);
    setFinalWeek(week);
    const computedRank = rank ?? (outcome.type === 'GANADOR_ALCALDIA' ? 1 : outcome.type === 'SEGUNDO_LUGAR' ? 2 : 3);
    setFinalRank(computedRank);
    setGameState('gameover');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestart = () => {
    setCandidate(null);
    setFinalStats(null);
    setEnding(null);
    setFinalRank(1);
    setGameState('creation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`${theme} min-h-screen font-sans ${
      theme === 'dark' ? 'bg-[#050505] text-neutral-100' : 'bg-slate-50 text-slate-900'
    } flex flex-col justify-between selection:bg-amber-400 selection:text-black transition-colors duration-200`}>
      
      {/* Top Navbar: Modern Clean Command Center */}
      <header className="border-b border-slate-200 dark:border-neutral-800/80 bg-white/95 dark:bg-[#09090b]/95 backdrop-blur-md sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div 
            onClick={handleRestart}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 flex items-center justify-center text-xl shadow-sm group-hover:scale-105 transition-transform">
              🇵🇪
            </div>
            <div>
              <div className="font-extrabold text-base md:text-lg tracking-tight text-slate-900 dark:text-white flex items-center gap-2 font-sans">
                <span>SÉ ALCALDE</span>
                <span className="text-[10px] bg-slate-200 dark:bg-neutral-800 text-slate-700 dark:text-neutral-300 px-2 py-0.5 rounded-full font-bold">
                  LIMA 2026
                </span>
              </div>
              <div className="text-[11px] text-slate-500 dark:text-neutral-400 -mt-0.5 font-sans">
                Campaña Electoral Municipal • Las 5 Semanas Previas
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Tutorial / Help Button (On Demand) */}
            <button
              type="button"
              onClick={() => {
                if (gameState === 'creation') {
                  setTutorialMode('intro');
                  setTutorialInitialStep(0);
                } else {
                  setTutorialMode('all');
                  setTutorialInitialStep(1);
                }
                setShowTutorial(true);
              }}
              className="p-2 rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-neutral-800 transition-colors shadow-sm flex items-center gap-1.5 text-xs font-bold font-sans cursor-pointer"
              title="Abrir tutorial y guía de juego"
            >
              <HelpCircle className="w-4 h-4 text-amber-500" />
              <span className="hidden sm:inline">Tutorial</span>
            </button>

            {/* Theme Toggle (Light / Dark Mode) */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900 text-slate-700 dark:text-neutral-200 hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors shadow-sm flex items-center gap-1.5 text-xs font-bold font-sans cursor-pointer"
              title="Alternar entre modo claro y oscuro"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
              <span className="hidden sm:inline">{theme === 'dark' ? 'Modo Claro' : 'Modo Oscuro'}</span>
            </button>

            {gameState !== 'creation' && (
              <button
                type="button"
                onClick={handleRestart}
                className="text-xs font-bold text-slate-700 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white px-3 py-2 rounded-xl border border-slate-200 dark:border-neutral-800 hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors flex items-center gap-1.5 font-sans cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reiniciar</span>
              </button>
            )}

            <span className="text-xs font-sans px-3 py-1.5 rounded-full bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-700 dark:text-neutral-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="hidden md:inline">SISTEMA ACTIVO</span>
            </span>
          </div>
        </div>
      </header>

      {/* Main Screen Body */}
      <main className="flex-1 flex flex-col items-center justify-center">
        {gameState === 'creation' && (
          <CandidateCreation onStartGame={handleStartGame} />
        )}

        {gameState === 'playing' && candidate && (
          <GameScreen
            candidate={candidate}
            theme={theme}
            onGameOver={handleGameOver}
          />
        )}

        {gameState === 'gameover' && candidate && finalStats && ending && (
          <GameOverCard
            candidate={candidate}
            finalStats={finalStats}
            ending={ending}
            week={finalWeek}
            finalRank={finalRank}
            onRestart={handleRestart}
          />
        )}
      </main>

      {/* Interactive Onboarding Tutorial Modal */}
      <TutorialModal
        isOpen={showTutorial}
        mode={tutorialMode}
        initialStep={tutorialInitialStep}
        onClose={() => setShowTutorial(false)}
      />

      {/* Satirical Footer */}
      <footer className="border-t border-slate-200 dark:border-neutral-800/80 bg-white dark:bg-[#070709] py-4 text-center text-xs text-slate-500 dark:text-neutral-400 font-sans">
        <div className="max-w-4xl mx-auto px-4 space-y-1">
          <p>
            🇵🇪 <strong>Sé Alcalde 2026</strong> — Simulador satírico y roleplay electoral de Lima Metropolitana.
          </p>
          <p className="text-[11px] text-slate-500 dark:text-neutral-400">
            Cualquier parecido con debates acalorados en televisión, panes con chicharrón en mercados, caldos de gallina con pata o muñecos Labubu es pura coincidencia con la campaña limeña.
          </p>
        </div>
      </footer>

    </div>
  );
};

export default App;

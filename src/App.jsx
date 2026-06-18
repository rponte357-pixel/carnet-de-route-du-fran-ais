import { useState } from 'react'
import Hub from './components/Hub.jsx'
import GrammarSummary from './components/GrammarSummary.jsx'
import AuxiliaryTrainer from './components/AuxiliaryTrainer.jsx'
import TenseTrainer from './components/TenseTrainer.jsx'
import VerbsExplorer from './components/VerbsExplorer.jsx'
import ConnectorsPanel from './components/ConnectorsPanel.jsx'
import WritingLab from './components/WritingLab.jsx'
import VocabExplorer from './components/VocabExplorer.jsx'
import ProgressDashboard from './components/ProgressDashboard.jsx'
import GamesHub from './components/GamesHub.jsx'
import { useProgress } from './hooks/useProgress.js'

export default function App() {
  // activeTab = null  ->  estamos en la pantalla de inicio (hub)
  const [activeTab, setActiveTab] = useState(null)
  const { progress, registerResult, resetProgress } = useProgress()

  // --- Pantalla de inicio con burbujas ---
  if (activeTab === null) {
    return (
      <div className="app-shell app-shell--hub">
        <Hub onSelect={setActiveTab} />
        <footer className="app-footer">
          Bon courage pour l'examen — Carnet de Route · proyecto personal de estudio
        </footer>
      </div>
    )
  }

  // --- Vista de una sección ---
  return (
    <div className="app-shell">
      <header className="app-header">
        <button
          type="button"
          className="back-link"
          onClick={() => setActiveTab(null)}
        >
          ← Inicio
        </button>
        <div className="app-header__mark">
          <div className="app-header__stamp" aria-hidden="true">
            <span>A2</span>
            <span>B1</span>
          </div>
          <div>
            <div className="app-header__title">Carnet de Route</div>
            <div className="app-header__subtitle">Repaso de francés · niveles A2–B1</div>
          </div>
        </div>
      </header>

      <main>
        {activeTab === 'gramatica' && <GrammarSummary />}

        {activeTab === 'auxiliares' && (
          <AuxiliaryTrainer
            stats={progress.auxiliares}
            onResult={(isCorrect) => registerResult(['auxiliares'], isCorrect)}
          />
        )}

        {activeTab === 'verbos' && <VerbsExplorer />}

        {activeTab === 'tiempos' && (
          <TenseTrainer
            stats={progress.tiempos}
            onResult={(isCorrect) => registerResult(['tiempos'], isCorrect)}
          />
        )}

        {activeTab === 'conectores' && (
          <ConnectorsPanel
            stats={progress.conectores}
            onResult={(isCorrect) => registerResult(['conectores'], isCorrect)}
          />
        )}

        {activeTab === 'redaccion' && <WritingLab />}

        {activeTab === 'vocabulario' && (
          <VocabExplorer
            vocabStats={progress.vocab}
            onResult={(categoryId, isCorrect) => registerResult(['vocab', categoryId], isCorrect)}
          />
        )}

        {activeTab === 'progreso' && (
          <ProgressDashboard progress={progress} onReset={resetProgress} />
        )}

        {activeTab === 'juegos' && <GamesHub />}
      </main>

      <footer className="app-footer">
        Bon courage pour l'examen — Carnet de Route · proyecto personal de estudio
      </footer>
    </div>
  )
}

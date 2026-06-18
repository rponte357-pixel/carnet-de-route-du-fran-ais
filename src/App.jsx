import { useState } from 'react'
import Navigation from './components/Navigation.jsx'
import GrammarSummary from './components/GrammarSummary.jsx'
import AuxiliaryTrainer from './components/AuxiliaryTrainer.jsx'
import TenseTrainer from './components/TenseTrainer.jsx'
import ConnectorsPanel from './components/ConnectorsPanel.jsx'
import WritingLab from './components/WritingLab.jsx'
import VocabExplorer from './components/VocabExplorer.jsx'
import ProgressDashboard from './components/ProgressDashboard.jsx'
import { useProgress } from './hooks/useProgress.js'

const SECTIONS = [
  { id: 'gramatica', label: 'Gramática', icon: '📖' },
  { id: 'auxiliares', label: 'Auxiliares', icon: '🏠' },
  { id: 'tiempos', label: 'Tiempos', icon: '⏳' },
  { id: 'conectores', label: 'Conectores', icon: '🔗' },
  { id: 'redaccion', label: 'Redacción', icon: '✍️' },
  { id: 'vocabulario', label: 'Vocabulario', icon: '🗂️' },
  { id: 'progreso', label: 'Progreso', icon: '🛂' },
]

export default function App() {
  const [activeTab, setActiveTab] = useState('gramatica')
  const { progress, registerResult, resetProgress } = useProgress()

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header__mark">
          <div className="app-header__stamp" aria-hidden="true">
            <span>EOI</span>
            <span>B1</span>
          </div>
          <div>
            <div className="app-header__title">Carnet de Route</div>
            <div className="app-header__subtitle">Repaso para el francés B1 · EOI</div>
          </div>
        </div>
      </header>

      <Navigation sections={SECTIONS} activeId={activeTab} onChange={setActiveTab} />

      <main>
        {activeTab === 'gramatica' && <GrammarSummary />}

        {activeTab === 'auxiliares' && (
          <AuxiliaryTrainer
            stats={progress.auxiliares}
            onResult={(isCorrect) => registerResult(['auxiliares'], isCorrect)}
          />
        )}

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
      </main>

      <footer className="app-footer">
        Bon courage pour l'examen — Carnet de Route · proyecto personal de estudio
      </footer>
    </div>
  )
}

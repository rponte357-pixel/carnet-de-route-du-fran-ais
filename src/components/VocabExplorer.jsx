import { useState } from 'react'
import { vocabCategories, vocabWords } from '../data/vocabulary.js'
import FlashcardDeck from './FlashcardDeck.jsx'
import VocabQuiz from './VocabQuiz.jsx'

export default function VocabExplorer({ vocabStats, onResult }) {
  const [categoryId, setCategoryId] = useState(vocabCategories[0].id)
  const [mode, setMode] = useState('flashcards') // 'flashcards' | 'quiz'

  const category = vocabCategories.find((c) => c.id === categoryId)
  const words = vocabWords[categoryId]
  const stats = vocabStats[categoryId]

  return (
    <div>
      <p className="page-eyebrow">Vocabulaire thématique</p>
      <h2 className="page-title">Famille, travail, nationalité, nourriture et voyages</h2>
      <p className="page-intro">
        El vocabulario temático es el que más rentabilidad da en la prueba oral:
        hablar de uno mismo, de tu trabajo y de tus viajes. Elige una
        categoría y alterna entre tarjetas de repaso y el quiz para fijarlo.
      </p>

      <div className="subnav" role="tablist" aria-label="Categorías de vocabulario">
        {vocabCategories.map((c) => (
          <button
            key={c.id}
            type="button"
            role="tab"
            aria-selected={categoryId === c.id}
            className="subnav__btn"
            onClick={() => setCategoryId(c.id)}
          >
            {c.icon} {c.label}
          </button>
        ))}
      </div>

      <div className="mode-toggle" role="tablist" aria-label="Modo de estudio">
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'flashcards'}
          className="mode-toggle__btn"
          onClick={() => setMode('flashcards')}
        >
          🃏 Cartes
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'quiz'}
          className="mode-toggle__btn"
          onClick={() => setMode('quiz')}
        >
          ✅ Quiz
        </button>
      </div>

      <h3 style={{ marginBottom: 14 }}>{category.icon} {category.label} <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-soft)' }}>({words.length} palabras)</span></h3>

      {mode === 'flashcards' ? (
        <div className="card">
          <FlashcardDeck words={words} />
        </div>
      ) : (
        <VocabQuiz
          categoryId={categoryId}
          stats={stats}
          onResult={(isCorrect) => onResult(categoryId, isCorrect)}
        />
      )}
    </div>
  )
}

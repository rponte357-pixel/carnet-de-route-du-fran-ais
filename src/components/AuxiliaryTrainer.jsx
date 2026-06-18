import { useState } from 'react'
import { auxiliaryTrainerVerbs } from '../data/grammar.js'

function pickRandomVerb(excludeFr) {
  const pool = auxiliaryTrainerVerbs.filter((v) => v.fr !== excludeFr)
  return pool[Math.floor(Math.random() * pool.length)]
}

export default function AuxiliaryTrainer({ stats, onResult }) {
  const [current, setCurrent] = useState(() => pickRandomVerb(null))
  const [feedback, setFeedback] = useState(null) // { correct: bool, chosen: 'etre'|'avoir' }

  const total = stats.correct + stats.incorrect
  const accuracy = total === 0 ? null : Math.round((stats.correct / total) * 100)

  function handleChoice(choice) {
    if (feedback) return
    const isCorrect = choice === current.auxiliary
    setFeedback({ correct: isCorrect, chosen: choice })
    onResult(isCorrect)
  }

  function next() {
    setCurrent(pickRandomVerb(current.fr))
    setFeedback(null)
  }

  return (
    <div>
      <p className="page-eyebrow">Entrenamiento auxiliares</p>
      <h2 className="page-title">¿Être o avoir?</h2>
      <p className="page-intro">
        Haz clic en el auxiliar correcto para este verbo en Passé Composé.
        Cuantos más verbos repases, más rápido reconocerás el patrón el día del examen.
      </p>

      <div className="card prompt-card">
        <span className="tag tag--etre" style={{ opacity: 0.7 }}>Verbo</span>
        <div className="prompt-card__word">{current.fr}</div>
        <div className="prompt-card__translation">({current.es})</div>

        <div className="btn-row" style={{ marginTop: 26 }}>
          <button
            type="button"
            className={
              'choice-btn choice-btn--etre' +
              (feedback && current.auxiliary === 'etre' ? ' choice-btn--correct' : '') +
              (feedback && feedback.chosen === 'etre' && !feedback.correct ? ' choice-btn--incorrect' : '')
            }
            onClick={() => handleChoice('etre')}
            disabled={!!feedback}
          >
            🏠 Être
          </button>
          <button
            type="button"
            className={
              'choice-btn choice-btn--avoir' +
              (feedback && current.auxiliary === 'avoir' ? ' choice-btn--correct' : '') +
              (feedback && feedback.chosen === 'avoir' && !feedback.correct ? ' choice-btn--incorrect' : '')
            }
            onClick={() => handleChoice('avoir')}
            disabled={!!feedback}
          >
            💼 Avoir
          </button>
        </div>

        {feedback && (
          <div className={'feedback-banner ' + (feedback.correct ? 'feedback-banner--ok' : 'feedback-banner--ko')}>
            {feedback.correct
              ? '¡Correcto! '
              : `Era ${current.auxiliary === 'etre' ? 'ÊTRE 🏠' : 'AVOIR 💼'}. `}
            {current.fr} → {current.auxiliary === 'etre' ? 'être' : 'avoir'}
          </div>
        )}

        <div className="score-row">
          <span className="score-ok">Aciertos: <b>{stats.correct}</b></span>
          <span className="score-ko">Errores: <b>{stats.incorrect}</b></span>
          {accuracy !== null && <span>Precisión: <b>{accuracy}%</b></span>}
        </div>

        {feedback && (
          <button type="button" className="btn" style={{ marginTop: 20 }} onClick={next}>
            Siguiente verbo →
          </button>
        )}
      </div>
    </div>
  )
}

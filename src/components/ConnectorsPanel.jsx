import { useMemo, useState } from 'react'
import { connectorGroups, connectorExercises } from '../data/connectors.js'

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}

export default function ConnectorsPanel({ stats, onResult }) {
  return (
    <div>
      <p className="page-eyebrow">Connecteurs pour briller</p>
      <h2 className="page-title">Niveau A2–B1</h2>
      <p className="page-intro">
        Usa estas fórmulas para expresarte con más soltura en los niveles A2 y B1,
        tanto en la prueba escrita como en la oral.
      </p>

      <div className="card">
        <ul className="connector-list">
          {connectorGroups.map((c) => (
            <li key={c.label}>
              <span className="connector-label">{c.label}</span>
              <div>
                <div className="connector-phrase">"{c.phrase}"</div>
                <div style={{ fontSize: 13, color: 'var(--ink-soft)', marginTop: 2 }}>{c.es}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <hr className="divider" />

      <ConnectorExercise stats={stats} onResult={onResult} />
    </div>
  )
}

function ConnectorExercise({ stats, onResult }) {
  const order = useMemo(() => shuffle(connectorExercises.map((_, i) => i)), [])
  const [pos, setPos] = useState(0)
  const [selected, setSelected] = useState(null)

  const exercise = connectorExercises[order[pos % order.length]]
  const total = stats.correct + stats.incorrect

  function choose(i) {
    if (selected !== null) return
    setSelected(i)
    onResult(i === exercise.correctIndex)
  }

  function next() {
    setSelected(null)
    setPos((p) => p + 1)
  }

  return (
    <div>
      <h3 style={{ marginBottom: 12 }}>Practica: elige el conector correcto</h3>
      <div className="card quiz-card">
        <p className="quiz-question">{exercise.sentence}</p>
        <div className="quiz-options">
          {exercise.options.map((opt, i) => {
            let cls = 'quiz-option'
            if (selected !== null) {
              if (i === exercise.correctIndex) cls += ' quiz-option--correct'
              else if (i === selected) cls += ' quiz-option--incorrect'
            }
            return (
              <button key={opt} type="button" className={cls} onClick={() => choose(i)} disabled={selected !== null}>
                {opt}
              </button>
            )
          })}
        </div>
        {selected !== null && (
          <div className={'feedback-banner ' + (selected === exercise.correctIndex ? 'feedback-banner--ok' : 'feedback-banner--ko')} style={{ marginTop: 18, textAlign: 'left' }}>
            {exercise.explanation}
          </div>
        )}
        <div className="score-row">
          <span className="score-ok">Aciertos: <b>{stats.correct}</b></span>
          <span className="score-ko">Errores: <b>{stats.incorrect}</b></span>
          {total > 0 && <span>Precisión: <b>{Math.round((stats.correct / total) * 100)}%</b></span>}
        </div>
        {selected !== null && (
          <button type="button" className="btn" style={{ marginTop: 18 }} onClick={next}>
            Siguiente →
          </button>
        )}
      </div>
    </div>
  )
}
